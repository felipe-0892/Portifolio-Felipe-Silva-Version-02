 /* ── THEME TOGGLE ── */
  const html = document.documentElement;
  const toggles = [document.getElementById('theme-toggle'), document.getElementById('theme-toggle-mob')];

  function applyTheme(dark) {
    html.setAttribute('data-theme', dark ? 'dark' : 'light');
    toggles.forEach(t => { if (t) t.innerHTML = dark ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>'; });
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  const saved = localStorage.getItem('theme');
  let isDark = saved ? saved === 'dark' : true;
  applyTheme(isDark);

  toggles.forEach(t => { if (t) t.addEventListener('click', () => { isDark = !isDark; applyTheme(isDark); }); });

  /* ── SMOOTH SCROLL ── */
  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    const collapse = document.getElementById('navMenu');
    if (collapse.classList.contains('show')) {
      bootstrap.Collapse.getInstance(collapse)?.hide();
    }
  }

  /* ── TYPED TEXT ── */
  const fullText = "Transformando ideias em soluções digitais";
  const el = document.getElementById('typed');
  let i = 0;
  (function type() {
    if (i <= fullText.length) { el.textContent = fullText.slice(0, i++); setTimeout(type, 80); }
  })();

  /* ── INTERSECTION OBSERVER (scroll animations + skill bars) ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');

      // Animate skill bars inside this element
      entry.target.querySelectorAll('.skill-item').forEach(item => {
        const level = item.dataset.level;
        const fill = item.querySelector('.skill-fill');
        if (fill) setTimeout(() => { fill.style.width = level + '%'; }, 200);
      });

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });


/* ── CONTATO WHATSAPP ── */
function enviarWhatsApp() {
    const nome     = document.getElementById('contactNome').value.trim();
    const email    = document.getElementById('contactEmail').value.trim();
    const mensagem = document.getElementById('contactMensagem').value.trim();

    if (!nome || !email || !mensagem) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const texto = `Olá! Me chamo *${nome}*.\n📧 Email: ${email}\n\n💬 ${mensagem}`;
    const url   = `https://wa.me/5579999107255?text=${encodeURIComponent(texto)}`;

    // Abre o WhatsApp
    window.open(url, '_blank');

    // Mostra o toast
    const toastEl = document.getElementById('toastSucesso');
    const toast   = new bootstrap.Toast(toastEl, { delay: 4000 });
    toast.show();

    // Limpa os campos
    document.getElementById('contactNome').value     = '';
    document.getElementById('contactEmail').value    = '';
    document.getElementById('contactMensagem').value = '';
}
  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => observer.observe(el));