/* V3 screens stored in site_content:
   - "icons":      [{ p: productId, t: title, by: byline, en, sq, cta: 0|1|2 }]
   - "philosophy": { text: {en:[...], sq:[...]}, titles: {en:[...], sq:[...]}, images: [...] }
   Paragraph 0 of the philosophy is the intro; every next paragraph is a chapter with a title and an image.
   If nothing is saved yet, the editors start from the static public/data.js (window.ETERNA). */

import { supabase } from "./supabase.js";
import { el, fieldCard, thumbUrl } from "./fields.js";

const PH_IMAGES = ["egg-2", "pk22-2", "swan-2", "locus-2", "rivasofa-3", "pk80-1", "s7-2"];
const CTA_OPTS = [
  ["0", "Available at Eterna (disponueshme)"],
  ["1", "Order yours now (porosit)"],
  ["2", "Message for quote (ofertë)"],
];

async function loadKey(key) {
  const { data, error } = await supabase.from("site_content").select("value").eq("key", key).maybeSingle();
  if (error) throw error;
  return data ? data.value : null;
}
async function saveKey(key, value) {
  const { error } = await supabase.from("site_content").upsert({ key, value }, { onConflict: "key" });
  if (error) throw error;
  try { localStorage.removeItem("eterna-db-cache-v3"); } catch (e) { /* noop */ }
}

function input(val, ph) {
  const i = el("input");
  i.type = "text";
  i.value = val || "";
  if (ph) i.placeholder = ph;
  return i;
}
function area(val, rows) {
  const t = el("textarea");
  t.value = val || "";
  t.rows = rows || 3;
  t.style.height = "auto";
  return t;
}
function fld(label, control) {
  const w = el("div", "fld");
  const l = el("label");
  l.textContent = label;
  w.append(l, control);
  return w;
}
function row2(a, b) {
  const r = el("div");
  r.style.cssText = "display:grid;grid-template-columns:1fr 1fr;gap:12px";
  r.append(a, b);
  return r;
}
function topBar(title, onSave) {
  const bar = el("div", "form-topbar");
  const l = el("div", "topbar-l");
  const s = el("span", "topbar-title");
  s.textContent = title;
  l.appendChild(s);
  const r = el("div", "topbar-r");
  const save = el("button", "btn sm");
  save.textContent = "Ruaj";
  save.addEventListener("click", async () => {
    save.disabled = true;
    save.textContent = "Po ruan…";
    try {
      await onSave();
      save.textContent = "U ruajt ✓";
      setTimeout(() => { save.textContent = "Ruaj"; save.disabled = false; }, 1500);
    } catch (e) {
      alert("Gabim: " + e.message);
      save.textContent = "Ruaj";
      save.disabled = false;
    }
  });
  r.appendChild(save);
  bar.append(l, r);
  return bar;
}
function moveBtns(list, i, rerender, min = 0) {
  const box = el("div", "row-acts");
  const mk = (txt, fn, dis) => {
    const b = el("button", "gal-btn");
    b.type = "button";
    b.textContent = txt;
    b.disabled = dis;
    b.addEventListener("click", fn);
    box.appendChild(b);
  };
  mk("↑", () => { [list[i - 1], list[i]] = [list[i], list[i - 1]]; rerender(); }, i <= min);
  mk("↓", () => { [list[i + 1], list[i]] = [list[i], list[i + 1]]; rerender(); }, i === list.length - 1);
  const del = el("button", "gal-btn gal-del");
  del.type = "button";
  del.textContent = "×";
  del.addEventListener("click", () => { if (confirm("Të hiqet?")) { list.splice(i, 1); rerender(); } });
  box.appendChild(del);
  return box;
}

/* ---------- Icons ---------- */

