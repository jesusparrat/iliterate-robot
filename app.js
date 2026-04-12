'use strict';

// ─── Platform detection ──────────────────────────────────────────────────────
const UA = navigator.userAgent;
const IS_ANDROID = /android/i.test(UA);
const IS_IOS     = /iphone|ipad|ipod/i.test(UA);
const IS_MOBILE  = IS_ANDROID || IS_IOS;
const IS_GITHUB_PAGES = /github\.io/i.test(window.location.hostname);
const SAME_ORIGIN_ACE = !IS_GITHUB_PAGES && ['80', '8080', '443', ''].includes(window.location.port);

function getAceBase() {
  if (SAME_ORIGIN_ACE) return '';
  const saved = localStorage.getItem('ace_tunnel_url');
  if (saved) return saved.replace(/\/$/, '');
  return 'http://127.0.0.1:6878';
}

// ─── Logo map ────────────────────────────────────────────────────────────────
const LOGO_MAP = {
  'liga de campeones':    { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/Liga%20de%20Campeones%20BAR.png' },
  'm+ liga de campeones': { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/Liga%20de%20Campeones%20BAR.png' },
  'laliga tv':            { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/M%2B%20LaLiga%20TV.png' },
  'm+ laligatv':          { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/M%2B%20LaLiga%20TV.png' },
  'm+ laliga':            { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/M%2B%20LaLiga%20TV.png' },
  'laliga hypermotion':   { url: 'https://commons.wikimedia.org/wiki/Special:FilePath/LaLiga_Hypermotion_2023_Vertical_Logo.svg', lightBg: true },
  'dazn laliga':          { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/DAZN%20LaLiga.png' },
  'dazn laliga 2':        { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/DAZN%20LaLiga%202.png' },
  'dazn laliga 3':        { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/DAZN%20LaLiga%203.png' },
  'dazn laliga 4':        { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/DAZN%20LaLiga%204.png' },
  'dazn laliga 5':        { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/DAZN%20LaLiga%205.png' },
  'dazn f1':              { url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Formula_1_logo.svg', lightBg: true },
  'dazn 1':               { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/DAZN%201.png' },
  'dazn 2':               { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/DAZN%202.png' },
  'dazn 3':               { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/DAZN%203.png' },
  'dazn 4':               { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/DAZN%204.png' },
  'm+ deportes':          { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/M%2B%20Deportes.png' },
  'm+ deportes 2':        { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/M%2B%20Deportes%202.png' },
  'm+ deportes 3':        { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/M%2B%20Deportes%203.png' },
  'm+ deportes 4':        { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/M%2B%20Deportes%204.png' },
  'm+ deportes 5':        { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/M%2B%20Deportes%205.png' },
  'm+ #vamos':            { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/M%2B%20%23Vamos.png' },
  'eurosport 1':          { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/Eurosport%201.png', lightBg: true },
  'eurosport 2':          { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/Eurosport%202.png', lightBg: true },
  'la 1':                 { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/La_1_HD_TVE.png/250px-La_1_HD_TVE.png' },
  '24h':                  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Logo_Canal_24_horas.svg/250px-Logo_Canal_24_horas.svg.png', lightBg: true },
  'telecinco':            { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Telecinco.svg/250px-Telecinco.svg.png', lightBg: true },
  'antena 3':             { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Logo_Antena_3_2025_%28Naranja%29.svg/250px-Logo_Antena_3_2025_%28Naranja%29.svg.png' },
  'la sexta':             { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/La%20Sexta.png' },
  'teledeporte':          { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/Teledeporte.png' },
  'gol play':             { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/Gol%20Play.png' },
  'real madrid tv':       { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/Real%20Madrid%20TV.png' },
  'barca tv':             { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/Barca%20TV.png' },
  'barça tv':             { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/Barca%20TV.png' },
};

// ─── Group rules ─────────────────────────────────────────────────────────────
const GROUP_RULES = [
  { key: 'favoritos',   label: 'Favoritos',          match: () => false },
  { key: 'champions',   label: 'Champions',          match: n => /campeones|champions/i.test(n) },
  { key: 'laliga',      label: 'LaLiga',             match: n => /laliga/i.test(n) },
  { key: 'hypermotion', label: 'Hypermotion',        match: n => /hypermotion/i.test(n) },
  { key: 'f1',          label: 'F1 / Motor',         match: n => /f1|formula 1|motor/i.test(n) },
  { key: 'movistar',    label: 'Movistar Deportes',  match: n => /m\+ deportes|vamos|golf/i.test(n) },
  { key: 'eurosport',   label: 'Eurosport',          match: n => /eurosport/i.test(n) },
  { key: 'tdt',         label: 'TDT',                match: n => /la 1|la 2|telecinco|cuatro|antena 3|sexta|24h|mega|tdt/i.test(n) },
  { key: 'clubes',      label: 'Clubes',             match: n => /real madrid|barça|barca/i.test(n) },
  { key: 'otros',       label: 'Otros deportes',     match: n => /sport|deporte|dazn|copa|supercopa|gol play/i.test(n) },
];

const QUICK_FILTERS = ['champions', 'laliga', 'f1', 'dazn', 'eurosport'];

// ─── State ───────────────────────────────────────────────────────────────────
const state = {
  allChannels:      [],
  filteredChs:      [],
  activeGroup:      'Todos',
  pageOffset:       0,
  pageSize:         48,
  currentChId:      null,
  currentStreamIndex: 0,
  aceAvailable:     false,
  hlsInstance:      null,
  acePollingAbort:  null,
};

let m3uWorker = null;

// ─── DOM refs ────────────────────────────────────────────────────────────────
const dom = {
  urlInput:       document.getElementById('url-input'),
  searchInput:    document.getElementById('search-input'),
  groupPills:     document.getElementById('group-pills'),
  channelList:    document.getElementById('channel-list'),
  status:         document.getElementById('sidebar-status'),
  sentinel:       document.getElementById('scroll-sentinel'),
  playerOverlay:  document.getElementById('player-overlay'),
  playerSpinner:  document.getElementById('player-spinner'),
  playerError:    document.getElementById('player-error'),
  errText:        document.getElementById('player-error-text'),
  playerPanel:    document.getElementById('player-panel'),
  sidebar:        document.getElementById('channel-panel'),
  aceStatus:      document.getElementById('ace-status'),
  aceTunnelBanner: document.getElementById('ace-tunnel-banner'),
};

// ─── IntersectionObserver (virtual scroll) ───────────────────────────────────
const observer = new IntersectionObserver(entries => {
  if (entries[0]?.isIntersecting && state.pageOffset < state.filteredChs.length) {
    renderNextBatch();
  }
}, { root: document.getElementById('channel-scroll-wrap'), rootMargin: '200px' });

// ─── Utils ───────────────────────────────────────────────────────────────────
function resolveLogo(name, fallbackUrl) {
  const key = (name || '').toLowerCase().trim();
  if (LOGO_MAP[key]) return LOGO_MAP[key];
  for (const [k, v] of Object.entries(LOGO_MAP)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return fallbackUrl ? { url: fallbackUrl } : null;
}

function normalize(text = '') {
  return text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9+ ]/g, ' ').replace(/\s+/g, ' ').trim();
}

function inferGroup(name, originalGroup = '') {
  const haystack = `${name} ${originalGroup}`;
  for (const rule of GROUP_RULES) if (rule.match(haystack)) return rule.label;
  return originalGroup || 'General';
}

function buildSearchText(ch) {
  return normalize([ch.name, ch.group, ch.category, ...(ch.badges || []), ...(ch.tags || [])].join(' '));
}

// ─── Tabs ────────────────────────────────────────────────────────────────────
function initTabs() {
  const tabBtns   = document.querySelectorAll('.tab-btn[data-tab]');
  const tabPanels = document.querySelectorAll('.tab-panel[id^="tab-"]');

  function activateTab(tabId) {
    tabBtns.forEach(btn => {
      const active = btn.dataset.tab === tabId;
      btn.classList.toggle('tab-btn--active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    tabPanels.forEach(panel => {
      const active = panel.id === `tab-${tabId}`;
      panel.classList.toggle('tab-panel--active', active);
      panel.hidden = !active;
    });
  }

  tabBtns.forEach(btn => btn.addEventListener('click', () => activateTab(btn.dataset.tab)));

  document.querySelectorAll('[data-goto-tab]').forEach(el => {
    el.addEventListener('click', () => activateTab(el.dataset.gotoTab));
  });

  activateTab('channels');
}

// ─── AceStream status indicator ──────────────────────────────────────────────
function setAceStatus(statusKey) {
  const el    = document.getElementById('ace-status');
  const label = document.getElementById('ace-status-label');
  if (!el) return;
  el.classList.remove('is-connected', 'is-connecting', 'is-error');
  const map = {
    connected:  { cls: 'is-connected',  text: 'ACE ✓' },
    connecting: { cls: 'is-connecting', text: 'ACE…'  },
    error:      { cls: 'is-error',      text: 'ACE ✗' },
    idle:       { cls: '',              text: 'ACE'    },
  };
  const { cls, text } = map[statusKey] || map.idle;
  if (cls) el.classList.add(cls);
  if (label) label.textContent = text;
}

function updateAceStatusDisplay() {
  const base = getAceBase();
  const el   = dom.aceStatus;
  if (!el) return;
  if (SAME_ORIGIN_ACE) {
    setAceStatus('connected');
    el.title = 'Docker proxy activo';
  } else if (localStorage.getItem('ace_tunnel_url')) {
    setAceStatus('connecting');
    el.title = `Túnel: ${base}`;
  } else {
    setAceStatus('idle');
    el.title = 'Sin túnel HTTPS configurado';
  }
  el.style.cursor = IS_GITHUB_PAGES ? 'pointer' : 'default';
}

// ─── Init ────────────────────────────────────────────────────────────────────
function init() {
  updateTopbarHeight();
  window.addEventListener('resize', updateTopbarHeight);
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
  initTabs();
  loadPlaylistOptions();
  bindUI();
  bindTunnelSettings();
  observer.observe(dom.sentinel);
  updateAceStatusDisplay();
  if (!IS_MOBILE) detectAceEngine();
}

function updateTopbarHeight() {
  const topbar = document.querySelector('.topbar');
  if (topbar) document.documentElement.style.setProperty('--topbar-h', topbar.offsetHeight + 'px');
}

// ─── UI bindings ─────────────────────────────────────────────────────────────
function bindUI() {
  document.getElementById('btn-load-url').addEventListener('click', loadFromInput);
  dom.urlInput.addEventListener('keydown', e => { if (e.key === 'Enter') loadFromInput(); });

  document.getElementById('btn-open-playlists').addEventListener('click', openPlaylists);
  document.getElementById('btn-close-playlists').addEventListener('click', closePlaylists);
  document.getElementById('playlist-overlay').addEventListener('click', e => {
    if (e.target.id === 'playlist-overlay') closePlaylists();
  });
  document.getElementById('btn-load-playlist-url').addEventListener('click', () => {
    const u = document.getElementById('playlist-url-input').value.trim();
    if (!u) return;
    dom.urlInput.value = u;
    closePlaylists();
    loadFromInput();
  });
  document.getElementById('playlist-url-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('btn-load-playlist-url').click();
  });

  document.getElementById('btn-close-modal').addEventListener('click', () => closeModal(false));
  document.getElementById('modal-backdrop').addEventListener('click', e => {
    if (e.target.id === 'modal-backdrop') closeModal(false);
  });
  window.addEventListener('popstate', () => {
    if (document.getElementById('modal-backdrop').classList.contains('open')) closeModal(true);
  });

  document.getElementById('btn-fullscreen').addEventListener('click', toggleFullscreen);
  document.getElementById('btn-pip').addEventListener('click', togglePip);
  document.getElementById('btn-retry').addEventListener('click', retryPlay);

  document.getElementById('btn-clear-search').addEventListener('click', () => {
    dom.searchInput.value = '';
    applyFilter();
    dom.searchInput.focus();
  });

  document.getElementById('btn-show-channels').addEventListener('click', () => setSidebar(true));
  document.getElementById('sidebar-toggle').addEventListener('click', () =>
    setSidebar(!dom.sidebar.classList.contains('is-open'))
  );
  document.getElementById('btn-back-to-list').addEventListener('click', () => setSidebar(true));

  let searchTimer;
  dom.searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(applyFilter, 120);
  });
  dom.searchInput.addEventListener('keydown', handleSearchKeys);
}

// ─── Tunnel settings (tab Motor ACE) ─────────────────────────────────────────
function bindTunnelSettings() {
  const btnSave  = document.getElementById('btn-save-tunnel');
  const btnClear = document.getElementById('btn-clear-tunnel');

  if (btnSave) {
    btnSave.addEventListener('click', () => {
      const val = document.getElementById('tunnel-url-input').value.trim();
      if (!val || !/^https?:\/\//i.test(val)) {
        toast('Introduce una URL válida (https://…)', 'error');
        return;
      }
      const clean = val.replace(/\/$/, '');
      localStorage.setItem('ace_tunnel_url', clean);
      toast(`✅ Túnel guardado: ${clean}`, 'ok');
      updateAceStatusDisplay();
      updateTunnelStatusCard();
      detectAceEngine();
    });
  }

  if (btnClear) {
    btnClear.addEventListener('click', () => {
      localStorage.removeItem('ace_tunnel_url');
      const input = document.getElementById('tunnel-url-input');
      if (input) input.value = '';
      updateTunnelStatusCard();
      updateAceStatusDisplay();
      toast('Túnel eliminado', 'info');
    });
  }

  const saved = localStorage.getItem('ace_tunnel_url') || '';
  const input = document.getElementById('tunnel-url-input');
  if (input && saved) input.value = saved;
  updateTunnelStatusCard();
}

function updateTunnelStatusCard() {
  const saved = localStorage.getItem('ace_tunnel_url');
  const dot   = document.getElementById('tunnel-status-dot');
  const text  = document.getElementById('tunnel-status-text');
  if (!dot || !text) return;
  if (saved) {
    dot.classList.add('is-active');
    text.textContent = saved;
    text.style.color = 'var(--text)';
  } else {
    dot.classList.remove('is-active');
    text.textContent = 'Sin configurar';
    text.style.color = '';
  }
}

// Compatibilidad: si algún código externo llama a estos, redirigen al tab
function openTunnelModal() {
  document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
    if (btn.dataset.tab === 'settings') btn.click();
  });
}
function closeTunnelModal() { /* no-op: el tab no se "cierra" */ }

function setSidebar(open) {
  dom.sidebar.classList.toggle('is-open', !!open);
  document.getElementById('sidebar-toggle').setAttribute('aria-expanded', open ? 'true' : 'false');
}

// ─── Playlists ───────────────────────────────────────────────────────────────
async function loadPlaylistOptions() {
  try {
    const res = await fetch('./playlists.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const list = await res.json();
    const grid = document.getElementById('playlist-grid');
    grid.innerHTML = '';
    list.forEach(pl => {
      const card = document.createElement('button');
      card.className = 'pl-card';
      const initial = (pl.name || '?')[0].toUpperCase();
      card.innerHTML = `
        <div class="pl-card__avatar">${initial}</div>
        <div class="pl-card__info">
          <div class="pl-card__name">${pl.name || 'Lista sin nombre'}</div>
          <div class="pl-card__meta">${pl.category || 'Lista M3U'}</div>
        </div>`;
      card.addEventListener('click', () => {
        dom.urlInput.value = pl.url;
        closePlaylists();
        loadFromInput();
      });
      grid.appendChild(card);
    });
  } catch (e) {
    console.warn('No se pudo cargar playlists.json:', e.message);
  }
}

function openPlaylists()  { document.getElementById('playlist-overlay').classList.add('open'); }
function closePlaylists() { document.getElementById('playlist-overlay').classList.remove('open'); }

// ─── M3U loading ─────────────────────────────────────────────────────────────
async function loadFromInput() {
  const url = dom.urlInput.value.trim();
  if (!url) { toast('Introduce una URL de lista M3U', 'error'); return; }
  await loadM3U(url);
}

async function loadM3U(url) {
  dom.status.textContent = 'Cargando…';
  dom.channelList.innerHTML = '<div class="ch-loading">Cargando lista…</div>';
  state.allChannels = [];
  state.filteredChs = [];
  state.pageOffset  = 0;

  if (m3uWorker) { m3uWorker.terminate(); m3uWorker = null; }

  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const channels = parseM3U(text);
    onChannelsLoaded(channels);
  } catch (e) {
    dom.status.textContent = 'Error al cargar';
    dom.channelList.innerHTML = `<div class="ch-empty">No se pudo cargar la lista.<br><small>${e.message}</small></div>`;
    toast('Error cargando lista: ' + e.message, 'error');
  }
}

function parseM3U(text) {
  const lines    = text.split('\n');
  const channels = [];
  let current    = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('#EXTINF:')) {
      const nameMatch = line.match(/,(.+)$/);
      const name      = nameMatch ? nameMatch[1].trim() : 'Canal sin nombre';
      const tvgLogo   = (line.match(/tvg-logo="([^"]*)"/i)  || [])[1] || '';
      const tvgName   = (line.match(/tvg-name="([^"]*)"/i)  || [])[1] || '';
      const groupTitle= (line.match(/group-title="([^"]*)"/i)|| [])[1] || '';
      const logoData  = resolveLogo(name, tvgLogo);

      current = {
        _id:        channels.length,
        name,
        tvgName,
        group:      inferGroup(name, groupTitle),
        logo:       logoData ? logoData.url : tvgLogo,
        lightBg:    logoData ? (logoData.lightBg || false) : false,
        streams:    [],
        searchText: '',
        badges:     [],
        tags:       [],
      };

    } else if (line.startsWith('#')) {
      // Ignorar otras directivas M3U

    } else if (current) {
      const streamUrl = line;
      let type = 'hls';
      if (/^acestream:\/\//i.test(streamUrl)) {
        type = 'ace';
      } else if (/^rtmp:\/\//i.test(streamUrl)) {
        type = 'rtmp';
      } else if (!/\.m3u8/i.test(streamUrl)) {
        type = 'http';
      }

      let qual = 'SD';
      if (/4k|uhd/i.test(current.name))  qual = '4K';
      else if (/fhd|1080/i.test(current.name)) qual = 'FHD';
      else if (/hd|720/i.test(current.name))   qual = 'HD';

      current.streams.push({ url: streamUrl, type, qual });
      current.searchText = buildSearchText(current);
      channels.push(current);
      current = null;
    }
  }

  return channels;
}

function onChannelsLoaded(channels) {
  state.allChannels = channels;
  state.pageOffset  = 0;
  buildGroupPills();
  applyFilter();
  renderSuggested();
  const n = channels.length;
  dom.status.textContent = `${n} canal${n !== 1 ? 'es' : ''}`;
  toast(`✅ ${n} canales cargados`, 'ok');
}

// ─── Rendering ───────────────────────────────────────────────────────────────
function applyFilter() {
  const q     = normalize(dom.searchInput.value);
  const group = state.activeGroup;

  state.filteredChs = state.allChannels.filter(ch => {
    const groupMatch  = group === 'Todos' || ch.group === group;
    const searchMatch = !q || ch.searchText.includes(q);
    return groupMatch && searchMatch;
  });

  state.pageOffset = 0;
  dom.channelList.innerHTML = '';

  if (state.filteredChs.length === 0) {
    dom.channelList.innerHTML = '<div class="ch-empty">Sin resultados</div>';
    return;
  }

  renderNextBatch();
}

function renderNextBatch() {
  const batch = state.filteredChs.slice(state.pageOffset, state.pageOffset + state.pageSize);
  batch.forEach(ch => dom.channelList.appendChild(buildChannelCard(ch)));
  state.pageOffset += batch.length;
}

function buildChannelCard(ch) {
  const card = document.createElement('button');
  card.className = 'ch-card';
  card.setAttribute('role', 'listitem');
  card.setAttribute('data-ch-id', ch._id);
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', ch.name);
  if (ch._id === state.currentChId) card.classList.add('active');

  const isAce  = ch.streams.some(s => s.type === 'ace');
  const badge  = isAce ? '<span class="ch-badge ch-badge--ace">ACE</span>' : '';

  let logoHtml;
  if (ch.logo) {
    logoHtml = `<img class="ch-logo" src="${ch.logo}" alt="" loading="lazy"
      onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">
      <div class="ch-logo-fb" style="display:none">📺</div>`;
  } else {
    logoHtml = '<div class="ch-logo-fb">📺</div>';
  }

  card.innerHTML = `
    <div class="ch-logo-wrap${ch.lightBg ? ' ch-logo-wrap--light' : ''}">${logoHtml}</div>
    <div class="ch-info">
      <div class="ch-name">${ch.name}</div>
      <div class="ch-meta">${ch.group}${badge ? ' ' + badge : ''}</div>
    </div>`;

  card.addEventListener('click', () => openModal(ch._id));
  card.addEventListener('keydown', handleCardKeys);
  return card;
}

function buildGroupPills() {
  const groups = ['Todos', ...new Set(state.allChannels.map(ch => ch.group))]
    .sort((a, b) => a === 'Todos' ? -1 : b === 'Todos' ? 1 : a.localeCompare(b, 'es'));

  dom.groupPills.innerHTML = '';
  groups.forEach(g => {
    const pill = document.createElement('button');
    pill.className = 'pill' + (g === state.activeGroup ? ' active' : '');
    pill.setAttribute('role', 'tab');
    pill.setAttribute('aria-selected', g === state.activeGroup ? 'true' : 'false');
    pill.textContent = g;
    pill.addEventListener('click', () => {
      state.activeGroup = g;
      document.querySelectorAll('.pill').forEach(p => {
        const isActive = p.textContent === g;
        p.classList.toggle('active', isActive);
        p.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      applyFilter();
    });
    pill.addEventListener('keydown', handlePillKeys);
    dom.groupPills.appendChild(pill);
  });
}

function renderSuggested() {
  const el = document.getElementById('suggested-channels');
  if (!el) return;
  const top = state.allChannels.slice(0, 8);
  if (!top.length) {
    el.innerHTML = '<div class="ch-sub">Carga una lista M3U para ver sugerencias.</div>';
    return;
  }
  el.innerHTML = '';
  top.forEach(ch => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.textContent = ch.name;
    btn.addEventListener('click', () => openModal(ch._id));
    el.appendChild(btn);
  });

  // Quick filter chips
  const qf = document.getElementById('quick-filters');
  if (qf) {
    qf.innerHTML = '';
    QUICK_FILTERS.forEach(key => {
      if (!state.allChannels.some(ch => normalize(ch.group + ' ' + ch.name).includes(key))) return;
      const btn = document.createElement('button');
      btn.className = 'chip';
      btn.textContent = key.charAt(0).toUpperCase() + key.slice(1);
      btn.addEventListener('click', () => {
        dom.searchInput.value = key;
        applyFilter();
      });
      qf.appendChild(btn);
    });
  }
}

// ─── Modal ───────────────────────────────────────────────────────────────────
function openModal(chId) {
  const ch = state.allChannels[chId];
  if (!ch) return;

  const modalLogo   = document.getElementById('modal-logo');
  const modalLogoFb = document.getElementById('modal-logo-fb');
  const modalTitle  = document.getElementById('modal-title');
  const modalMeta   = document.getElementById('modal-meta');
  const modalBody   = document.getElementById('modal-body');
  const hint        = document.getElementById('modal-hint');

  // Logo
  if (ch.logo) {
    modalLogo.src = ch.logo;
    modalLogo.style.display = '';
    modalLogoFb.style.display = 'none';
    if (ch.lightBg) {
      modalLogo.parentElement.style.background = '#fff';
      modalLogo.parentElement.style.padding    = '4px';
    } else {
      modalLogo.parentElement.style.background = '';
      modalLogo.parentElement.style.padding    = '';
    }
    modalLogo.onerror = () => {
      modalLogo.style.display   = 'none';
      modalLogoFb.style.display = '';
    };
  } else {
    modalLogo.style.display   = 'none';
    modalLogoFb.style.display = '';
  }

  modalTitle.textContent = ch.name;
  modalMeta.textContent  = `${ch.group} · ${ch.streams.length} enlace${ch.streams.length !== 1 ? 's' : ''}`;

  // Stream rows
  modalBody.innerHTML = '';
  ch.streams.forEach((stream, i) => {
    const isAce  = stream.type === 'ace';
    const isRtmp = stream.type === 'rtmp';

    const row = document.createElement('div');
    row.className = 'stream-row';

    const lbl      = document.createElement('span');
    lbl.className  = 'stream-label';
    lbl.innerHTML  = isAce
      ? `<span class="ch-badge ch-badge--ace">ACE</span> Enlace ${i + 1}`
      : `▶ Enlace ${i + 1} <span class="stream-qual">${stream.qual || 'SD'}</span>`;

    const btnPlay  = document.createElement('button');
    btnPlay.className = 'btn btn-primary btn-sm';
    btnPlay.textContent = 'Ver';
    btnPlay.addEventListener('click', () => { closeModal(false); playStream(chId, i); });

    const btnCopy  = document.createElement('button');
    btnCopy.className = 'btn btn-surface btn-sm';
    btnCopy.textContent = 'Copiar URL';
    btnCopy.addEventListener('click', () => copyToClipboard(stream.url));

    row.appendChild(lbl);
    row.appendChild(btnPlay);
    row.appendChild(btnCopy);

    if (isAce) {
      const btnLaunch = document.createElement('button');
      btnLaunch.className   = 'btn btn-surface btn-sm';
      btnLaunch.textContent = 'App ACE';
      btnLaunch.title       = 'Abrir en la app AceStream nativa';
      btnLaunch.addEventListener('click', () => launchAce(stream.url));
      row.appendChild(btnLaunch);
    }

    modalBody.appendChild(row);
  });

  // Hint block
  const aceBase   = getAceBase();
  const hasTunnel = !!localStorage.getItem('ace_tunnel_url');
  const hasAce    = ch.streams.some(s => s.type === 'ace');
  const mixedRisk = ch.streams.some(s => /^http:\/\//i.test(s.url));

  hint.innerHTML = '';

  if (hasAce) {
    if (SAME_ORIGIN_ACE) {
      hint.innerHTML = '🐳 Motor AceStream via proxy Docker activo.';
    } else if (hasTunnel) {
      hint.innerHTML = `⚡ Usando túnel: <code>${aceBase}</code>`;
    } else {
      hint.innerHTML =
        '⚡ Para reproducir ACE desde GitHub Pages ve a <strong>Motor ACE</strong> y configura el túnel. ' +
        'Sin él se intentará <code>127.0.0.1:6878</code> (solo funciona en local).';
    }
  }

  if (mixedRisk && !SAME_ORIGIN_ACE && !hasTunnel) {
    hint.innerHTML +=
      (hint.innerHTML ? '<br>' : '') +
      '⚠️ Stream HTTP puede bloquearse desde HTTPS. Configura el túnel o usa Docker local.';
  }

  document.getElementById('modal-backdrop').classList.add('open');
  history.pushState({ isModalOpen: true }, '');
}

function closeModal(fromPopState = false) {
  document.getElementById('modal-backdrop').classList.remove('open');
  if (!fromPopState && history.state?.isModalOpen) history.back();
}

// ─── AceStream polling ───────────────────────────────────────────────────────
async function waitForAceStream(aceUrl, signal) {
  const MAX_ATTEMPTS = 18;
  const INTERVAL_MS  = 2000;
  const spinnerText  = dom.playerSpinner.querySelector('.spinner-text');

  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    if (signal.aborted) throw new DOMException('cancelled', 'AbortError');

    const remaining = (MAX_ATTEMPTS - i) * (INTERVAL_MS / 1000);
    if (spinnerText) spinnerText.textContent = `Buscando peers P2P… ${remaining}s`;

    try {
      const ctrl = new AbortController();
      const tid  = setTimeout(() => ctrl.abort(), 4000);
      const res  = await fetch(aceUrl, { signal: ctrl.signal, cache: 'no-store' });
      clearTimeout(tid);
      if (res.ok) return aceUrl;
      // 500 = motor buscando peers → reintentar
    } catch (_) { /* timeout o abort → reintentar */ }

    await new Promise(r => setTimeout(r, INTERVAL_MS));
  }

  throw new Error('timeout');
}

// ─── Playback ────────────────────────────────────────────────────────────────
function playStream(chId, streamIndex) {
  const ch = state.allChannels[chId];
  if (!ch || !ch.streams[streamIndex]) return;

  state.currentChId        = chId;
  state.currentStreamIndex = streamIndex;
  const stream             = ch.streams[streamIndex];

  if (state.acePollingAbort) { state.acePollingAbort.abort(); }
  state.acePollingAbort = new AbortController();

  dom.playerPanel.classList.remove('is-idle');
  dom.playerPanel.classList.add('is-playing');
  dom.playerOverlay.classList.add('hidden');
  dom.playerError.classList.add('hidden');
  dom.aceTunnelBanner.classList.add('hidden');

  updateNowPlaying(ch, stream);

  if (stream.type === 'ace') {
    const hash       = stream.url.replace(/^acestream:\/\//i, '').replace(/\?.*$/, '');
    const aceBase    = getAceBase();
    const aceHlsUrl  = `${aceBase}/ace/manifest.m3u8?id=${encodeURIComponent(hash)}`;
    const isHttp     = /^http:\/\//i.test(aceHlsUrl);
    const isHttpsPage = location.protocol === 'https:';

    if (isHttpsPage && isHttp) dom.aceTunnelBanner.classList.remove('hidden');

    dom.playerSpinner.classList.remove('hidden');
    const spinnerText = dom.playerSpinner.querySelector('.spinner-text');
    if (spinnerText) spinnerText.textContent = 'Conectando con AceStream…';
    setAceStatus('connecting');

    waitForAceStream(aceHlsUrl, state.acePollingAbort.signal)
      .then(url  => { setAceStatus('connected'); startHLS(url); })
      .catch(err => {
        setAceStatus('error');
        if (err.name === 'AbortError') return;
        if (err.message === 'timeout') {
          triggerFallback('Motor AceStream no respondió. ¿Está corriendo? Configura el túnel en Motor ACE.');
        } else {
          triggerFallback('Error conectando con AceStream: ' + err.message);
        }
      });

  } else if (location.protocol === 'https:' && /^http:/.test(stream.url) && !SAME_ORIGIN_ACE) {
    dom.playerSpinner.classList.add('hidden');
    dom.playerError.classList.remove('hidden');
    dom.errText.textContent = 'Stream HTTP bloqueado por HTTPS. Usa el túnel Docker o copia la URL.';

  } else {
    startHLS(stream.url);
  }

  if (window.innerWidth <= 860) setSidebar(false);
}

function triggerFallback(reason) {
  const ch = state.currentChId !== null ? state.allChannels[state.currentChId] : null;
  if (ch && state.currentStreamIndex + 1 < ch.streams.length) {
    const nextIdx = state.currentStreamIndex + 1;
    toast(`Enlace fallido. Probando opción ${nextIdx + 1}…`, 'warn');
    playStream(state.currentChId, nextIdx);
  } else {
    dom.playerSpinner.classList.add('hidden');
    dom.playerError.classList.remove('hidden');
    dom.errText.textContent = reason || 'Todos los enlaces fallaron.';
  }
}

// ─── Video element helpers ───────────────────────────────────────────────────
function getCleanVideoElement() {
  const old = document.getElementById('video-el');
  const nw  = old.cloneNode(true);
  old.parentNode.replaceChild(nw, old);
  return nw;
}

function showPlayButton(vid) {
  if (document.getElementById('manual-play-btn')) return;
  const btn = document.createElement('button');
  btn.id        = 'manual-play-btn';
  btn.className = 'btn btn-primary';
  btn.textContent = '▶ Reproducir';
  btn.style.cssText =
    'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:20;' +
    'font-size:1rem;padding:12px 28px;cursor:pointer';
  btn.onclick = () => {
    vid.muted = true;
    vid.play().catch(() => {});
    hidePlayButton();
  };
  document.getElementById('player-wrap').appendChild(btn);
  dom.playerSpinner.classList.add('hidden');
}

function hidePlayButton() {
  const btn = document.getElementById('manual-play-btn');
  if (btn) btn.remove();
}

// ─── HLS playback ────────────────────────────────────────────────────────────
function startHLS(url) {
  dom.playerSpinner.classList.remove('hidden');
  hidePlayButton();

  if (state.hlsInstance) { state.hlsInstance.destroy(); state.hlsInstance = null; }

  const vid  = getCleanVideoElement();
  vid.muted  = true;

  vid.addEventListener('waiting', () => dom.playerSpinner.classList.remove('hidden'));
  vid.addEventListener('playing', () => {
    dom.playerSpinner.classList.add('hidden');
    hidePlayButton();
  });
  vid.addEventListener('error', () => triggerFallback('Error de reproducción'), { once: true });

  const isHLS = /\.m3u8(\?|$)/i.test(url) || /m3u8/i.test(url) || /\/ace\//i.test(url);

  if (isHLS && typeof Hls !== 'undefined' && Hls.isSupported()) {
    state.hlsInstance = new Hls({
      maxBufferLength: 30,
      enableWorker:    false,
      lowLatencyMode:  true,
      xhrSetup(xhr, u) {
        if (/^http:\/\//i.test(u)) xhr.open('GET', u.replace(/^http:\/\//i, 'https://'), true);
        xhr.withCredentials = false;
      },
    });

    state.hlsInstance.loadSource(url);
    state.hlsInstance.attachMedia(vid);

    state.hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
      dom.playerSpinner.classList.add('hidden');
      vid.play().catch(() => showPlayButton(vid));
    });

    state.hlsInstance.on(Hls.Events.ERROR, (_, data) => {
      if (data.fatal) triggerFallback('Error HLS: ' + data.type);
    });

  } else if (vid.canPlayType('application/vnd.apple.mpegurl')) {
    vid.src = url;
    vid.addEventListener('loadedmetadata', () => {
      dom.playerSpinner.classList.add('hidden');
      vid.play().catch(() => showPlayButton(vid));
    }, { once: true });

  } else {
    vid.src = url;
    vid.addEventListener('loadedmetadata', () => {
      dom.playerSpinner.classList.add('hidden');
      vid.play().catch(() => showPlayButton(vid));
    }, { once: true });
  }
}

// ─── Player idle state ───────────────────────────────────────────────────────
function setPlayerIdle() {
  if (state.acePollingAbort) { state.acePollingAbort.abort(); state.acePollingAbort = null; }
  if (state.hlsInstance)     { state.hlsInstance.destroy();  state.hlsInstance = null; }

  const vid = getCleanVideoElement();
  vid.pause();
  vid.src = '';

  dom.playerPanel.classList.remove('is-playing');
  dom.playerPanel.classList.add('is-idle');
  dom.playerOverlay.classList.remove('hidden');
  dom.playerSpinner.classList.add('hidden');
  dom.playerError.classList.add('hidden');
  dom.aceTunnelBanner.classList.add('hidden');
  hidePlayButton();

  document.getElementById('now-playing').classList.add('empty');
  document.getElementById('np-name').textContent = 'Sin canal activo';
  document.getElementById('np-sub').textContent  = 'Carga una lista y elige un canal';
  setAceStatus('idle');
}

function retryPlay() {
  if (state.currentChId !== null) playStream(state.currentChId, state.currentStreamIndex);
}

function launchAce(url) {
  const hash = url.replace(/^acestream:\/\//i, '').replace(/\?.*$/, '');
  window.location.href = 'acestream://' + hash;
}

function copyToClipboard(url) {
  navigator.clipboard.writeText(url)
    .then(() => toast('✅ URL copiada al portapapeles', 'ok'))
    .catch(() => toast('No se pudo copiar', 'error'));
}

// ─── ACE engine detection ────────────────────────────────────────────────────
async function detectAceEngine() {
  const base = getAceBase();

  // HTTP desde GitHub Pages → CSP lo bloquea, no intentar
  if (/^http:\/\//i.test(base)) {
    setAceStatus('idle');
    return;
  }

  setAceStatus('connecting');

  try {
    const ctrl = new AbortController();
    setTimeout(() => ctrl.abort(), 5000);
    const res = await fetch(`${base}/webui/api/service?method=get_version`, { signal: ctrl.signal });
    if (res.ok) {
      state.aceAvailable = true;
      setAceStatus('connected');
      toast('✅ Motor AceStream detectado', 'ok');
    } else {
      setAceStatus('error');
    }
  } catch (_) {
    setAceStatus('error');
  }
}

// ─── Now playing bar ─────────────────────────────────────────────────────────
function updateNowPlaying(ch, stream) {
  const wrap = document.getElementById('now-playing');
  wrap.classList.remove('empty');

  document.getElementById('np-name').textContent = ch.name;
  document.getElementById('np-sub').textContent  =
    `${stream.qual || 'SD'} · Enlace ${state.currentStreamIndex + 1} · ${ch.group}`;

  const lg = document.getElementById('np-logo');
  const fb = document.getElementById('np-logo-fallback');

  if (ch.logo) {
    lg.src = ch.logo;
    lg.style.display = '';
    fb.style.display = 'none';
    lg.parentElement.style.background = ch.lightBg ? '#fff' : '';
    lg.parentElement.style.padding    = ch.lightBg ? '4px' : '';
    lg.onerror = () => { lg.style.display = 'none'; fb.style.display = 'grid'; };
  } else {
    lg.style.display = 'none';
    fb.style.display = 'grid';
  }

  document.querySelectorAll('.ch-card').forEach(el => el.classList.remove('active'));
  const activeCard = dom.channelList.querySelector(`[data-ch-id="${ch._id}"]`);
  if (activeCard) {
    activeCard.classList.add('active');
    activeCard.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}

// ─── Player controls ─────────────────────────────────────────────────────────
function toggleFullscreen() {
  const el = document.getElementById('player-wrap');
  if (!document.fullscreenElement) {
    (el.requestFullscreen || el.webkitRequestFullscreen).call(el).catch(() => {});
  } else {
    (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  }
}

function togglePip() {
  const vid = document.getElementById('video-el');
  if (!vid || !document.pictureInPictureEnabled) return;
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture().catch(() => {});
  } else {
    vid.requestPictureInPicture().catch(() => {});
  }
}

// ─── Toast notifications ─────────────────────────────────────────────────────
function toast(msg, type = 'info') {
  const el = document.createElement('div');
  el.className = `toast toast--${type}`;
  el.textContent = msg;
  const c = document.getElementById('toast-container');
  c.appendChild(el);
  while (c.children.length > 4) c.removeChild(c.firstChild);
  setTimeout(() => {
    el.classList.add('toast--out');
    setTimeout(() => el.remove(), 300);
  }, 3200);
}

// ─── Keyboard navigation ─────────────────────────────────────────────────────
function handlePillKeys(e) {
  const pills = [...document.querySelectorAll('.pill')];
  const idx   = pills.indexOf(e.currentTarget);
  if (idx < 0) return;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault(); (pills[idx + 1] || pills[0]).focus();
  }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault(); (pills[idx - 1] || pills[pills.length - 1]).focus();
  }
}

function handleCardKeys(e) {
  const cards = [...document.querySelectorAll('.ch-card')];
  const idx   = cards.indexOf(e.currentTarget);
  if (idx < 0) return;
  if (e.key === 'ArrowDown') { e.preventDefault(); (cards[idx + 1] || cards[idx]).focus(); }
  if (e.key === 'ArrowUp')   { e.preventDefault(); (cards[idx - 1] || cards[idx]).focus(); }
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openModal(parseInt(e.currentTarget.dataset.chId, 10));
  }
}

function handleSearchKeys(e) {
  if (e.key === 'ArrowDown') {
    const f = document.querySelector('.ch-card');
    if (f) { e.preventDefault(); f.focus(); }
  }
}

// ─── Boot ────────────────────────────────────────────────────────────────────
init();
