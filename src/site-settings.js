/* Site settings: defaults shared by the public loader and the admin form.
   The saved "settings" row only holds overrides. A key that is absent means
   "use the default"; a key saved as "" means "deliberately empty" (hidden on the site). */

export const SITE_SETTINGS_DEFAULTS = {
  phone: "+355 69 877 2605",
  whatsapp: "355698772605",
  infoEmail: "info@eterna-design.com",
  salesEmail: "sales@eterna-design.com",
  instagram: "eternadesign.al",
  facebook: "",
  tiktok: "",
  linkedin: "",
  pinterest: "",
  address: { en: "Tirana, by appointment", sq: "Tiranë, me takim" },
  mapsUrl: "",
  footerTagline: {
    en: "",
    sq: "",
  },
  footerCopyright: { en: "Eterna · Timeless Design", sq: "Eterna · Timeless Design" },
  footerLocation: { en: "Tirana, Albania", sq: "Tiranë, Shqipëri" },
  waDefault: { en: "Hello Eterna", sq: "Përshëndetje Eterna" },
  formIntro: { en: "", sq: "" },
  seoTitle: { en: "ETERNA · Timeless Design", sq: "ETERNA · Timeless Design" },
  seoDescription: {
    en: "Eterna presents iconic furniture by Fritz Hansen, Cassina and Exteta in Tirana, by appointment.",
    sq: "Eterna prezanton mobilie ikonike nga Fritz Hansen, Cassina dhe Exteta në Tiranë, me takim.",
  },
  seoImage: "",
};

export const REQUIRED_SETTING_KEYS = ["phone", "whatsapp", "seoTitle"];

function hasOwn(obj, key) {
  return !!obj && Object.prototype.hasOwnProperty.call(obj, key);
}

export function mergeSiteSettings(saved) {
  const out = {};
  for (const key of Object.keys(SITE_SETTINGS_DEFAULTS)) {
    const d = SITE_SETTINGS_DEFAULTS[key];
    const stored = hasOwn(saved, key) ? saved[key] : undefined;
    if (typeof d === "object") {
      const bi = {};
      for (const lang of ["en", "sq"]) {
        const v = stored && hasOwn(stored, lang) && typeof stored[lang] === "string" ? stored[lang].trim() : d[lang];
        bi[lang] = v || (REQUIRED_SETTING_KEYS.includes(key) ? d[lang] : "");
      }
      out[key] = bi;
    } else {
      const v = typeof stored === "string" ? stored.trim() : d;
      out[key] = v || (REQUIRED_SETTING_KEYS.includes(key) ? d : "");
    }
  }
  return out;
}

export function settingsOverrides(values) {
  const out = {};
  for (const key of Object.keys(SITE_SETTINGS_DEFAULTS)) {
    const d = SITE_SETTINGS_DEFAULTS[key];
    const v = values[key];
    if (typeof d === "object") {
      const bi = {};
      for (const lang of ["en", "sq"]) {
        const t = ((v && v[lang]) || "").trim();
        if (t !== d[lang]) bi[lang] = t;
      }
      if (Object.keys(bi).length) out[key] = bi;
    } else {
      const t = (v || "").trim();
      if (t !== d) out[key] = t;
    }
  }
  return out;
}

/* Products on the site, per brand. The "settings" row may hold productBrandsOff: a list
   of brand ids whose products are hidden on the public site (data stays in the database).
   Absent = the default below, so only Fritz Hansen and Exteta show products. */
export const PRODUCT_BRANDS_OFF_DEFAULT = ["cassina", "knoll", "vitra", "flos", "fiam", "amura"];
export function productBrandsOff(saved) {
  const v = saved && saved.productBrandsOff;
  return Array.isArray(v) ? v.filter((x) => typeof x === "string") : PRODUCT_BRANDS_OFF_DEFAULT.slice();
}
