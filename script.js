/* =========================================================
   Conejito Web Solutions — script.js
   ========================================================= */

/* =========================================================
   1) DADOS EDITÁVEIS  (altere aqui facilmente)
   ========================================================= */
const CONFIG = {
  // WhatsApp no formato internacional, somente números (55 + DDD + número)
  whatsapp: "5561991779096",

  // Contatos e redes sociais
  email: "contato@conejitoweb.com.br",
  instagram: "https://instagram.com/conejitoweb",
  facebook: "https://facebook.com/conejitoweb",

  // Mensagem padrão usada nos botões de orçamento
  mensagemOrcamento:
    "Olá! Conheci a Conejito Web Solutions pelo site e gostaria de solicitar um orçamento.",

  // Projetos do portfólio (edite livremente)
  projetos: [
    {
      nome: "Barbearia Estilo",
      categoria: "Site para Barbearia",
      descricao:
        "Site moderno com agendamento, galeria de serviços e integração com WhatsApp.",
      imagem:
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
      link: "#", // troque pelo link real do projeto
    },
    {
      nome: "Feito Pra Você Universitário",
      categoria: "Loja / Catálogo Digital",
      descricao:
        "Catálogo digital de produtos personalizados com pedidos direto pelo WhatsApp.",
      imagem:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      link: "#", // troque pelo link real do projeto
    },
    {
      nome: "Negócio Local",
      categoria: "Site Institucional",
      descricao:
        "Presença digital profissional com mapa, serviços e contato facilitado.",
      imagem:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
      link: "#", // troque pelo link real do projeto
    },
  ],
};

/* Helpers para montar links */
const wppLink = (msg) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

/* =========================================================
   2) INICIALIZAÇÃO
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileMenu();
  initWhatsappButtons();
  initSocialLinks();
  initPortfolio();
  initFaq();
  initContactForm();
  initScrollReveal();
  initActiveNav();
});

/* =========================================================
   3) CABEÇALHO que muda no scroll
   ========================================================= */
function initHeaderScroll() {
  const header = document.getElementById("header");
  const onScroll = () => {
    header.classList.toggle("header--scrolled", window.scrollY > 20);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* =========================================================
   4) MENU MOBILE (hambúrguer)
   ========================================================= */
function initMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  // Fecha ao clicar em um link
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", closeMenu)
  );

  // Fecha com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

/* =========================================================
   5) BOTÕES DE WHATSAPP (orçamento)
   ========================================================= */
