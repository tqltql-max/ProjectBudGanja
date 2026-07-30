/**
 * Preparação partilhada de fotos para upload (comunidade + diário).
 * Objectivo: JPEG aceite pela API e payload abaixo do limite típico da Netlify (~6 MB no pedido).
 */
(function (global) {
  'use strict';

  var MAX_SIDE = 1600;
  /** Alvo após compressão — base64 fica ~4/3; margem para o JSON. */
  var TARGET_BYTES = 900 * 1024;
  /** Limite duro alinhado com /api/cultivo/photo e com o payload Netlify. */
  var MAX_BYTES = 3.5 * 1024 * 1024;
  var MAX_RAW_BYTES = 25 * 1024 * 1024;
  var QUALITIES = [0.82, 0.72, 0.62, 0.5, 0.4];

  function isImageFile(file) {
    if (!file) return false;
    var type = String(file.type || '').toLowerCase();
    if (type.indexOf('image/') === 0) return true;
    return /\.(jpe?g|png|webp|gif|heic|heif)$/i.test(file.name || '');
  }

  function readFileAsDataUrl(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () { resolve(reader.result); };
      reader.onerror = function () { reject(new Error('Não foi possível ler a foto.')); };
      reader.readAsDataURL(file);
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

    return new Promise(function (resolve, reject) {
      var img = new Image();
      var objectUrl = '';
      var settled = false;

      function finish(result) {
        if (settled) return;
        settled = true;
        if (objectUrl) URL.revokeObjectURL(objectUrl);
        resolve(result);
      }

      function fail(message) {
        if (settled) return;
        settled = true;
        if (objectUrl) URL.revokeObjectURL(objectUrl);
        reject(new Error(message || 'Não foi possível preparar a foto.'));
      }

      function processLoadedImage() {
        var width = img.naturalWidth || img.width;
        var height = img.naturalHeight || img.height;
        if (!width || !height) {
          fail('Foto inválida ou corrompida.');
          return;
        }

        var type = String(file.type || '').toLowerCase();
        var looksHeic = /heic|heif/i.test(type) || /\.(heic|heif)$/i.test(file.name || '');
        var isJpegFamily = type === 'image/jpeg' || type === 'image/jpg' || type === 'image/png' || type === 'image/webp' || type === 'image/gif';
        var maxDim = Math.max(width, height);
        var needsResize = maxDim > maxSide;
        var needsCompress = needsResize || file.size > targetBytes || looksHeic || !isJpegFamily;

        if (!needsCompress && file.size <= maxBytes && /^image\/(jpeg|jpg|png|webp|gif)$/i.test(type)) {
          finish(file);
          return;
        }

        var scale = needsResize ? maxSide / maxDim : 1;
        width = Math.max(1, Math.round(width * scale));
        height = Math.max(1, Math.round(height * scale));

        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        if (!ctx) {
          fail('Este dispositivo não conseguiu otimizar a foto.');
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        var baseName = String(file.name || 'foto').replace(/\.[^.]+$/, '') || 'foto';

        function encodeAt(index) {
          var quality = QUALITIES[index];
          canvas.toBlob(function (blob) {
            if (!blob) {
              fail('Falha ao converter a foto para JPEG.');
              return;
            }
            var overTarget = blob.size > targetBytes && index < QUALITIES.length - 1;
            var overMax = blob.size > maxBytes && index < QUALITIES.length - 1;
            if (overTarget || overMax) {
              encodeAt(index + 1);
              return;
            }
            if (blob.size > maxBytes) {
              fail('Imagem muito grande mesmo após otimização. Tire outra foto ou reduza a resolução.');
              return;
            }
            finish(new File([blob], baseName + '.jpg', { type: 'image/jpeg', lastModified: Date.now() }));
          }, 'image/jpeg', quality);
        }

        encodeAt(0);
      }

      img.onload = processLoadedImage;
      img.onerror = function () {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
          objectUrl = '';
        }
        var reader = new FileReader();
        reader.onload = function () {
          img.onerror = function () {
            fail('Não foi possível ler esta foto. Tire de novo em JPEG.');
          };
          img.src = String(reader.result || '');
        };
        reader.onerror = function () {
          fail('Não foi possível ler esta foto. Tire de novo em JPEG.');
        };
        reader.readAsDataURL(file);
      };

      try {
        objectUrl = URL.createObjectURL(file);
        img.src = objectUrl;
      } catch (err) {
        img.onerror();
      }
    });
  }

  global.BudGanjaMediaUpload = {
    isImageFile: isImageFile,
    readFileAsDataUrl: readFileAsDataUrl,
    prepareImageForUpload: prepareImageForUpload,
    TARGET_BYTES: TARGET_BYTES,
    MAX_BYTES: MAX_BYTES
  };
})(typeof window !== 'undefined' ? window : globalThis);
