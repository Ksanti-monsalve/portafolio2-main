const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");
const year = document.getElementById("year");
const typingText = document.getElementById("typingText");
const sendBtn = document.getElementById("sendBtn");
const langToggle = document.getElementById("langToggle");

let currentLang = "es";

const i18n = {
  es: {
    menu_btn: "Menu",
    nav_inicio: "Inicio",
    nav_sobre_mi: "Sobre mi",
    nav_proyectos: "Proyectos",
    nav_contacto: "Contacto",
    hero_eyebrow: "Disponible para practicas y proyectos freelance",
    hero_greeting: "Hola, soy",
    hero_desc: "Construyo experiencias web rapidas, modernas y bien cuidadas, combinando logica de programacion y diseno visual.",
    hero_cta: "Ver proyectos",
    hero_role: "Desarrollador Junior",
    about_title: "Sobre mi",
    about_p1: "Soy desarrollador en formacion con enfoque en frontend y bases solidas de programacion. Me caracteriza la disciplina, la atencion al detalle y la capacidad para aprender rapido.",
    about_p2: "Tambien cuento con experiencia tecnica en el area electrica, lo que me ha dado una forma estructurada de resolver problemas.",
    skills_title: "Competencias",
    skill_1: "Liderazgo y trabajo en equipo",
    skill_2: "Comunicacion con cliente",
    skill_3: "Buenas practicas de codigo",
    skill_4: "Adaptacion rapida a nuevos retos",
    projects_kicker: "Seleccion principal",
    projects_title: "Proyectos destacados",
    projects_desc: "Una seleccion de trabajos que muestran mi proceso, codigo y resultados.",
    project_1_desc: "Sitio web de relojes de lujo con diseno elegante, catalogo visual y experiencia de marca premium.",
    project_1_link: "Ver sitio web",
    project_2_desc: "Proyecto practico para reforzar estructuras de codigo, modularidad y pensamiento algoritmico.",
    project_3_desc: "Sitio web responsivo con enfoque en experiencia visual, jerarquia de informacion y conversion.",
    project_link: "Ver repositorio",
    edu_title: "Formacion",
    edu_1: "<strong>Campuslands</strong> - Formacion en desarrollo (2025)",
    edu_2: "<strong>SENA</strong> - Tecnico electricista (2020 - 2021)",
    edu_3: "<strong>Damazo Zapata</strong> - Bachiller (2021)",
    contact_kicker: "Contacto directo",
    contact_title: "Hablemos",
    contact_intro: "Si tienes una idea o quieres colaborar, escribeme y te respondo pronto.",
    contact_phone: "Telefono",
    contact_location: "Ubicacion",
    form_title: "Mensaje rapido",
    form_name: "Nombre",
    form_email: "Correo",
    form_message: "Mensaje",
    form_name_ph: "Tu nombre",
    form_email_ph: "tu@email.com",
    form_message_ph: "Cuentame sobre tu proyecto",
    form_send: "Enviar por email",
    footer_rights: "Todos los derechos reservados."
  },
  en: {
    menu_btn: "Menu",
    nav_inicio: "Home",
    nav_sobre_mi: "About me",
    nav_proyectos: "Projects",
    nav_contacto: "Contact",
    hero_eyebrow: "Available for internships and freelance projects",
    hero_greeting: "Hi, I'm",
    hero_desc: "I build fast, modern and polished web experiences, combining programming logic and visual design.",
    hero_cta: "View projects",
    hero_role: "Junior Developer",
    about_title: "About me",
    about_p1: "I am a junior developer focused on frontend development with solid programming fundamentals. I stand out for discipline, attention to detail and quick learning.",
    about_p2: "I also have a technical background in electricity, which has given me a structured approach to problem solving.",
    skills_title: "Core skills",
    skill_1: "Leadership and teamwork",
    skill_2: "Client communication",
    skill_3: "Good coding practices",
    skill_4: "Fast adaptation to new challenges",
    projects_kicker: "Main selection",
    projects_title: "Featured projects",
    projects_desc: "A selection of work that showcases my process, code and results.",
    project_1_desc: "Luxury watch website with elegant design, visual catalog and a premium brand experience.",
    project_1_link: "View website",
    project_2_desc: "Hands-on project to strengthen code structure, modularity and algorithmic thinking.",
    project_3_desc: "Responsive website focused on visual experience, information hierarchy and conversion.",
    project_link: "View repository",
    edu_title: "Education",
    edu_1: "<strong>Campuslands</strong> - Software development training (2025)",
    edu_2: "<strong>SENA</strong> - Electrical technician (2020 - 2021)",
    edu_3: "<strong>Damazo Zapata</strong> - High school diploma (2021)",
    contact_kicker: "Direct contact",
    contact_title: "Let's talk",
    contact_intro: "If you have an idea or want to collaborate, send me a message and I will reply soon.",
    contact_phone: "Phone",
    contact_location: "Location",
    form_title: "Quick message",
    form_name: "Name",
    form_email: "Email",
    form_message: "Message",
    form_name_ph: "Your name",
    form_email_ph: "you@email.com",
    form_message_ph: "Tell me about your project",
    form_send: "Send by email",
    footer_rights: "All rights reserved."
  }
};

const typingPhrasesByLang = {
  es: [
    "Desarrollador web junior.",
    "Apasionado por interfaces modernas.",
    "Listo para crear proyectos que impactan."
  ],
  en: [
    "Junior web developer.",
    "Passionate about modern interfaces.",
    "Ready to build impactful projects."
  ]
};

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (menuBtn && mainNav) {
  menuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });
}

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function runTypingEffect() {
  if (!typingText) return;

  const typingPhrases = typingPhrasesByLang[currentLang];
  const currentPhrase = typingPhrases[phraseIndex];
  typingText.textContent = currentPhrase.slice(0, charIndex);

  if (!deleting) {
    charIndex += 1;
    if (charIndex > currentPhrase.length) {
      deleting = true;
      setTimeout(runTypingEffect, 1200);
      return;
    }
  } else {
    charIndex -= 1;
    if (charIndex < 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % typingPhrases.length;
      charIndex = 0;
    }
  }

  setTimeout(runTypingEffect, deleting ? 40 : 70);
}

runTypingEffect();

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.setAttribute("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (key && i18n[lang][key]) {
      element.innerHTML = i18n[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (key && i18n[lang][key]) {
      element.setAttribute("placeholder", i18n[lang][key]);
    }
  });

  if (langToggle) {
    langToggle.textContent = lang === "es" ? "EN" : "ES";
  }

  // Reset typing animation when language changes.
  phraseIndex = 0;
  charIndex = 0;
  deleting = false;
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    const newLang = currentLang === "es" ? "en" : "es";
    setLanguage(newLang);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

if (sendBtn) {
  sendBtn.addEventListener("click", () => {
    const name = document.getElementById("name")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const message = document.getElementById("message")?.value.trim() || "";

    const subject = currentLang === "es" ? "Nuevo contacto desde portafolio" : "New contact from portfolio";
    const body =
      currentLang === "es"
        ? `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`
        : `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailto = `mailto:kevinsantiagopinto@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  });
}

