import "./admin.css";
import { supabase } from "./supabase.js";
import { ADMIN_EMAIL_DOMAIN } from "./config.js";
import { runImport, catalogVersion } from "./import.js";
import { renderGenericList, renderGenericForm } from "./screens.js";
import { renderCustomPageForm, loadCustomPages, customPageCards } from "./custom-pages.js";
import { renderIconsScreen, renderPhilosophyScreen } from "./v3-screens.js";
import { renderStringList, renderStringForm } from "./strings-screens.js";
import { renderSettingsForm } from "./settings-screen.js";
import { productsConfig, loadProductOptions, buildProductFields } from "./product-config.js";
import { brandsConfig, designersConfig } from "./entity-configs.js";

const ENTITY_CONFIGS = { brands: brandsConfig, designers: designersConfig };

const root = document.getElementById("admin");
let session = null;

async function bootstrap() {
  const { data } = await supabase.auth.getSession();
  session = data.session;
  supabase.auth.onAuthStateChange((_event, s) => {
    session = s;
    render();
  });
  render();
}

function render() {
  if (session) renderApp();
  else renderLogin();
}

function renderLogin() {
  root.innerHTML = "";
  const w = el("div", "login-wrap");
  const form = el("form", "login");
  form.innerHTML =
    '<div class="login-brand">E T E R N A</div>' +
    '<div class="login-head">' +
    '<p class="login-sub">Hyni në panelin e administrimit të ETERNA.</p></div>' +
    '<div class="fld"><label for="u">EMAIL</label>' +
    '<input id="u" name="email" type="email" autocomplete="username" placeholder="info@eterna-design.com" required></div>' +
    '<div class="fld"><label for="p">FJALËKALIMI</label>' +
    '<div class="pw-wrap"><input id="p" name="password" type="password" autocomplete="current-password" placeholder="Shkruani fjalëkalimin tuaj" required>' +
    '<button type="button" class="pw-toggle" aria-label="Shfaq fjalëkalimin" tabindex="-1"></button></div></div>' +
    '<p class="err" id="err"></p>' +
    '<button class="btn login-btn" type="submit" id="submit">HYR NË LLOGARI</button>';
  const pwInput = form.querySelector("#p");
  const pwToggle = form.querySelector(".pw-toggle");
  pwToggle.addEventListener("click", () => {
    const show = pwInput.type === "password";
    pwInput.type = show ? "text" : "password";
    pwToggle.classList.toggle("show", show);
    pwToggle.setAttribute("aria-label", show ? "Fshih fjalëkalimin" : "Shfaq fjalëkalimin");
  });
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const err = form.querySelector("#err");
    const btn = form.querySelector("#submit");
    const emailVal = form.querySelector("#u").value.trim();
    const password = form.querySelector("#p").value;
    if (!emailVal || !password) {
      err.textContent = "Plotëso email-in dhe fjalëkalimin.";
      return;
    }
    btn.disabled = true;
    err.textContent = "";
    const email = emailVal.indexOf("@") > -1 ? emailVal : emailVal + "@" + ADMIN_EMAIL_DOMAIN;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      err.textContent = "Email ose fjalëkalimi i gabuar";
      btn.disabled = false;
    }
  });
  w.appendChild(form);
  root.appendChild(w);
}

const NAV = [
  { id: "dashboard", label: "Dashboard" },
  { id: "products", label: "Produktet" },
  { id: "brands", label: "Markat" },
  { id: "designers", label: "Projektuesit" },
  { id: "icons", label: "Ikonat" },
  { id: "philosophy", label: "Filozofia" },
  { id: "strings", label: "Tekstet e faqes" },
  { id: "pages", label: "Faqe shtesë" },
  { id: "settings", label: "Cilësimet" },
];

let view = parseHash();
window.addEventListener("hashchange", () => {
  view = parseHash();
  if (session) {
    const main = document.getElementById("main");
    if (main) renderSection(main);
    syncSidebar();
  }
});

