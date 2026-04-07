'use strict';

self.onmessage = function (e) {
  const { text } = e.data;
  self.postMessage({ channels: parseM3U(text) });
};

function parseM3U(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const channels = [];
  let current = null;

  for (const line of lines) {
    if (line.startsWith('#EXTINF:')) { current = parseExtInf(line); continue; }
    if (line.startsWith('#')) continue;
    if (!current) continue;

    const isAce = /^acestream:\/\//i.test(line);
    const streamEntry = {
      url:     line,
      type:    isAce ? 'ace' : 'http',
      qual:    current.qual,
      rawName: current.name
    };

    // Agrupa por nombre base (limpio, sin calidad) + grupo
    const baseName = normalizeChannelName(current.name);
    const existing = channels.find(
      c => normalizeChannelName(c.name) === baseName && c.group === current.group
    );

    if (existing) {
      existing.streams.push(streamEntry);
      if (streamEntry.qual && !existing.badges.includes(streamEntry.qual)) {
        existing.badges.push(streamEntry.qual);
      }
      if (isAce) existing.hasAce = true;
    } else {
      channels.push({
        name:    current.name,
        group:   current.group || '',
        logo:    current.logo  || '',
        badges:  current.qual ? [current.qual] : [],
        hasAce:  isAce,
        streams: [streamEntry]
      });
    }
    current = null;
  }

  return channels;
}

function parseExtInf(line) {
  const obj = { name: '', group: '', logo: '', qual: '' };

  const commaIdx = line.lastIndexOf(',');
  obj.name = commaIdx >= 0 ? line.slice(commaIdx + 1).trim() : '';

  const attrs = line.slice(0, commaIdx >= 0 ? commaIdx : line.length);
  const get = key => {
    const m = attrs.match(new RegExp(key + '=["\']([^"\']*)["\']', 'i'));
    return m ? m[1].trim() : '';
  };

  obj.group = get('group-title');
  obj.logo  = get('tvg-logo');

  // Calidad: primero desde tvg-id (fuente canónica), fallback al nombre
  obj.qual = detectQuality(get('tvg-id')) || detectQuality(obj.name) || 'SD';

  return obj;
}

// Lee calidad desde tvg-id: "M+ Liga De Campeones FHD", "DAZN F1 4K", "La 1 UHD", "Eurosport 1 - 1080"
function detectQuality(s = '') {
  if (/\b(4k|uhd)\b/i.test(s))         return '4K';
  if (/\b(fhd|1080p?)\b/i.test(s))     return 'FHD';
  if (/\b(hd|720p?)\b/i.test(s))       return 'HD';
  if (/\b(sd|480p?|360p?)\b/i.test(s)) return 'SD';
  return null;
}

// Elimina sufijos de calidad del nombre para agrupar streams del mismo canal
function normalizeChannelName(name = '') {
  return name
    .toLowerCase()
    .replace(/\s*(4k|uhd|fhd|hd|sd|1080p?|720p?|480p?)\s*/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}