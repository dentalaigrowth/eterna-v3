/* Product form for the V3 catalogue.
   Data shape (same as public/data.js products):
   { id, n: name, b: brand id, d: designer text, y: year, t: type, sub, c: collection, c2: second collection,
     r: [rooms], out: 1 outdoor, cur: 1 curated (has story), f: 1 featured,
     st: {en,sq} story, mat: {en,sq} materials ("a · b · c"), docs, cad: counts, im: [[key, type], ...], v: video } */

import { supabase } from "./supabase.js";
import { biText, textInput, selectField, multiSelect, toggle, suggestInput, typedGallery, thumbUrl } from "./fields.js";

export const TYPE_OPTS = [
  { value: "chairs", label: "Karrige" },
  { value: "armchairs", label: "Kolltukë" },
  { value: "sofas", label: "Divanë" },
  { value: "tables", label: "Tavolina" },
  { value: "shelving", label: "Rafte" },
  { value: "storage", label: "Mobilie sistemimi" },
  { value: "beds", label: "Shtretër" },
  { value: "pendant", label: "Ndriçues të varur" },
  { value: "table-lamp", label: "Llamba tavoline" },
  { value: "floor-lamp", label: "Llamba dyshemeje" },
  { value: "cordless", label: "Llamba pa kabllo" },
  { value: "wall-lamp", label: "Llamba muri" },
  { value: "rugs", label: "Tapete" },
  { value: "textiles", label: "Tekstile" },
  { value: "decor", label: "Dekor" },
  { value: "mirrors", label: "Pasqyra" },
  { value: "kitchen", label: "Kuzhina të jashtme" },
  { value: "shade", label: "Hijezim" },
];
const SUB_OPTS = [
  { value: "dining", label: "Tavolinë ngrënieje (dining)" },
  { value: "coffee", label: "Tavolinë kafeje (coffee)" },
  { value: "side", label: "Tavolinë anësore (side)" },
  { value: "desk", label: "Tavolinë pune (desk)" },
  { value: "stool", label: "Stol (stool)" },
  { value: "office", label: "Zyrë (office)" },
  { value: "lounger", label: "Shezlong (lounger)" },
  { value: "daybed", label: "Daybed" },
  { value: "pouf", label: "Puf (pouf)" },
  { value: "screen", label: "Paravan (screen)" },
  { value: "hall", label: "Hyrje (hall)" },
  { value: "bed", label: "Për dhomë gjumi (bed)" },
  { value: "kids", label: "Fëmijë (kids)" },
  { value: "out", label: "Jashtë (out)" },
];
export const ROOM_OPTS = [
  { value: "living", label: "Dhoma e ndenjes" },
  { value: "dining", label: "Dhoma e ngrënies" },
  { value: "bedroom", label: "Dhoma e gjumit" },
  { value: "kitchen", label: "Kuzhina" },
  { value: "bathroom", label: "Banjo" },
  { value: "hallway", label: "Korridori" },
  { value: "office", label: "Zyra" },
  { value: "outdoor", label: "Jashtë" },
];

let brandNames = {};

export const productsConfig = {
  table: "products",
  label: "Produktet",
  nameKey: "n",
  autoSlug: true,
  perPage: 25,
  fields: [
    { key: "n", label: "Emri", required: true },
    { key: "b", label: "Marka", required: true },
    { key: "t", label: "Lloji", required: true },
  ],
  formSections: [
    { heading: "Produkti", keys: ["n", "d", "st", "mat"] },
    { heading: "Imazhet", keys: ["im"] },
    { heading: "Klasifikimi", keys: ["b", "t", "sub", "c", "c2", "out"], side: true },
    { heading: "Ambientet", keys: ["r"], side: true },
    { heading: "Shfaqja", keys: ["cur", "f"], side: true },
    { heading: "Për arkitektë", keys: ["docs", "cad"], side: true },
  ],
  extractName(d) {
    return (d && (d.n || d.name)) || "—";
  },
  thumb(d) {
    return d.im && d.im[0] ? d.im[0][0] : "";
  },
  rowSub(d) {
    return [brandNames[d.b] || d.b, d.c, d.out ? "Outdoor" : ""].filter(Boolean).join(" · ");
  },
  searchText(d) {
    return [d.d, d.c, d.c2, brandNames[d.b], d.t].filter(Boolean).join(" ");
  },
  filter: {
    label: "Të gjitha markat",
    async options() {
      const { data } = await supabase.from("brands").select("id, data").order("sort_order");
      brandNames = {};
      (data || []).forEach((r) => (brandNames[r.id] = (r.data && r.data.name) || r.id));
      return (data || []).map((r) => ({ value: r.id, label: brandNames[r.id] }));
    },
    test(d, val) {
      return d.b === val;
    },
  },
  collectData(c, existing) {
    const out = { ...existing };
    const set = (k, v) => {
      if (v === "" || v == null || (Array.isArray(v) && !v.length) || v === 0) delete out[k];
      else out[k] = v;
    };
    const bi = (v) => (v && (v.en.trim() || v.sq.trim()) ? { en: v.en.trim(), sq: v.sq.trim() } : null);
    out.n = String(c.n || "").trim();
    out.b = c.b;
    out.t = c.t;
    set("d", String(c.d || "").trim());
    set("y", c.year ? parseInt(c.year, 10) : "");
    set("sub", c.sub);
    set("c", String(c.c || "").trim());
    set("c2", String(c.c2 || "").trim());
    set("r", c.r);
    set("out", c.out);
    set("cur", c.cur);
    set("f", c.f);
    set("st", bi(c.st));
    set("mat", bi(c.mat));
    set("docs", parseInt(c.docs, 10) || 0);
    set("cad", parseInt(c.cad, 10) || 0);
    out.im = c.im || [];
    delete out.year;
    return out;
  },
};

