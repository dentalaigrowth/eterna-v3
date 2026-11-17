/* Brand and designer forms for the V3 catalogue. Each config reuses the
   generic list + form from screens.js and saves the same data shape as public/data.js. */

import { supabase } from "./supabase.js";
import { el, biText, textInput, selectField, imageInput, toggle, paragraphList, worksEditor, slugify } from "./fields.js";

/* ---------- Facts editor (brand page: year + short line, bilingual) ---------- */
function factsEditor(label, facts, opts = {}) {
  const wrap = el("div", "fld works-editor");
  wrap.dataset.field = opts.key || "";
  const lab = el("label", "fld-lab");
  lab.textContent = label;
  wrap.appendChild(lab);
  const items = (facts || []).map((f) => ({ y: String(f[0] || ""), en: (f[1] && f[1].en) || "", sq: (f[1] && f[1].sq) || "" }));
  const list = el("div", "works-list");
  const COLS = "90px 1fr 1fr 32px";
  function render() {
    list.innerHTML = "";
    const head = el("div", "works-head");
    head.style.gridTemplateColumns = COLS;
    ["Viti", "EN", "SQ", ""].forEach((h) => { const s = el("span"); s.textContent = h; head.appendChild(s); });
    list.appendChild(head);
    items.forEach((it, i) => {
      const row = el("div", "work-row");
      row.style.gridTemplateColumns = COLS;
      for (const k of ["y", "en", "sq"]) {
        const inp = el("input");
        inp.type = "text";
        inp.value = it[k];
        inp.addEventListener("input", () => { it[k] = inp.value; });
        row.appendChild(inp);
      }
      const del = el("button", "gal-btn gal-del");
      del.type = "button";
      del.textContent = "×";
      del.addEventListener("click", () => { items.splice(i, 1); render(); });
      row.appendChild(del);
      list.appendChild(row);
    });
  }
  render();
  const add = el("button", "btn line works-add");
  add.type = "button";
  add.textContent = "+ Shto";
  add.addEventListener("click", () => { items.push({ y: "", en: "", sq: "" }); render(); });
  wrap.append(list, add);
  wrap._collect = () => items.filter((it) => it.y || it.en || it.sq).map((it) => [it.y.trim(), { en: it.en.trim(), sq: it.sq.trim() }]);
  return wrap;
}

const nameOf = (data) => (data && (typeof data.name === "string" ? data.name : data.name && data.name.en)) || "—";

/* ---------- Brands ---------- */
/* { name, origin:{en,sq}, tag:{en,sq}, intro:{en,sq}, history:{en:[],sq:[]}, facts:[[year,{en,sq}]], hero?, code? } */

export const brandsConfig = {
  table: "brands",
  label: "Markat",
  thumbnailField: "hero",
  autoSlug: true,
  fields: [
    { key: "name", label: "Emri", required: true },
    { key: "origin", label: "Origjina", required: true },
  ],
  formSections: [
    { heading: "Të dhënat e markës", keys: ["name", "origin", "tag", "hero"], side: true },
    { heading: "Hyrja", keys: ["intro"] },
    { heading: "Historia (paragrafë)", keys: ["history"] },
    { heading: "Datat kryesore", keys: ["facts"], fullWidth: true },
  ],
  buildFields(data) {
    const d = data || {};
    return [
      textInput("Emri", d.name, { key: "name", required: true }),
      biText("Origjina (p.sh. Copenhagen, since 1872)", d.origin, { key: "origin", required: true }),
      biText("Slogani i shkurtër", d.tag, { key: "tag", long: true, rows: 2 }),
      imageInput("Imazhi i kopertinës (opsional)", d.hero, { key: "hero", hint: "Bosh = zgjidhet automatikisht nga produktet e markës." }),
      biText("Hyrja", d.intro, { key: "intro", long: true, rows: 4 }),
      paragraphList("Historia", d.history, { key: "history" }),
      factsEditor("Datat kryesore (shfaqen si kolona në faqen e markës)", d.facts, { key: "facts" }),
    ];
  },
  collectData(c, existing) {
    const out = {
      ...existing,
      name: String(c.name || "").trim(),
      origin: c.origin,
      tag: c.tag,
      intro: c.intro,
      history: c.history,
      facts: c.facts,
    };
    if (c.hero && c.hero.trim()) out.hero = c.hero.trim();
    else delete out.hero;
    return out;
  },
  extractName: nameOf,
  deleteConfig: {
    depKey: "b",
    entityLabel: "markë",
    otherTable: "brands",
    allowRemove: false,
    allowUnpublish: true,
    unpublishLabel: "Çpubliko markën në vend të fshirjes",
  },
  async buildRowCount(row, nameTd) {
    const { data: products, error } = await supabase.from("products").select("id, data").range(0, 4999);
    if (error || !products) return;
    const count = products.filter((p) => p.data && p.data.b === row.id).length;
    const cnt = document.createElement("span");
    cnt.className = "row-count";
    cnt.textContent = count + " produkt" + (count === 1 ? "" : "e");
    cnt.style.cssText = "display:block;font-size:.74rem;color:var(--muted);margin-top:2px";
    nameTd.appendChild(cnt);
  },
};

