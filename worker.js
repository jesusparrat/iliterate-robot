'use strict';

self.onmessage = function (e) {
  const { text } = e.data;
  self.postMessage({ channels: parseM3U(text) });
};

function parseM3U(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const channels = [];
  let current = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('#EXTINF:')) { current = parseExtInf(line); continue; }
    if (line.startsWith('#')) continue;
    if (!current) continue;

    const isAce = /^acestream:\/\//i.test(line);
    // La calidad viene del tvg-id, no del nombre del canal
    const streamEntry = {
      url:     line,
      type:    isAce ? 'ace' : 'http',
      qual:    detectQuality(current.tvgId) || detectQuality(current.tvgName) || '',
      rawName: current.name
    };

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
        badges:  streamEntry.qual ? [streamEntry.qual] : [],
        hasAce:  isAce,
        streams: [streamEntry]
      });
    }
    current = null;
  }
  return channels;
}

function parseExtInf(line) {
  const obj = { name: '', group: '', logo: '', tvgId: '', tvgName: '' };
  const commaIdx = line.lastIndexOf(',');
  obj.name = commaIdx >= 0 ? line.slice(commaIdx + 1).trim() : '';
  const attrs = line.slice(0, commaIdx >= 0 ? commaIdx : line.length);
  const get = key => {
    const m = attrs.match(new RegExp(key + '=["\']([^"\']*)["\']', 'i'));
    return m ? m[1].trim() : '';
  };
  obj.group   = get('group-title');
  obj.logo    = get('tvg-logo');
  obj.tvgId   = get('tvg-id');
  obj.tvgName = get('tvg-name');
  return obj;
}

// Detecta calidad exclusivamente desde tvg-id (ej: "M+ Liga 4K", "DAZN F1 1080", "Copa FHD")
function detectQuality(src = '') {
  if (/\b(4k|uhd)\b/i.test(src))           return '4K';
  if (/\b(fhd|1080)\b/i.test(src))         return 'FHD';
  if (/\b(hd|720)\b/i.test(src))           return 'HD';
  if (/\b(sd|480|360)\b/i.test(src))       return 'SD';
  return '';
}

function normalizeChannelName(name = '') {
  return name
    .toLowerCase()
    .replace(/\s*(4k|uhd|fhd|hd|sd|1080p?|720p?|480p?|360p?)\s*/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}