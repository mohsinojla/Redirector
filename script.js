function el(tag, props, children) {
  const node = document.createElement(tag);
  Object.assign(node, props || {});
  (children || []).forEach((c) => node.appendChild(c));
  return node;
}

(function () {
  const config = window.SITE_CONFIG;
  if (!config) {
    console.error('SITE_CONFIG not found — make sure config.js is loaded before script.js');
    document.body.innerHTML =
      '<p style="color:#fff;text-align:center;margin-top:40px;">Could not load event configuration.</p>';
    return;
  }
  renderHero(config);
  renderCtaStack(config);
  renderCardGrid('event-management-grid', config.event_management);
  renderCardGrid('collab-grid', config.collaborators);
})();

function renderHero(config) {
  const hero = document.getElementById('hero-banner');
  if (config.event && config.event.hero_image) {
    hero.src = config.event.hero_image;
  }
  if (config.event && config.event.title) {
    document.title = config.event.title;
  }
  const btn = document.getElementById('register-btn');
  if (config.register) {
    btn.href = config.register.url || '#';
    btn.textContent = config.register.label || 'Register Now';
  }
}

function renderCtaStack(config) {
  const stack = document.getElementById('cta-stack');
  stack.innerHTML = '';
  const social = config.social || {};

  if (social.whatsapp) {
    stack.appendChild(
      el('a', { href: social.whatsapp.url, target: '_blank', rel: 'noopener', className: 'cta-card cta-whatsapp' }, [
        el('img', { src: social.whatsapp.image, alt: 'WhatsApp' }),
        el('span', { textContent: social.whatsapp.label || 'Join our WhatsApp for updates' }),
      ])
    );
  }

  if (social.instagram) {
    stack.appendChild(
      el('a', { href: social.instagram.url, target: '_blank', rel: 'noopener', className: 'cta-card cta-instagram' }, [
        el('img', { src: social.instagram.image, alt: 'Instagram' }),
        el('span', { textContent: social.instagram.label || 'Follow us on Instagram' }),
      ])
    );
  }
}

function renderCardGrid(gridId, entries) {
  const grid = document.getElementById(gridId);
  grid.innerHTML = '';
  (entries || []).forEach((c) => {
    grid.appendChild(
      el('a', { href: c.url, target: '_blank', rel: 'noopener', className: 'collab-card' }, [
        el('img', { src: c.logo, alt: c.name }),
        el('span', { textContent: c.name }),
      ])
    );
  });
}
