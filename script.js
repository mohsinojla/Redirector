function el(tag, props, children) {
  const node = document.createElement(tag);
  Object.assign(node, props || {});
  (children || []).forEach((c) => node.appendChild(c));
  return node;
}

fetch('config.json?_=' + Date.now())
  .then((res) => res.json())
  .then((config) => {
    renderHero(config);
    renderGallery(config);
    renderSocial(config);
    renderCollaborators(config);
  })
  .catch((err) => {
    console.error('Failed to load config.json', err);
    document.body.innerHTML =
      '<p style="color:#fff;text-align:center;margin-top:40px;">Could not load event configuration.</p>';
  });

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

function renderGallery(config) {
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '';
  (config.gallery || []).forEach((src) => {
    grid.appendChild(el('img', { src, alt: 'Event artwork' }));
  });
}

function renderSocial(config) {
  const grid = document.getElementById('social-grid');
  grid.innerHTML = '';
  const social = config.social || {};
  if (social.instagram) {
    grid.appendChild(
      el('a', { href: social.instagram.url, target: '_blank', rel: 'noopener', className: 'social-card' }, [
        el('img', { src: social.instagram.image, alt: 'Instagram' }),
        el('span', { textContent: 'Follow us' }),
      ])
    );
  }
  if (social.whatsapp) {
    grid.appendChild(
      el('a', { href: social.whatsapp.url, target: '_blank', rel: 'noopener', className: 'social-card' }, [
        el('img', { src: social.whatsapp.image, alt: 'WhatsApp' }),
        el('span', { textContent: 'Join our WhatsApp' }),
      ])
    );
  }
}

function renderCollaborators(config) {
  const grid = document.getElementById('collab-grid');
  grid.innerHTML = '';
  (config.collaborators || []).forEach((c) => {
    grid.appendChild(
      el('a', { href: c.url, target: '_blank', rel: 'noopener', className: 'collab-card' }, [
        el('img', { src: c.logo, alt: c.name }),
        el('span', { textContent: c.name }),
      ])
    );
  });
}
