'use strict';

const UA = navigator.userAgent;
const IS_ANDROID = /android/i.test(UA);
const IS_IOS = /iphone|ipad|ipod/i.test(UA);
const IS_MOBILE = IS_ANDROID || IS_IOS;

// En Docker local (puerto 80/8080/443, no github.io) → proxy mismo origen
// En GitHub Pages → intentar tunnel guardado, sino 127.0.0.1:6878 (legacy)
const IS_GITHUB_PAGES = /github\.io/i.test(window.location.hostname);
const SAME_ORIGIN_ACE = !IS_GITHUB_PAGES && ['80', '8080', '443', ''].includes(window.location.port);

function getAceBase() {
  if (SAME_ORIGIN_ACE) return '';
  const saved = localStorage.getItem('ace_tunnel_url');
  if (saved) return saved.replace(/\/$/, '');
  return 'http://127.0.0.1:6878';
}

const LOGO_MAP = {
  'liga de campeones':      { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/Liga%20de%20Campeones%20BAR.png' },
  'm+ liga de campeones':   { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/Liga%20de%20Campeones%20BAR.png' },
  'laliga tv':              { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/M%2B%20LaLiga%20TV.png' },
  'm+ laligatv':            { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/M%2B%20LaLiga%20TV.png' },
  'm+ laliga':              { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/M%2B%20LaLiga%20TV.png' },
  'laliga hypermotion':     { url: 'https://commons.wikimedia.org/wiki/Special:FilePath/LaLiga_Hypermotion_2023_Vertical_Logo.svg', lightBg: true },
  'dazn laliga':            { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/DAZN%20LaLiga.png' },
  'dazn laliga 2':          { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/DAZN%20LaLiga%202.png' },
  'dazn laliga 3':          { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/DAZN%20LaLiga%203.png' },
  'dazn laliga 4':          { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/DAZN%20LaLiga%204.png' },
  'dazn laliga 5':          { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/DAZN%20LaLiga%205.png' },
  'dazn f1':                { url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Formula_1_logo.svg', lightBg: true },
  'dazn 1':                 { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/DAZN%201.png' },
  'dazn 2':                 { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/DAZN%202.png' },
  'dazn 3':                 { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/DAZN%203.png' },
  'dazn 4':                 { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/DAZN%204.png' },
  'm+ deportes':            { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/M%2B%20Deportes.png' },
  'm+ deportes 2':          { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/M%2B%20Deportes%202.png' },
  'm+ deportes 3':          { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/M%2B%20Deportes%203.png' },
  'm+ deportes 4':          { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/M%2B%20Deportes%204.png' },
  'm+ deportes 5':          { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/M%2B%20Deportes%205.png' },
  'm+ #vamos':              { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/M%2B%20%23Vamos.png' },
  'eurosport 1':            { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/Eurosport%201.png', lightBg: true },
  'eurosport 2':            { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/Eurosport%202.png', lightBg: true },
  'la 1':                   { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/La_1_HD_TVE.png/250px-La_1_HD_TVE.png' },
  '24h':                    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Logo_Canal_24_horas.svg/250px-Logo_Canal_24_horas.svg.png', lightBg: true },
  'telecinco':              { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Telecinco.svg/250px-Telecinco.svg.png', lightBg: true },
  'antena 3':               { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Logo_Antena_3_2025_%28Naranja%29.svg/250px-Logo_Antena_3_2025_%28Naranja%29.svg.png' },
  'la sexta':               { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/La%20Sexta.png' },
  'teledeporte':            { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/Teledeporte.png' },
  'gol play':               { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/Gol%20Play.png' },
  'real madrid tv':         { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/Real%20Madrid%20TV.png' },
  'barça tv':               { url: 'https://raw.githubusercontent.com/davidmuma/picons_dobleM/master/icon/Barca%20TV.png' }
};

const GROUP_RULES = [
  { key: 'favoritos',  label: 'Favoritos',          match: () => false },
  { key: 'champions',  label: 'Champions',           match: n => /campeones|champions/i.test(n) },
  { key: 'laliga',     label: 'LaLiga',              match: n => /laliga/i.test(n) },
  { key: 'hypermotion',label: 'Hypermotion',         match: n => /hypermotion/i.test(n) },
  { key: 'f1',         label: 'F1 / Motor',          match: n => /f1|formula 1|motor/i.test(n) },
  { key: 'movistar',   label: 'Movistar Deportes',   match: n => /m\+ deportes|vamos|golf/i.test(n) },
  { key: 'eurosport',  label: 'Eurosport',           match: n => /eurosport/i.test(n) },
  { key: 'tdt',        label: 'TDT',                 match: n => /la 1|la 2|telecinco|cuatro|antena 3|sexta|24h|mega|tdt/i.test(n) },
  { key: 'clubes',     label: 'Clubes',              match: n => /real madrid|barça/i.test(n) },
  { key: 'otros',      label: 'Otros deportes',      match: n => /sport|deporte|dazn|copa|supercopa|gol play/i.test(n) }
];

const QUICK_FILTERS = ['champions', 'laliga', 'f1', 'dazn', 'eurosport'];

const state = {
  allChannels: [],
  filteredChs: [],
  activeGroup: 'Todos',
  pageOffset: 0,
  pageSize: 48,
  currentChId: null,
  currentStreamIndex: 0,
  aceAvailable: false,
  hlsInstance: null,
  acePollingAbort: null
};

let m3uWorker = null;

const dom = {
  urlInput:        document.getElementById('url-input'),
  searchInput:     document.getElementById('search-input'),
  groupPills:      document.getElementById('group-pills'),
  channelList:     document.getElementById('channel-list'),
  status:          document.getElementById('sidebar-status'),
  sentinel:        document.getElementById('scroll-sentinel'),
  playerOverlay:   document.getElementById('player-overlay'),
  playerSpinner:   document.getElementById('player-spinner'),
  playerError:     document.getElementById('player-error'),
  errText:         document.getElementById('player-error-text'),
  playerPanel:     document.getElementById('player-panel'),
  sidebar:         document.getElementById('channel-panel'),
  aceStatus:       document.getElementById('ace-status'),
  aceTunnelBanner: document.getElementById('ace-tunnel-banner')
};

const observer = new IntersectionObserver((entries) => {
  if (entries[0]?.isIntersecting && state.pageOffset < state.filteredChs.length) renderNextBatch();
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

// ─── Tabs ─────────────────────────────────────────────────────────────────────
// NUEVO: gestión de tabs principales (Canales / EPG / Motor ACE)

function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
  const tabPanels = document.querySelectorAll('.tab-panel[id^="tab-"]');

  function activateTab(tabId) {
    tabBtns.forEach(btn => {
      const isActive = btn.dataset.tab === tabId;
      btn.classList.toggle('tab-btn--active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    tabPanels.forEach(panel => {
      const isActive = panel.id === `tab-${tabId}`;
      panel.classList.toggle('tab-panel--active', isActive);
      panel.hidden = !isActive;
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });

  // Botones con data-goto-tab (p.ej. el banner del túnel ACE)
  document.querySelectorAll('[data-goto-tab]').forEach(el => {
    el.addEventListener('click', () => activateTab(el.dataset.gotoTab));
  });

  activateTab('channels');
}

// ─── AceStream status ─────────────────────────────────────────────────────────
// MODIFICADO: setAceStatus reemplaza updateAceStatusDisplay con dot + label

function setAceStatus(state) { // state: 'connected' | 'connecting' | 'error' | 'idle'
  const el = document.getElementById('ace-status');
  const label = document.getElementById('ace-status-label');
  if (!el) return;

  el.classList.remove('is-connected', 'is-connecting', 'is-error');
  const labels = {
    connected:  { cls: 'is-connected',  text: 'ACE ✓' },
    connecting: { cls: 'is-connecting', text: 'ACE…'  },
    error:      { cls: 'is-error',      text: 'ACE ✗' },
    idle:       { cls: '',              text: 'ACE'    },
  };
  const { cls, text } = labels[state] || labels.idle;
  if (cls) el.classList.add(cls);
  if (label) label.textContent = text;
}

function updateAceStatusDisplay() {
  const base = getAceBase();
  const el = dom.aceStatus;
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

// ─── UI Bindings ─────────────────────────────────────────────────────────────

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

  // MODIFICADO: btn-configure-tunnel ahora tiene data-goto-tab="settings" en el HTML,
  // por lo que initTabs() lo gestiona automáticamente. Sin listener manual aquí.

  let timer;
  dom.searchInput.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(applyFilter, 120); });
  dom.searchInput.addEventListener('keydown', handleSearchKeys);
}

// MODIFICADO: antes bindTunnelModal (apuntaba al modal flotante #tunnel-modal-backdrop)
// Ahora bindTunnelSettings apunta a los elementos dentro del tab #tab-settings
function bindTunnelSettings() {
  const btnSave = document.getElementById('btn-save-tunnel');
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

  // Rellenar el input con el túnel guardado al cargar
  const saved = localStorage.getItem('ace_tunnel_url') || '';
  const input = document.getElementById('tunnel-url-input');
  if (input && saved) input.value = saved;

  updateTunnelStatusCard();
}

function updateTunnelStatusCard() {
  const saved = localStorage.getItem('ace_tunnel_url');
  const dot  = document.getElementById('tunnel-status-dot');
  const text = document.getElementById('tunnel-status-text');
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

// openTunnelModal y closeTunnelModal se mantienen como no-ops compatibles
// por si algún código externo los llama, pero ya no abren ningún modal flotante
function openTunnelModal() {
  const tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
  tabBtns.forEach(btn => { if (btn.dataset.tab === 'settings') btn.click(); });
}
function closeTunnelModal() { /* no-op: el tab settings no se "cierra" */ }

function setSidebar(open) {
  dom.sidebar.classList.toggle('is-open', !!open);
  document.getElementById('sidebar-toggle').setAttribute('aria-expanded', open ? 'true' : 'false');
}


// ─── Playlists ────────────────────────────────────────────────────────────────

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
        <div class="pl-card__content">
          <div class="pl-card__name">${pl.name}</div>
          ${pl.description ? `<div class="pl-card__desc">${pl.description}</div>` : ''}
        </div>
        <svg class="pl-card__chevron" width="8" height="14" viewBox="0 0 8 14" fill="none">
          <path d="M1 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
      card.addEventListener('click', () => { dom.urlInput.value = pl.url; closePlaylists(); loadFromInput(); });
      grid.appendChild(card);
    });
  } catch (e) {
    toast(`No se pudieron cargar las listas: ${e.message}`, 'error');
  }
}

function openPlaylists() { document.getElementById('playlist-overlay').classList.add('open'); }
function closePlaylists() { document.getElementById('playlist-overlay').classList.remove('open'); }

// ─── M3U Loading ──────────────────────────────────────────────────────────────

function loadFromInput() {
  const val = dom.urlInput.value.trim();
  if (!val) return;

  dom.status.textContent = 'Procesando lista…';
  dom.channelList.innerHTML = '';
  state.allChannels = [];
  state.filteredChs = [];
  if (m3uWorker) { m3uWorker.terminate(); m3uWorker = null; }
  setPlayerIdle();

  fetch(val)
    .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.text(); })
    .then(text => {
      m3uWorker = new Worker('./worker.js');
      m3uWorker.postMessage({ text });
      m3uWorker.onmessage = e => {
        state.allChannels = e.data.channels.map((ch, i) => {
          const resolved = resolveLogo(ch.name, ch.logo);
          const group = inferGroup(ch.name, ch.group);
          return {
            ...ch, _id: i, group, category: group,
            tags: [group, ch.group].filter(Boolean),
            logo: resolved ? resolved.url : '',
            lightBg: resolved ? !!resolved.lightBg : false,
            searchable: ''
          };
        }).map(ch => ({ ...ch, searchable: buildSearchText(ch) }));

        if (m3uWorker) { m3uWorker.terminate(); m3uWorker = null; }
        buildGroups();
        setGroup('Todos');
        toast(`✅ ${state.allChannels.length} canales cargados`, 'ok');
      };
      m3uWorker.onerror = err => {
        toast('Error al procesar el M3U', 'error');
        dom.status.textContent = 'Error al procesar';
        console.error(err);
      };
    })
    .catch(e => {
      const isCors = e.message === 'Failed to fetch';
      toast(isCors ? '⚠️ Error CORS — usa una URL raw directa' : `❌ ${e.message}`, 'error');
      dom.status.textContent = 'Error al cargar';
    });
}

// ─── Groups & Filter ──────────────────────────────────────────────────────────

function buildGroups() {
  const counts = {};
  state.allChannels.forEach(ch => { counts[ch.group] = (counts[ch.group] || 0) + 1; });
  const defined = GROUP_RULES.map(r => r.label);
  const ordered = ['Todos', ...defined.filter(g => counts[g]), ...Object.keys(counts).filter(g => !defined.includes(g)).sort()];

  dom.groupPills.innerHTML = '';
  ordered.forEach(label => {
    const count = label === 'Todos' ? state.allChannels.length : (counts[label] || 0);
    const btn = document.createElement('button');
    btn.className = `pill${label === state.activeGroup ? ' active' : ''}`;
    btn.type = 'button';
    btn.dataset.group = label;
    btn.textContent = `${label} (${count})`;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', label === state.activeGroup ? 'true' : 'false');
    btn.addEventListener('click', () => setGroup(label));
    btn.addEventListener('keydown', handlePillKeys);
    dom.groupPills.appendChild(btn);
  });
}

function setGroup(group) {
  state.activeGroup = group;
  document.querySelectorAll('.pill').forEach(btn => {
    const active = btn.dataset.group === group;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  applyFilter();
}

function applyFilter() {
  const q = normalize(dom.searchInput.value);
  state.filteredChs = state.allChannels.filter(ch => {
    const matchGroup = state.activeGroup === 'Todos' || ch.group === state.activeGroup;
    const matchSearch = !q || ch.searchable.includes(q);
    return matchGroup && matchSearch;
  });
  dom.channelList.innerHTML = '';
  state.pageOffset = 0;
  dom.status.textContent = `${state.filteredChs.length} canal${state.filteredChs.length !== 1 ? 'es' : ''}`;
  renderNextBatch();
}

// ─── Channel Cards ────────────────────────────────────────────────────────────

function renderNextBatch() {
  const slice = state.filteredChs.slice(state.pageOffset, state.pageOffset + state.pageSize);
  slice.forEach(ch => dom.channelList.appendChild(makeCard(ch)));
  state.pageOffset += state.pageSize;
  dom.sentinel.style.display = state.pageOffset >= state.filteredChs.length ? 'none' : 'block';
}

function makeCard(ch) {
  const btn = document.createElement('button');
  btn.className = `ch-card${ch._id === state.currentChId ? ' active' : ''}`;
  btn.dataset.chId = ch._id;
  btn.setAttribute('role', 'listitem');
  btn.type = 'button';
  btn.addEventListener('click', () => openModal(ch._id));
  btn.addEventListener('keydown', handleCardKeys);

  const lightClass = ch.lightBg ? ' ch-logo-wrap--light' : '';
  const logoHtml = ch.logo
    ? `<div class="ch-logo-wrap${lightClass}"><img class="ch-logo" src="${ch.logo}" alt="" loading="lazy" decoding="async" onerror="this.parentElement.innerHTML='<span class=ch-logo-fb>📺</span>'"></div>`
    : `<div class="ch-logo-wrap"><span class="ch-logo-fb">📺</span></div>`;

  const badgeOrder = ['4K', 'FHD', 'HD', 'SD'];
  const sortedBadges = (ch.badges || []).slice().sort((a, b) => badgeOrder.indexOf(a) - badgeOrder.indexOf(b));
  let badgesHtml = sortedBadges.map(q => `<span class="badge badge-${q.toLowerCase()}">${q}</span>`).join('');
  if (ch.hasAce) badgesHtml += '<span class="badge badge-ace">ACE</span>';
  if (ch.streams?.length > 1) badgesHtml += `<span class="ch-streams">${ch.streams.length} opciones</span>`;

  btn.innerHTML = `${logoHtml}<div class="ch-info"><div class="ch-name">${ch.name}</div><div class="ch-sub">${ch.group}</div><div class="ch-meta">${badgesHtml}</div></div>`;
  return btn;
}


// ─── Modal ────────────────────────────────────────────────────────────────────

function openModal(chId) {
  const ch = state.allChannels[chId];
  if (!ch) return;

  const mLogo = document.getElementById('modal-logo');
  const mLogoFb = document.getElementById('modal-logo-fb');
  const mWrap = document.getElementById('modal-logo-wrap');

  if (ch.logo) {
    mLogo.src = ch.logo;
    mLogo.style.display = '';
    mLogoFb.style.display = 'none';
    mWrap.style.background = ch.lightBg ? '#fff' : '';
    mWrap.style.padding = ch.lightBg ? '5px' : '';
    mLogo.onerror = () => { mLogo.style.display = 'none'; mLogoFb.style.display = 'grid'; };
  } else {
    mLogo.style.display = 'none';
    mLogoFb.style.display = 'grid';
  }

  document.getElementById('modal-title').textContent = ch.name;
  document.getElementById('modal-meta').textContent = `${ch.group} · ${ch.streams.length} enlace${ch.streams.length !== 1 ? 's' : ''}`;

  const body = document.getElementById('modal-body');
  body.innerHTML = '';

  ch.streams.forEach((s, index) => {
    const isAce = s.type === 'ace';
    const row = document.createElement('div');
    row.className = 'stream-row';

    const qualBadge = `<span class="badge badge-${(s.qual || 'sd').toLowerCase()}">${s.qual || 'SD'}</span>`;
    const typeBadge = isAce ? '<span class="badge badge-ace">ACE</span>' : '<span class="badge badge-http">HTTP</span>';
    const aceBtn = isAce
      ? `<button class="btn btn-purple btn-sm" data-action="ace" data-raw="${encodeURIComponent(s.url)}" title="Abrir en app Ace Stream">Ace Stream</button>`
      : '';

    row.innerHTML = `
      <div class="stream-info">
        <div class="ch-meta">${qualBadge}${typeBadge}</div>
        <small class="stream-raw-name">${s.rawName || ch.name}</small>
      </div>
      <div class="stream-actions">
        <button class="btn btn-primary btn-sm" data-action="play" data-idx="${index}">▶ Ver</button>
        ${aceBtn}
        <button class="btn btn-surface btn-sm" data-action="copy" data-raw="${encodeURIComponent(s.url)}">Copiar</button>
      </div>`;

    row.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const action = btn.dataset.action;
        if (action === 'play') { closeModal(false); playStream(chId, index); }
        if (action === 'ace') launchAce(decodeURIComponent(btn.dataset.raw));
        if (action === 'copy') copyToClipboard(decodeURIComponent(btn.dataset.raw));
      });
    });
    body.appendChild(row);
  });

  // Hints contextuales
  const hint = document.getElementById('modal-hint');
  hint.innerHTML = '';
  const hasAce = ch.streams.some(s => s.type === 'ace');
  const mixedRisk = location.protocol === 'https:' && ch.streams.some(s => /^http:/.test(s.url));
  const hasTunnel = !!localStorage.getItem('ace_tunnel_url');

  if (hasAce && IS_GITHUB_PAGES && !hasTunnel) {
    hint.innerHTML += `<p class="modal-hint-text">⚡ Para reproducir ACE de forma nativa configura un <button class="link-btn" id="hint-open-tunnel">túnel HTTPS</button>. Sin él, "Ver" intentará <code>127.0.0.1:6878</code>.</p>`;
    setTimeout(() => {
      document.getElementById('hint-open-tunnel')?.addEventListener('click', () => { closeModal(false); openTunnelModal(); });
    }, 0);
  } else if (hasAce && IS_GITHUB_PAGES && hasTunnel) {
    hint.innerHTML += `<p class="modal-hint-text">⚡ Usando túnel: <code>${getAceBase()}</code></p>`;
  } else if (hasAce && SAME_ORIGIN_ACE) {
    hint.innerHTML += `<p class="modal-hint-text">🐳 Motor AceStream via proxy Docker.</p>`;
  }
  if (mixedRisk && !SAME_ORIGIN_ACE && !hasTunnel) {
    hint.innerHTML += `<p class="modal-hint-text">⚠️ Stream HTTP puede bloquearse desde HTTPS. Configura el túnel o usa Docker local.</p>`;
  }

  document.getElementById('modal-backdrop').classList.add('open');
  history.pushState({ isModalOpen: true }, '');
}

function closeModal(fromPopState = false) {
  document.getElementById('modal-backdrop').classList.remove('open');
  if (!fromPopState && history.state?.isModalOpen) history.back();
}

// ─── AceStream Polling ────────────────────────────────────────────────────────

async function waitForAceStream(aceUrl, signal) {
  const MAX_ATTEMPTS = 18;   // 36s total, antes 24s — AceStream necesita tiempo buscando peers
  const INTERVAL_MS = 2000;
  const spinnerText = dom.playerSpinner.querySelector('.spinner-text');
  let resolvedStreamUrl = null;  // se guarda en el primer redirect recibido

  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    if (signal.aborted) throw new DOMException('cancelled', 'AbortError');

    const remaining = (MAX_ATTEMPTS - i) * (INTERVAL_MS / 1000);
    if (spinnerText) spinnerText.textContent = `Buscando peers P2P… ${remaining}s`;

    try {
      const ctrl = new AbortController();
      const tid = setTimeout(() => ctrl.abort(), 4000);

      // Primera llamada: /ace/getstream → 302 → /ace/r/HASH/SESSION
      // Siguientes: directamente /ace/r/HASH/SESSION (evita regenerar session)
      const urlToPoll = resolvedStreamUrl || aceUrl;
      const res = await fetch(urlToPoll, { signal: ctrl.signal });
      clearTimeout(tid);

      // Siempre fuerza HTTPS en la URL resuelta tras el redirect
      const finalUrl = (res.url || urlToPoll).replace(/^http:\/\//i, 'https://');

      // Guarda la URL del stream para los siguientes intentos
      if (!resolvedStreamUrl && finalUrl !== aceUrl) {
        resolvedStreamUrl = finalUrl;
      }

      if (res.ok) return finalUrl;

      // 500 = AceStream buscando peers, espera y reintenta con la misma URL
    } catch (_) { /* timeout / abort, reintenta */ }

    await new Promise(r => setTimeout(r, INTERVAL_MS));
  }
  throw new Error('timeout');
}

// ─── Playback ─────────────────────────────────────────────────────────────────

function playStream(chId, streamIndex) {
  const ch = state.allChannels[chId];
  if (!ch || !ch.streams[streamIndex]) return;
  state.currentChId = chId;
  state.currentStreamIndex = streamIndex;
  const stream = ch.streams[streamIndex];

  if (state.acePollingAbort) state.acePollingAbort.abort();
  state.acePollingAbort = new AbortController();

  dom.playerPanel.classList.remove('is-idle');
  dom.playerPanel.classList.add('is-playing');
  dom.playerOverlay.classList.add('hidden');
  dom.playerError.classList.add('hidden');
  dom.aceTunnelBanner.classList.add('hidden');
  updateNowPlaying(ch, stream);

  if (stream.type === 'ace') {
    const hash = stream.url.replace(/^acestream:\/\//i, '').replace(/\?.*$/, '');
    const aceBase = getAceBase();
    const aceHlsUrl = `${aceBase}/ace/getstream?id=${encodeURIComponent(hash)}`;

    const isHttp = /^http:\/\//i.test(aceHlsUrl);
    const isHttpsPage = location.protocol === 'https:';
    if (isHttpsPage && isHttp) {
      dom.aceTunnelBanner.classList.remove('hidden');
    }

    dom.playerSpinner.classList.remove('hidden');
    const spinnerText = dom.playerSpinner.querySelector('.spinner-text');
    if (spinnerText) spinnerText.textContent = 'Conectando con AceStream…';

    setAceStatus('connecting');

    waitForAceStream(aceHlsUrl, state.acePollingAbort.signal)
      .then(url => {
        setAceStatus('connected');
        startHLS(url);
      })
      .catch(err => {
        setAceStatus('error');
        if (err.name === 'AbortError') return;
        if (err.message === 'timeout') {
          triggerFallback('Motor AceStream no respondió. ¿Está corriendo? Configura el túnel.');
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

function getCleanVideoElement() {
  const old = document.getElementById('video-el');
  const nw = old.cloneNode(true);
  old.parentNode.replaceChild(nw, old);
  return nw;
}

function startHLS(url) {
  dom.playerSpinner.classList.remove('hidden');
  if (state.hlsInstance) { state.hlsInstance.destroy(); state.hlsInstance = null; }

  const vid = getCleanVideoElement();
  const isHLS = /\.m3u8(\?|$)/i.test(url) || /m3u8/i.test(url) || /\/ace\//i.test(url);

  vid.addEventListener('waiting', () => dom.playerSpinner.classList.remove('hidden'));
  vid.addEventListener('playing', () => dom.playerSpinner.classList.add('hidden'));
  vid.addEventListener('error', () => triggerFallback('Error de reproducción'), { once: true });

  if (isHLS && typeof Hls !== 'undefined' && Hls.isSupported()) {
// DESPUÉS — xhrSetup intercepta cada petición de HLS.js y fuerza HTTPS
    state.hlsInstance = new Hls({
      maxBufferLength: 30,
      enableWorker: false,  // desactiva el worker que usa eval
      lowLatencyMode: true,
      xhrSetup: (xhr, url) => {
        if (/^http:\/\//i.test(url)) xhr.open('GET', url.replace(/^http:\/\//i, 'https://'), true);
        xhr.withCredentials = false;
      }
    });
    state.hlsInstance.loadSource(url);
    state.hlsInstance.attachMedia(vid);
    state.hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
      dom.playerSpinner.classList.add('hidden');
      vid.play().catch(() => {});
    });
    state.hlsInstance.on(Hls.Events.ERROR, (_, data) => {
      if (data.fatal) triggerFallback('Error HLS: ' + data.type);
    });
  } else if (vid.canPlayType('application/vnd.apple.mpegurl')) {
    vid.src = url;
    vid.addEventListener('loadedmetadata', () => { dom.playerSpinner.classList.add('hidden'); vid.play().catch(() => {}); }, { once: true });
  } else {
    vid.src = url;
    vid.addEventListener('loadedmetadata', () => { dom.playerSpinner.classList.add('hidden'); vid.play().catch(() => {}); }, { once: true });
  }
}

function setPlayerIdle() {
  if (state.acePollingAbort) { state.acePollingAbort.abort(); state.acePollingAbort = null; }
  if (state.hlsInstance) { state.hlsInstance.destroy(); state.hlsInstance = null; }
  const vid = getCleanVideoElement();
  vid.pause(); vid.src = '';
  dom.playerPanel.classList.remove('is-playing');
  dom.playerPanel.classList.add('is-idle');
  dom.playerOverlay.classList.remove('hidden');
  dom.playerSpinner.classList.add('hidden');
  dom.playerError.classList.add('hidden');
  dom.aceTunnelBanner.classList.add('hidden');
  document.getElementById('now-playing').classList.add('empty');
  document.getElementById('np-name').textContent = 'Sin canal activo';
  document.getElementById('np-sub').textContent = 'Carga una lista y elige un canal';
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

async function detectAceEngine() {
  const base = getAceBase();

  // Si la base es HTTP (ej. legacy 127.0.0.1:6878) y estamos en GitHub Pages,
  // no intentes hacer fetch porque la CSP lo bloquea.
  if (/^http:\/\//i.test(base)) {
    setAceStatus('idle');
    return;
  }

  setAceStatus('connecting');

  try {
    const ctrl = new AbortController();
    setTimeout(() => ctrl.abort(), 2000);

    const res = await fetch(`${base}/webui/api/service?method=get_version`, {
      signal: ctrl.signal
    });

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

function updateNowPlaying(ch, stream) {
  const wrap = document.getElementById('now-playing');
  wrap.classList.remove('empty');
  document.getElementById('np-name').textContent = ch.name;
  document.getElementById('np-sub').textContent = `${stream.qual || 'SD'} · Enlace ${state.currentStreamIndex + 1} · ${ch.group}`;

  const lg = document.getElementById('np-logo');
  const fb = document.getElementById('np-logo-fallback');
  if (ch.logo) {
    lg.src = ch.logo; lg.style.display = '';
    fb.style.display = 'none';
    lg.parentElement.style.background = ch.lightBg ? '#fff' : '';
    lg.parentElement.style.padding = ch.lightBg ? '4px' : '';
    lg.onerror = () => { lg.style.display = 'none'; fb.style.display = 'grid'; };
  } else {
    lg.style.display = 'none'; fb.style.display = 'grid';
  }

  document.querySelectorAll('.ch-card').forEach(el => el.classList.remove('active'));
  const activeCard = dom.channelList.querySelector(`[data-ch-id="${ch._id}"]`);
  if (activeCard) { activeCard.classList.add('active'); activeCard.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
}

function toggleFullscreen() {
  const el = document.getElementById('player-wrap');
  if (!document.fullscreenElement) (el.requestFullscreen || el.webkitRequestFullscreen).call(el).catch(() => {});
  else (document.exitFullscreen || document.webkitExitFullscreen).call(document);
}

function togglePip() {
  const vid = document.getElementById('video-el');
  if (!vid || !document.pictureInPictureEnabled) return;
  if (document.pictureInPictureElement) document.exitPictureInPicture().catch(() => {});
  else vid.requestPictureInPicture().catch(() => {});
}

function toast(msg, type = 'info') {
  const el = document.createElement('div');
  el.className = `toast toast--${type}`;
  el.textContent = msg;
  const c = document.getElementById('toast-container');
  c.appendChild(el);
  while (c.children.length > 4) c.removeChild(c.firstChild);
  setTimeout(() => { el.classList.add('toast--out'); setTimeout(() => el.remove(), 300); }, 3200);
}

function handlePillKeys(e) {
  const pills = [...document.querySelectorAll('.pill')];
  const idx = pills.indexOf(e.currentTarget);
  if (idx < 0) return;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); (pills[idx + 1] || pills[0]).focus(); }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); (pills[idx - 1] || pills[pills.length - 1]).focus(); }
}

function handleCardKeys(e) {
  const cards = [...document.querySelectorAll('.ch-card')];
  const idx = cards.indexOf(e.currentTarget);
  if (idx < 0) return;
  if (e.key === 'ArrowDown') { e.preventDefault(); (cards[idx + 1] || cards[idx]).focus(); }
  if (e.key === 'ArrowUp') { e.preventDefault(); (cards[idx - 1] || cards[idx]).focus(); }
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(parseInt(e.currentTarget.dataset.chId, 10)); }
}

function handleSearchKeys(e) {
  if (e.key === 'ArrowDown') { const f = document.querySelector('.ch-card'); if (f) { e.preventDefault(); f.focus(); } }
}

init();