export async function loadProductOptions() {
  const [brands, designers, products] = await Promise.all([
    supabase.from("brands").select("id, data").order("sort_order"),
    supabase.from("designers").select("id, data").order("sort_order"),
    supabase.from("products").select("data").range(0, 4999),
  ]);
  const brandOpts = (brands.data || []).map((r) => ({ value: r.id, label: (r.data && r.data.name) || r.id }));
  const designerNames = new Set();
  (designers.data || []).forEach((r) => r.data && r.data.name && designerNames.add(r.data.name));
  const collections = new Set();
  (products.data || []).forEach((r) => {
    const d = r.data || {};
    if (d.d) designerNames.add(d.d);
    if (d.c) collections.add(d.c);
    if (d.c2) collections.add(d.c2);
  });
  return {
    brandOpts,
    designerNames: [...designerNames].sort(),
    collections: [...collections].sort(),
  };
}

export function buildProductFields(data, opts) {
  const d = data || {};
  return [
    textInput("Emri i produktit", d.n, { key: "n", required: true }),
    suggestInput("Projektuesi", d.d, opts.designerNames, {
      key: "d",
      hint: "Shkruaj emrin si në faqen e projektuesit (p.sh. Arne Jacobsen). Produkti shfaqet automatikisht te projektuesi.",
    }),
    biText("Historia e produktit", d.st, {
      key: "st",
      long: true,
      rows: 5,
      hint: "Bosh = faqja shfaq një tekst të shkurtër automatik.",
    }),
    biText("Materialet", d.mat, { key: "mat", long: true, rows: 2, hint: "Ndaji me \" · \" (p.sh. Lëkurë · Bazë alumini)." }),
    typedGallery("Fotot", d.im, {
      key: "im",
      hint: "Fotoja e parë del në kartë dhe në krye të faqes. Shkruaj emrin e fotos siç është në Cloudinary (pa .webp).",
    }),
    selectField("Marka", d.b || "", opts.brandOpts, { key: "b", required: true, allowEmpty: true, emptyLabel: "— zgjidh —" }),
    selectField("Lloji", d.t || "", TYPE_OPTS, { key: "t", required: true, allowEmpty: true, emptyLabel: "— zgjidh —" }),
    selectField("Nënlloji (opsional)", d.sub || "", SUB_OPTS, { key: "sub", allowEmpty: true, emptyLabel: "— asnjë —" }),
    suggestInput("Koleksioni", d.c, opts.collections, { key: "c", hint: "Përdoret te \"Shop by collection\" i markës." }),
    suggestInput("Koleksion i dytë (opsional)", d.c2, opts.collections, { key: "c2" }),
    toggle("Për ambiente të jashtme (Outdoor)", d.out, { key: "out" }),
    multiSelect("Ambientet", d.r || [], ROOM_OPTS, { key: "r" }),
    toggle("E kuruar (shfaqet e para në lista)", d.cur, { key: "cur" }),
    toggle("Featured", d.f, { key: "f" }),
    textInput("Nr. i skedave teknike", d.docs || "", { type: "number", key: "docs" }),
    textInput("Nr. i modeleve 2D/3D (CAD)", d.cad || "", { type: "number", key: "cad" }),
  ];
}

export { thumbUrl };
