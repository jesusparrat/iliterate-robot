'use strict';

self.onmessage = function (e) {
  const { text } = e.data;
  const channels = parseM3U(text);
  self.postMessage({ channels });
};

function parseM3U(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const channels = [];
  let current = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('#EXTINF:')) {
      current = parseExtInf(line);
      continue;
    }

    if (line.startsWith('#')) continue;

    if (current) {
      const isAce = /^acestream:\/\//i.test(line);
      const streamEntry = {
        url:     line,
        type:    isAce ? 'ace' : 'http',
        qual:    current.qual || detectQuality(current.name),
        rawName: current.name
      };

      // Agrupa streams del mismo canal base (mismo nombre normalizado)
      const baseName = normalizeChannelName(current.name);
      const existing = channels.find(c => normalizeChannelName(c.name) === baseName && c.group === current.group);

      if (existing) {
        existing.streams.push(streamEntry);
        // Actualiza badges con la nueva calidad si no está ya
        const qual = streamEntry.qual;
        if (qual && !existing.badges.includes(qual)) existing.badges.push(qual);
        if (isAce) existing.hasAce = true;
      } else {
        const qual = streamEntry.qual;
        channels.push({
          name:    current.name,
          group:   current.group || '',
          logo:    current.logo  || '',
          badges:  qual ? [qual] : [],
          hasAce:  isAce,
          streams: [streamEntry]
        });
      }

      current = null;
    }
  }

  return channels;
}

function parseExtInf(line) {
  const obj = { name: '', group: '', logo: '', qual: '' };

  // Nombre del canal (después de la última coma)
  const commaIdx = line.lastIndexOf(',');
  obj.name = commaIdx >= 0 ? line.slice(commaIdx + 1).trim() : '';

  // Atributos clave="valor"
  const attrs = line.slice(0, commaIdx >= 0 ? commaIdx : line.length);
  const get = (key) => {
    const m = attrs.match(new RegExp(key + '=["\']([^"\']*)["\']', 'i'));
    return m ? m[1].trim() : '';
  };

  obj.group = get('group-title');
  obj.logo  = get('tvg-logo');

  // Calidad desde nombre o atributo
  obj.qual = detectQuality(obj.name) || detectQuality(get('tvg-name'));

  return obj;
}

function detectQuality(name = '') {
  if (/\b4k\b/i.test(name))              return '4K';
  if (/\bfhd\b|1080/i.test(name))        return 'FHD';
  if (/\bhd\b|720/i.test(name))          return 'HD';
  if (/\bsd\b|480|360/i.test(name))      return 'SD';
  return 'SD';
}

function normalizeChannelName(name = '') {
  return name
    .toLowerCase()
    .replace(/\s*(4k|fhd|hd|sd|1080p?|720p?|480p?)\s*/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}