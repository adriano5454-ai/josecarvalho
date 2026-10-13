const nav = document.querySelector('.nav');
const toggle = document.querySelector('.menu-toggle');
function closeMenu() { if (!toggle || !nav) return; toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); }
toggle?.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); nav?.classList.toggle('is-open', open); });
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
document.addEventListener('click', event => { if (!nav?.contains(event.target) && !toggle?.contains(event.target)) closeMenu(); });
const contactBar = document.querySelector('.mobile-contact');
const primaryCta = document.querySelector('.hero-actions .button');
if (contactBar) {
  if (primaryCta) {
    const updateContactBar = () => { contactBar.hidden = primaryCta.getBoundingClientRect().bottom > 0; };
    updateContactBar();
    let frame = 0;
    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => { frame = 0; updateContactBar(); });
    };
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('pageshow', updateContactBar);
  } else {
    contactBar.hidden = false;
  }
}
const form = document.querySelector('.quote-form');
if (form) {
  const requestedService = new URLSearchParams(window.location.search).get('servico');
  const service = requestedService === 'Cortinas' ? 'Cortinas a seco' : requestedService;
  const serviceInput = form.elements.namedItem('servico');
  if (service && Array.from(serviceInput.options).some(option => option.value === service)) serviceInput.value = service;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('nome') || '').trim();
    const bairro = String(data.get('bairro') || '').trim();
    const message = String(data.get('mensagem') || '').trim();
    const lines = ['Olá, Zé! Gostaria de solicitar um orçamento.', '', `Serviço: ${data.get('servico')}`];
    if (name) lines.push(`Nome: ${name}`);
    if (bairro) lines.push(`Bairro / região: ${bairro}`);
    if (message) lines.push('', `Detalhes: ${message}`);
    lines.push('', 'Podemos conversar sobre a avaliação e a disponibilidade?');
    const text = lines.join('\n');
    if (event.submitter?.dataset.channel === 'email') {
      window.location.href = `mailto:josecarvalho121057@gmail.com?subject=${encodeURIComponent('Pedido de orçamento — ' + data.get('servico'))}&body=${encodeURIComponent(text)}`;
    } else {
      window.location.href = `https://wa.me/5521998222062?text=${encodeURIComponent(text)}`;
    }
  });
}

const commentForm = document.querySelector('.comment-form');
if (commentForm) {
  const nameInput = commentForm.elements.namedItem('nome_cliente');
  const commentInput = commentForm.elements.namedItem('comentario');
  [nameInput, commentInput].forEach(input => input.addEventListener('input', () => input.setCustomValidity('')));
  commentForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(commentForm);
    const name = String(data.get('nome_cliente') || '').trim();
    const comment = String(data.get('comentario') || '').trim();
    nameInput.setCustomValidity(name.length < 2 || name.length > 80 ? 'Informe um nome entre 2 e 80 caracteres.' : '');
    commentInput.setCustomValidity(comment.length < 10 || comment.length > 1200 ? 'Escreva um comentário entre 10 e 1.200 caracteres.' : '');
    if (!commentForm.reportValidity()) return;
    const consent = data.get('autoriza_publicacao') === 'sim';
    const lines = ['Olá, Zé! Quero compartilhar minha experiência com a LAVA MAIS.', '', `Nome para publicação: ${name}`];
    lines.push('', `Comentário: ${comment}`, '', consent
      ? 'Autorizo a publicação do meu nome e comentário após aprovação.'
      : 'Não autorizo a publicação. Este comentário é um feedback privado.');
    const message = lines.join('\n');
    if (event.submitter?.dataset.channel === 'email') {
      window.location.href = `mailto:josecarvalho121057@gmail.com?subject=${encodeURIComponent('Comentário de cliente — LAVA MAIS')}&body=${encodeURIComponent(message)}`;
    } else {
      window.location.href = `https://wa.me/5521998222062?text=${encodeURIComponent(message)}`;
    }
  });
  commentForm.querySelectorAll('button[data-channel]').forEach(button => { button.disabled = false; });
}
