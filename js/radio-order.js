'use strict';

/**
 * Ordem personalizada da playlist (localStorage) — partilhada entre /radio/ e o mini-player.
 */
(function (global) {
  var STORAGE_ORDER = 'budganja.radio.trackOrder';

  function readOrderIds() {
    try {
      var raw = localStorage.getItem(STORAGE_ORDER);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || !parsed.length) return null;
      return parsed.map(function (id) { return String(id); }).filter(Boolean);
    } catch (e) {
      return null;
    }
  }

  function writeOrderIds(ids) {
    try {
      if (!ids || !ids.length) {
        localStorage.removeItem(STORAGE_ORDER);
        return;
      }
      localStorage.setItem(STORAGE_ORDER, JSON.stringify(ids.map(String)));
    } catch (e) { /* ignore */ }
  }

  function clearOrder() {
    try {
      localStorage.removeItem(STORAGE_ORDER);
    } catch (e) { /* ignore */ }
  }

  /** Reordena tracks segundo IDs guardados; faixas novas ficam no fim. */
  function applyOrder(tracks) {
    var list = Array.isArray(tracks) ? tracks.slice() : [];
    var saved = readOrderIds();
    if (!saved || !saved.length || !list.length) return list;

    var byId = Object.create(null);
    list.forEach(function (t) {
      if (t && t.id != null) byId[String(t.id)] = t;
    });

    var ordered = [];
    var seen = Object.create(null);
    saved.forEach(function (id) {
      if (byId[id] && !seen[id]) {
        ordered.push(byId[id]);
        seen[id] = true;
      }
    });
    list.forEach(function (t) {
      if (!t || t.id == null) return;
      var id = String(t.id);
      if (!seen[id]) {
        ordered.push(t);
        seen[id] = true;
      }
    });
    return ordered.length ? ordered : list;
  }

  function idsFromTracks(tracks) {
    return (Array.isArray(tracks) ? tracks : [])
      .map(function (t) { return t && t.id != null ? String(t.id) : ''; })
      .filter(Boolean);
  }

  /** True se a ordem actual difere da ordem do catálogo. */
  function isCustomOrder(catalogTracks, currentTracks) {
    var catalogIds = idsFromTracks(catalogTracks);
    var currentIds = idsFromTracks(currentTracks);
    if (catalogIds.length !== currentIds.length) return true;
    for (var i = 0; i < catalogIds.length; i++) {
      if (catalogIds[i] !== currentIds[i]) return true;
    }
    return false;
  }

  global.BudGanjaRadioOrder = {
    STORAGE_ORDER: STORAGE_ORDER,
    readOrderIds: readOrderIds,
    writeOrderIds: writeOrderIds,
    clearOrder: clearOrder,
    applyOrder: applyOrder,
    idsFromTracks: idsFromTracks,
    isCustomOrder: isCustomOrder
  };
})(typeof window !== 'undefined' ? window : globalThis);