/* ---------- Designers ---------- */
/* { name, short?, life, country:{en,sq}, bio:{en,sq}, story:{en:[],sq:[]}, works:[[title, year, productId]],
     brand, m: text that matches the product "designer" field, portrait?: 1 } */

async function loadOptions() {
  const [products, brands] = await Promise.all([
    supabase.from("products").select("id, data").order("sort_order").range(0, 4999),
    supabase.from("brands").select("id, data").order("sort_order"),
  ]);
  return {
    productOpts: (products.data || []).map((r) => ({ value: r.id, label: (r.data && r.data.n) || r.id })),
    brandOpts: (brands.data || []).map((r) => ({ value: r.id, label: (r.data && r.data.name) || r.id })),
  };
}

export const designersConfig = {
  table: "designers",
  label: "Projektuesit",
  autoSlug: true,
  fields: [
    { key: "name", label: "Emri", required: true },
    { key: "brand", label: "Marka", required: true },
    { key: "m", label: "Emri në produkte", required: true },
  ],
  formSections: [
    { heading: "Të dhënat e projektuesit", keys: ["name", "short", "m", "brand", "life", "country", "portrait"], side: true },
    { heading: "Bio e shkurtër", keys: ["bio"] },
    { heading: "Historia (paragrafë)", keys: ["story"] },
    { heading: "Veprat", keys: ["works"], fullWidth: true },
  ],
  async buildFields(data) {
    const d = data || {};
    const opts = await loadOptions();
    const works = (d.works || []).map((w) => [w[0], w[1], "", w[2] || ""]);
    return [
      textInput("Emri", d.name, { key: "name", required: true }),
      textInput("Emri i shkurtër (opsional)", d.short, { key: "short" }),
      textInput("Emri në produkte", d.m, { key: "m", required: true, placeholder: "p.sh. Jacobsen" }),
      selectField("Marka", d.brand || "", opts.brandOpts, { key: "brand", required: true, allowEmpty: true, emptyLabel: "— zgjidh —" }),
      textInput("Vitet (p.sh. 1902–1971 ose b. 1972)", d.life, { key: "life" }),
      biText("Vendi", d.country, { key: "country" }),
      toggle("Ka portret (foto portrait-<id> në Cloudinary)", d.portrait, { key: "portrait" }),
      biText("Bio e shkurtër", d.bio, { key: "bio", long: true, rows: 3 }),
      paragraphList("Historia", d.story, { key: "story" }),
      worksEditor("Veprat", works, { key: "works", productOpts: opts.productOpts, hideProducer: true }),
    ];
  },
  collectData(c, existing) {
    const out = {
      ...existing,
      name: String(c.name || "").trim(),
      life: String(c.life || "").trim(),
      country: c.country,
      bio: c.bio,
      story: c.story,
      works: (c.works || []).filter((w) => w[0]).map((w) => [w[0], w[1] || "", w[3] || ""]),
      brand: c.brand,
      m: String(c.m || "").trim(),
    };
    if (c.short && c.short.trim()) out.short = c.short.trim();
    else delete out.short;
    if (c.portrait) out.portrait = 1;
    else delete out.portrait;
    return out;
  },
  extractName: nameOf,
  async buildExtra(data) {
    const m = data && data.m;
    if (!m) return null;
    const { data: products } = await supabase.from("products").select("id, data").order("sort_order").range(0, 4999);
    const list = (products || []).filter((p) => p.data && p.data.d && p.data.d.indexOf(m) > -1);
    if (!list.length) return null;
    const box = el("div", "related-box");
    const h = el("div", "card-h");
    h.textContent = "Produkte të lidhura";
    const cnt = el("div", "related-count");
    cnt.textContent = list.length + " produkt" + (list.length > 1 ? "e" : "");
    const links = el("div", "related-list");
    for (const p of list) {
      const a = el("a");
      a.href = "#products/" + encodeURIComponent(p.id);
      a.textContent = p.data.n || p.id;
      links.appendChild(a);
    }
    box.append(h, cnt, links);
    return box;
  },
};

/* ---------- Generate unique slug ---------- */
export async function generateUniqueSlug(table, base) {
  let slug = slugify(base);
  if (!slug) slug = "item";
  let candidate = slug;
  let suffix = 1;
  while (true) {
    const { data, error } = await supabase.from(table).select("id").eq("id", candidate).maybeSingle();
    if (error) break;
    if (!data) return candidate;
    suffix++;
    candidate = slug + "-" + String(suffix).padStart(2, "0");
  }
  return candidate;
}