function initWhatsappButtons() {
  const link = wppLink(CONFIG.mensagemOrcamento);
  document.querySelectorAll('[data-whatsapp="orcamento"]').forEach((el) => {
    el.setAttribute("href", link);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
}

/* =========================================================
   6) LINKS SOCIAIS (rodapé)
   ========================================================= */
function initSocialLinks() {
  const map = {
    whatsapp: wppLink(CONFIG.mensagemOrcamento),
    instagram: CONFIG.instagram,
    facebook: CONFIG.facebook,
    email: `mailto:${CONFIG.email}`,
  };
  document.querySelectorAll("[data-social]").forEach((el) => {
    const key = el.getAttribute("data-social");
    if (map[key]) el.setAttribute("href", map[key]);
  });
}

/* =========================================================
   7) PORTFÓLIO (renderizado a partir do CONFIG)
   ========================================================= */
function initPortfolio() {
  const grid = document.getElementById("portfolioGrid");
  if (!grid) return;

  grid.innerHTML = CONFIG.projetos
    .map((p) => {
      const similar = wppLink(
        `Olá! Vi o projeto "${p.nome}" no site da Conejito Web Solutions e gostaria de algo parecido.`
      );
      return `
      <article class="card card--portfolio reveal" data-reveal="up">
        <div class="portfolio__img">
          <img src="${p.imagem}" alt="Projeto: ${p.nome}" loading="lazy" />
        </div>
        <div class="portfolio__body">
          <span class="portfolio__cat">${p.categoria}</span>
          <h3>${p.nome}</h3>
          <p>${p.descricao}</p>
          <div class="portfolio__actions">
            <a class="btn btn--ghost" href="${p.link}" target="_blank" rel="noopener">Ver projeto</a>
            <a class="btn btn--primary" href="${similar}" target="_blank" rel="noopener">Quero algo parecido</a>
          </div>
        </div>
      </article>`;
    })
    .join("");
}

/* =========================================================
   8) FAQ (acordeão acessível)
   ========================================================= */
function initFaq() {
  const items = document.querySelectorAll(".faq__item");
  items.forEach((item) => {
    const btn = item.querySelector(".faq__question");
    const answer = item.querySelector(".faq__answer");

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // Fecha todos (comportamento de acordeão)
      items.forEach((other) => {
        other.classList.remove("is-open");
        other.querySelector(".faq__question").setAttribute("aria-expanded", "false");
        other.querySelector(".faq__answer").style.maxHeight = null;
      });

      // Abre o atual (se estava fechado)
      if (!isOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

/* =========================================================
   9) FORMULÁRIO DE CONTATO (validação + envio WhatsApp)
   ========================================================= */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const setError = (name, msg) => {
    const group = form.querySelector(`[name="${name}"]`).closest(".form__group");
    const errorEl = form.querySelector(`[data-error-for="${name}"]`);
    if (group) group.classList.toggle("has-error", Boolean(msg));
    if (errorEl) errorEl.textContent = msg || "";
  };

  // Limpa erro ao digitar
  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => setError(field.name, ""));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      nome: form.nome.value.trim(),
      empresa: form.empresa.value.trim(),
      whatsapp: form.whatsapp.value.trim(),
      email: form.email.value.trim(),
      tipo: form.tipo.value,
      mensagem: form.mensagem.value.trim(),
    };

    let valido = true;

    if (!data.nome) {
      setError("nome", "Por favor, informe seu nome.");
      valido = false;
    }
    // valida telefone (mínimo 8 dígitos)
    if (!data.whatsapp || data.whatsapp.replace(/\D/g, "").length < 8) {
      setError("whatsapp", "Informe um número de WhatsApp válido.");
      valido = false;
    }
    // valida e-mail
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setError("email", "Informe um e-mail válido.");
      valido = false;
    }
    if (!data.tipo) {
      setError("tipo", "Selecione o tipo de site.");
      valido = false;
    }
    if (!data.mensagem) {
      setError("mensagem", "Escreva uma mensagem.");
      valido = false;
    }

    if (!valido) {
      // foca no primeiro campo com erro
      const firstError = form.querySelector(".has-error input, .has-error select, .has-error textarea");
      if (firstError) firstError.focus();
      return;
    }

    // Monta a mensagem para o WhatsApp
    const texto =
      `*Novo contato pelo site - Conejito Web Solutions*\n\n` +
      `*Nome:* ${data.nome}\n` +
      (data.empresa ? `*Empresa:* ${data.empresa}\n` : "") +
      `*WhatsApp:* ${data.whatsapp}\n` +
      `*E-mail:* ${data.email}\n` +
      `*Tipo de site:* ${data.tipo}\n` +
      `*Mensagem:* ${data.mensagem}`;

    window.open(wppLink(texto), "_blank", "noopener");
    form.reset();
  });
}

/* =========================================================
   10) ANIMAÇÕES DE SCROLL (Intersection Observer)
   ========================================================= */
function initScrollReveal() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const elements = document.querySelectorAll(".reveal");

  if (reduce || !("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // efeito em sequência (stagger) para grupos de cards
          const delay = entry.target.dataset.delay || (i % 4) * 90;
          setTimeout(() => entry.target.classList.add("is-visible"), delay);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

/* =========================================================
   11) NAVEGAÇÃO ATIVA conforme a seção visível
   ========================================================= */
function initActiveNav() {
  const links = document.querySelectorAll(".nav__link");
  const sections = [...links]
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((l) =>
            l.classList.toggle("is-active", l.getAttribute("href") === `#${id}`)
          );
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((s) => observer.observe(s));
}