function parseHash() {
  const h = (location.hash || "").replace(/^#/, "");
  const parts = h.split("/");
  return { section: parts[0] || "dashboard", arg: parts[1] || "" };
}

function renderApp() {
  root.innerHTML = "";
  const shell = el("div", "shell");
  shell.appendChild(sidebar());
  const main = el("div", "main");
  main.id = "main";
  shell.appendChild(main);
  root.appendChild(shell);
  renderSection(main);
}

function sidebar() {
  const side = el("aside", "side");
  const brand = el("div", "brand");
  brand.textContent = "ETERNA";
  side.appendChild(brand);
  for (const item of NAV) {
    const a = el("a");
    a.href = "#" + item.id;
    a.textContent = item.label;
    a.dataset.nav = item.id;
    if (view.section === item.id) a.classList.add("on");
    side.appendChild(a);
  }
  const spacer = el("div", "spacer");
  side.appendChild(spacer);
  const logout = el("a", "logout");
  logout.textContent = "Dilni";
  logout.href = "#";
  logout.addEventListener("click", async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();
  });
  side.appendChild(logout);
  return side;
}

function syncSidebar() {
  document.querySelectorAll(".side a[data-nav]").forEach((a) => {
    a.classList.toggle("on", a.dataset.nav === view.section);
  });
}

async function renderSection(main) {
  main.innerHTML = '<p class="lead">Po ngarkohet…</p>';
  try {
    switch (view.section) {
      case "dashboard":
        return await renderDashboard(main);
      case "products":
        return view.arg
          ? await renderProductForm(main)
          : await renderGenericList(main, productsConfig);
      case "pages": {
        const arg = decodeURIComponent(view.arg);
        if (!arg) return await renderCustomPageList(main);
        return await renderCustomPageForm(main, arg);
      }
      case "icons":
        return await renderIconsScreen(main);
      case "philosophy":
        return await renderPhilosophyScreen(main);
      case "brands":
      case "designers": {
        const cfg = ENTITY_CONFIGS[view.section];
        return view.arg
          ? await renderGenericForm(main, { ...cfg, arg: view.arg })
          : await renderGenericList(main, cfg);
      }
      case "strings":
        return view.arg
          ? await renderStringForm(main, decodeURIComponent(view.arg))
          : await renderStringList(main);
      case "settings":
        return await renderSettingsForm(main);
      default:
        return await renderDashboard(main);
    }
  } catch (e) {
    main.innerHTML = '<p class="err">Gabim: ' + esc(e.message) + "</p>";
  }
}

const DASHBOARD_SECTIONS = [
  { section: "products", label: "Produktet" },
  { section: "brands", label: "Markat" },
  { section: "designers", label: "Projektuesit" },
];

async function renderCustomPageList(main) {
  const pages = await loadCustomPages();
  main.innerHTML = "";
  main.appendChild(h("h1", "Faqe shtesë"));
  main.appendChild(p("lead", "Faqe të thjeshta me tekst (p.sh. Termat, Privatësia). Linku shfaqet te footer-i ose te menuja \"About us\", sipas cilësimit të faqes. Tekstet e faqeve kryesore ndryshohen te \"Tekstet e faqes\"."));
  const toolbar = el("div", "toolbar");
  const addBtn = el("button", "btn");
  addBtn.type = "button";
  addBtn.textContent = "+ Shto faqe të re";
  addBtn.addEventListener("click", () => { location.hash = "pages/new"; });
  toolbar.appendChild(addBtn);
  main.appendChild(toolbar);
  const grid = el("div", "cards");
  for (const card of customPageCards(pages, () => renderCustomPageList(main))) grid.appendChild(card);
  main.appendChild(grid);
}