export async function renderIconsScreen(main) {
  const saved = await loadKey("icons");
  const items = (Array.isArray(saved) ? saved : (window.ETERNA && window.ETERNA.icons) || []).map((x) => ({ ...x }));
  const { data: prods } = await supabase.from("products").select("id, data").order("sort_order").range(0, 4999);
  const opts = (prods || []).map((r) => ({ value: r.id, label: ((r.data && r.data.n) || r.id) }));
  const imgOf = {};
  (prods || []).forEach((r) => {
    const im = (r.data && r.data.im) || [];
    const amb = im.find((x) => x[1] === 0) || im[0];
    imgOf[r.id] = amb ? amb[0] : "";
  });

  main.innerHTML = "";
  main.appendChild(topBar("Ikonat", () => saveKey("icons", items.filter((x) => x.p))));
  const lead = el("p", "lead");
  lead.textContent = "Pjesët që shfaqen te faqja \"Icons\" dhe në faqen kryesore (10 të parat). Renditja këtu = renditja në faqe.";
  main.appendChild(lead);
  const wrap = el("div");
  main.appendChild(wrap);

  function render() {
    wrap.innerHTML = "";
    items.forEach((it, i) => {
      const sel = el("select");
      const blank = el("option");
      blank.value = "";
      blank.textContent = "— zgjidh produktin —";
      sel.appendChild(blank);
      for (const o of opts) {
        const op = el("option");
        op.value = o.value;
        op.textContent = o.label;
        if (o.value === it.p) op.selected = true;
        sel.appendChild(op);
      }
      const img = el("img");
      img.style.cssText = "width:72px;height:72px;object-fit:cover;border:1px solid var(--rule)";
      const setImg = () => { img.src = imgOf[it.p] ? thumbUrl(imgOf[it.p]) : ""; img.style.visibility = imgOf[it.p] ? "" : "hidden"; };
      setImg();
      sel.addEventListener("change", () => { it.p = sel.value; setImg(); });

      const t = input(it.t, "Egg™");
      t.addEventListener("input", () => (it.t = t.value));
      const by = input(it.by, "Arne Jacobsen, 1958");
      by.addEventListener("input", () => (it.by = by.value));
      const en = area(it.en, 3);
      en.addEventListener("input", () => (it.en = en.value));
      const sq = area(it.sq, 3);
      sq.addEventListener("input", () => (it.sq = sq.value));
      const cta = el("select");
      for (const [v, l] of CTA_OPTS) {
        const op = el("option");
        op.value = v;
        op.textContent = l;
        if (Number(v) === (it.cta || 0)) op.selected = true;
        cta.appendChild(op);
      }
      cta.addEventListener("change", () => (it.cta = Number(cta.value)));

      const head = el("div");
      head.style.cssText = "display:flex;gap:14px;align-items:center";
      const prodF = fld("Produkti", sel);
      prodF.style.flex = "1";
      head.append(img, prodF, moveBtns(items, i, render));
      const card = fieldCard(
        String(i + 1).padStart(2, "0") + " · " + (it.t || "Ikonë e re"),
        head,
        row2(fld("Titulli", t), fld("Nënshkrimi (projektuesi, viti)", by)),
        row2(fld("Teksti EN", en), fld("Teksti SQ", sq)),
        fld("Butoni WhatsApp", cta)
      );
      wrap.appendChild(card);
    });
    const add = el("button", "btn line");
    add.type = "button";
    add.textContent = "+ Shto ikonë";
    add.addEventListener("click", () => { items.push({ p: "", t: "", by: "", en: "", sq: "", cta: 0 }); render(); });
    wrap.appendChild(add);
  }
  render();
}

/* ---------- Philosophy ---------- */

export async function renderPhilosophyScreen(main) {
  const saved = await loadKey("philosophy");
  const D = window.ETERNA || {};
  const text = (saved && saved.text) || D.philosophy || { en: [], sq: [] };
  const titles = (saved && saved.titles) || D.phTitles || { en: [], sq: [] };
  const images = (saved && saved.images) || PH_IMAGES;
  const n = Math.max(text.en.length, text.sq.length);
  const items = [];
  for (let i = 0; i < n; i++) {
    items.push({
      en: text.en[i] || "",
      sq: text.sq[i] || "",
      ten: (titles.en || [])[i] || "",
      tsq: (titles.sq || [])[i] || "",
      img: images[i] || "",
    });
  }

  main.innerHTML = "";
  main.appendChild(
    topBar("Filozofia", () => {
      const out = { text: { en: [], sq: [] }, titles: { en: [], sq: [] }, images: [] };
      items.forEach((it) => {
        out.text.en.push(it.en.trim());
        out.text.sq.push(it.sq.trim());
        out.titles.en.push(it.ten.trim());
        out.titles.sq.push(it.tsq.trim());
        out.images.push(it.img.trim());
      });
      return saveKey("philosophy", out);
    })
  );
  const lead = el("p", "lead");
  lead.textContent = "Teksti i faqes Philosophy. Paragrafi i parë është hyrja (shfaqet edhe në faqen kryesore); çdo kapitull tjetër ka titull dhe foto.";
  main.appendChild(lead);
  const wrap = el("div");
  main.appendChild(wrap);

  function render() {
    wrap.innerHTML = "";
    items.forEach((it, i) => {
      const parts = [];
      if (i > 0) {
        const ten = input(it.ten);
        ten.addEventListener("input", () => (it.ten = ten.value));
        const tsq = input(it.tsq);
        tsq.addEventListener("input", () => (it.tsq = tsq.value));
        parts.push(row2(fld("Titulli EN", ten), fld("Titulli SQ", tsq)));
      }
      const en = area(it.en, 4);
      en.addEventListener("input", () => (it.en = en.value));
      const sq = area(it.sq, 4);
      sq.addEventListener("input", () => (it.sq = sq.value));
      parts.push(row2(fld("Teksti EN", en), fld("Teksti SQ", sq)));
      if (i > 0) {
        const im = input(it.img, "p.sh. egg-2");
        im.addEventListener("input", () => (it.img = im.value));
        parts.push(fld("Foto (emri në Cloudinary ose URL)", im));
        parts.push(moveBtns(items, i, render, 1));
      }
      wrap.appendChild(fieldCard(i === 0 ? "Hyrja" : "Kapitulli " + i + (it.ten ? " · " + it.ten : ""), ...parts));
    });
    const add = el("button", "btn line");
    add.type = "button";
    add.textContent = "+ Shto kapitull";
    add.addEventListener("click", () => { items.push({ en: "", sq: "", ten: "", tsq: "", img: "" }); render(); });
    wrap.appendChild(add);
  }
  render();
}
