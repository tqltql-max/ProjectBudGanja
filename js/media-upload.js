/**
 * Preparação partilhada de fotos para upload (comunidade + diário).
 * Objectivo: JPEG aceite pela API e payload abaixo do limite típico da Netlify (~6 MB no pedido).
 */
(function (global) {
  'use strict';

  var MAX_SIDE = 1600;
  /** Alvo após compressão — base64 fica ~4/3; margem para o JSON. */
  var TARGET_BYTES = 700 * 1024;
  /** Limite duro alinhado com /api/cultivo/photo e com o payload Netlify. */
  var MAX_BYTES = 3.5 * 1024 * 1024;
  var MAX_RAW_BYTES = 25 * 1024 * 1024;
  var QUALITIES = [0.82, 0.72, 0.62, 0.5, 0.4, 0.32];

  function isImageFile(file) {
    if (!file) return false;
    var type = String(file.type || '').toLowerCase();
    if (type.indexOf('image/') === 0) return true;
    return /\.(jpe?g|png|webp|gif|heic|heif)$/i.test(file.name || '');
  }

  function looksLikeJpeg(file) {
    var type = String((file && file.type) || '').toLowerCase();
    if (type === 'image/jpeg' || type === 'image/jpg' || type === 'image/pjpeg') return true;
    return /\.jpe?g$/i.test((file && file.name) || '');
  }

  function isApiFriendlyImageType(type) {
    return /^image\/(jpeg|jpg|pjpeg|png|webp|gif)$/i.test(String(type || ''));
  }

  function stripDataUrlWhitespace(dataUrl) {
    return String(dataUrl || '').replace(/\s+/g, '');
  }

  function readFileAsDataUrl(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () { resolve(reader.result); };
      reader.onerror = function () { reject(new Error('Não foi possível ler a foto.')); };
      reader.readAsDataURL(file);
    });
  }

  /** Garante prefixo data:image/... aceite pela API (Windows por vezes devolve octet-stream). */
  function normalizeImageDataUrl(dataUrl, file) {
    var raw = stripDataUrlWhitespace(dataUrl);
    var m = raw.match(/^data:([^;,]*)?(?:;charset=[^;,]*)?;base64,(.+)$/i);
    if (!m) {
      m = raw.match(/^data:([^;]*);base64,(.+)$/i);
    }
    if (!m) return raw;
    var mime = String(m[1] || '').toLowerCase();
    var b64 = String(m[2] || '').replace(/[^A-Za-z0-9+/=]/g, '');
    if (isApiFriendlyImageType(mime)) {
      if (mime === 'image/pjpeg' || mime === 'image/jpg') {
        return 'data:image/jpeg;base64,' + b64;
      }
      return 'data:' + mime + ';base64,' + b64;
    }
    if (looksLikeJpeg(file) || !mime || mime === 'application/octet-stream') {
      return 'data:image/jpeg;base64,' + b64;
    }
    if (/\.png$/i.test((file && file.name) || '')) return 'data:image/png;base64,' + b64;
    if (/\.webp$/i.test((file && file.name) || '')) return 'data:image/webp;base64,' + b64;
    if (/\.gif$/i.test((file && file.name) || '')) return 'data:image/gif;base64,' + b64;
    return 'data:image/jpeg;base64,' + b64;
  }

  function dataUrlToJpegBlob(dataUrl) {
    var m = String(dataUrl || '').match(/^data:image\/jpeg;base64,(.+)$/i);
    if (!m) return null;
    try {
      var bin = atob(m[1]);
      var bytes = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return new Blob([bytes], { type: 'image/jpeg' });
    } catch (err) {
      return null;
    }
  }

  function canvasToJpegBlob(canvas, quality) {
    return new Promise(function (resolve, reject) {
      function fromDataUrl() {
        try {
          var dataUrl = canvas.toDataURL('image/jpeg', quality);
          var blob = dataUrlToJpegBlob(dataUrl);
          if (!blob) {
            reject(new Error('Falha ao converter a foto para JPEG.'));
            return;
          }
          resolve(blob);
        } catch (err) {
          reject(new Error('Falha ao converter a foto para JPEG.'));
        }
      }

      if (typeof canvas.toBlob !== 'function') {
        fromDataUrl();
        return;
      }
      try {
        canvas.toBlob(function (blob) {
          if (blob) {
            resolve(blob);
            return;
          }
          fromDataUrl();
        }, 'image/jpeg', quality);
      } catch (err) {
        fromDataUrl();
      }
    });
  }

  function sourceSize(source) {
    return {
      width: source.naturalWidth || source.width || 0,
      height: source.naturalHeight || source.height || 0
    };
  }

  function loadImageWithElement(file) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      var objectUrl = '';
      var settled = false;

      function finish(err, result) {
        if (settled) return;
        settled = true;
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
          objectUrl = '';
        }
        if (err) reject(err);
        else resolve(result);
      }

      function tryDataUrl() {
        var reader = new FileReader();
        reader.onload = function () {
          var fallback = new Image();
          fallback.onload = function () {
            var size = sourceSize(fallback);
            if (!size.width || !size.height) {
              finish(new Error('Foto inválida ou corrompida.'));
              return;
            }
            finish(null, fallback);
          };
          fallback.onerror = function () {
            finish(new Error('Não foi possível ler esta foto. Tire de novo em JPEG.'));
          };
          fallback.src = String(reader.result || '');
        };
        reader.onerror = function () {
          finish(new Error('Não foi possível ler esta foto. Tire de novo em JPEG.'));
        };
        reader.readAsDataURL(file);
      }

      img.onload = function () {
        var size = sourceSize(img);
        if (!size.width || !size.height) {
          tryDataUrl();
          return;
        }
        finish(null, img);
      };
      img.onerror = tryDataUrl;

      try {
        objectUrl = URL.createObjectURL(file);
        img.src = objectUrl;
      } catch (err) {
        tryDataUrl();
      }
    });
  }

  function loadImageSource(file) {
    if (typeof createImageBitmap !== 'function') {
      return loadImageWithElement(file);
    }
    var opts = { imageOrientation: 'from-image' };
    return createImageBitmap(file, opts).catch(function () {
      return createImageBitmap(file);
    }).catch(function () {
      return loadImageWithElement(file);
    });
  }

  function prepareImageForUpload(file, options) {
    options = options || {};
    var maxSide = options.maxSide || MAX_SIDE;
    var targetBytes = options.targetBytes || TARGET_BYTES;
    var maxBytes = options.maxBytes || MAX_BYTES;

    if (!isImageFile(file)) {
      return Promise.reject(new Error('Escolha uma foto (JPEG, PNG, WebP ou GIF).'));
    }
    if (file.size > MAX_RAW_BYTES) {
      return Promise.reject(new Error('Foto demasiado grande (máx. 25 MB).'));
    }

    return loadImageSource(file).then(function (source) {
      var size = sourceSize(source);
      var width = size.width;
      var height = size.height;
      if (!width || !height) {
        if (source && typeof source.close === 'function') source.close();
        return Promise.reject(new Error('Foto inválida ou corrompida.'));
      }

      var type = String(file.type || '').toLowerCase();
      var looksHeic = /heic|heif/i.test(type) || /\.(heic|heif)$/i.test(file.name || '');
      var friendlyType = isApiFriendlyImageType(type);
      var maxDim = Math.max(width, height);
      var needsResize = maxDim > maxSide;
      var needsCompress = needsResize || file.size > targetBytes || looksHeic || !friendlyType;

      if (!needsCompress && file.size <= maxBytes) {
        if (source && typeof source.close === 'function') source.close();
        return file;
      }

      var scale = needsResize ? maxSide / maxDim : 1;
      width = Math.max(1, Math.round(width * scale));
      height = Math.max(1, Math.round(height * scale));

      var canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext('2d');
      if (!ctx) {
        if (source && typeof source.close === 'function') source.close();
        return Promise.reject(new Error('Este dispositivo não conseguiu otimizar a foto.'));
      }
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(source, 0, 0, width, height);
      if (source && typeof source.close === 'function') source.close();

      var baseName = String(file.name || 'foto').replace(/\.[^.]+$/, '') || 'foto';

      function encodeAt(index) {
        var quality = QUALITIES[index];
        return canvasToJpegBlob(canvas, quality).then(function (blob) {
          var overTarget = blob.size > targetBytes && index < QUALITIES.length - 1;
          var overMax = blob.size > maxBytes && index < QUALITIES.length - 1;
          if (overTarget || overMax) return encodeAt(index + 1);
          if (blob.size > maxBytes) {
            return Promise.reject(new Error('Imagem muito grande mesmo após otimização. Tire outra foto ou reduza a resolução.'));
          }
          return new File([blob], baseName + '.jpg', { type: 'image/jpeg', lastModified: Date.now() });
        });
      }

      return encodeAt(0);
    });
  }

  function prepareAndReadDataUrl(file, options) {
    return prepareImageForUpload(file, options).then(function (prepared) {
      return readFileAsDataUrl(prepared).then(function (dataUrl) {
        return normalizeImageDataUrl(dataUrl, prepared);
      });
    });
  }

  global.BudGanjaMediaUpload = {
    isImageFile: isImageFile,
    looksLikeJpeg: looksLikeJpeg,
    readFileAsDataUrl: readFileAsDataUrl,
    normalizeImageDataUrl: normalizeImageDataUrl,
    prepareImageForUpload: prepareImageForUpload,
    prepareAndReadDataUrl: prepareAndReadDataUrl,
    TARGET_BYTES: TARGET_BYTES,
    MAX_BYTES: MAX_BYTES
  };
})(typeof window !== 'undefined' ? window : globalThis);