async function renderDashboard(main) {
  main.innerHTML = "";
  main.appendChild(h("h1", "Dashboard"));
  main.appendChild(p("lead", "Përmbledhje e të dhënave në databazë."));

  const counts = await Promise.all(
    DASHBOARD_SECTIONS.map(async (s) => {
      const table = s.section;
      const { count, error } = await supabase
        .from(table)
        .select("*", { count: "exact", head: true });
      return { section: s.section, label: s.label, n: error ? "—" : count };
    })
  );

  const cards = el("div", "cards");
  for (const c of counts) {
    const card = el("a", "card");
    card.href = "#" + c.section;
    card.style.cursor = "pointer";
    card.innerHTML =
      '<span class="n">' + c.n + '</span><span class="l">' + esc(c.label) + "</span>";
    cards.appendChild(card);
  }
  main.appendChild(cards);

  const actions = el("div", "toolbar");
  const addProduct = el("button", "btn");
  addProduct.type = "button";
  addProduct.textContent = "+ Shto produkt";
  addProduct.addEventListener("click", () => { location.hash = "products/new"; });
  actions.appendChild(addProduct);

  const viewSite = el("a", "btn line");
  viewSite.href = "/";
  viewSite.target = "_blank";
  viewSite.rel = "noopener";
  viewSite.textContent = "Shiko faqen";
  actions.appendChild(viewSite);

  const logoutBtn = el("button", "btn line");
  logoutBtn.type = "button";
  logoutBtn.textContent = "Dilni";
  logoutBtn.addEventListener("click", async () => { await supabase.auth.signOut(); });
  actions.appendChild(logoutBtn);
  main.appendChild(actions);

  if ((await catalogVersion()) !== "v3") {
    const box = el("div", "import-box");
    box.innerHTML =
      "<h3>Kalimi te katalogu i ri (V3)</h3>" +
      "<p>Databaza ka ende katalogun e vjetër. Ky hap fut në databazë katalogun e ri nga data.js: markat, projektuesit, produktet, ikonat dhe filozofinë. " +
      "Produktet, markat dhe projektuesit e vjetër që nuk janë në katalogun e ri fshihen, si edhe tekstet e vjetra të faqes. Cilësimet dhe faqet shtesë mbeten. " +
      "Deri sa ta bësh këtë, faqja publike shfaq katalogun nga data.js dhe ndryshimet në admin nuk duken.</p>" +
      '<button class="btn" id="import-btn">Importo katalogun V3</button>' +
      '<p class="res" id="import-res"></p>';
    main.appendChild(box);

    box.querySelector("#import-btn").addEventListener("click", async () => {
      const btn = box.querySelector("#import-btn");
      const res = box.querySelector("#import-res");
      if (!confirm("Të importohet katalogu V3? Produktet e vjetra që nuk janë në katalogun e ri do të fshihen.")) return;
      btn.disabled = true;
      btn.textContent = "Po importon…";
      res.textContent = "";
      res.style.color = "";
      try {
        const out = await runImport((step) => { res.textContent = step; });
        const lines = [];
        for (const k in out) lines.push(k + ": " + out[k]);
        res.textContent = "U importua me sukses.\n" + lines.join("\n");
        res.style.color = "var(--ok)";
      } catch (e) {
        res.textContent = "Gabim: " + e.message;
        res.style.color = "var(--danger)";
      } finally {
        btn.disabled = false;
        btn.textContent = "Importo katalogun V3";
      }
    });
  }
}



function el(tag, cls) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  return e;
}
function h(tag, text) {
  const e = el(tag);
  e.textContent = text;
  return e;
}
function p(cls, text) {
  const e = el("p", cls);
  e.textContent = text;
  return e;
}
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );
}

async function renderProductForm(main) {
  const opts = await loadProductOptions();
  const config = {
    ...productsConfig,
    arg: view.arg,
    buildFields: (data) => buildProductFields(data, opts),
  };
  await renderGenericForm(main, config);
}

bootstrap();
