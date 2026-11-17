/* One-time V3 import: copies the static catalogue in public/data.js (window.ETERNA)
   into Supabase and removes the rows of the old site that V3 no longer uses.
   Kept: site_content "settings" and "custom_pages". Old Journal rows stay in the
   articles table (not shown on the site). Safe to run again: it upserts by id. */
import { supabase } from "./supabase.js";

const OLD_PAGE_KEYS = ["home", "collection", "brand", "designers", "journal", "showroom", "trade", "about", "contact"];

export async function runImport(onStep = () => {}) {
  const D = window.ETERNA;
  if (!D || !D.products || !D.brandOrder) throw new Error("data.js (V3) nuk u gjet.");
  const out = {};

  onStep("Markat…");
  const brandRows = D.brandOrder.map((id, i) => ({ id, data: D.brands[id], published: true, sort_order: i }));
  await upsert("brands", brandRows);
  out.brands = brandRows.length + " (u fshinë " + (await removeOthers("brands", brandRows)) + " të vjetra)";

  onStep("Projektuesit…");
  const order = [];
  D.brandOrder.forEach((b) => ((D.designerSets && D.designerSets[b]) || []).forEach((k) => order.push(k)));
  Object.keys(D.designers).forEach((k) => order.indexOf(k) < 0 && order.push(k));
  const designerRows = order.map((id, i) => ({ id, data: D.designers[id], published: true, sort_order: i }));
  await upsert("designers", designerRows);
  out.designers = designerRows.length + " (u fshinë " + (await removeOthers("designers", designerRows)) + " të vjetër)";

  const productRows = D.products.map((p, i) => ({ id: p.id, data: p, published: true, sort_order: i }));
  for (let i = 0; i < productRows.length; i += 150) {
    onStep("Produktet " + Math.min(i + 150, productRows.length) + " / " + productRows.length + "…");
    await upsert("products", productRows.slice(i, i + 150));
  }
  out.products = productRows.length + " (u fshinë " + (await removeOthers("products", productRows)) + " të vjetra)";

  onStep("Ikonat, filozofia dhe tekstet…");
  const { error: e1 } = await supabase.from("site_content").upsert(
    [
      { key: "icons", value: D.icons || [] },
      { key: "philosophy", value: { text: D.philosophy, titles: D.phTitles, images: ["egg-2", "pk22-2", "swan-2", "locus-2", "rivasofa-3", "pk80-1", "s7-2"] } },
    ],
    { onConflict: "key" }
  );
  if (e1) throw new Error("site_content: " + e1.message);
  const { error: e2 } = await supabase.from("site_content").delete().in("key", OLD_PAGE_KEYS);
  if (e2) throw new Error("site_content: " + e2.message);
  // Old texts were saved in full by the previous import and would override the V3 texts.
  const { error: e3 } = await supabase.from("ui_strings").delete().neq("key", "");
  if (e3) throw new Error("ui_strings: " + e3.message);
  out.icons = (D.icons || []).length;

  const { error: e4 } = await supabase.from("site_content").upsert({ key: "catalog_version", value: "v3" }, { onConflict: "key" });
  if (e4) throw new Error("site_content: " + e4.message);
  try { localStorage.removeItem("eterna-db-cache-v3"); } catch (e) { /* noop */ }
  return out;
}

async function upsert(table, rows) {
  const { error } = await supabase.from(table).upsert(rows, { onConflict: "id" });
  if (error) throw new Error(table + ": " + error.message);
}

async function removeOthers(table, keep) {
  const ids = new Set(keep.map((r) => r.id));
  const { data, error } = await supabase.from(table).select("id").range(0, 9999);
  if (error) throw new Error(table + ": " + error.message);
  const stale = (data || []).map((r) => r.id).filter((id) => !ids.has(id));
  for (let i = 0; i < stale.length; i += 100) {
    const { error: e } = await supabase.from(table).delete().in("id", stale.slice(i, i + 100));
    if (e) throw new Error(table + ": " + e.message);
  }
  return stale.length;
}

export async function catalogVersion() {
  const { data } = await supabase.from("site_content").select("value").eq("key", "catalog_version").maybeSingle();
  return data ? data.value : null;
}
