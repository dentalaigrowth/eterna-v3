/* ETERNA db-loader (V3).
   Reads the catalogue from Supabase and rebuilds window.ETERNA in the shape
   public/app.js expects (brands, brandOrder, designers, products, icons,
   philosophy, phTitles). Admin text overrides (ui_strings) are merged into
   the T object that app.js exposes as window.ETERNA_T.

   Flow:
   1) A cached copy (localStorage) is applied synchronously, before app.js runs.
   2) No cache yet: app.js waits (ETERNA_HOLD) until Supabase answers, at most
      HOLD_MS, then falls back to the static public/data.js.
   3) Fresh data is cached and app.js re-renders through ETERNA_REFRESH.

   Catalogue tables are used only after the V3 import has been run from the
   admin dashboard (site_content.catalog_version = "v3"). Before that the site
   keeps showing the static data.js, so it never shows the old 63-product shape. */
import { supabase } from "./public-supabase.js";
import { mergeSiteSettings } from "./site-settings.js";

const CACHE_KEY = "eterna-db-cache-v3";
const HOLD_MS = 3000;
const PAGE = 1000;

window.ETERNA_SETTINGS = mergeSiteSettings(null);

let defaultT = null;
let released = false;

function release(first) {
  if (released && first) return;
  released = true;
  window.ETERNA_HOLD = false;
  if (typeof window.ETERNA_REFRESH === "function") window.ETERNA_REFRESH(first);
}

// --- 1. Synchronous: apply cache ---
let hadCache = false;
let cached = null;
try {
  cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    applyDbData(JSON.parse(cached));
    hadCache = true;
  }
} catch (e) {
  /* ignore corrupt cache */
}

// --- 2. Async: fetch from DB ---
if (supabase) {
  if (!hadCache) {
    window.ETERNA_HOLD = true;
    setTimeout(() => release(true), HOLD_MS);
  }
  fetchAll()
    .then((data) => {
      const json = JSON.stringify(data);
      if (hadCache && json === cached) return; // nothing changed since last visit
      applyDbData(data);
      try {
        localStorage.setItem(CACHE_KEY, json);
      } catch (e) {
        /* ignore quota errors */
      }
      if (!hadCache && !released) release(true);
      else if (typeof window.ETERNA_REFRESH === "function") window.ETERNA_REFRESH(false);
    })
    .catch(() => release(true));
}

async function fetchRows(table) {
  const out = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from(table)
      .select("id, data, sort_order")
      .eq("published", true)
      .order("sort_order")
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw error;
    out.push(...(data || []));
    if (!data || data.length < PAGE) break;
  }
  return out;
}

async function fetchAll() {
  const [sc, ui] = await Promise.all([
    supabase.from("site_content").select("key, value"),
    supabase.from("ui_strings").select("key, value"),
  ]);
  if (sc.error) throw sc.error;
  const content = {};
  (sc.data || []).forEach((r) => (content[r.key] = r.value));
  const result = { site_content: content, v3: content.catalog_version === "v3" };
  if (!result.v3) return result;
  if (!ui.error) result.ui_strings = ui.data || [];
  const [brands, designers, products] = await Promise.all(["brands", "designers", "products"].map(fetchRows));
  Object.assign(result, { brands, designers, products });
  return result;
}

function applyDbData(data) {
  if (!data || !window.ETERNA) return;
  const sc = data.site_content || {};
  window.ETERNA_CONTENT = sc;
  window.ETERNA_SETTINGS = mergeSiteSettings(sc.settings);
  if (!data.v3) return;

  const D = window.ETERNA;
  if (data.brands && data.brands.length) {
    D.brands = {};
    D.brandOrder = [];
    data.brands.forEach((r) => {
      D.brands[r.id] = r.data;
      D.brandOrder.push(r.id);
    });
  }
  if (data.designers && data.designers.length) {
    D.designers = {};
    data.designers.forEach((r) => (D.designers[r.id] = r.data));
  }
  if (data.products && data.products.length) {
    D.products = data.products.map((r) => ({ ...r.data, id: r.id }));
  }
  if (Array.isArray(sc.icons)) D.icons = sc.icons;
  const ph = sc.philosophy;
  if (ph && ph.text) {
    D.philosophy = ph.text;
    if (ph.titles) D.phTitles = ph.titles;
    if (Array.isArray(ph.images)) D.phImages = ph.images;
  }
  mergeUiStrings(data.ui_strings || []);
}

/* T entries are [en, sq]. A ui_strings row stores only overrides: {en?, sq?}. */
function mergeUiStrings(rows) {
  const T = window.ETERNA_T;
  if (!T) {
    // app.js has not run yet (cache applied before it): retry once it exists.
    window.ETERNA_PENDING_STRINGS = rows;
    return;
  }
  if (!defaultT) {
    defaultT = {};
    for (const k in T) if (Array.isArray(T[k])) defaultT[k] = T[k].slice();
  }
  for (const k in defaultT) T[k] = defaultT[k].slice();
  for (const row of rows) {
    const def = defaultT[row.key];
    const val = row.value;
    if (!def || typeof def[0] !== "string" || !val || typeof val !== "object") continue;
    const en = typeof val.en === "string" && val.en.trim() ? val.en : def[0];
    const sq = typeof val.sq === "string" && val.sq.trim() ? val.sq : def[1];
    T[row.key] = [en, sq];
  }
}
window.ETERNA_MERGE_STRINGS = mergeUiStrings;
