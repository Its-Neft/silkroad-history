/* ==========================================================================
   SILKROAD ONLINE: HISTORIA TÉCNICA Y ARCHIVO DOCUMENTAL DEFINITIVO
   Interactive Logic, Search Engine, Scrollspy & Filtering
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeSystem();
  initLanguageSwitcher();
  initProgressBar();
  initScrollDirection();
  initScrollSpy();
  initGlobalSearchToggle();
  initSearch();
  initEvidenceBadges();
  initUnifiedTooltips();
  initBookSpines();
  initFilters();
  initTimelineFilter();
  initModalSystem();
  initReadingMode();
  initCopyAnchors();
  initAcronymFilter();
  initProgressiveDisclosure();
  initMobileNav();
  initScrollReveal();
  initBackToTop();
  initBackgroundSand();
  requestAnimationFrame(() => document.documentElement.classList.remove('theme-preload'));
});

// 0. Selector de idioma progresivo (se incorpora un idioma por entrega)
function initLanguageSwitcher() {
  const select = document.getElementById('languageSelect');
  if (!select) return;

  const english = {
    '[data-i18n="brand"]': 'Historical Archive',
    '#searchInput': 'Search the entire archive…',
    '#themeToggleBtn .btn-text': 'Light mode',
    '#globalAccordionToggle .btn-text': 'Expand all',
    '#toggleReadingMode .btn-text': 'Reading mode',
    'a[href="#diccionario-acronimos"] .btn-text': 'Acronyms',
    'a[href="#archivo-audiovisual"] .btn-text': 'Videos',
    'a[href="#dossier-personajes"] .btn-text': 'Characters',
    'a[href="#hemeroteca"] .btn-text': 'Sources',
    '.sidebar-title span:first-child': 'Table of contents',
    '.sidebar-title span:last-child': '20 ch.',
    '.hero-badge:nth-child(1)': 'Historical research',
    '.hero-badge:nth-child(3)': 'File preservation',
    '.hero-badge:nth-child(4)': 'WEMADE MAX / Joymax',
    '.hero-card h1': 'Silkroad Online: The True Chronicle and Technical Archive',
    '.hero-subtitle': 'The complete, uncensored history: from its conception in South Korea and the triangular conflict system to official server geopolitics, handcrafted emulation, the 2011 vSRO leak and the mystery of the original source code.',
    '#sec-1': '1. Executive Summary and Methodology',
    '#sec-2': '2. The Origin: Joymax and the Vision',
    '#sec-3': '3. Official Servers and Licenses',
    '#sec-4': '4. Evolution: Caps, Legends and SRO-R',
    '#sec-5': '5. Master Timeline 2004–2026',
    '#sec-6': '6. Acronym Dictionary',
    '#sec-7': '7. Technical Anatomy: PK2 and Servers',
    '#sec-8': '8. The Emulation Era (2005–2010)',
    '#sec-9': '9. Proxies, SR33 and pushedx',
    '#sec-10': '10. The First Private Servers',
    '#sec-11': '11. The vSRO Earthquake (September 2011)',
    '#sec-12': '12. SWSRO Files Released (November 2011)',
    '#sec-13': '13. Famous Bugs and Exploits',
    '#sec-14': '14. The SRC Mystery and MeGaMaX',
    '#sec-15': '15. The Private Server Scene (2012–2026)',
    '#sec-16': '16. Key Figures Dossier',
    '#sec-17': '17. Silkroad 2 and Community Contributions',
    '#sec-18': '18. Open Preservation Questions',
    '#sec-19': '19. Press Archive and Consolidated Links',
    '#sec-20': '20. Audiovisual Archive and Videos'
  };

  const apply = (language) => {
    const dict = language === 'en' ? english : null;
    document.documentElement.lang = language;
    Object.entries(english).forEach(([selector, englishText]) => {
      document.querySelectorAll(selector).forEach((el) => {
        if (!el.dataset.originalText) el.dataset.originalText = el.textContent;
        el.textContent = dict ? englishText : el.dataset.originalText;
      });
    });
    if (language !== 'en' && language !== 'es') {
      select.value = 'es';
      showToast('Este idioma se incorporará en la siguiente entrega');
      return;
    }
    localStorage.setItem('sro_language', language);
  };

  const saved = localStorage.getItem('sro_language');
  if (saved === 'en') { select.value = 'en'; apply('en'); }
  select.addEventListener('change', () => apply(select.value));
}

function initBackgroundSand() {
  const canvas = document.getElementById('backgroundSandCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const grains = Array.from({ length: 520 }, () => ({ x: Math.random(), y: Math.random(), r: .12 + Math.random() * .62, speed: .00004 + Math.random() * .00022, length: 2 + Math.random() * 10, depth: .25 + Math.random() * .75, phase: Math.random() * Math.PI * 2 }));
  const floorGrains = Array.from({ length: 900 }, () => ({ x: Math.random(), y: .76 + Math.random() * .24, size: .3 + Math.random() * 1.2, phase: Math.random() * Math.PI * 2, drift: .00001 + Math.random() * .00004 }));
  const stormGrains = Array.from({ length: 320 }, () => ({ x: Math.random(), y: .38 + Math.random() * .52, speed: .00008 + Math.random() * .00026, length: 5 + Math.random() * 18, depth: .25 + Math.random() * .75, phase: Math.random() * Math.PI * 2 }));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let sandLevel = .065;
  let width = 0; let height = 0; let dpr = 1; let last = 0; let frameId = 0;
  let lastTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  let themeTransitionStart = -Infinity;
  let previousFrame = null;
  const resize = () => { dpr = Math.min(window.devicePixelRatio || 1, 2); width = window.innerWidth; height = window.innerHeight; canvas.width = width * dpr; canvas.height = height * dpr; canvas.style.width = `${width}px`; canvas.style.height = `${height}px`; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); if (previousFrame) { previousFrame.width = width; previousFrame.height = height; } };
  const draw = (time) => {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    if (theme !== lastTheme && width && height) {
      previousFrame = previousFrame || document.createElement('canvas');
      previousFrame.width = width; previousFrame.height = height;
      const previousCtx = previousFrame.getContext('2d');
      previousCtx.clearRect(0, 0, width, height); previousCtx.drawImage(canvas, 0, 0, width, height);
      themeTransitionStart = time; lastTheme = theme;
    }
    const dt = Math.min(40, time - last || 16); last = time; ctx.clearRect(0, 0, width, height);
    const light = theme === 'light';
    const gust = reducedMotion ? 1 : 1 + Math.sin(time * .00035) * .34 + Math.sin(time * .00011) * .18;
    // Pulsos cortos y reconocibles: cada ~30 s entra una tormenta intensa,
    // mientras la arena depositada queda visible y se conserva entre ráfagas.
    const stormCycle = reducedMotion ? 0 : (Math.sin(time * .00021 - 1.6) + 1) / 2;
    const stormStrength = Math.pow(Math.max(0, (stormCycle - .46) / .54), 1.15);
    if (!reducedMotion && stormStrength > .04) sandLevel = Math.min(.28, sandLevel + stormStrength * dt * .0000034);
    const duneShift = time * .000018;
    ctx.save();
    // Horizonte lejano: montañas y dunas veladas por la distancia.
    const horizon = height * .54;
    const haze = ctx.createLinearGradient(0, horizon - height * .2, 0, horizon + height * .18);
    haze.addColorStop(0, light ? 'rgba(210,178,113,.065)' : 'rgba(85,103,112,.035)');
    haze.addColorStop(1, light ? 'rgba(196,151,75,.012)' : 'rgba(63,76,81,.008)');
    ctx.fillStyle = haze; ctx.fillRect(0, horizon - height * .2, width, height * .38);
    // Luz de atardecer y profundidad atmosférica inspiradas en los paisajes de referencia.
    const sunX = width * .78; const sunY = height * .19; const sunRadius = Math.max(18, height * .065);
    if (light) {
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius * 4.6);
      sunGlow.addColorStop(0, 'rgba(255,244,184,.38)'); sunGlow.addColorStop(.28, 'rgba(255,213,123,.18)'); sunGlow.addColorStop(1, 'rgba(255,190,80,0)');
      ctx.fillStyle = sunGlow; ctx.fillRect(sunX - sunRadius * 5, sunY - sunRadius * 5, sunRadius * 10, sunRadius * 10);
      ctx.fillStyle = 'rgba(255,244,194,.56)'; ctx.beginPath(); ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2); ctx.fill();
    } else {
      const moonGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius * 4.2);
      moonGlow.addColorStop(0, 'rgba(188,216,212,.2)'); moonGlow.addColorStop(.35, 'rgba(106,157,166,.09)'); moonGlow.addColorStop(1, 'rgba(70,111,128,0)');
      ctx.fillStyle = moonGlow; ctx.fillRect(sunX - sunRadius * 5, sunY - sunRadius * 5, sunRadius * 10, sunRadius * 10);
      ctx.fillStyle = 'rgba(215,228,207,.52)'; ctx.beginPath(); ctx.arc(sunX, sunY, sunRadius * .82, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(112,137,142,.18)'; ctx.beginPath(); ctx.arc(sunX + sunRadius * .24, sunY - sunRadius * .16, sunRadius * .18, 0, Math.PI * 2); ctx.arc(sunX - sunRadius * .26, sunY + sunRadius * .2, sunRadius * .12, 0, Math.PI * 2); ctx.fill();
    }
    // Tres planos de dunas: horizonte azulado, loma dorada y arena cercana.
    const farDune = ctx.createLinearGradient(0, horizon - height * .12, 0, horizon + height * .04);
    farDune.addColorStop(0, light ? 'rgba(157,123,67,.065)' : 'rgba(55,69,74,.1)'); farDune.addColorStop(1, light ? 'rgba(182,143,78,.105)' : 'rgba(65,64,57,.1)');
    ctx.fillStyle = farDune; ctx.beginPath(); ctx.moveTo(0, horizon + 6);
    for (let x = -40; x <= width + 40; x += 28) ctx.lineTo(x, horizon - 4 - Math.sin(x * .0032 + .8) * 24 - Math.sin(x * .008) * 7);
    ctx.lineTo(width, horizon + 40); ctx.lineTo(0, horizon + 40); ctx.closePath(); ctx.fill();
    ctx.fillStyle = light ? 'rgba(129,96,47,.075)' : 'rgba(44,57,61,.2)';
    ctx.beginPath(); ctx.moveTo(0, horizon);
    for (let x = -40; x <= width + 40; x += 34) ctx.lineTo(x, horizon - 26 - Math.sin(x * .004) * 18 - Math.sin(x * .011) * 9);
    ctx.lineTo(width, horizon); ctx.closePath(); ctx.fill();
    // Paisaje abierto: el horizonte queda despejado para que respiren las dunas.
    const duneGradient = ctx.createLinearGradient(0, height * .58, 0, height);
    duneGradient.addColorStop(0, light ? 'rgba(205,166,91,.028)' : 'rgba(104,93,70,.012)');
    duneGradient.addColorStop(1, light ? 'rgba(161,113,42,.145)' : 'rgba(128,91,45,.07)');
    ctx.fillStyle = duneGradient;
    for (let layer = 0; layer < 3; layer += 1) {
      const base = height * (.64 + layer * .08);
      ctx.beginPath(); ctx.moveTo(0, height);
      for (let x = -40; x <= width + 40; x += 20) {
        const y = base + Math.sin(x * .004 + duneShift + layer) * (18 + layer * 5) + Math.sin(x * .011 - duneShift * 2) * 8;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height); ctx.closePath(); ctx.fill();
    }
    ctx.strokeStyle = light ? 'rgba(137,94,29,.16)' : 'rgba(166,135,81,.045)'; ctx.lineWidth = 1;
    for (let ridge = 0; ridge < 4; ridge += 1) {
      const yBase = height * (.68 + ridge * .055); ctx.beginPath();
      for (let x = -20; x <= width + 20; x += 24) { const y = yBase + Math.sin(x * .006 + duneShift * 1.5 + ridge) * 5; x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
      ctx.stroke();
    }
    // Acumulación continua: conserva el movimiento del antiguo efecto del footer
    // y lo integra en toda la capa de fondo, sin crear un bloque que altere el layout.
    const accumulationBase = height * (.78 - sandLevel + Math.sin(duneShift * .7) * .018);
    const accumulation = ctx.createLinearGradient(0, accumulationBase, 0, height);
    accumulation.addColorStop(0, light ? 'rgba(197,151,68,.12)' : 'rgba(204,153,67,.09)');
    accumulation.addColorStop(1, light ? 'rgba(126,82,27,.3)' : 'rgba(85,49,23,.24)');
    ctx.fillStyle = accumulation;
    ctx.beginPath(); ctx.moveTo(0, height);
    for (let x = -30; x <= width + 30; x += 18) {
      const y = accumulationBase + Math.sin(x * .004 + duneShift) * 13 + Math.sin(x * .012 - duneShift * 2) * 7;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = light ? 'rgba(111,70,22,.14)' : 'rgba(239,190,93,.12)';
    for (let line = 0; line < 7; line += 1) {
      ctx.beginPath(); const yBase = accumulationBase + 14 + line * 9;
      for (let x = -20; x <= width + 20; x += 25) {
        const y = yBase + Math.sin(x * .008 + duneShift + line) * 4;
        x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    // Pequeñas crestas superpuestas: hacen legible cuánto material se ha ido
    // asentando sin tocar el layout ni crear una superficie plana.
    ctx.strokeStyle = light ? 'rgba(104,65,22,.18)' : 'rgba(245,198,109,.13)';
    ctx.lineWidth = .65;
    for (let ridge = 0; ridge < 12; ridge += 1) {
      const yBase = accumulationBase + 7 + ridge * 5.8;
      ctx.beginPath();
      for (let x = -24; x <= width + 24; x += 16) {
        const y = yBase + Math.sin(x * .009 + duneShift * 2.4 + ridge * .7) * (1.5 + ridge * .08);
        x === -24 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    // Granos asentados: pequeñas partículas que forman una capa irregular en el suelo.
    floorGrains.forEach((grain) => {
      if (!reducedMotion) grain.x = (grain.x + grain.drift * dt) % 1.08;
      const x = grain.x * width;
      const y = grain.y * height + Math.sin(time * .00024 + grain.phase) * 1.2;
      const alpha = light ? .12 + grain.size * .07 : .1 + grain.size * .05;
      ctx.fillStyle = light ? `rgba(126,82,27,${alpha})` : `rgba(224,178,89,${alpha})`;
      ctx.beginPath(); ctx.ellipse(x, y, grain.size * 1.35, grain.size * .55, -.18, 0, Math.PI * 2); ctx.fill();
    });
    // Tormenta periódica: una ráfaga breve cruza la arena sin cubrir la lectura.
    if (stormStrength > 0) {
      const stormPulse = .72 + Math.sin(time * .0017) * .18;
      const stormWash = ctx.createLinearGradient(0, height * .3, 0, height * .95);
      stormWash.addColorStop(0, light ? `rgba(211,174,102,${stormStrength * .08})` : `rgba(224,184,101,${stormStrength * .06})`);
      stormWash.addColorStop(.55, light ? `rgba(186,137,59,${stormStrength * .13})` : `rgba(117,75,30,${stormStrength * .11})`);
      stormWash.addColorStop(1, light ? `rgba(157,105,35,${stormStrength * .29})` : `rgba(91,54,25,${stormStrength * .24})`);
      ctx.fillStyle = stormWash; ctx.fillRect(0, height * .46, width, height * .54);
      stormGrains.forEach((grain) => {
        const localGust = 1 + stormStrength * 2.6 + Math.sin(time * .0008 + grain.phase) * .28;
        grain.x += grain.speed * dt * localGust;
        if (grain.x > 1.1) { grain.x = -.1; grain.y = .48 + Math.random() * .45; }
        const x = grain.x * width;
        const y = grain.y * height + Math.sin(time * .0007 + grain.phase) * (2 + grain.depth * 4);
        ctx.strokeStyle = light ? `rgba(142,96,32,${stormStrength * stormPulse * (.12 + grain.depth * .22)})` : `rgba(236,194,107,${stormStrength * stormPulse * (.09 + grain.depth * .18)})`;
        ctx.lineWidth = .3 + grain.depth * .5;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - grain.length * (1 + stormStrength * 1.1), y + grain.length * .08); ctx.stroke();
      });
      // Bandas de polvo horizontales: dan sensación de masa y turbulencia.
      ctx.save(); ctx.globalAlpha = stormStrength * .16;
      for (let band = 0; band < 4; band += 1) {
        const bandY = height * (.53 + band * .095) + Math.sin(time * .0004 + band) * 12;
        const bandGradient = ctx.createLinearGradient(0, bandY, width, bandY + 8);
        bandGradient.addColorStop(0, 'rgba(120,77,30,0)'); bandGradient.addColorStop(.35, light ? 'rgba(185,132,51,.48)' : 'rgba(105,67,29,.38)'); bandGradient.addColorStop(.72, light ? 'rgba(221,177,91,.3)' : 'rgba(135,87,33,.25)'); bandGradient.addColorStop(1, 'rgba(120,77,30,0)');
        ctx.fillStyle = bandGradient; ctx.fillRect(0, bandY, width, 7 + band * 2);
      }
      ctx.restore();
    }
    ctx.restore();
    // Mezcla el paisaje anterior con el nuevo para que el cambio de tema sea
    // una transición atmosférica y no un cambio de color instantáneo.
    if (previousFrame) {
      const progress = Math.min(1, Math.max(0, (time - themeTransitionStart) / 1200));
      if (progress < 1 && !reducedMotion) {
        ctx.save(); ctx.globalAlpha = 1 - progress; ctx.drawImage(previousFrame, 0, 0, width, height); ctx.restore();
      } else {
        previousFrame = null;
      }
    }
    grains.forEach((grain) => {
      // En la noche no se dibujan partículas sobre el cielo: allí parecían
      // una textura blanca pegada al panorama. La arena permanece en el
      // horizonte y el suelo, donde sí tiene escala y contexto.
      grain.x += grain.speed * gust * dt;
      if (grain.x > 1.08) { grain.x = -.08; grain.y = Math.random(); }
      if (!light && grain.y < .62) return;
      const y = grain.y * height + Math.sin(time * .0007 + grain.phase) * (1 + grain.depth * 4);
      const x = grain.x * width;
      const alpha = (light ? .16 : .028) + grain.depth * (light ? .3 : .065);
      ctx.strokeStyle = light ? `rgba(143,99,34,${alpha})` : `rgba(160,139,101,${alpha})`;
      ctx.lineWidth = grain.r * grain.depth;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - grain.length * gust * grain.depth, y + grain.length * .16); ctx.stroke();
    });
    frameId = requestAnimationFrame(draw);
  };
  const stopOnHidden = () => { if (document.hidden) cancelAnimationFrame(frameId); else { last = performance.now(); frameId = requestAnimationFrame(draw); } };
  window.addEventListener('resize', resize, { passive: true }); document.addEventListener('visibilitychange', stopOnHidden); resize(); frameId = requestAnimationFrame(draw);
}

function initSilkRouteScene() {
  const canvas = document.getElementById('silkRouteCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const scene = canvas.parentElement;
  const particles = Array.from({ length: 90 }, () => ({ x: Math.random(), y: .45 + Math.random() * .48, r: .5 + Math.random() * 1.8, v: .0004 + Math.random() * .0012 }));
  const pointer = { x: .5, y: .5, active: false };
  let caravan = -.15;
  const resize = () => { const dpr = Math.min(window.devicePixelRatio || 1, 2); canvas.width = scene.clientWidth * dpr; canvas.height = scene.clientHeight * dpr; canvas.style.width = `${scene.clientWidth}px`; canvas.style.height = `${scene.clientHeight}px`; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  const drawCamel = (x, y, scale) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale); ctx.fillStyle = '#604622'; ctx.strokeStyle = '#3b2815'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(0, 0, 38, 20, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(26, -10); ctx.quadraticCurveTo(40, -30, 31, -47); ctx.quadraticCurveTo(45, -52, 49, -44); ctx.quadraticCurveTo(55, -25, 43, -6); ctx.lineTo(53, 12); ctx.lineTo(38, 14); ctx.lineTo(25, 5); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#b8873d'; ctx.fillRect(-22, -23, 34, 10); ctx.fillStyle = '#e1bd70'; ctx.fillRect(-18, -28, 26, 6);
    ctx.strokeStyle = '#3b2815'; ctx.lineWidth = 3; [-20, 15].forEach((leg) => { ctx.beginPath(); ctx.moveTo(leg, 12); ctx.lineTo(leg - 5, 34); ctx.moveTo(leg + 13, 10); ctx.lineTo(leg + 18, 32); ctx.stroke(); }); ctx.restore();
  };
  const drawTrader = (x, y, scale) => { ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale); ctx.fillStyle = '#263c4e'; ctx.fillRect(-7, -35, 14, 25); ctx.beginPath(); ctx.arc(0, -43, 7, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#c49b52'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-4, -10); ctx.lineTo(-10, 18); ctx.moveTo(4, -10); ctx.lineTo(10, 18); ctx.stroke(); ctx.restore(); };
  const frame = (time) => {
    const w = scene.clientWidth, h = scene.clientHeight; ctx.clearRect(0, 0, w, h);
    const gradient = ctx.createLinearGradient(0, 0, 0, h); gradient.addColorStop(0, '#29445a'); gradient.addColorStop(.5, '#c28d45'); gradient.addColorStop(1, '#8a5a2b'); ctx.fillStyle = gradient; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(245,205,115,.18)'; ctx.beginPath(); ctx.ellipse(w * .78, h * .24, h * .16, h * .16, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#9d6c32'; ctx.beginPath(); ctx.moveTo(0, h * .62); ctx.quadraticCurveTo(w * .24, h * .4, w * .48, h * .64); ctx.quadraticCurveTo(w * .76, h * .84, w, h * .5); ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.fill();
    ctx.fillStyle = 'rgba(245,207,128,.85)'; particles.forEach((p) => { const dx = pointer.active ? (p.x - pointer.x) * 22 : 0; p.x += p.v; if (p.x > 1.08) p.x = -.08; ctx.beginPath(); ctx.arc(p.x * w + dx, p.y * h, p.r, 0, Math.PI * 2); ctx.fill(); });
    caravan += .00018; if (caravan > 1.18) caravan = -.18; const cx = caravan * w, cy = h * .7 + Math.sin(time / 900) * 2; drawCamel(cx, cy, Math.max(1, w / 900)); drawTrader(cx - 65 * Math.max(1, w / 900), cy + 2, Math.max(1, w / 1100));
    requestAnimationFrame(frame);
  };
  scene.addEventListener('pointermove', (event) => { const rect = scene.getBoundingClientRect(); pointer.x = (event.clientX - rect.left) / rect.width; pointer.y = (event.clientY - rect.top) / rect.height; pointer.active = true; });
  scene.addEventListener('pointerleave', () => { pointer.active = false; });
  window.addEventListener('resize', resize, { passive: true }); resize(); requestAnimationFrame(frame);
}

function initDesertFooter() {
  const stage = document.getElementById('desertStage');
  const canvas = document.getElementById('desertCanvas');
  if (!stage || !canvas) return;

  const ctx = canvas.getContext('2d', { alpha: false });
  const config = { wind: true, interaction: true, speed: 1, particleCount: window.matchMedia('(max-width: 720px)').matches ? 55 : 105 };
  const pointer = { x: 0, y: 0, down: false, active: false };
  const surface = { points: [], footprints: [], grains: [] };
  const cargo = { silk: 24, spices: 12 };
  const trade = { silk: 120, spice: 86 };
  let width = 0; let height = 0; let dpr = 1; let last = 0; let camelT = -.15; let running = true;

  class WindSystem {
    constructor() { this.phase = 0; }
    update(dt) { if (config.wind) this.phase += dt * .00005 * config.speed; }
  }
  class SandParticles {
    seed() { surface.grains = Array.from({ length: config.particleCount }, () => ({ x: Math.random(), y: .47 + Math.random() * .46, size: .4 + Math.random() * 1.7, drift: .00002 + Math.random() * .00007 })); }
    update(dt) { surface.grains.forEach((g) => { if (config.wind) { g.x += g.drift * dt * config.speed; if (g.x > 1.05) g.x = -.05; } if (pointer.active && pointer.down) { const dx = g.x - pointer.x; const dy = g.y - pointer.y; const d = Math.hypot(dx, dy); if (d < .12) { g.x += dx * .002; g.y += dy * .001; } } }); }
  }
  class FootprintSystem {
    add(x, y) { surface.footprints.push({ x, y, life: 1, size: 1 + Math.random() * .6 }); if (surface.footprints.length > 80) surface.footprints.shift(); }
    update(dt) { surface.footprints.forEach((f) => { f.life -= dt * .000025; }); surface.footprints = surface.footprints.filter((f) => f.life > 0); }
  }
  class SandSurface {
    seed() { surface.points = Array.from({ length: 50 }, (_, i) => ({ x: i / 49, lift: .02 + Math.sin(i * .54) * .014 })); }
    deform(nx, ny, amount) { surface.points.forEach((p) => { const d = Math.abs(p.x - nx); if (d < .14) p.lift += (1 - d / .14) * amount * .018; }); }
    settle(dt) { surface.points.forEach((p) => { p.lift += (Math.sin(p.x * 18 + wind.phase) * .000001 * dt); p.lift *= .99993; }); }
  }
  class CamelController {
    update(dt) { camelT += dt * .000018 * config.speed; if (camelT > 1.18) camelT = -.18; }
    draw() { const x = camelT * width; const y = height * (.68 + Math.sin(camelT * 18) * .018); const scale = Math.max(.72, Math.min(1.3, width / 1000)); drawCamel(x, y, scale); }
  }
  class TradeSystem {
    exchange(type) { if (type === 'silk' && cargo.silk > 0) { cargo.silk -= 1; trade.silk += 4; return 'Vendiste un fardo de seda en el puesto de intercambio.'; } if (type === 'spice' && cargo.spices > 0) { cargo.spices -= 1; trade.spice += 3; return 'Intercambiaste una carga de especias del Oeste.'; } return 'La caravana necesita reponer mercancías.'; }
  }
  const wind = new WindSystem(); const particles = new SandParticles(); const footprints = new FootprintSystem(); const sand = new SandSurface(); const camel = new CamelController(); const trader = new TradeSystem();

  function resize() { dpr = Math.min(window.devicePixelRatio || 1, 2); width = stage.clientWidth; height = stage.clientHeight; canvas.width = width * dpr; canvas.height = height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); sand.seed(); particles.seed(); }
  function drawCamel(x, y, scale) {
    ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale); ctx.fillStyle = '#5b3a22'; ctx.strokeStyle = '#2d1b13'; ctx.lineWidth = 2;
    ctx.globalAlpha = .22; ctx.beginPath(); ctx.ellipse(0, 30, 55, 9, 0, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
    ctx.beginPath(); ctx.ellipse(0, 0, 42, 22, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(30, -10); ctx.quadraticCurveTo(42, -34, 32, -54); ctx.quadraticCurveTo(45, -60, 51, -48); ctx.quadraticCurveTo(59, -28, 45, -4); ctx.lineTo(56, 15); ctx.lineTo(41, 17); ctx.lineTo(25, 5); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#bd873d'; ctx.fillRect(-22, -25, 38, 13); ctx.fillStyle = '#e7bf72'; ctx.fillRect(-18, -30, 30, 6); ctx.strokeStyle = '#2d1b13'; ctx.lineWidth = 3; const step = Math.sin(performance.now() / 180) * 4; [-20, 13].forEach((leg) => { ctx.beginPath(); ctx.moveTo(leg, 14); ctx.lineTo(leg - 5 + step, 38); ctx.moveTo(leg + 14, 12); ctx.lineTo(leg + 18 - step, 36); ctx.stroke(); }); ctx.restore();
  }
  function drawTrader(x, y, scale) { ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale); ctx.fillStyle = '#263b4b'; ctx.fillRect(-7, -37, 14, 26); ctx.beginPath(); ctx.arc(0, -45, 7, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#d2a24c'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-4, -12); ctx.lineTo(-12, 17); ctx.moveTo(4, -12); ctx.lineTo(12, 17); ctx.stroke(); ctx.restore(); }
  function drawScene(time) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height); gradient.addColorStop(0, '#203c53'); gradient.addColorStop(.42, '#c78b43'); gradient.addColorStop(1, '#704322'); ctx.fillStyle = gradient; ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255,220,142,.16)'; ctx.beginPath(); ctx.arc(width * .8, height * .2, height * .12, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#a86f32'; ctx.beginPath(); ctx.moveTo(0, height * .55); surface.points.forEach((p) => ctx.lineTo(p.x * width, height * (.54 + p.lift))); ctx.lineTo(width, height); ctx.lineTo(0, height); ctx.fill();
    ctx.strokeStyle = 'rgba(255,213,132,.26)'; ctx.lineWidth = 2; ctx.beginPath(); surface.points.forEach((p, i) => i ? ctx.lineTo(p.x * width, height * (.55 + p.lift) - 8) : ctx.moveTo(p.x * width, height * (.55 + p.lift) - 8)); ctx.stroke();
    ctx.fillStyle = 'rgba(248,211,137,.86)'; surface.grains.forEach((g) => { ctx.beginPath(); ctx.arc(g.x * width, g.y * height, g.size, 0, Math.PI * 2); ctx.fill(); });
    surface.footprints.forEach((f) => { ctx.globalAlpha = f.life * .35; ctx.fillStyle = '#5f3a20'; ctx.beginPath(); ctx.ellipse(f.x * width, f.y * height, 3 * f.size, 1.4 * f.size, -.25, 0, Math.PI * 2); ctx.fill(); }); ctx.globalAlpha = 1;
    camel.draw(); drawTrader(camelT * width - 58, height * .69, Math.max(.7, Math.min(1.1, width / 1100)));
  }
  function loop(time) { if (!running) return; const dt = Math.min(40, time - last || 16); last = time; wind.update(dt); particles.update(dt); footprints.update(dt); sand.settle(dt); camel.update(dt); drawScene(time); requestAnimationFrame(loop); }
  const setPointer = (event) => { const rect = canvas.getBoundingClientRect(); pointer.x = (event.clientX - rect.left) / rect.width; pointer.y = (event.clientY - rect.top) / rect.height; pointer.active = true; if (pointer.down && config.interaction) { sand.deform(pointer.x, pointer.y, .7); footprints.add(pointer.x, pointer.y); } };
  canvas.addEventListener('pointermove', setPointer); canvas.addEventListener('pointerdown', (event) => { pointer.down = true; canvas.setPointerCapture?.(event.pointerId); setPointer(event); }); canvas.addEventListener('pointerup', () => { pointer.down = false; }); canvas.addEventListener('pointerleave', () => { pointer.active = false; });
  document.getElementById('desertInteractionToggle')?.addEventListener('click', (e) => { config.interaction = !config.interaction; e.currentTarget.classList.toggle('is-active', config.interaction); e.currentTarget.setAttribute('aria-pressed', String(config.interaction)); });
  document.getElementById('desertWindToggle')?.addEventListener('click', (e) => { config.wind = !config.wind; e.currentTarget.classList.toggle('is-active', config.wind); e.currentTarget.setAttribute('aria-pressed', String(config.wind)); document.getElementById('desertStatus').textContent = config.wind ? 'Viento suave · caravana en tránsito' : 'Viento detenido · arena en reposo'; });
  document.getElementById('desertReset')?.addEventListener('click', () => { surface.footprints = []; sand.seed(); });
  document.getElementById('desertTradeToggle')?.addEventListener('click', (e) => { const panel = document.getElementById('desertTradePanel'); const open = panel.hasAttribute('hidden'); panel.toggleAttribute('hidden', !open); e.currentTarget.setAttribute('aria-expanded', String(open)); });
  document.querySelectorAll('.desert-trade-btn').forEach((button) => button.addEventListener('click', () => { document.getElementById('tradeMessage').textContent = trader.exchange(button.dataset.trade); document.getElementById('desertCargo').textContent = `Seda · ${cargo.silk} fardos`; }));
  const observer = new IntersectionObserver(([entry]) => { running = entry.isIntersecting && !document.hidden; if (running) { last = performance.now(); requestAnimationFrame(loop); } }, { threshold: .05 }); observer.observe(stage); document.addEventListener('visibilitychange', () => { running = !document.hidden && stage.getBoundingClientRect().bottom > 0; if (running) requestAnimationFrame(loop); }); window.addEventListener('resize', resize, { passive: true }); resize(); requestAnimationFrame(loop);
}

function initEvidenceBadges() {
  document.querySelectorAll('.badge-evidence').forEach((badge) => {
    const label = badge.dataset.label || badge.textContent.replace(/\s+/g, ' ').trim();
    if (!badge.hasAttribute('title')) badge.setAttribute('title', label);
    if (!badge.hasAttribute('aria-label')) badge.setAttribute('aria-label', label);
  });
}

function initUnifiedTooltips() {
  document.querySelectorAll('[title]').forEach((element) => {
    const label = element.getAttribute('title')?.trim();
    if (!label || element.dataset.tooltip) return;
    element.dataset.tooltip = label;
    element.classList.add('has-tooltip');
    element.removeAttribute('title');
  });
  document.querySelectorAll('button[aria-label], a[aria-label]').forEach((element) => {
    const label = element.getAttribute('aria-label')?.trim();
    if (!label || element.dataset.tooltip) return;
    element.dataset.tooltip = label;
    element.classList.add('has-tooltip');
  });
}

function initBookSpines() {
  document.querySelectorAll('.toc-item a').forEach((link, index) => {
    if (link.querySelector('.book-ornament')) return;
    const ornament = document.createElement('span');
    ornament.className = 'book-ornament';
    ornament.dataset.volume = String(index + 1).padStart(2, '0');
    ornament.setAttribute('aria-hidden', 'true');
    link.appendChild(ornament);
  });
}

// 1. Reading Progress Bar
function initProgressBar() {
  const progressBar = document.getElementById('progressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });
}

// Modula la opacidad de las superficies editoriales según la dirección de lectura.
// El texto permanece intacto: solo se abre el fondo para dejar ver las dunas.
function initScrollDirection() {
  let previousY = window.scrollY;
  let ticking = false;
  const sections = [...document.querySelectorAll('.article-section')];
  const updateFooterwardSections = () => {
    const viewportHeight = window.innerHeight;
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const visible = rect.bottom > viewportHeight * .18 && rect.top < viewportHeight * .98;
      const footerward = visible && rect.bottom > viewportHeight * .58;
      const fade = footerward && rect.bottom > viewportHeight * .76;
      section.classList.toggle('footerward', footerward);
      section.classList.toggle('footerward-fade', fade);
    });
  };
  updateFooterwardSections();
  const update = () => {
    const currentY = window.scrollY;
    const delta = currentY - previousY;
    if (Math.abs(delta) > 2) {
      document.body.classList.toggle('scrolling-down', delta > 0);
      document.body.classList.toggle('scrolling-up', delta < 0);
      updateFooterwardSections();
      previousY = currentY;
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

function initGlobalSearchToggle() {
  const toggle = document.getElementById('searchToggleBtn');
  const panel = document.getElementById('globalSearchPanel');
  const input = document.getElementById('searchInput');
  if (!toggle || !panel || !input) return;

  const setOpen = (open) => {
    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-expanded', String(open));
    if (open) window.setTimeout(() => input.focus(), 40);
  };

  toggle.addEventListener('click', () => setOpen(!panel.classList.contains('is-open')));
  document.addEventListener('click', (event) => {
    if (panel.classList.contains('is-open') && !panel.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      setOpen(true);
    }
  });
}

// 2. ScrollSpy for Sidebar Table of Contents
function initScrollSpy() {
  const sections = document.querySelectorAll('.article-section, .hero-card');
  const navLinks = document.querySelectorAll('.toc-item a');
  const sidebar = document.querySelector('.sidebar');

  if (!sections.length || !navLinks.length) return;

  const setActiveTome = (link, reveal = true) => {
    navLinks.forEach(candidate => {
      const item = candidate.closest('.toc-item');
      const isActive = candidate === link;
      item?.classList.toggle('active', isActive);
      if (isActive) candidate.setAttribute('aria-current', 'page');
      else candidate.removeAttribute('aria-current');
    });

    const activeItem = link?.closest('.toc-item');
    if (reveal && activeItem && sidebar) {
      const itemRect = activeItem.getBoundingClientRect();
      const sidebarRect = sidebar.getBoundingClientRect();
      const edge = 18;
      const outside = itemRect.top < sidebarRect.top + edge || itemRect.bottom > sidebarRect.bottom - edge;
      if (outside) activeItem.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  };

  navLinks.forEach(link => {
    link.addEventListener('click', () => setActiveTome(link));
  });
  setActiveTome(document.querySelector('.toc-item.active a') || navLinks[0], false);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        const activeLink = Array.from(navLinks).find(link => link.getAttribute('href') === `#${id}`);
        if (activeLink) setActiveTome(activeLink);
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  });

  sections.forEach(sec => observer.observe(sec));

  // El observador ayuda a detectar cambios, pero esta lectura por posición
  // evita que se active el capítulo siguiente antes de que llegue al eje de lectura.
  let syncTicking = false;
  const syncFromReadingPosition = () => {
    const anchor = Math.max(96, window.innerHeight * .26);
    const candidates = Array.from(sections)
      .map(section => ({ section, link: Array.from(navLinks).find(candidate => candidate.getAttribute('href') === `#${section.id}`) }))
      .filter(entry => entry.link);
    if (!candidates.length) return;

    const containing = candidates.find(({ section }) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= anchor && rect.bottom > anchor;
    });
    const nearest = containing || candidates.reduce((best, entry) => {
      const distance = Math.abs(entry.section.getBoundingClientRect().top - anchor);
      return !best || distance < best.distance ? { ...entry, distance } : best;
    }, null);
    if (nearest?.link) setActiveTome(nearest.link);
  };
  window.addEventListener('scroll', () => {
    if (!syncTicking) {
      window.requestAnimationFrame(() => {
        syncFromReadingPosition();
        syncTicking = false;
      });
      syncTicking = true;
    }
  }, { passive: true });
  requestAnimationFrame(syncFromReadingPosition);
}

// 3. Live Search Engine
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if (!searchInput || !results) return;

  const searchableElements = Array.from(document.querySelectorAll('main .article-section, main .callout-box, main .person-card, main .timeline-item, main .acronym-card, main .video-card'));
  const getTitle = (el) => {
    const section = el.closest('.article-section');
    const heading = el.querySelector('h2, h3, h4') || section?.querySelector('h2, h3, h4');
    return heading?.textContent.replace(/\s+/g, ' ').trim() || 'Sección del archivo';
  };
  const getSnippet = (el) => el.textContent.replace(/\s+/g, ' ').trim().slice(0, 150);
  const clearResults = () => { results.replaceChildren(); results.classList.remove('has-results'); };

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    clearResults();
    if (term.length < 2) return;

    const matches = searchableElements
      .filter(el => el.textContent.toLowerCase().includes(term))
      .filter((el, index, all) => all.findIndex(item => getTitle(item) === getTitle(el)) === index)
      .slice(0, 8);

    if (!matches.length) {
      results.innerHTML = '<div class="search-empty">No se encontraron coincidencias en el archivo.</div>';
      results.classList.add('has-results');
      return;
    }

    matches.forEach((el) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'search-result-item';
      item.setAttribute('role', 'option');
      item.innerHTML = `<strong>${getTitle(el)}</strong><span>${getSnippet(el)}</span>`;
      item.addEventListener('click', () => {
        const target = el.closest('.article-section') || el;
        clearResults();
        searchInput.value = '';
        const panel = document.getElementById('globalSearchPanel');
        panel?.classList.remove('is-open');
        panel?.setAttribute('aria-hidden', 'true');
        document.getElementById('searchToggleBtn')?.setAttribute('aria-expanded', 'false');
        target.classList.add('search-highlight');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.setTimeout(() => target.classList.remove('search-highlight'), 1800);
      });
      results.appendChild(item);
    });
    results.classList.add('has-results');
  });
}

// 4. Evidence Filter Chips
function initFilters() {
  const filterChips = document.querySelectorAll('.filter-chip[data-filter]');
  const allBadges = document.querySelectorAll('.badge-evidence');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');

      const boxes = document.querySelectorAll('.callout-box, .person-card, .timeline-item');
      
      if (filter === 'all') {
        boxes.forEach(box => {
          box.style.opacity = '1';
          box.style.filter = 'none';
        });
        return;
      }

      boxes.forEach(box => {
        const hasBadge = box.querySelector(`.badge-${filter}`);
        if (hasBadge) {
          box.style.opacity = '1';
          box.style.filter = 'none';
          box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          box.style.opacity = '0.35';
          box.style.filter = 'grayscale(0.6)';
        }
      });
    });
  });
}

// 5. Timeline Category Filter
function initTimelineFilter() {
  const timelineBtns = document.querySelectorAll('.timeline-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timelineBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-category');

      timelineItems.forEach(item => {
        if (cat === 'all' || item.getAttribute('data-category') === cat) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// 6. Person of Interest Dossier Modal System
const personDossiers = {
  joymax: {
    name: "Joymax Co., Ltd. (actual WEMADE MAX)",
    role: "Desarrollador y Creador Original",
    period: "2005 – Presente",
    evidence: "documented",
    badgeText: "Documentado",
    summary: "Empresa surcoreana de videojuegos en línea fundada en 1997. Lanzó Silkroad Online en abril de 2005, inspirándose en las caravanas comerciales del siglo VII. Alcanzó más de 2 millones de usuarios internacionales en 2006. Adquirida por Wemade en 2010 y rebautizada como WEMADE MAX en 2021.",
    contributions: [
      "Diseño del sistema revolucionario de conflicto triangular (Trader, Hunter, Thief).",
      "Desarrollo del motor 3D propietario y el sistema de empaquetado PK2 cifrado con Blowfish.",
      "Arquitectura distribuida de servidores (Certification, Gateway, Agent, GameServer, FarmManager).",
      "Evolución del juego a través de Legends oficiales (Legend I a Legend XI)."
    ],
    status: "Operativa bajo el grupo Wemade. Mantiene la propiedad intelectual total y la renovación de licencias oficiales como 'New Silkroad' en China.",
    links: [
      { title: "Sitio Corporativo Wemade Max", url: "https://www.wemademax.com/" },
      { title: "KOCCA Company Directory: Joymax", url: "https://welcon.kocca.kr/en/directory/company/joymax-co-ltd--1241" }
    ]
  },
  chern0byl: {
    name: "Chern0byl",
    role: "Releaser Público de los vSRO Server Files",
    period: "Septiembre de 2011",
    evidence: "documented",
    badgeText: "Documentado (RaGEZONE)",
    summary: "Miembro veterano de RaGEZONE que el 13 de septiembre de 2011 publicó abiertamente los ejecutables y bases de datos oficiales de vSRO v1.188 con un tutorial detallado. Este acto demolió la barrera de entrada para la creación de servidores privados a nivel mundial.",
    contributions: [
      "Publicación del paquete oficial de vSRO (sr_gameserver, agent, gateway, machine, certification y scripts de BD).",
      "Redacción de la guía inicial para configurar SQL Server, ODBC, IIS y certs.",
      "Liberación de archivos que permitieron el nacimiento de cientos de comunidades independientes."
    ],
    status: "Identidad civil no revelada públicamente. Su motivación atribuida en foros fue el desafío comunitario y evitar monopolios privados. Se retiró de la escena pública de Silkroad hace años.",
    links: [
      { title: "RaGEZONE: Release de vSRO Files", url: "https://ragezone.com/2011/09/13/silkroad-online-vsro-server-files-released-tutorial-inside/" },
      { title: "Hilo de discusión en RaGEZONE", url: "https://forum.ragezone.com/threads/new-silkroad-vsro-server-files-released.779988/" }
    ]
  },
  megamax: {
    name: "MeGaMaX",
    role: "Desarrollador C++, Seguridad PK2 y creador de VSRO MAX",
    period: "2013 – 2022+",
    evidence: "documented",
    badgeText: "Documentado / Rumor SRC",
    summary: "Figura técnica destacada en Elitepvpers y comunidades de desarrollo de Silkroad. Es reconocido por sus aportes en programación de bajo nivel, hooks en memoria y protección de archivos PK2. Rodeado por el persistente rumor de poseer el código fuente (SRC) original de Joymax.",
    contributions: [
      "Publicación en 2013 del código fuente en C++ para protección contra extracción de claves Blowfish en archivos PK2.",
      "Desarrollo de VSRO MAX (módulos y hooks en C++ para expandir las capacidades del servidor vSRO, utilizado en proyectos como Araxion Online).",
      "Colaboración en la recuperación/descompilación de código de SSE EMU v2.0.",
      "Aclaración en 2020: afirmó que no hay un 'líder supremo' del reverse engineering, sino trabajo funcional bien optimizado."
    ],
    status: "Activo intermitentemente en comunidades técnicas especializadas. La supuesta posesión del SRC original completo de Joymax sigue sin verificación documental pública concluyente.",
    links: [
      { title: "Elitepvpers: DLL de Protección PK2 en C++ (2013)", url: "https://www.elitepvpers.com/forum/amp.php?t=2695345" },
      { title: "Elitepvpers: Discusión sobre Coding y Reverse Engineering (2020)", url: "https://www.elitepvpers.com/forum/sro-private-server/4736730-how-correctly-start-coding-private-server.html" },
      { title: "Elitepvpers: Debate sobre vSRO 274 y SRC (2022)", url: "https://www.elitepvpers.com/forum/sro-pserver-guides-releases/4993522-release-vsro-274-files-8.html" }
    ]
  },
  pushedx: {
    name: "Drew Benton (pushedx)",
    role: "Pionero del Análisis de Paquetes y Certificación",
    period: "2008 – 2012",
    evidence: "documented",
    badgeText: "Documentado",
    summary: "Desarrollador legendario en la comunidad de emulación y bots de Silkroad. Creó el framework de proxy SR33, que permitió capturar, descifrar y manipular el tráfico del cliente sin necesidad de parches intrusivos. Asistió con el sistema de certificación de archivos antiguos y de vSRO.",
    contributions: [
      "Diseño y publicación del Framework de Proxy SR33 (base de bots emblemáticos y herramientas de análisis).",
      "Documentación pionera del protocolo cliente-servidor de Joymax.",
      "Asistencia técnica crucial a Getzabelz y Synx7 para superar la certificación de los archivos vSRO en agosto de 2011.",
      "Base arquitectónica para herramientas como maxbot (2009)."
    ],
    status: "Ingeniero de software profesional en la industria tecnológica. Retirado de Silkroad desde hace más de una década.",
    links: [
      { title: "Guía de Proxy Silkroad (Elitepvpers)", url: "https://www.elitepvpers.com/forum/sro-coding-corner/308115-guide-simple-silkroad-proxy-reference.html" },
      { title: "Repositorio maxbot (GitHub)", url: "https://github.com/liliumdev/maxbot" }
    ]
  },
  getzabelz: {
    name: "Getzabelz",
    role: "Obtención inicial de los vSRO Server Files",
    period: "Agosto 2011",
    evidence: "testimony",
    badgeText: "Testimonio Atribuido",
    summary: "Según las crónicas de Synx7 y debates en Elitepvpers, fue la persona que logró extraer los ejecutables de vSRO desde un servidor de pruebas de Vietnam (VDC-Net2E) mediante una vulnerabilidad web/servidor. Intentó arrancarlos para un proyecto privado denominado Phoenix.",
    contributions: [
      "Acceso no autorizado y descarga del volcado inicial de archivos de vSRO.",
      "Impulsó la búsqueda de soluciones técnicas para la certificación faltante.",
      "Posteriormente manifestó que la liberación masiva pública no fue su intención original."
    ],
    status: "Desconocido. Alejado de los foros públicos tras las disputas de 2012.",
    links: [
      { title: "Elitepvpers: Discusión sobre los archivos vSRO (2012)", url: "https://www.elitepvpers.com/forum/sro-private-server/1879316-discussion-about-vsro-files-2.html" }
    ]
  },
  ocean: {
    name: "Ocean",
    role: "Administrador Legendario de ECSRO, ZSZC y SWSRO",
    period: "2007 – 2011",
    evidence: "testimony",
    badgeText: "Testimonio Atribuido",
    summary: "Una de las figuras más recordadas y controvertidas de la primera era privada de Silkroad. Vinculado a MHTC y director visible de ECSRO, ECSRO VIP, y más tarde vinculado a la gestión de ZSZC y SWSRO. Administraba la comunidad y el comercio de items, mientras un socio chino mantenía el control técnico de los archivos.",
    contributions: [
      "Operación del servidor privado más masivo de la época pre-vSRO (ECSRO).",
      "Establecimiento del modelo de negocio privado con servidores VIP y venta de items.",
      "Mantenimiento de ciclos de parches para corregir bugs de spawns y trades en 2010."
    ],
    status: "Paradero civil e identidad real desconocidos. Figura mítica en los recuerdos de los jugadores veteranos.",
    links: [
      { title: "Elitepvpers: Historia de Silkroad y Testimonio de ZubZero", url: "https://www.elitepvpers.com/forum/sro-private-server/4701666-history-silkroad.html" },
      { title: "Memorias de ECSRO (Elitepvpers)", url: "https://www.elitepvpers.com/forum/sro-private-server/3379162-anyone-remembers-ecsro-ecsro-vip-times-4.html" }
    ]
  },
  zubzero: {
    name: "ZubZero (evelknievel10)",
    role: "Coder / GM de ECSRO y Administrador Principal de ZSZC",
    period: "2008 – 2011 / 2020",
    evidence: "testimony",
    badgeText: "Testimonio Atribuido",
    summary: "Veterano que en enero de 2020 publicó una de las reconstrucciones históricas más valiosas sobre el origen de MHTC, ECSRO, SJSRO y ZSZC. Explicó la jerarquía de poder entre los dueños chinos de los archivos y los administradores occidentales.",
    contributions: [
      "Programación de parches y gestión de eventos en ECSRO.",
      "Administración integral de los mundos Fire, Water y Earth de ZSZC.",
      "Testimonio histórico crucial documentando cómo operaban los servidores pioneros."
    ],
    status: "Publicó su retrospectiva en Elitepvpers en 2020. Retirado de la administración activa.",
    links: [
      { title: "Testimonio histórico en Elitepvpers (2020)", url: "https://www.elitepvpers.com/forum/sro-private-server/4701666-history-silkroad.html" }
    ]
  },
  darkinc: {
    name: "DarkInc, Darkmind & Clearscreen",
    role: "Creadores de SREmu (Primer Emulador Comunitario)",
    period: "2006 – 2008",
    evidence: "documented",
    badgeText: "Documentado",
    summary: "Equipo pionero que demostró al mundo que era posible emular el servidor de Silkroad desde cero. Iniciaron el proyecto en Visual Basic antes de reescribirlo en C y C++, buscando comprender la máquina de estados del cliente oficial.",
    contributions: [
      "Desarrollo de SREmu, permitiendo por primera vez conexiones y spawn en Jangan sin files de Joymax.",
      "Ingeniería inversa temprana de los paquetes de login y handshake.",
      "Inspiraron a toda una generación de desarrolladores a estudiar el protocolo."
    ],
    status: "Proyectos archivados en sitios históricos de emulación.",
    links: [
      { title: "Registro histórico de SREmu en Xtremetop100", url: "https://www.xtremetop100.com/sitedetails-1132233160" }
    ]
  },
  crater96: {
    name: "crater96, KingLi & LaHonda",
    role: "Releasers de los Servidores y DB de SWSRO",
    period: "8 de Noviembre de 2011",
    evidence: "documented",
    badgeText: "Documentado (RaGEZONE)",
    summary: "Equipo que publicó en RaGEZONE el paquete completo de SWSRO (GameServer + base de datos Cap 60 con items 9D), rompiendo los acuerdos de exclusividad y revelando la arquitectura de los servidores clásicos de la era 2008-2010.",
    contributions: [
      "Liberación pública de la base de datos de SWSRO y documentación explícita de sus bugs.",
      "Aportaron una alternativa de servidor de rates clásicos frente al vSRO europeo.",
      "Preservación de datos históricos de las mecánicas de la raza china clásica."
    ],
    status: "Archivado en foros de emulación MMO.",
    links: [
      { title: "RaGEZONE: Release Complete SWSRO Server Files + DB", url: "https://forum.ragezone.com/threads/release-complete-swsro-server-files-databases.793470/" }
    ]
  },
  opensro: {
    name: "OpenSRO Team",
    role: "Reconstrucción Moderna de Legend III (WebGPU + Go)",
    period: "2024 – 2026",
    evidence: "documented",
    badgeText: "Documentado (GitHub)",
    summary: "Proyecto de vanguardia tecnológica que reimplementa Silkroad Online v1.150 (Legend III: Roc Mountain) desde cero con tecnologías web de última generación. Cliente en TypeScript con renderizador WebGPU nativo para navegadores y servidor distribuido escrito en Go.",
    contributions: [
      "Código abierto bajo licencia AGPL-3.0.",
      "Eliminación de la dependencia de binarios antiguos de Windows Server y SQL Server anticuados.",
      "Demostración de que la preservación del juego puede hacerse con ingeniería moderna y limpia."
    ],
    status: "Proyecto activo con repositorios públicos en GitHub y cliente web jugable.",
    links: [
      { title: "Sitio Oficial OpenSRO", url: "https://opensro.online" },
      { title: "Repositorio GitHub OpenSRO", url: "https://github.com/opensro-dev/opensro" }
    ]
  }
};

function initModalSystem() {
  const modalOverlay = document.getElementById('dossierModal');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.getElementById('modalClose');

  if (!modalOverlay || !modalBody) return;

  function openDossier(key) {
    const data = personDossiers[key];
    if (!data) return;

    let linksHtml = data.links.map(l => `
      <li><a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.title} ↗</a></li>
    `).join('');

    let contribsHtml = data.contributions.map(c => `
      <li>${c}</li>
    `).join('');

    modalBody.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.2rem; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <h2 style="font-size:1.6rem; color:var(--gold-light); margin-bottom:0.2rem; border-bottom:none; padding-bottom:0;">${data.name}</h2>
          <div style="font-family:var(--font-mono); color:var(--silk-blue); font-size:0.9rem;">${data.role} · ${data.period}</div>
        </div>
        <span class="badge-evidence badge-${data.evidence}">${data.badgeText}</span>
      </div>

      <div class="callout-box gold" style="margin-top:0;">
        <div style="font-size:1.05rem; line-height:1.7; color:var(--text-cream);">${data.summary}</div>
      </div>

      <h3 style="color:var(--gold-primary); font-size:1.15rem; margin-top:1.5rem;">Aportes y Hechos Clave</h3>
      <ul style="padding-left:1.4rem; color:var(--text-secondary); margin-bottom:1.5rem; line-height:1.7;">
        ${contribsHtml}
      </ul>

      <h3 style="color:var(--silk-blue); font-size:1.15rem;">Situación Actual y Evidencia</h3>
      <p style="font-size:0.95rem; line-height:1.6;">${data.status}</p>

      <h3 style="color:var(--gold-primary); font-size:1.15rem; margin-top:1.5rem;">Fuentes Primarias y Referencias</h3>
      <ul style="padding-left:1.4rem; color:var(--text-secondary); line-height:1.8;">
        ${linksHtml}
      </ul>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Bind click on person cards and trigger buttons
  document.querySelectorAll('[data-dossier]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const key = trigger.getAttribute('data-dossier');
      openDossier(key);
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

// 7. Reading Mode Toggle
function initReadingMode() {
  const toggleBtn = document.getElementById('toggleReadingMode');
  if (!toggleBtn) return;

  const bookSvg = '<svg class="svg-icon nav-svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>';

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('reading-mode');
    const isReading = document.body.classList.contains('reading-mode');
    toggleBtn.innerHTML = bookSvg + '<span class="btn-text">' + (isReading ? 'Completo' : 'Lectura') + '</span>';
    showToast(isReading ? 'Modo Lectura Inmersivo Activado' : 'Modo Completo Restaurado');
  });
}

// 8. Copy Anchors on Section Headings
function initCopyAnchors() {
  document.querySelectorAll('h2[id], h3[id]').forEach(heading => {
    heading.style.cursor = 'pointer';
    heading.title = 'Click para copiar enlace directo a esta sección';
    heading.addEventListener('click', () => {
      const url = window.location.origin + window.location.pathname + '#' + heading.id;
      navigator.clipboard.writeText(url).then(() => {
        showToast('Enlace copiado al portapapeles');
      });
    });
  });
}

// 9. Acronym Category Filter
function initAcronymFilter() {
  const tabs = document.querySelectorAll('.acronym-tab-btn');
  const cards = document.querySelectorAll('.acronym-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.getAttribute('data-acronym-cat');

      cards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-acronym-cat') === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Toast notification helper
function showToast(msg) {
  let toast = document.getElementById('historyToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'historyToast';
    toast.style.position = 'fixed';
    toast.style.bottom = '2rem';
    toast.style.right = '2rem';
    toast.style.background = 'rgba(15, 20, 32, 0.95)';
    toast.style.border = '1px solid var(--gold-primary)';
    toast.style.color = '#fff';
    toast.style.padding = '0.8rem 1.4rem';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = 'var(--shadow-gold)';
    toast.style.zIndex = '9999';
    toast.style.fontFamily = 'var(--font-sans)';
    toast.style.fontSize = '0.9rem';
    toast.style.transition = 'all 0.3s ease';
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 2200);
}

// 10. Theme Toggle System (Modo Claro Papiro / Modo Oscuro Ergonómico)
function initThemeSystem() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('sro_theme');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

  const currentTheme = savedTheme || (prefersLight ? 'light' : 'dark');

  const sunSvg = '<svg class="svg-icon nav-svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  const moonSvg = '<svg class="svg-icon nav-svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeBtn) themeBtn.innerHTML = moonSvg + '<span class="btn-text">Modo Oscuro</span>';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeBtn) themeBtn.innerHTML = sunSvg + '<span class="btn-text">Modo Claro</span>';
    }
    localStorage.setItem('sro_theme', theme);
  }

  applyTheme(currentTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      applyTheme(isLight ? 'dark' : 'light');
      showToast(isLight ? 'Modo Oscuro Ergonómico Activado' : 'Modo Claro (Papiro Editorial) Activado');
    });
  }
}

// 11. Progressive Disclosure y Acordeones por Capítulos
function initProgressiveDisclosure() {
  const toggleBtns = document.querySelectorAll('.chapter-toggle-btn');
  const globalBtn = document.getElementById('globalAccordionToggle');

  const chevUpSvg = '<span class="toggle-icon"><svg class="svg-icon toggle-svg" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg></span>';
  const chevDownSvg = '<span class="toggle-icon"><svg class="svg-icon toggle-svg" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>';
  const accordionSvg = '<svg class="svg-icon nav-svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="7 13 12 18 17 13"/><polyline points="7 6 12 11 17 6"/></svg>';
  const signalExpansion = (section, content) => {
    if (!section || !content) return;
    section.classList.remove('chapter-focus-pulse');
    content.classList.remove('chapter-revealed');
    void section.offsetWidth;
    section.classList.add('chapter-focus-pulse');
    content.classList.add('chapter-revealed');
    window.setTimeout(() => {
      section.classList.remove('chapter-focus-pulse');
      content.classList.remove('chapter-revealed');
    }, 2200);
  };

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.closest('.article-section');
      const content = section?.querySelector('.chapter-collapsible-content');
      if (!content) return;

      const isCollapsed = content.classList.contains('collapsed');
      if (isCollapsed) {
        content.classList.remove('collapsed');
        btn.innerHTML = chevUpSvg + ' Contraer Capítulo';
        btn.setAttribute('aria-expanded', 'true');
        signalExpansion(section, content);
      } else {
        content.classList.add('collapsed');
        btn.innerHTML = chevDownSvg + ' Desplegar Investigación Completa';
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  if (globalBtn) {
    globalBtn.addEventListener('click', () => {
      const allContents = document.querySelectorAll('.chapter-collapsible-content');
      const anyCollapsed = Array.from(allContents).some(c => c.classList.contains('collapsed'));

      allContents.forEach(c => {
        const btn = c.closest('.article-section')?.querySelector('.chapter-toggle-btn');
        if (anyCollapsed) {
          c.classList.remove('collapsed');
          if (btn) {
            btn.innerHTML = chevUpSvg + ' Contraer Capítulo';
            btn.setAttribute('aria-expanded', 'true');
          }
          signalExpansion(c.closest('.article-section'), c);
        } else {
          c.classList.add('collapsed');
          if (btn) {
            btn.innerHTML = chevDownSvg + ' Desplegar Investigación Completa';
            btn.setAttribute('aria-expanded', 'false');
          }
        }
      });

      globalBtn.innerHTML = accordionSvg + '<span class="btn-text">' + (anyCollapsed ? 'Contraer Todo' : 'Desplegar Todo') + '</span>';
      showToast(anyCollapsed ? 'Todos los capítulos desplegados' : 'Síntesis ejecutiva activada (Capítulos contraídos)');
    });
  }

  // Auto-expand chapter when navigating via TOC anchor
  function checkHashAndExpand() {
    const targetId = window.location.hash.replace('#', '');
    if (!targetId) return;
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const section = targetEl.classList.contains('article-section') ? targetEl : targetEl.closest('.article-section');
      const content = section?.querySelector('.chapter-collapsible-content');
      const btn = section?.querySelector('.chapter-toggle-btn');
      if (content && content.classList.contains('collapsed')) {
        content.classList.remove('collapsed');
        if (btn) {
          btn.innerHTML = '<span class="toggle-icon">▲</span> Contraer Capítulo';
          btn.setAttribute('aria-expanded', 'true');
        }
        signalExpansion(section, content);
      }
    }
  }

  window.addEventListener('hashchange', checkHashAndExpand);
  if (window.location.hash) {
    setTimeout(checkHashAndExpand, 200);
  }

  // When search is used, automatically uncollapse all so matches are visible
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      if (e.target.value.trim().length > 1) {
        document.querySelectorAll('.chapter-collapsible-content.collapsed').forEach(c => {
          c.classList.remove('collapsed');
          const btn = c.closest('.article-section')?.querySelector('.chapter-toggle-btn');
          if (btn) {
            btn.innerHTML = chevUpSvg + ' Contraer Capítulo';
            btn.setAttribute('aria-expanded', 'true');
          }
        });
        if (globalBtn) globalBtn.innerHTML = accordionSvg + '<span class="btn-text">Contraer Todo</span>';
      }
    });
  }
}

// 12. Mobile Navigation Drawer
function initMobileNav() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileTocTrigger = document.getElementById('mobileTocTrigger');
  const sidebar = document.querySelector('.sidebar');

  if (mobileMenuToggle && mobileNavDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = mobileNavDrawer.classList.contains('active');
      mobileNavDrawer.classList.toggle('active');
      mobileMenuToggle.setAttribute('aria-expanded', !isOpen);

      const openIcon = mobileMenuToggle.querySelector('.menu-icon-open');
      const closeIcon = mobileMenuToggle.querySelector('.menu-icon-close');
      if (openIcon && closeIcon) {
        openIcon.style.display = isOpen ? 'block' : 'none';
        closeIcon.style.display = isOpen ? 'none' : 'block';
      }
    });

    // Close drawer when clicking a link
    mobileNavDrawer.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        const openIcon = mobileMenuToggle.querySelector('.menu-icon-open');
        const closeIcon = mobileMenuToggle.querySelector('.menu-icon-close');
        if (openIcon && closeIcon) {
          openIcon.style.display = 'block';
          closeIcon.style.display = 'none';
        }
      });
    });
  }

  if (mobileTocTrigger && sidebar) {
    mobileTocTrigger.addEventListener('click', () => {
      const isOpen = sidebar.classList.contains('mobile-open');
      sidebar.classList.toggle('mobile-open');
      mobileTocTrigger.setAttribute('aria-expanded', !isOpen);
    });

    // Close sidebar when clicking a TOC link on mobile
    sidebar.querySelectorAll('.toc-item a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
          sidebar.classList.remove('mobile-open');
          if (mobileTocTrigger) mobileTocTrigger.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
}

// 13. Scroll Reveal Animations (Intersection Observer)
function initScrollReveal() {
  const sections = document.querySelectorAll('.article-section, .hero-card');
  if (!sections.length) return;

  sections.forEach(section => {
    section.classList.add('reveal-hidden');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        entry.target.classList.remove('reveal-hidden');
      }
    });
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.05
  });

  sections.forEach(sec => observer.observe(sec));
}

// 14. Back to Top Button
function initBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'backToTopBtn';
  btn.className = 'back-to-top-btn';
  btn.title = 'Volver al inicio';
  btn.setAttribute('aria-label', 'Volver al inicio de la página');
  btn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
  document.body.appendChild(btn);

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 800) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


