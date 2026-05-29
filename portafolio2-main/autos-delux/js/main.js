const CARS = [
  {
    id: 1,
    name: "Mercedes-AMG GT 63 S",
    year: 2024,
    category: "deportivo",
    badge: "Nuevo ingreso",
    price: 189900,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
    description: "Berlina deportiva de cuatro puertas con motor V8 biturbo de 630 CV y traccion integral AMG Performance 4MATIC+.",
    specs: {
      motor: "4.0L V8 Biturbo",
      potencia: "630 CV",
      aceleracion: "3.2 s (0-100)",
      transmision: "AMG SPEEDSHIFT 9G",
    },
  },
  {
    id: 2,
    name: "BMW Serie 7 760i xDrive",
    year: 2024,
    category: "sedan",
    badge: "Executive",
    price: 142500,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
    description: "Sedan de lujo con paquete M, pantalla curva BMW Curved Display y asistentes de conduccion de ultima generacion.",
    specs: {
      motor: "3.0L 6 cil. mild-hybrid",
      potencia: "544 CV",
      aceleracion: "4.1 s (0-100)",
      transmision: "Automatica 8 vel.",
    },
  },
  {
    id: 3,
    name: "Range Rover Sport Autobiography",
    year: 2023,
    category: "suv",
    badge: "4x4 Premium",
    price: 128900,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
    description: "SUV britanico con suspension neumatica, interior en cuero Windsor y sistema Terrain Response 2.",
    specs: {
      motor: "3.0L I6 mild-hybrid",
      potencia: "400 CV",
      aceleracion: "5.9 s (0-100)",
      transmision: "Automatica 8 vel.",
    },
  },
  {
    id: 4,
    name: "Porsche Taycan Turbo S",
    year: 2024,
    category: "electrico",
    badge: "100% Electrico",
    price: 198500,
    image: "https://images.unsplash.com/photo-1614162692292-7d56a786ed2c?auto=format&fit=crop&w=1200&q=80",
    description: "Superdeportivo electrico con dos motores, Launch Control y autonomia de hasta 450 km en ciclo WLTP.",
    specs: {
      motor: "Dual motor electrico",
      potencia: "761 CV",
      aceleracion: "2.8 s (0-100)",
      autonomia: "450 km WLTP",
    },
  },
  {
    id: 5,
    name: "Audi RS e-tron GT",
    year: 2023,
    category: "electrico",
    badge: "Gran Turismo",
    price: 156000,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
    description: "Gran turismo electrico con quattro permanente, torque vectoring y frenos ceramicos opcionales.",
    specs: {
      motor: "Dual motor electrico",
      potencia: "646 CV",
      aceleracion: "3.3 s (0-100)",
      autonomia: "472 km WLTP",
    },
  },
  {
    id: 6,
    name: "Lamborghini Huracan EVO",
    year: 2022,
    category: "deportivo",
    badge: "Edicion limitada",
    price: 312000,
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80",
    description: "Superdeportivo italiano con motor V10 atmosferico, LDVI 2.0 y modos de conduccion Strada, Sport y Corsa.",
    specs: {
      motor: "5.2L V10",
      potencia: "640 CV",
      aceleracion: "2.9 s (0-100)",
      transmision: "LDF 7 vel.",
    },
  },
];

const CATEGORY_LABELS = {
  todos: "Todos",
  deportivo: "Deportivos",
  sedan: "Sedan",
  suv: "SUV",
  electrico: "Electricos",
};

const formatPrice = (value) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const catalogGrid = document.getElementById("catalogGrid");
const filtersWrap = document.getElementById("filters");
const emptyState = document.getElementById("emptyState");
const modalOverlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");
const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");
const yearEl = document.getElementById("year");

let activeFilter = "todos";

const renderFilters = () => {
  filtersWrap.innerHTML = Object.entries(CATEGORY_LABELS)
    .map(
      ([key, label]) =>
        `<button class="filter-btn ${key === activeFilter ? "active" : ""}" data-filter="${key}">${label}</button>`
    )
    .join("");
};

const renderCatalog = () => {
  const filtered =
    activeFilter === "todos" ? CARS : CARS.filter((car) => car.category === activeFilter);

  catalogGrid.innerHTML = filtered
    .map(
      (car, index) => `
      <article class="car-card" style="animation-delay: ${index * 0.06}s" data-id="${car.id}">
        <div class="car-media">
          <img src="${car.image}" alt="${car.name}" loading="lazy" width="600" height="375">
          <span class="car-badge">${car.badge}</span>
        </div>
        <div class="car-body">
          <div class="car-meta">
            <h3>${car.name}</h3>
            <span class="car-year">${car.year}</span>
          </div>
          <p class="car-desc">${car.description.slice(0, 90)}...</p>
          <div class="car-specs">
            <span class="spec-tag">${car.specs.motor}</span>
            <span class="spec-tag">${car.specs.potencia}</span>
          </div>
          <div class="car-footer">
            <span class="price">${formatPrice(car.price)}</span>
            <button class="btn-detail" data-id="${car.id}">Ver detalle</button>
          </div>
        </div>
      </article>
    `
    )
    .join("");

  emptyState.classList.toggle("visible", filtered.length === 0);
};

const openModal = (carId) => {
  const car = CARS.find((item) => item.id === Number(carId));
  if (!car) return;

  const specEntries = Object.entries(car.specs);

  modalContent.innerHTML = `
    <div class="modal-header">
      <img src="${car.image}" alt="${car.name}">
      <button class="modal-close" id="modalClose" aria-label="Cerrar">&times;</button>
    </div>
    <div class="modal-body">
      <h2>${car.name}</h2>
      <p class="modal-subtitle">Modelo ${car.year} · ${CATEGORY_LABELS[car.category]}</p>
      <p class="sans" style="color: var(--muted); margin-bottom: 1.5rem;">${car.description}</p>
      <div class="modal-specs-grid">
        ${specEntries
          .map(
            ([key, value]) => `
          <div class="modal-spec">
            <span>${key}</span>
            <strong>${value}</strong>
          </div>
        `
          )
          .join("")}
      </div>
      <p class="modal-price">${formatPrice(car.price)}</p>
      <button class="btn btn-primary" id="modalCta">Solicitar cotizacion</button>
    </div>
  `;

  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";

  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalCta").addEventListener("click", () => {
    closeModal();
    document.getElementById("contacto").scrollIntoView({ behavior: "smooth" });
    const modelSelect = document.getElementById("model");
    if (modelSelect) modelSelect.value = car.name;
  });
};

const closeModal = () => {
  modalOverlay.classList.remove("open");
  document.body.style.overflow = "";
};

filtersWrap.addEventListener("click", (event) => {
  const button = event.target.closest(".filter-btn");
  if (!button) return;
  activeFilter = button.dataset.filter;
  renderFilters();
  renderCatalog();
});

catalogGrid.addEventListener("click", (event) => {
  const detailBtn = event.target.closest(".btn-detail");
  if (detailBtn) openModal(detailBtn.dataset.id);
});

modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

menuBtn.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => mainNav.classList.remove("open"));
});

const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get("name")?.toString().trim();
  const email = data.get("email")?.toString().trim();

  if (!name || !email) {
    formMsg.textContent = "Completa nombre y correo para continuar.";
    formMsg.className = "form-msg";
    return;
  }

  formMsg.textContent = `Gracias ${name}. Un asesor de Autos Delux te contactara pronto.`;
  formMsg.className = "form-msg success";
  contactForm.reset();
});

if (yearEl) yearEl.textContent = new Date().getFullYear();

renderFilters();
renderCatalog();
