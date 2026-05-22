// VecinoAI — Shared nav, footer, analytics
// Works with file:// (local) and any web server (GitHub Pages, Vercel, etc.)

// ── Google Analytics 4 ────────────────────────────────────────────────────────
(function () {
  var GA_ID = 'G-SWFT48PG3Z';
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID, { send_page_view: true });
})();

// ── Facebook Pixel ────────────────────────────────────────────────────────────
(function () {
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('init', '1646636346569890');
  window.fbq('track', 'PageView');
  // Noscript fallback — lo inyectamos en el body
  var ns = document.createElement('noscript');
  var img = document.createElement('img');
  img.height = 1; img.width = 1; img.style.display = 'none';
  img.src = 'https://www.facebook.com/tr?id=1646636346569890&ev=PageView&noscript=1';
  ns.appendChild(img);
  document.body && document.body.appendChild(ns);
})();

// ── Scroll depth (25 / 50 / 75 / 100 %) ─────────────────────────────────────
(function () {
  var reached = {};
  var depths  = [25, 50, 75, 100];
  function check() {
    var el        = document.documentElement;
    var scrolled  = el.scrollTop || document.body.scrollTop;
    var total     = el.scrollHeight - el.clientHeight;
    if (total <= 0) return;
    var pct = Math.round((scrolled / total) * 100);
    depths.forEach(function (d) {
      if (pct >= d && !reached[d]) {
        reached[d] = true;
        if (window.gtag) {
          window.gtag('event', 'scroll', {
            percent_scrolled: d,
            page_path: window.location.pathname
          });
        }
        if (window.fbq && d === 50) window.fbq('track', 'ViewContent');
      }
    });
  }
  window.addEventListener('scroll', check, { passive: true });
})();

// ── Tracking helper ───────────────────────────────────────────────────────────
function trackEvent(eventName, params) {
  if (window.gtag) window.gtag('event', eventName, params || {});
  if (window.fbq) {
    if (eventName === 'whatsapp_click')   window.fbq('track', 'Contact');
    if (eventName === 'form_submit_demo') window.fbq('track', 'Lead');
  }
}
window.trackEvent = trackEvent;

// ── Tracking: clics en WhatsApp (delegación desde document) ──────────────────
document.addEventListener('click', function (e) {
  var a = e.target.closest('a[href*="wa.me"]');
  if (!a) return;
  trackEvent('whatsapp_click', {
    event_category: 'conversion',
    event_label: a.dataset.label || window.location.pathname
  });
});

(function () {
  // ── Detectar profundidad relativa al directorio raíz del proyecto ──────────
  function getBase() {
    if (window.location.protocol !== 'file:') {
      // En servidor web: rutas root-relativas con / al inicio
      return null;
    }
    // En file:// calcular cuántos niveles subir hasta la raíz del proyecto
    const path = decodeURIComponent(window.location.pathname);
    const marker = 'vecinoai-web';
    const idx = path.lastIndexOf(marker);
    if (idx === -1) return '';
    const afterRoot = path.slice(idx + marker.length).replace(/^\//, '');
    const dirs = afterRoot.split('/').filter(p => p && !p.includes('.'));
    return dirs.length === 0 ? '' : '../'.repeat(dirs.length);
  }

  const base = getBase(); // null = servidor, string = file://

  // Construye una URL interna
  function u(path) {
    if (base === null) return '/' + path;
    return base + path;
  }

  // ── Estilos compartidos ────────────────────────────────────────────────────
  const STYLES = `<style>
    *{box-sizing:border-box}
    body{background:#080814;color:#f1f5f9;font-family:'Inter',sans-serif}
    .glass{background:rgba(255,255,255,0.04);border:1px solid rgba(99,102,241,0.18);backdrop-filter:blur(16px)}
    .gradient-text{background:linear-gradient(135deg,#a5b4fc 0%,#818cf8 40%,#c084fc 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .nav-blur{background:rgba(8,8,20,0.85);backdrop-filter:blur(20px);border-bottom:1px solid rgba(99,102,241,0.12)}
    .btn-primary{background:linear-gradient(135deg,#6366f1,#4f46e5);color:white;padding:12px 28px;border-radius:10px;font-weight:600;font-size:15px;transition:all .2s ease;display:inline-flex;align-items:center;gap:8px;text-decoration:none}
    .btn-primary:hover{transform:translateY(-1px);box-shadow:0 8px 30px rgba(99,102,241,0.4)}
    .btn-ghost{border:1px solid rgba(99,102,241,0.3);color:#a5b4fc;padding:12px 28px;border-radius:10px;font-weight:500;font-size:15px;transition:all .2s ease;display:inline-flex;align-items:center;gap:8px;text-decoration:none}
    .btn-ghost:hover{border-color:rgba(99,102,241,0.6);background:rgba(99,102,241,0.08);color:#c7d2fe}
    .card-hover{transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease}
    .card-hover:hover{transform:translateY(-4px);border-color:rgba(99,102,241,0.4)!important;box-shadow:0 20px 60px rgba(99,102,241,0.12)}
    .badge{background:rgba(99,102,241,0.12);border:1px solid rgba(99,102,241,0.25);color:#a5b4fc;padding:4px 14px;border-radius:999px;font-size:13px;font-weight:500;display:inline-flex;align-items:center;gap:6px}
    .sep{border:none;border-top:1px solid rgba(99,102,241,0.1)}
    .orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none}
    .section-glow{background:radial-gradient(ellipse 60% 40% at 50% 50%,rgba(99,102,241,0.08) 0%,transparent 70%)}
  </style>`;

  // ── Nav ───────────────────────────────────────────────────────────────────
  const NAV = `
<style>
  #vai-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 50;
    background: rgba(8,8,20,0.88);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(99,102,241,0.14);
  }
  #vai-nav-inner {
    max-width: 1280px; margin: 0 auto;
    padding: 0 20px;
    height: 60px;
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px;
  }
  /* Logo */
  #vai-logo {
    display: flex; align-items: center; gap: 9px;
    text-decoration: none; flex-shrink: 0;
  }
  #vai-logo-icon {
    width: 34px; height: 34px; border-radius: 9px;
    background: linear-gradient(135deg,#6366f1,#a855f7);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  #vai-logo-text {
    font-weight: 700; font-size: 17px; color: white;
    letter-spacing: -0.4px; line-height: 1;
  }
  /* Desktop links */
  #vai-links {
    display: none; align-items: center; gap: 28px;
    font-size: 14px; font-weight: 500;
  }
  #vai-links a {
    color: #94a3b8; text-decoration: none;
    transition: color .15s;
  }
  #vai-links a:hover { color: white; }
  /* Desktop CTA — oculto en mobile */
  #vai-cta-desktop {
    display: none;
    background: linear-gradient(135deg,#6366f1,#4f46e5);
    color: white; font-weight: 600; font-size: 14px;
    padding: 9px 20px; border-radius: 10px;
    text-decoration: none; white-space: nowrap;
    transition: box-shadow .2s, transform .2s;
  }
  #vai-cta-desktop:hover {
    box-shadow: 0 6px 24px rgba(99,102,241,0.45);
    transform: translateY(-1px);
  }
  /* Mobile right: solo hamburger */
  #vai-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
  /* Hamburger */
  #vai-burger {
    display: flex; flex-direction: column; justify-content: center;
    gap: 5px; width: 40px; height: 40px;
    background: none; border: 1px solid rgba(99,102,241,0.3);
    border-radius: 10px; cursor: pointer; padding: 0 10px;
    flex-shrink: 0;
  }
  #vai-burger .b {
    display: block; width: 20px; height: 2px;
    background: #a5b4fc; border-radius: 2px;
    transition: transform .25s ease, opacity .25s ease;
    transform-origin: center;
  }
  /* Drawer */
  #vai-drawer {
    display: none; flex-direction: column;
    padding: 8px 20px 24px;
    border-top: 1px solid rgba(99,102,241,0.1);
    background: rgba(8,8,20,0.97);
  }
  #vai-drawer a.vai-dlink {
    color: #e2e8f0; text-decoration: none;
    font-size: 16px; font-weight: 500;
    padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    display: block;
    transition: color .15s;
  }
  #vai-drawer a.vai-dlink:hover { color: white; }
  #vai-drawer a.vai-dcta {
    display: block; margin-top: 16px;
    background: linear-gradient(135deg,#6366f1,#4f46e5);
    color: white; font-weight: 700; font-size: 16px;
    padding: 15px 20px; border-radius: 12px;
    text-decoration: none; text-align: center;
    letter-spacing: -0.2px;
    transition: box-shadow .2s;
  }
  #vai-drawer a.vai-dcta:hover { box-shadow: 0 8px 28px rgba(99,102,241,0.45); }
  /* Desktop breakpoint */
  @media (min-width: 768px) {
    #vai-nav-inner { height: 64px; padding: 0 32px; }
    #vai-links     { display: flex !important; }
    #vai-cta-desktop { display: inline-flex !important; align-items: center; gap: 6px; }
    #vai-burger    { display: none !important; }
    #vai-drawer    { display: none !important; }
  }
</style>

<nav id="vai-nav" role="navigation" aria-label="Navegación principal">
  <div id="vai-nav-inner">

    <!-- Logo -->
    <a id="vai-logo" href="${u('index.html')}" aria-label="VecinoAI inicio">
      <div id="vai-logo-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </div>
      <span id="vai-logo-text">VecinoAI</span>
    </a>

    <!-- Links desktop (centro) -->
    <div id="vai-links">
      <a href="${u('how-it-works/index.html')}">Cómo funciona</a>
      <a href="${u('amenity-reservations/index.html')}">Reservas</a>
      <a href="${u('ai-knowledge-base/index.html')}">IA Contextual</a>
      <a href="${u('blog/index.html')}">Blog</a>
    </div>

    <!-- Derecha: CTA desktop + hamburger mobile -->
    <div id="vai-right">
      <a id="vai-cta-desktop" href="${u('demo/index.html')}">
        Solicitar demo
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
      <button id="vai-burger" aria-label="Abrir menú" aria-expanded="false" aria-controls="vai-drawer">
        <span class="b"></span>
        <span class="b"></span>
        <span class="b"></span>
      </button>
    </div>

  </div>

  <!-- Drawer mobile -->
  <div id="vai-drawer" role="menu">
    <a class="vai-dlink" href="${u('how-it-works/index.html')}" role="menuitem">Cómo funciona</a>
    <a class="vai-dlink" href="${u('amenity-reservations/index.html')}" role="menuitem">Reservas</a>
    <a class="vai-dlink" href="${u('ai-knowledge-base/index.html')}" role="menuitem">IA Contextual</a>
    <a class="vai-dlink" href="${u('blog/index.html')}" role="menuitem">Blog</a>
    <a class="vai-dcta" href="${u('demo/index.html')}" role="menuitem">Solicitar demo →</a>
  </div>
</nav>

<script>
(function(){
  var burger = document.getElementById('vai-burger');
  var drawer = document.getElementById('vai-drawer');
  if (!burger || !drawer) return;
  var bars = burger.querySelectorAll('.b');
  var open = false;

  function toggle() {
    open = !open;
    burger.setAttribute('aria-expanded', open);
    drawer.style.display = open ? 'flex' : 'none';
    bars[0].style.transform = open ? 'translateY(7px) rotate(45deg)'  : '';
    bars[1].style.opacity   = open ? '0' : '1';
    bars[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
  }

  burger.addEventListener('click', toggle);

  drawer.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      if (open) toggle();
    });
  });

  // Cerrar con Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && open) toggle();
  });
})();
</script>`;

  // ── Footer ────────────────────────────────────────────────────────────────
  const FOOTER = `
<footer style="border-top:1px solid rgba(255,255,255,0.05);padding:64px 0">
  <div style="max-width:1280px;margin:0 auto;padding:0 24px">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:40px;margin-bottom:48px">

      <div style="grid-column:span 2;min-width:200px">
        <a href="${u('index.html')}" style="display:flex;align-items:center;gap:10px;text-decoration:none;margin-bottom:16px">
          <div style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#6366f1,#a855f7);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <span style="font-weight:700;font-size:18px;color:white">VecinoAI</span>
        </a>
        <p style="color:#64748b;font-size:14px;line-height:1.7;max-width:280px;margin-bottom:12px">El asistente de inteligencia artificial para administración de propiedades residenciales. Un producto de CK Soluciones.</p>
        <span style="color:#475569;font-size:12px">Un producto de <strong style="color:#94a3b8">CK Soluciones</strong></span>
      </div>

      <div>
        <div style="color:white;font-weight:600;font-size:14px;margin-bottom:16px">Producto</div>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px">
          ${[
            ['how-it-works/index.html',              'Cómo funciona'],
            ['whatsapp-property-management/index.html','WhatsApp IA'],
            ['amenity-reservations/index.html',       'Reservas'],
            ['resident-request-automation/index.html','Automatización'],
            ['property-management-automation/index.html','Flujos de trabajo'],
            ['ai-knowledge-base/index.html',          'Base de conocimiento IA'],
            ['security/index.html',                   'Seguridad'],
          ].map(([path, label]) =>
            `<li><a href="${u(path)}" style="color:#64748b;font-size:14px;text-decoration:none" onmouseover="this.style.color='#cbd5e1'" onmouseout="this.style.color='#64748b'">${label}</a></li>`
          ).join('\n          ')}
        </ul>
      </div>

      <div>
        <div style="color:white;font-weight:600;font-size:14px;margin-bottom:16px">Recursos</div>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px">
          ${[
            ['blog/index.html',                                       'Blog'],
            ['blog/ai-for-property-management/index.html',           'IA para Administración'],
            ['blog/automating-resident-requests/index.html',         'Automatizar Solicitudes'],
            ['blog/whatsapp-for-residential-communities/index.html', 'WhatsApp Residencial'],
            ['blog/digital-amenity-reservations/index.html',         'Reservas Digitales'],
            ['ai-property-management/index.html',                    'IA Inmobiliaria'],
            ['property-management-software/index.html',              'Software Administración'],
          ].map(([path, label]) =>
            `<li><a href="${u(path)}" style="color:#64748b;font-size:14px;text-decoration:none" onmouseover="this.style.color='#cbd5e1'" onmouseout="this.style.color='#64748b'">${label}</a></li>`
          ).join('\n          ')}
        </ul>
      </div>

      <div>
        <div style="color:white;font-weight:600;font-size:14px;margin-bottom:16px">Empresa</div>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px">
          ${[
            ['about/index.html',           'Sobre CK Soluciones'],
            ['contact/index.html',         'Contacto'],
            ['demo/index.html',            'Solicitar demo'],
            ['privacy-policy/index.html',  'Política de Privacidad'],
            ['terms-and-conditions/index.html','Términos y Condiciones'],
          ].map(([path, label]) =>
            `<li><a href="${u(path)}" style="color:#64748b;font-size:14px;text-decoration:none" onmouseover="this.style.color='#cbd5e1'" onmouseout="this.style.color='#64748b'">${label}</a></li>`
          ).join('\n          ')}
        </ul>
      </div>

    </div>

    <hr style="border:none;border-top:1px solid rgba(99,102,241,0.1);margin-bottom:32px"/>
    <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;font-size:12px;color:#475569">
      <div>© 2025 VecinoAI · CK Soluciones · Todos los derechos reservados</div>
      <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap">
        <a href="${u('privacy-policy/index.html')}"        style="color:#475569;text-decoration:none" onmouseover="this.style.color='#94a3b8'" onmouseout="this.style.color='#475569'">Privacidad</a>
        <a href="${u('terms-and-conditions/index.html')}"  style="color:#475569;text-decoration:none" onmouseover="this.style.color='#94a3b8'" onmouseout="this.style.color='#475569'">Términos</a>
        <a href="${u('property-management-software/index.html')}" style="color:#475569;text-decoration:none" onmouseover="this.style.color='#94a3b8'" onmouseout="this.style.color='#475569'">Software Administración</a>
        <a href="${u('ai-property-management/index.html')}" style="color:#475569;text-decoration:none" onmouseover="this.style.color='#94a3b8'" onmouseout="this.style.color='#475569'">IA Inmobiliaria</a>
      </div>
    </div>
  </div>
</footer>`;

  // ── Inyectar ──────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    document.head.insertAdjacentHTML('beforeend', STYLES);

    // Favicon para subpáginas
    if (!document.querySelector('link[rel="icon"]')) {
      var fav = document.createElement('link');
      fav.rel = 'icon'; fav.type = 'image/svg+xml';
      fav.href = u('favicon.svg');
      document.head.appendChild(fav);
    }
    // og:image para todas las páginas
    if (!document.querySelector('meta[property="og:image"]')) {
      var metas = [
        ['og:image',        'https://vecinoai.co/og-image.png'],
        ['og:image:width',  '1200'],
        ['og:image:height', '630'],
        ['og:image:alt',    'VecinoAI — IA para administración de propiedades'],
        ['twitter:image',   'https://vecinoai.co/og-image.png'],
        ['twitter:card',    'summary_large_image'],
      ];
      metas.forEach(function(m) {
        var tag = document.createElement('meta');
        tag.setAttribute('property', m[0]); tag.content = m[1];
        document.head.appendChild(tag);
      });
    }

    const navPh    = document.getElementById('nav-ph');
    const footerPh = document.getElementById('footer-ph');
    if (navPh)    navPh.outerHTML    = NAV;
    if (footerPh) footerPh.outerHTML = FOOTER;

    // Smooth scroll para anclas internas
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    });
  });
})();
