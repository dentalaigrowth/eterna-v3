/* ETERNA V3 — static, hash-routed. Structure: PRODUCTS, ICONS, ROOMS — ETERNA — DESIGNERS, ABOUT US, CONTACT. */
(function(){
"use strict";
var D = window.ETERNA;
var WA = "355698772605", PHONE = "+355 69 877 2605", INFO = "info@eterna-design.com", IG = "eternadesign.al";
/* Contact details come from the admin "Cilësimet" (window.ETERNA_SETTINGS, set by db-loader). */
function S(k){ var s = window.ETERNA_SETTINGS; return s ? s[k] : null; }
function SL(k){ var v = S(k); return v && typeof v === "object" ? (v[lang] || v.en || "") : ""; }
function applySettings(){ WA = S("whatsapp") || WA; PHONE = S("phone") || PHONE; INFO = S("infoEmail") || INFO; IG = S("instagram") || IG; }
var lang = "en";
try { lang = localStorage.getItem("eterna-lang") || "en"; } catch(e){}
var BS = {"exteta":"ex","fritz-hansen":"fh","cassina":"ca"}, SB = {ex:"exteta",fh:"fritz-hansen",ca:"cassina"};
var LIGHT = ["pendant","table-lamp","floor-lamp","cordless","wall-lamp"];
/* Two-letter brand code used in collection links (#col-ca-...). New brands from the admin get the first two letters of their id. */
function bs(b){ return BS[b] || (D.brands[b] && D.brands[b].code) || String(b).replace(/[^a-z]/g, "").slice(0, 2); }
function sbOf(code){ if (SB[code] && D.brands[SB[code]]) return SB[code]; for (var i = 0; i < D.brandOrder.length; i++) if (bs(D.brandOrder[i]) === code) return D.brandOrder[i]; return null; }

var T = {
 products:["Products","Produkte"], icons:["Icons","Ikonat"], rooms:["Rooms","Ambiente"], designers:["Designers","Projektues"], about:["About us","Rreth nesh"], contact:["Contact","Kontakt"],
 brands:["Brands","Marka"], furniture:["Furniture","Mobilie"], lighting:["Lighting","Ndriçim"], accessories:["Accessories","Aksesorë"], outdoor:["Outdoor","Ambiente të jashtme"],
 chairs:["Chairs","Karrige"], tables:["Tables","Tavolina"], sofas:["Sofas","Divanë"], armchairs:["Armchairs","Kolltukë"], shelving:["Shelving","Rafte"], storage:["Storage furniture","Mobilie sistemimi"], beds:["Beds","Shtretër"],
 pendant:["Pendant lights","Ndriçues të varur"], "table-lamp":["Table lamps","Llamba tavoline"], "floor-lamp":["Floor lamps","Llamba dyshemeje"], cordless:["Cordless lamps","Llamba pa kabllo"], "wall-lamp":["Wall lamps","Llamba muri"],
 rugs:["Rugs","Tapete"], textiles:["Textiles","Tekstile"], decor:["Decor","Dekor"], mirrors:["Mirrors","Pasqyra"], kitchen:["Outdoor kitchens","Kuzhina të jashtme"], shade:["Shading","Hijezim"],
 "o-furniture":["Furniture","Mobilie"], "o-dining":["Dining furniture","Mobilie ngrënieje"], "o-lighting":["Lighting","Ndriçim"], "o-accessories":["Accessories","Aksesorë"], "o-storage":["Storage","Sistemim"],
 living:["Living room","Dhoma e ndenjes"], dining:["Dining room","Dhoma e ngrënies"], bedroom:["Bedroom","Dhoma e gjumit"], rkitchen:["Kitchen","Kuzhina"], bathroom:["Bathroom","Banjo"], hallway:["Hallway","Korridori"], office:["Office","Zyra"], routdoor:["Outdoor","Jashtë"],
 all:["All","Të gjitha"], viewAll:["View all","Shiko të gjitha"], allProducts:["All products","Të gjitha produktet"], shopCol:["Shop by collection","Blej sipas koleksionit"], pieces:["pieces","pjesë"], piece:["piece","pjesë"],
 loadMore:["Show more","Shfaq më shumë"], of:["of","nga"], home:["Home","Kreu"], brand:["Brand","Marka"],
 available:["Available at Eterna","E disponueshme te Eterna"], orderNow:["Order yours now","Porosit tënden tani"], quote:["Message for quote","Shkruaj për ofertë"], viewPiece:["View the piece","Shiko pjesën"],
 por:["Price on request","Çmimi me kërkesë"], excl:["Official dealer · Tirana","Përfaqësues zyrtar · Tiranë"],
 collection:["Collection","Koleksioni"], category:["Category","Kategoria"], roomsFor:["Rooms","Ambiente"], files:["For architects","Për arkitektë"],
 filesTxt:["Technical sheet, 2D drawings and 3D models are available for this piece. Ask and we send the files for your project.","Për këtë pjesë ka skedë teknike, vizatime 2D dhe modele 3D. Na shkruani dhe jua dërgojmë skedarët për projektin tuaj."],
 materials:["Materials","Materiale"], delivery:["Order & delivery","Porosia & dorëzimi"],
 deliveryTxt:["Every piece is made to order by the manufacturer in the finish you choose. We confirm price, lead time and delivery to Albania in writing before you order.","Çdo pjesë prodhohet me porosi nga prodhuesi, në finiturën që zgjidhni. Çmimin, kohën e prodhimit dhe dorëzimin në Shqipëri jua konfirmojmë me shkrim para porosisë."],
 more:["More from this collection","Më shumë nga ky koleksion"], by:["by","nga"], designedBy:["Design","Dizajni"],
 heroH:["Timeless design, chosen by architects.","Dizajn i përjetshëm, i zgjedhur nga arkitektë."],
 heroP:["Eterna brings the icons of Fritz Hansen, Cassina, Knoll, Vitra, Flos and Exteta to Albania. By appointment in Tirana.","Eterna sjell në Shqipëri ikonat e Fritz Hansen, Cassina, Knoll, Vitra, Flos dhe Exteta. Me takim në Tiranë."],
 explore:["Explore products","Shiko produktet"], seeIcons:["See the icons","Shiko ikonat"],
 stH:["We do not follow trends. We choose pieces that time has already tested.","Nuk ndjekim trendet. Zgjedhim pjesë që koha i ka provuar tashmë."],
 threeHouses:["The houses","Shtëpitë"], byRoom:["By room","Sipas ambientit"], byCat:["By category","Sipas kategorisë"],
 iconsH:["The icons","Ikonat"], iconsP:["Some pieces outlive the moment they were designed for and become part of how we imagine a home. These are the icons Eterna brings to Albania: chairs, sofas, tables and lamps by the architects and designers who shaped modern living, chosen for rooms that deserve them.","Disa pjesë e tejkalojnë kohën për të cilën u projektuan dhe bëhen pjesë e mënyrës si e imagjinojmë një shtëpi. Këto janë ikonat që Eterna sjell në Shqipëri: karrige, divanë, tavolina dhe llamba nga arkitektët dhe projektuesit që i dhanë formë jetesës moderne, të zgjedhura për ambiente që i meritojnë."],
 designersH:["The designers","Projektuesit"], designersP:["Every piece we bring to Albania carries a signature. Behind each chair, table and lamp is an architect or designer whose ideas shaped how the world lives. From the Danish masters who defined modern design at Fritz Hansen to the Italian architects reimagining outdoor living at Exteta, these are the names behind Eterna's collection, and the stories that make each piece worth keeping for generations.","Çdo pjesë që sjellim në Shqipëri mban një firmë. Pas çdo karrigeje, tavoline dhe llambe është një arkitekt ose projektues, idetë e të cilit formësuan mënyrën si jeton bota. Nga mjeshtrat danezë që përcaktuan dizajnin modern te Fritz Hansen te arkitektët italianë që po rishpikin jetesën në natyrë te Exteta, këta janë emrat pas koleksionit të Eterna dhe historitë që e bëjnë çdo pjesë të vlejë për t'u ruajtur me breza."],
 azAll:["All","Të gjithë"],
 brandCta:["Ask us about the {b} collection","Na pyesni për koleksionin {b}"], brandCtaP:["The full {b} catalogue is available to order through Eterna. Write to us and we send you the collections, finishes and prices.","I gjithë katalogu {b} porositet përmes Eterna. Na shkruani dhe ju dërgojmë koleksionet, finiturat dhe çmimet."], brandWa:["Hello Eterna, I would like information about {b}.","Përshëndetje Eterna, do të doja informacion për {b}."],
 projectNote:["Knoll works with Eterna on architecture and interior projects. Write to us with your project.","Knoll punon me Eterna për projekte arkitekture dhe interieri. Na shkruani për projektin tuaj."],
 works:["Key works","Vepra kryesore"], year:["Year","Viti"], work:["Work","Vepra"], inCollection:["In the collection","Në koleksion"],
 roomsH:["Rooms","Ambiente"], roomsP:["Start from the space. Pieces from every house, grouped by the room they were made for.","Nisuni nga hapësira. Pjesë nga të gjitha shtëpitë, të grupuara sipas ambientit për të cilin janë bërë."],
 productsP:["The full catalogue: more than six hundred pieces, each available to order through Eterna.","Katalogu i plotë: mbi gjashtëqind pjesë, secila e porositshme përmes Eterna."],
 brandsP:["The houses Eterna brings to Albania. Each one has a history worth knowing before you choose.","Shtëpitë që Eterna sjell në Shqipëri. Secila ka një histori që ia vlen ta njihni para se të zgjidhni."],
 history:["History","Historia"], readStory:["The house","Shtëpia"],
 ds:["Design services","Shërbime projektimi"], ph:["Philosophy","Filozofia"],
 aboutP:["Eterna was founded by architects. Two things define how we work: the way we think about objects, and the design service that comes with them.","Eterna u themelua nga arkitektë. Dy gjëra përcaktojnë mënyrën si punojmë: si i mendojmë objektet dhe shërbimi i projektimit që vjen me to."],
 dsK:["Complimentary","Pa pagesë"], dsH:["Complimentary Design Services","Shërbime Projektimi pa Pagesë"],
 dsP:["Choose the piece. Our architects design the space around it. The design of the room is included with the products you select, at no additional fee.","Zgjidhni pjesën. Arkitektët tanë projektojnë ambientin rreth saj. Projektimi i ambientit përfshihet me produktet që zgjidhni, pa pagesë shtesë."],
 dsBody1:["A chair by Arne Jacobsen or a sofa by Le Corbusier deserves a room that is drawn for it. Eterna was founded by architects, so we treat every order as a small project: we look at your plan, your light and the way you live, and we place the piece where it belongs.","Një karrige e Arne Jacobsen ose një divan i Le Corbusier meriton një ambient të vizatuar për të. Eterna u themelua nga arkitektë, ndaj çdo porosi e trajtojmë si një projekt të vogël: shohim planimetrinë, dritën dhe mënyrën si jetoni, dhe e vendosim pjesën aty ku i takon."],
 dsBody2:["The scope follows the products you choose. One armchair may need only a corner and a lamp. A living room, a terrace or a full residence gets a complete layout with finishes and lighting.","Shtrirja e punës varet nga produktet që zgjidhni. Një kolltuk mund të kërkojë vetëm një kënd dhe një llambë. Një dhomë ndenjeje, një tarracë ose një banesë e plotë merr një projekt të plotë me finitura dhe ndriçim."],
 dsS:[["Choose","Zgjidhni"],["Share the space","Na tregoni hapësirën"],["We design","Ne projektojmë"],["Order and delivery","Porosi dhe dorëzim"]],
 dsSt:[["Select the pieces you are drawn to, here or with us in Tirana.","Zgjidhni pjesët që ju tërheqin, këtu ose me ne në Tiranë."],["Send a plan, photos or measurements. We visit when the project needs it.","Dërgoni një planimetri, foto ose përmasa. Vijmë në vend kur projekti e kërkon."],["Layout, finishes and lighting for the room, drawn around the products you selected.","Planvendosje, finitura dhe ndriçim për ambientin, të vizatuara rreth produkteve që keni zgjedhur."],["We order from the manufacturer and follow the piece until it stands in your room.","Porosisim te prodhuesi dhe e ndjekim pjesën derisa të vendoset në ambientin tuaj."]],
 dsHero:["Your space, composed with intention.","Hapësira juaj, e kompozuar me qëllim."],
 dsSub:["A design service for homes, offices and hospitality spaces, from the first measurement to the final quotation. Our architects visit your space, measure it and study how you live and work in it. We then compose a complete proposal: a furnished plan, photorealistic 4K renderings with pieces from the collections we represent, and a transparent quotation. Before you commit to anything, you see the whole vision.","Një shërbim projektimi për shtëpi, zyra dhe hapësira mikpritjeje, nga matja e parë deri te oferta përfundimtare. Arkitektët tanë e vizitojnë hapësirën tuaj, e masin dhe studiojnë si jetoni e punoni në të. Pastaj përgatisim një propozim të plotë: planimetri me mobilim, renderime fotorealiste 4K me pjesë nga koleksionet që përfaqësojmë dhe një ofertë të qartë. Para se të angazhoheni për asgjë, e shihni të gjithë vizionin."],
 dsBook:["Book a design consultation","Rezervoni një konsultë projektimi"], dsBookWa:["Hello Eterna, I would like to book a design consultation.","Përshëndetje Eterna, do të doja të rezervoja një konsultë projektimi."],
 dsAppH:["Our approach","Qasja jonë"],
 dsApp1:["Furniture by the world's great designers is never just furniture. A lounge chair by Arne Jacobsen or a sofa by Le Corbusier changes the atmosphere of a whole room. Placed well, it becomes the piece people remember.","Mobiliet e projektuesve të mëdhenj të botës nuk janë kurrë thjesht mobilie. Një kolltuk i Arne Jacobsen ose një divan i Le Corbusier ndryshon atmosferën e gjithë dhomës. I vendosur mirë, bëhet pjesa që njerëzit e mbajnë mend."],
 dsApp2:["That is why we don't sell pieces in isolation. We study the space first and then propose what truly belongs in it. Every proposal is prepared by architects, with the same care we would give our own projects.","Prandaj nuk i shesim pjesët të shkëputura. Fillimisht studiojmë hapësirën dhe pastaj propozojmë atë që i takon vërtet. Çdo propozim përgatitet nga arkitektë, me të njëjtin kujdes që do t'u kushtonim projekteve tona."],
 dsHowH:["How it works","Si funksionon"],
 dsSteps:[["Consultation","Konsulta","We begin with a conversation about how you use the space, what you want to feel in it, your timeline and your budget. This can happen at your space or by appointment.","Nisim me një bisedë për mënyrën si e përdorni hapësirën, çfarë doni të ndjeni në të, afatet dhe buxhetin tuaj. Mund të bëhet në hapësirën tuaj ose me takim."],["Site survey & measurement","Rilevimi dhe matja","We visit and measure the space in detail: dimensions, openings, ceiling heights, natural light and circulation. Nothing in the proposal is approximate.","Vizitojmë dhe masim hapësirën në detaj: përmasat, hapjet, lartësitë e tavanit, dritën natyrale dhe qarkullimin. Asgjë në propozim nuk është e përafërt."],["Spatial analysis","Analiza e hapësirës","We study proportions, light and movement through the space, and how each area should function. This is where the design decisions are made.","Studiojmë përmasat, dritën dhe lëvizjen nëpër hapësirë, si dhe si duhet të funksionojë çdo zonë. Këtu merren vendimet e projektimit."],["Furnished plan","Planimetria me mobilim","You receive a scaled layout showing exactly where each piece sits, how it relates to the rest of the room and why it was chosen.","Merrni një planvendosje në shkallë që tregon saktësisht ku qëndron çdo pjesë, si lidhet me pjesën tjetër të dhomës dhe pse u zgjodh."],["4K photorealistic renderings","Renderime fotorealiste 4K","We render your own space, furnished with pieces from Fritz Hansen, Cassina, Knoll, Exteta, Flos, Fiam and Amura, in the materials, fabrics and finishes we recommend. You see the result before a single piece is ordered.","Renderojmë hapësirën tuaj, të mobiluar me pjesë nga Fritz Hansen, Cassina, Knoll, Exteta, Flos, Fiam dhe Amura, në materialet, stofrat dhe finiturat që rekomandojmë. E shihni rezultatin para se të porositet qoftë edhe një pjesë."],["Quotation preview & recommendations","Paraoferta dhe rekomandimet","Together with the renderings, you receive a quotation preview covering every proposed piece, with estimated delivery times. We also give our recommendations: which pieces anchor the space, where an alternative finish or model may suit you better, and how the project can be phased if you prefer to build it over time.","Bashkë me renderimet merrni një paraofertë për çdo pjesë të propozuar, me kohët e parashikuara të dorëzimit. Ju japim edhe rekomandimet tona: cilat pjesë e mbajnë hapësirën, ku një finiturë ose model tjetër mund t'ju shkojë më mirë dhe si mund të ndahet projekti në faza nëse preferoni ta ndërtoni me kohë."]],
 dsRecvH:["What you receive","Çfarë merrni"],
 dsRecv:[["Precise measured survey of your space","Rilevim i saktë i hapësirës suaj"],["Furnished floor plan","Planimetri me mobilim"],["4K photorealistic renderings from key viewpoints","Renderime fotorealiste 4K nga pikëpamjet kryesore"],["Material, fabric and finish selection","Përzgjedhje materialesh, stofrash dhe finiturash"],["Quotation preview with delivery estimates","Paraofertë me kohët e dorëzimit"],["Personal recommendations from our architects","Rekomandime personale nga arkitektët tanë"]],
 dsSpaceH:["For every kind of space","Për çdo lloj hapësire"],
 dsSpaces:[["Homes","Shtëpi","Living rooms, dining spaces, bedrooms and outdoor terraces, composed around the way you live.","Dhoma ndenjeje, hapësira ngrënieje, dhoma gjumi dhe tarraca, të kompozuara rreth mënyrës si jetoni."],["Offices","Zyra","Workspaces, meeting rooms and receptions that express who you are before you say a word.","Hapësira pune, salla mbledhjesh dhe recepsione që tregojnë kush jeni para se të thoni një fjalë."],["Hospitality & projects","Mikpritje dhe projekte","Hotels, restaurants, bars and residential complexes, specified with contract-grade pieces and project timelines.","Hotele, restorante, bare dhe komplekse banimi, me pjesë të nivelit kontraktual dhe afate projekti."]],
 dsEndH:["Let's begin with your space.","Le të nisim me hapësirën tuaj."], dsEndP:["Book a consultation and we will arrange a visit at a time that suits you.","Rezervoni një konsultë dhe ne caktojmë një vizitë në kohën që ju përshtatet."],
 dsBook2:["Book a consultation","Rezervoni një konsultë"], dsWaBtn:["Write to us on WhatsApp","Na shkruani në WhatsApp"], apptOnly:["By appointment only","Vetëm me takim"],
 dsCta:["Start your project","Nisni projektin tuaj"], dsWa:["Hello Eterna, I would like to use your Complimentary Design Services.","Përshëndetje Eterna, do të doja të përdorja Shërbimet tuaja të Projektimit pa Pagesë."],
 phK:["Get to know us","Na njihni"], phH:["The quiet longing for timeless design.","Dëshira e qetë për dizajn të përjetshëm."],
 contactH:["Write to us","Na shkruani"], contactP:["Eterna works by appointment in Tirana. The fastest way to reach us is WhatsApp.","Eterna punon me takim në Tiranë. Mënyra më e shpejtë për të na kontaktuar është WhatsApp."],
 name:["Name","Emri"], msg:["Message","Mesazhi"], interest:["I am interested in","Jam i interesuar për"], sendWa:["Send on WhatsApp","Dërgo në WhatsApp"], sendMail:["Send by email","Dërgo me email"],
 phone:["Phone","Telefon"], email:["Email","Email"], showroom:["Showroom","Showroom"], appt:["Tirana, by appointment","Tiranë, me takim"],
 waDef:["Hello Eterna, I would like some information.","Përshëndetje Eterna, do të doja disa informacione."],
 waProd:["Hello Eterna, I would like a quote for: ","Përshëndetje Eterna, do të doja një ofertë për: "], waOrder:["Hello Eterna, I would like to order: ","Përshëndetje Eterna, do të doja të porosis: "], waAvail:["Hello Eterna, is this piece available: ","Përshëndetje Eterna, a është e disponueshme kjo pjesë: "],
 notFound:["Page not found","Faqja nuk u gjet"], footTag:["Timeless design. The great houses of modern furniture and light, in Albania.","Dizajn i përjetshëm. Shtëpitë e mëdha të mobilieve dhe ndriçimit modern, në Shqipëri."],
 drawing:["Technical drawing","Vizatim teknik"], menu:["Menu","Menu"], close:["Close","Mbyll"], zoom:["Enlarge","Zmadho"],
 generic:["Made to order by {b}. Finishes, dimensions and price on request.","Prodhohet me porosi nga {b}. Finiturat, përmasat dhe çmimi me kërkesë."]
};
window.ETERNA_T = T; /* db-loader merges admin text overrides ("Tekstet e faqes") into T */
if (window.ETERNA_PENDING_STRINGS && window.ETERNA_MERGE_STRINGS) window.ETERNA_MERGE_STRINGS(window.ETERNA_PENDING_STRINGS);
function t(k){ var v = T[k]; return v ? v[lang === "sq" ? 1 : 0] : k; }
function L(o){ return o ? (o[lang] || o.en || "") : ""; }
function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]; }); }
function img(k){ return window.ETERNA_IMGFN ? window.ETERNA_IMGFN(k) : "img/" + k + ".webp"; }
function vid(k){ return window.ETERNA_VIDFN ? window.ETERNA_VIDFN(k) : "video/" + k + ".mp4"; }
function wa(text){ return "https://wa.me/" + WA + "?text=" + encodeURIComponent(text); }
function slug(s){ return String(s).toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""); }
var WAICO = '<svg class="wa-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.5-.3Z"/></svg>';

/* ---------- data helpers ---------- */
var PID = {};
/* Normalises data (static data.js or Supabase rows) so a half-filled product from the admin never breaks a page. */
function prep(){
  D = window.ETERNA;
  D.brands = D.brands || {}; D.designers = D.designers || {}; D.icons = D.icons || []; D.products = D.products || [];
  if (!D.brandOrder || !D.brandOrder.length) D.brandOrder = Object.keys(D.brands);
  if (window.ETERNA_FAZA1) window.ETERNA_FAZA1(D); /* demo content: new brands, designers, products, icons */
  D.brandOrder = D.brandOrder.filter(function(b){ return D.brands[b]; });
  D.brandOrder.forEach(function(b){ var B = D.brands[b]; B.history = B.history || { en:[], sq:[] }; B.facts = B.facts || []; B.origin = B.origin || {}; B.tag = B.tag || {}; B.intro = B.intro || {}; });
  D.products = D.products.filter(function(p){ return p && p.id && p.n && D.brands[p.b]; });
  D.products.forEach(function(p){ if (!Array.isArray(p.im) || !p.im.length) p.im = [["", 1]]; });
  PID = {}; D.products.forEach(function(p){ PID[p.id] = p; });
  D.designerSets = {}; D.brandOrder.forEach(function(b){ D.designerSets[b] = []; });
  Object.keys(D.designers).forEach(function(k){ var d = D.designers[k]; d.works = d.works || []; if (!D.designers[k].brand || !D.designerSets[d.brand]) return; D.designerSets[d.brand].push(k); });
  D.icons = D.icons.filter(function(i){ return i && PID[i.p]; });
  D.philosophy = D.philosophy || { en:[], sq:[] }; D.phTitles = D.phTitles || { en:[], sq:[] };
  applySettings();
}
prep();
var TAX = { furniture:["chairs","tables","sofas","armchairs","shelving","storage","beds"], lighting:["pendant","table-lamp","floor-lamp","cordless"], accessories:["rugs","textiles","decor","mirrors"], outdoor:["o-furniture","o-dining","o-lighting","o-accessories","o-storage"] };
var GROUPS = ["furniture","lighting","accessories","outdoor"];
var ROOMS = [["living","living"],["dining","dining"],["bedroom","bedroom"],["kitchen","rkitchen"],["bathroom","bathroom"],["hallway","hallway"],["office","office"],["outdoor","routdoor"]];
function inGroup(p, g){
  if (g === "furniture") return TAX.furniture.indexOf(p.t) > -1;
  if (g === "lighting") return LIGHT.indexOf(p.t) > -1;
  if (g === "accessories") return TAX.accessories.indexOf(p.t) > -1;
  if (g === "outdoor") return !!p.out;
  return true;
}
function inSub(p, g, s){
  if (g !== "outdoor") return p.t === s;
  if (!p.out) return false;
  if (s === "o-furniture") return p.t === "sofas" || p.t === "armchairs" || (p.t === "tables" && p.sub !== "dining") || (p.t === "chairs" && p.sub === "stool");
  if (s === "o-dining") return (p.t === "chairs" && p.sub !== "stool") || (p.t === "tables" && p.sub === "dining") || p.t === "kitchen";
  if (s === "o-lighting") return LIGHT.indexOf(p.t) > -1;
  if (s === "o-accessories") return ["decor","rugs","shade","textiles","mirrors"].indexOf(p.t) > -1;
  if (s === "o-storage") return ["storage","kitchen","shelving"].indexOf(p.t) > -1;
  return false;
}
function subKey(g, s){ return g === "outdoor" ? s.slice(2) : s; }
function subFromKey(g, k){ return g === "outdoor" ? "o-" + k : k; }
function collections(b){
  var m = {}, order = [];
  D.products.forEach(function(p){ if (p.b !== b) return; [p.c, p.c2].forEach(function(c){ if (!c) return; if (!m[c]) { m[c] = []; order.push(c); } m[c].push(p); }); });
  order.sort(function(a, c){ return m[c].length - m[a].length || a.localeCompare(c); });
  return order.map(function(c){ return { name:c, slug:slug(c), items:m[c] }; });
}
function coverOf(list){
  var i, j, p;
  for (i = 0; i < list.length; i++) { p = list[i]; for (j = 0; j < p.im.length; j++) if (p.im[j][1] === 0 && !p.cur) return p.im[j][0]; }
  for (i = 0; i < list.length; i++) if (list[i].cur) return list[i].im[0][0];
  return list.length ? list[0].im[0][0] : "";
}
function lifestyle(p){ for (var j = 0; j < p.im.length; j++) if (p.im[j][1] === 0) return p.im[j][0]; return p.im[0][0]; }
function designerOf(p){
  if (!p.d) return null;
  for (var k in D.designers) { var d = D.designers[k]; if (d.m && p.d.indexOf(d.m) > -1) { if (k === "charlotte-perriand" && p.d.indexOf("Le Corbusier") > -1) continue; return k; } }
  return null;
}
function designerProducts(k){ return D.products.filter(function(p){ return designerOf(p) === k; }); }
function designerImg(k){
  var d = D.designers[k];
  if (d.portrait) return { src: img("portrait-" + k), bw: 1 };
  if (d.photo) return { src: img(d.photo), bw: 1 };
  for (var i = 0; i < d.works.length; i++) if (d.works[i][2] && PID[d.works[i][2]]) return { src: img(lifestyle(PID[d.works[i][2]])), bw: 0, pk: 0 };
  var l = designerProducts(k); return { src: l.length ? img(lifestyle(l[0])) : "", bw: 0 };
}
function typeLabel(p){ return t(p.t); }
function sortList(l){ return l.slice().sort(function(a, b){ return (b.cur||0) - (a.cur||0) || (b.f||0) - (a.f||0); }); }

/* ---------- components ---------- */
function pic(im, alt, extra){
  var cls = "pic" + (im[1] === 1 ? " pk" : im[1] === 2 ? " dr" : "") + (extra ? " " + extra : "");
  return '<div class="' + cls + '"><img loading="lazy" decoding="async" src="' + img(im[0]) + '" alt="' + esc(alt) + '"></div>';
}
function card(p){
  var a = p.im[0], b = p.im[1], cls = "pic" + (a[1] === 1 ? " pk" : a[1] === 2 ? " dr" : "");
  var alt = (b && a[1] !== 2 && b[1] === 0 && a[1] !== 0) ? '<img class="alt" loading="lazy" decoding="async" src="' + img(b[0]) + '" alt="">' : "";
  return '<a class="card" href="#product-' + p.id + '"><div class="' + cls + '"><img loading="lazy" decoding="async" src="' + img(a[0]) + '" alt="' + esc(p.n) + '">' + alt + '</div>' +
    '<div class="wl"><span class="n">' + esc(p.n) + '</span><span class="d">' + esc(p.d || typeLabel(p)) + (p.y ? ", " + p.y : "") + '</span><span class="b">' + D.brands[p.b].name + '</span></div></a>';
}
/* Structure: PRODUCTS (Furniture, Lighting, Accessories, Outdoor + Brands), ICONS, ROOMS — ETERNA — DESIGNERS, ABOUT US, CONTACT. */
var MENU_GROUPS = GROUPS.concat(["icons"]);
function megaProducts(){
  var cols = GROUPS.map(function(g){
    return '<div class="mcol"><a class="mh" href="#cat-' + g + '">' + t(g) + '</a><ul>' + TAX[g].map(function(s){ return '<li><a href="#cat-' + g + '-' + subKey(g, s) + '">' + t(s) + '</a></li>'; }).join("") + '<li><a class="va" href="#cat-' + g + '">' + t("viewAll") + '</a></li></ul></div>';
  }).join("");
  var br = '<div class="mcol mbr mbr8"><a class="mh" href="#brands">' + t("brands") + '</a><ul>' + D.brandOrder.map(function(b){
    var has = D.products.some(function(p){ return p.b === b; });
    return '<li><a class="mb" href="#brand-' + b + '">' + D.brands[b].name + '</a>' + (has ? '<a class="msm" href="#brand-' + b + '-collections">' + t("shopCol") + '</a>' : '') + '</li>';
  }).join("") + '</ul></div>';
  return '<div class="wrap mgrid mg5">' + cols + br + '</div>';
}
function megaRooms(){ return '<div class="wrap mrow">' + ROOMS.map(function(r){ return '<a href="#room-' + r[0] + '">' + t(r[1]) + '</a>'; }).join("") + '<a href="#rooms"><b>' + t("viewAll") + '</b></a></div>'; }
function megaAbout(){ return '<div class="wrap mrow"><a href="#design-services">' + t("ds") + '</a><a href="#philosophy">' + t("ph") + '</a>' + customLinks("menu").map(function(l){ return '<a href="#page-' + esc(l.slug) + '">' + esc(l.label) + '</a>'; }).join("") + '</div>'; }
function header(over, r){
  function on(k){ return r.sec === k ? " on" : ""; }
  function dd(k, href){ return '<a class="ddt' + on(k) + '" href="#' + href + '" data-dd="' + k + '">' + t(k) + '<i class="car"></i></a>'; }
  function ln(k, href){ return '<a class="' + on(k).trim() + '" href="#' + href + '">' + t(k) + '</a>'; }
  return '<header class="hdr' + (over ? " over" : "") + '" id="hdr"><div class="wrap in">' +
    '<nav class="l">' + dd("products","products") + ln("icons","icons") + dd("rooms","rooms") + '</nav>' +
    '<a class="logo mark" href="#home">ETERNA</a>' +
    '<nav class="r"><span class="hide-m">' + ln("designers","designers") + dd("about","about") + ln("contact","contact") + '</span>' +
    '<span class="lang"><button data-lang="sq" class="' + (lang === "sq" ? "on" : "") + '">AL</button><span>/</span><button data-lang="en" class="' + (lang === "en" ? "on" : "") + '">EN</button></span>' +
    '<button class="burger" id="burger" aria-label="' + t("menu") + '"><span></span></button></nav></div>' +
    '<div class="mega" data-p="products">' + megaProducts() + '</div><div class="mega" data-p="rooms">' + megaRooms() + '</div><div class="mega" data-p="about">' + megaAbout() + '</div></header>';
}
function footer(){
  return '<footer><div class="wrap in"><div><div class="logo mark">ETERNA</div><p class="ft">' + esc(SL("footerTagline") || t("footTag")) + '</p></div>' +
    '<div><h4>' + t("products") + '</h4><ul>' + MENU_GROUPS.map(function(g){ return '<li><a href="#' + (g === "icons" ? "icons" : "cat-" + g) + '">' + t(g) + '</a></li>'; }).join("") + '<li><a href="#rooms">' + t("rooms") + '</a></li></ul></div>' +
    '<div><h4>' + t("brands") + '</h4><ul>' + D.brandOrder.map(function(b){ return '<li><a href="#brand-' + b + '">' + D.brands[b].name + '</a></li>'; }).join("") + '</ul></div>' +
    '<div><h4>ETERNA</h4><ul><li><a href="#design-services">' + t("dsH") + '</a></li><li><a href="#philosophy">' + t("ph") + '</a></li><li><a href="#designers">' + t("designers") + '</a></li><li><a href="#contact">' + t("contact") + '</a></li>' + customLinks("footer").map(function(l){ return '<li><a href="#page-' + esc(l.slug) + '">' + esc(l.label) + '</a></li>'; }).join("") +
    '<li><a href="' + wa(t("waDef")) + '" target="_blank" rel="noopener">WhatsApp ' + PHONE + '</a></li><li><a href="mailto:' + INFO + '">' + INFO + '</a></li><li><a href="https://instagram.com/' + IG + '" target="_blank" rel="noopener">@' + IG + '</a></li></ul></div></div>' +
    '<div class="wrap base"><span>© ' + new Date().getFullYear() + ' ETERNA · ' + t("appt") + '</span><a href="#design-services" style="text-transform:uppercase;letter-spacing:.16em;font-weight:600;opacity:1">' + t("dsH") + '</a><span>' + INFO + '</span></div></footer>';
}
function fab(text){ return '<a class="fab" href="' + wa(text || t("waDef")) + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + WAICO + '<span class="t">WhatsApp</span></a>'; }
function crumbs(list){ return '<div class="crumbs"><a href="#home">' + t("home") + '</a>' + list.map(function(c){ return '<span>/</span>' + (c[1] ? '<a href="#' + c[1] + '">' + esc(c[0]) + '</a>' : '<span>' + esc(c[0]) + '</span>'); }).join("") + '</div>'; }
function phead(cr, h, p, label){ return '<div class="wrap phead">' + crumbs(cr) + (label ? '<span class="label muted">' + label + '</span>' : '') + '<h1>' + esc(h) + '</h1>' + (p ? '<p>' + esc(p) + '</p>' : '') + '</div>'; }

/* ---------- listing ---------- */
var LS = { key:"", brand:"", n:36 };
function listing(key, items, chips, activeChip){
  if (LS.key !== key) { LS.key = key; LS.brand = ""; LS.n = 36; }
  var brands = D.brandOrder.filter(function(b){ return items.some(function(p){ return p.b === b; }); });
  var list = sortList(LS.brand ? items.filter(function(p){ return p.b === LS.brand; }) : items);
  var h = '<div class="wrap">';
  h += '<div class="filters">';
  if (chips && chips.length) h += '<div class="frow"><span class="label">' + t("category") + '</span>' + chips.map(function(c){ return '<a class="chip' + (c[1] === activeChip ? " on" : "") + '" href="#' + c[1] + '">' + esc(c[0]) + '</a>'; }).join("") + '</div>';
  if (brands.length > 1) h += '<div class="frow"><span class="label">' + t("brand") + '</span><button class="chip' + (!LS.brand ? " on" : "") + '" data-brand="">' + t("all") + '</button>' + brands.map(function(b){ return '<button class="chip' + (LS.brand === b ? " on" : "") + '" data-brand="' + b + '">' + D.brands[b].name + '</button>'; }).join("") + '</div>';
  h += '</div><p class="count">' + list.length + ' ' + (list.length === 1 ? t("piece") : t("pieces")) + '</p>';
  h += '<div class="grid" id="grid">' + list.slice(0, LS.n).map(card).join("") + '</div>';
  if (list.length > LS.n) h += '<div class="morew"><button class="btn line" id="more">' + t("loadMore") + ' · ' + LS.n + ' ' + t("of") + ' ' + list.length + '</button></div>';
  if (!list.length) h += '<p class="empty">—</p>';
  return h + '</div><div class="sec tight"></div>';
}

/* ---------- pages ---------- */
function pHome(){
  var feat = D.icons.slice(0, 10).map(function(i){ return PID[i.p]; }).filter(Boolean);
  var groupsTiles = GROUPS.map(function(g){ var l = D.products.filter(function(p){ return inGroup(p, g); }); var c = g === "furniture" ? "egg-2" : g === "outdoor" ? "rivasofa-4" : coverOf(l); return '<a class="room" href="#cat-' + g + '"><img loading="lazy" src="' + img(c) + '" alt=""><span>' + t(g) + '</span></a>'; }).join("");
  return '<section class="hero"><video autoplay muted loop playsinline poster="' + img("hero-poster") + '"><source src="' + vid("hero") + '" type="video/mp4"></video><div class="wrap in"><span class="label">' + t("excl") + '</span><h1>' + t("heroH") + '</h1><div class="row"><p class="lead">' + t("heroP") + '</p><div class="btns"><a class="btn solid" href="#products">' + t("explore") + '</a><a class="btn line" href="#icons">' + t("seeIcons") + '</a></div></div></div></section>' +
    '<section class="sec"><div class="wrap statement"><h2>' + t("stH") + '</h2><div><p>' + esc(((D.philosophy[lang] || D.philosophy.en || [])[1]) || "") + '</p><p style="margin-top:20px"><a class="more" href="#philosophy">' + t("ph") + '</a></p></div></div></section>' +
    '<section class="sec tight" style="padding-top:0"><div class="wrap"><div class="sec-h"><h2>' + t("threeHouses") + '</h2><a class="more" href="#brands">' + t("brands") + '</a></div><div class="bgrid-4">' + D.brandOrder.map(brandCard).join("") + '</div></div></section>' +
    '<section class="sec tight"><div class="wrap"><div class="sec-h"><h2>' + t("iconsH") + '</h2><a class="more" href="#icons">' + t("viewAll") + '</a></div><div class="rail">' + feat.map(card).join("") + '</div></div></section>' +
    '<section class="sec tight"><div class="wrap"><div class="sec-h"><h2>' + t("byCat") + '</h2><a class="more" href="#products">' + t("allProducts") + '</a></div><div class="rooms">' + groupsTiles + '</div></div></section>' +
    '<section class="sec tight"><div class="wrap"><div class="sec-h"><h2>' + t("byRoom") + '</h2><a class="more" href="#rooms">' + t("rooms") + '</a></div><div class="rooms">' + roomTiles() + '</div></div></section>' +
    dsBand();
}
/* Compact Design Services strip: title | text | button on one row. */
function dsBand(){ return '<section class="band dsband"><div class="wrap dsb-in"><h2>' + t("dsH") + '</h2><p>' + t("dsP") + '</p><a class="btn solid" href="#design-services">' + t("ds") + '</a></div></section>'; }
var BHERO = {"fritz-hansen":"egg-2","exteta":"rivasofa-4","cassina":"ca-soriana-2"};
var BPICS = {"cassina":["ca-prive-2","ca-121-upholstered-3","ca-accordo-2"]};
function brandHero(b){ if (D.brands[b] && D.brands[b].hero) return D.brands[b].hero; if (BHERO[b]) return BHERO[b]; var p = PID["ca-4-chaise-longue-a-reglage-continu-durable"] || D.products.filter(function(x){ return x.b === b; })[0]; return coverOf(D.products.filter(function(x){ return x.b === b && x.c2 !== "Outdoor" && x.t === "sofas"; })) || lifestyle(p); }
function brandCard(b){ var B = D.brands[b]; return '<a class="bcard" href="#brand-' + b + '"><img loading="lazy" src="' + img(brandHero(b)) + '" alt="' + B.name + '"><div class="t"><span class="label">' + L(B.origin) + '</span><h3>' + B.name + '</h3><p>' + L(B.tag) + '</p></div></a>'; }
var ROOMCOVER = {};
function roomTiles(){
  var used = {};
  return ROOMS.map(function(r){
    var l = D.products.filter(function(p){ return (p.r || []).indexOf(r[0]) > -1; }), c = "";
    for (var i = 0; i < l.length && !c; i++) for (var j = 0; j < l[i].im.length; j++) { var k = l[i].im[j]; if (k[1] === 0 && !l[i].cur && !used[k[0]]) { c = k[0]; break; } }
    if (!c) c = coverOf(l); used[c] = 1; ROOMCOVER[r[0]] = c;
    return '<a class="room" href="#room-' + r[0] + '"><img loading="lazy" src="' + img(c) + '" alt=""><span>' + t(r[1]) + '</span></a>';
  }).join("");
}
function pProducts(){
  var tiles = GROUPS.map(function(g){
    return '<div class="gblock"><div class="sec-h"><h2>' + t(g) + '</h2><a class="more" href="#cat-' + g + '">' + t("viewAll") + '</a></div><div class="subs">' + TAX[g].map(function(s){
      var l = D.products.filter(function(p){ return inSub(p, g, s); }); if (!l.length) return '<span class="sub empty-sub"><span class="pic"></span><span class="sn">' + t(s) + '</span><span class="sc">0</span></span>';
      var p0 = sortList(l)[0];
      return '<a class="sub" href="#cat-' + g + '-' + subKey(g, s) + '">' + pic(p0.im[0], t(s)) + '<span class="sn">' + t(s) + '</span><span class="sc">' + l.length + '</span></a>';
    }).join("") + '</div></div>';
  }).join("");
  return phead([[t("products")]], t("products"), t("productsP")) + '<div class="wrap">' + tiles + '<div class="gblock"><div class="sec-h"><h2>' + t("brands") + '</h2><a class="more" href="#brands">' + t("viewAll") + '</a></div><div class="bgrid-4">' + D.brandOrder.map(brandCard).join("") + '</div></div></div><div class="sec tight"></div>';
}
function pCat(g, sk){
  if (!TAX[g]) return p404();
  var s = sk ? subFromKey(g, sk) : "";
  if (s && TAX[g].indexOf(s) < 0 && !(g === "lighting" && s === "wall-lamp")) return p404();
  var items = D.products.filter(function(p){ return s ? inSub(p, g, s) : inGroup(p, g); });
  var chips = [[t("all"), "cat-" + g]].concat(TAX[g].map(function(x){ return [t(x), "cat-" + g + "-" + subKey(g, x)]; }));
  var cr = [[t("products"), "products"], [t(g), s ? "cat-" + g : ""]]; if (s) cr.push([t(s)]);
  return phead(cr, s ? t(s) : t(g), "", s ? t(g) : "") + listing("cat-" + g + "-" + (sk || ""), items, chips, "cat-" + g + (sk ? "-" + sk : ""));
}
function pBrands(){ return phead([[t("brands")]], t("brands"), t("brandsP")) + '<div class="wrap"><div class="bgrid-4">' + D.brandOrder.map(brandCard).join("") + '</div></div><div class="sec tight"></div>'; }
function colCards(b){
  return '<div class="cols-grid">' + collections(b).map(function(c){ return '<a class="ccard" href="#col-' + bs(b) + '-' + c.slug + '">' + pic(sortList(c.items)[0].im[0], c.name) + '<span class="cn">' + esc(c.name) + '</span><span class="cc">' + c.items.length + ' ' + (c.items.length === 1 ? t("piece") : t("pieces")) + '</span></a>'; }).join("") + '</div>';
}
function pBrand(b, scrollCols){
  var B = D.brands[b]; if (!B) return p404();
  var items = D.products.filter(function(p){ return p.b === b; }), ls = [];
  items.forEach(function(p){ p.im.forEach(function(k){ if (k[1] === 0 && ls.length < 60) ls.push(k[0]); }); });
  var pics = [ls[Math.floor(ls.length * .2)], ls[Math.floor(ls.length * .5)], ls[Math.floor(ls.length * .8)]].filter(Boolean);
  if (BPICS[b]) pics = BPICS[b];
  var hist = B.history[lang] || B.history.en;
  var ds = D.designerSets[b].map(dcard).join("");
  var waB = wa(t("brandWa").replace("{b}", B.name));
  var btns = items.length ? '<a class="btn solid" href="#brand-' + b + '-collections">' + t("shopCol") + '</a><a class="btn line" href="#shop-' + b + '">' + t("allProducts") + '</a>' : '<a class="btn solid" target="_blank" rel="noopener" href="' + waB + '">' + WAICO + t("brandCta").replace("{b}", B.name) + '</a>';
  var cta = '<section class="band sec tight"><div class="wrap in"><h2>' + t("brandCta").replace("{b}", B.name) + '</h2><div><p>' + (B.project ? t("projectNote") : t("brandCtaP").replace(/\{b\}/g, B.name)) + '</p><div class="btns" style="margin-top:24px"><a class="btn solid" target="_blank" rel="noopener" href="' + waB + '">' + WAICO + 'WhatsApp</a><a class="btn line" href="#contact">' + t("contact") + '</a></div></div></div></section>';
  return '<section class="hero bhero"><img class="poster" src="' + img(brandHero(b)) + '" alt=""><div class="wrap in"><span class="label">' + L(B.origin) + '</span><h1>' + B.name + '</h1><div class="row"><p class="lead">' + L(B.tag) + '</p><div class="btns">' + btns + '</div></div></div></section>' +
    '<section class="sec"><div class="wrap bstory"><div class="bs-t"><span class="label muted">' + t("readStory") + '</span><p class="ph-open">' + esc(L(B.intro)) + '</p>' + hist.map(function(x){ return '<p>' + esc(x) + '</p>'; }).join("") + '</div>' +
    '<div class="bs-p">' + pics.slice(0, 2).map(function(k){ return '<div class="pic"><img loading="lazy" src="' + img(k) + '" alt=""></div>'; }).join("") + '</div></div></section>' +
    (B.facts.length ? '<section class="wrap"><div class="pillars">' + B.facts.map(function(f){ return '<div class="pillar"><h3>' + f[0] + '</h3><p>' + L(f[1]) + '</p></div>'; }).join("") + '</div></section>' : '') +
    (pics[2] ? '<section class="sec tight"><div class="wrap"><div class="wide"><img loading="lazy" src="' + img(pics[2]) + '" alt=""></div></div></section>' : '<div class="sec tight"></div>') +
    (items.length ? '<section class="sec tight" id="collections" style="padding-top:0"><div class="wrap"><div class="sec-h"><h2>' + t("shopCol") + '</h2><a class="more" href="#shop-' + b + '">' + t("allProducts") + ' · ' + items.length + '</a></div>' + colCards(b) + '</div></section>' : '') +
    (ds ? '<section class="sec tight"><div class="wrap"><div class="sec-h"><h2>' + t("designers") + '</h2><a class="more" href="#designers">' + t("viewAll") + '</a></div><div class="dlist">' + ds + '</div></div></section>' : '') +
    (B.project || !items.length ? cta : '');
}
function pShop(b){ var B = D.brands[b]; if (!B) return p404(); return phead([[t("brands"), "brands"], [B.name, "brand-" + b], [t("allProducts")]], B.name, "", t("allProducts")) + listing("shop-" + b, D.products.filter(function(p){ return p.b === b; }), collections(b).map(function(c){ return [c.name, "col-" + bs(b) + "-" + c.slug]; }), ""); }
function pCol(bs, sl){
  var b = sbOf(bs); if (!b) return p404();
  var cs = collections(b), c = cs.filter(function(x){ return x.slug === sl; })[0]; if (!c) return p404();
  var chips = [[t("all"), "shop-" + b]].concat(cs.map(function(x){ return [x.name, "col-" + bs + "-" + x.slug]; }));
  return phead([[t("brands"), "brands"], [D.brands[b].name, "brand-" + b], [c.name]], c.name, "", D.brands[b].name + " · " + t("collection")) + listing("col-" + bs + "-" + sl, c.items, chips, "col-" + bs + "-" + sl);
}
function pRooms(){ return phead([[t("rooms")]], t("roomsH"), t("roomsP")) + '<div class="wrap"><div class="rooms r8">' + roomTiles() + '</div></div><div class="sec tight"></div>'; }
function pRoom(k){
  var r = ROOMS.filter(function(x){ return x[0] === k; })[0]; if (!r) return p404();
  var chips = ROOMS.map(function(x){ return [t(x[1]), "room-" + x[0]]; });
  return phead([[t("rooms"), "rooms"], [t(r[1])]], t(r[1]), "", t("rooms")) + listing("room-" + k, D.products.filter(function(p){ return (p.r || []).indexOf(k) > -1; }), chips, "room-" + k);
}
function pIcons(){
  var spans = ["w2 h2","","h2","","w2","","","h2","w2","","","w2 h2","","h2","","","w2","","",""];
  var col = D.icons.map(function(ic, i){ var p = PID[ic.p]; return '<button class="ctile ' + spans[i % spans.length] + '" data-icon="' + i + '"><img loading="' + (i < 6 ? "eager" : "lazy") + '" src="' + img(lifestyle(p)) + '" alt="' + esc(ic.t) + '"><span><b>' + esc(ic.t) + '</b><i>' + D.brands[p.b].name + '</i></span></button>'; }).join("");
  var ctas = ["available","orderNow","quote"], waT = ["waAvail","waOrder","waProd"];
  var stories = D.icons.map(function(ic, i){
    var p = PID[ic.p], im = p.im[0];
    return '<article class="istory' + (i % 2 ? " rev" : "") + '" id="icon' + i + '"><a class="media" href="#product-' + p.id + '"><img loading="lazy" src="' + img(lifestyle(p)) + '" alt="' + esc(ic.t) + '"></a><div class="txt"><span class="num">' + (i < 9 ? "0" : "") + (i + 1) + ' / ' + D.icons.length + '</span><span class="label bz">' + D.brands[p.b].name + '</span><h2>' + esc(ic.t) + '</h2><p class="byl">' + esc(ic.by) + '</p><p>' + esc(ic[lang] || ic.en) + '</p>' +
      '<div class="btns"><a class="btn dark" target="_blank" rel="noopener" href="' + wa(t(waT[ic.cta]) + ic.t + " (" + D.brands[p.b].name + ")") + '">' + WAICO + t(ctas[ic.cta]) + '</a><a class="btn line" href="#product-' + p.id + '">' + t("viewPiece") + '</a></div></div></article>';
  }).join("");
  return '<section class="ihead"><div class="wrap"><span class="label">' + t("available") + '</span><h1>' + t("iconsH") + '</h1><p>' + t("iconsP") + '</p></div></section><section class="wrap"><div class="collage">' + col + '</div></section><section class="wrap istories">' + stories + '</section>' +
    '<section class="band sec tight"><div class="wrap in"><h2>' + t("orderNow") + '</h2><div><p>' + t("deliveryTxt") + '</p><div class="btns" style="margin-top:24px"><a class="btn solid" target="_blank" rel="noopener" href="' + wa(t("waDef")) + '">' + WAICO + t("quote") + '</a></div></div></div></section>';
}
function dcard(k){
  var d = D.designers[k], im = designerImg(k), n = designerProducts(k).length;
  return '<a class="card dcard" href="#designer-' + k + '"><div class="pic' + (im.bw ? " bw" : "") + '"><img loading="lazy" src="' + im.src + '" alt="' + esc(d.name) + '"></div><div class="wl"><span class="n">' + esc(d.short || d.name) + '</span><span class="d">' + esc(d.life) + ' · ' + L(d.country) + '</span><span class="w">' + (D.brands[d.brand] ? D.brands[d.brand].name : "") + (n ? ' · ' + n + ' ' + t("pieces") : "") + '</span></div></a>';
}
/* Designers A-Z (FAZA 1): one alphabetical list with letter headings and a brand filter. */
var DZ = { brand:"" };
function pDesigners(){
  var keys = Object.keys(D.designers).filter(function(k){ var d = D.designers[k]; return D.brands[d.brand] && (!DZ.brand || d.brand === DZ.brand); });
  keys.sort(function(a, b){ return (D.designers[a].short || D.designers[a].name).localeCompare(D.designers[b].short || D.designers[b].name); });
  /* grouped by house (as before), A-Z inside each house */
  return phead([[t("designers")]], t("designersH"), t("designersP")) + '<div class="wrap">' + D.brandOrder.filter(function(b){ return keys.some(function(k){ return D.designers[k].brand === b; }); }).map(function(b){
    return '<div class="gblock"><div class="sec-h"><h2>' + D.brands[b].name + '</h2><a class="more" href="#brand-' + b + '">' + L(D.brands[b].origin) + '</a></div><div class="dlist">' + keys.filter(function(k){ return D.designers[k].brand === b; }).map(dcard).join("") + '</div></div>';
  }).join("") + '</div><div class="sec tight"></div>';
}
function pDesigner(k){
  var d = D.designers[k]; if (!d) return p404();
  var im = designerImg(k), story = (d.story && (d.story[lang] || d.story.en)) || [], list = sortList(designerProducts(k));
  var works = d.works.length ? '<section class="wrap sec tight"><div class="sec-h"><h2>' + t("works") + '</h2></div><div class="tbl"><table class="works"><thead><tr><th>' + t("year") + '</th><th>' + t("work") + '</th><th>' + t("brand") + '</th></tr></thead><tbody>' + d.works.map(function(w){ var p = w[2] && PID[w[2]]; return '<tr><td class="y">' + (w[1] || "—") + '</td><td>' + (p ? '<a href="#product-' + p.id + '">' + esc(w[0]) + '</a>' : esc(w[0])) + '</td><td>' + (p ? D.brands[p.b].name : (D.brands[d.brand] ? D.brands[d.brand].name : "")) + '</td></tr>'; }).join("") + '</tbody></table></div></section>' : "";
  return '<div class="wrap" style="padding-top:clamp(24px,4vw,48px)">' + crumbs([[t("designers"), "designers"], [d.short || d.name]]) + '<div class="dhero"><div class="pic' + (im.bw ? " bw" : "") + '"><img src="' + im.src + '" alt="' + esc(d.name) + '"></div><div class="txt"><span class="label bz">' + (D.brands[d.brand] ? D.brands[d.brand].name + ' · ' : '') + '' + esc(d.life) + ' · ' + L(d.country) + '</span><h1>' + esc(d.name) + '</h1><p class="first">' + esc(L(d.bio)) + '</p>' + story.map(function(x){ return '<p>' + esc(x) + '</p>'; }).join("") + '</div></div></div>' + works +
    (list.length ? '<section class="sec tight" style="padding-top:0"><div class="wrap"><div class="sec-h"><h2>' + t("inCollection") + '</h2><span class="count" style="margin:0">' + list.length + ' ' + t("pieces") + '</span></div><div class="grid">' + list.slice(0, 24).map(card).join("") + '</div></div></section>' : "");
}
function pAbout(){
  function c(h, k, p, i){ return '<a class="bcard" href="#' + h + '"><img loading="lazy" src="' + img(i) + '" alt=""><div class="t"><span class="label">ETERNA</span><h3>' + t(k) + '</h3><p>' + p + '</p></div></a>'; }
  return phead([[t("about")]], t("about"), t("aboutP")) + '<div class="wrap"><div class="split">' + c("design-services", "ds", t("dsP"), "rivasofa-2") + c("philosophy", "ph", esc(((D.philosophy[lang] || D.philosophy.en || [])[0]) || ""), "egg-3") + '</div></div><div class="sec tight"></div>';
}
/* Complimentary Design Services, content from Eterna_Design_Services_Page.pdf (FAZA 1). */
function pDS(){
  var q = lang === "sq" ? 1 : 0, book = wa(t("dsBookWa"));
  var steps = T.dsSteps.map(function(s, i){ return '<div class="pillar"><span class="label bz">0' + (i + 1) + '</span><h3>' + s[q] + '</h3><p>' + s[q + 2] + '</p></div>'; }).join("");
  var spaces = T.dsSpaces.map(function(s){ return '<div class="pillar"><h3>' + s[q] + '</h3><p>' + s[q + 2] + '</p></div>'; }).join("");
  return '<section class="ph-hero"><div class="wrap">' + crumbs([[t("about"), "about"], [t("ds")]]) + '<span class="label">' + t("dsH") + '</span><h1 style="max-width:18ch">' + t("dsHero") + '</h1><p>' + t("dsSub") + '</p><div class="btns" style="margin-top:32px"><a class="btn solid" target="_blank" rel="noopener" href="' + book + '">' + WAICO + t("dsBook") + '</a></div></div></section>' +
    '<section class="sec tight"><div class="wrap"><div class="dsg">' + ["ds-1","ds-2","ds-3"].map(function(n){ return '<img loading="lazy" src="' + img("/faza1/" + n + ".jpg") + '" alt="">'; }).join("") + '</div></div></section>' +
    '<section class="sec"><div class="wrap cols"><div><span class="label muted">' + t("dsAppH") + '</span><p class="ph-open" style="margin-top:14px">' + t("dsApp1") + '</p></div><div><p>' + t("dsApp2") + '</p></div></div></section>' +
    '<section class="wrap"><div class="sec-h"><h2>' + t("dsHowH") + '</h2></div><div class="pillars">' + steps + '</div></section>' +
    '<section class="sec"><div class="wrap cols"><h2>' + t("dsRecvH") + '</h2><ul class="dslist">' + T.dsRecv.map(function(x){ return '<li>' + x[q] + '</li>'; }).join("") + '</ul></div></section>' +
    '<section class="wrap"><div class="sec-h"><h2>' + t("dsSpaceH") + '</h2></div><div class="pillars">' + spaces + '</div></section><div class="sec tight"></div>' +
    '<section class="band sec tight"><div class="wrap in"><h2>' + t("dsEndH") + '</h2><div><p>' + t("dsEndP") + '</p><div class="btns" style="margin-top:24px"><a class="btn solid" target="_blank" rel="noopener" href="' + book + '">' + t("dsBook2") + '</a><a class="btn line" target="_blank" rel="noopener" href="' + wa(t("dsWa")) + '">' + WAICO + t("dsWaBtn") + '</a></div><p style="margin-top:18px;font-size:var(--fs-s);opacity:.8">' + PHONE + ' · ' + INFO + ' · ' + t("apptOnly") + '</p></div></div></section>';
}
function pPhilosophy(){
  var tx = (D.philosophy[lang] && D.philosophy[lang].length ? D.philosophy[lang] : D.philosophy.en) || [], ti = (D.phTitles[lang] && D.phTitles[lang].length ? D.phTitles[lang] : D.phTitles.en) || [], ims = (D.phImages && D.phImages.length) ? D.phImages : ["egg-2","pk22-2","swan-2","locus-2","rivasofa-3","pk80-1","s7-2"];
  var num = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];
  var ch = tx.map(function(x, i){
    if (i === 0) return "";
    return '<article class="istory phc' + (i % 2 ? "" : " rev") + '"><div class="media"><img loading="lazy" src="' + img(ims[i] || ims[i % ims.length]) + '" alt=""></div><div class="txt"><span class="num">' + (num[i] || i) + '</span><h2>' + esc(ti[i] || "") + '</h2><p class="phb">' + esc(x) + '</p>' + (i === tx.length - 1 ? '<div class="btns"><a class="btn dark" href="#icons">' + t("seeIcons") + '</a><a class="btn line" href="#design-services">' + t("ds") + '</a></div>' : '') + '</div></article>';
  }).join("");
  return '<section class="ph-hero"><div class="wrap">' + crumbs([[t("about"), "about"], [t("ph")]]) + '<span class="label">' + t("phK") + '</span><h1>' + t("phH") + '</h1><p>' + esc(tx[0] || "") + '</p></div></section><section class="wrap istories">' + ch + '</section><section class="wrap"><div class="sign"><span class="mark">ETERNA</span></div></section><div class="sec tight"></div>';
}
function pContact(){
  /* Contact: compact header, details card on the left, form card on the right. */
  function row(l, v, h){ return '<li><span class="ck">' + l + '</span><span class="cv">' + (h ? '<a href="' + h + '"' + (h.indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : '') + '>' + v + '</a>' : v) + '</span></li>'; }
  return '<div class="wrap ct">' + crumbs([[t("contact")]]) +
    '<div class="ct-head"><span class="label bz">' + t("contact") + '</span><h1>' + t("contactH") + '</h1><p>' + t("contactP") + '</p></div>' +
    '<div class="ct-grid"><aside class="ct-info"><ul>' + row("WhatsApp", PHONE, wa(t("waDef"))) + row(t("phone"), PHONE, "tel:" + PHONE.replace(/ /g, "")) + row(t("email"), INFO, "mailto:" + INFO) + row("Instagram", "@" + IG, "https://instagram.com/" + IG) + row(t("showroom"), t("appt")) + '</ul>' +
    '<a class="btn dark ct-wa" target="_blank" rel="noopener" href="' + wa(t("waDef")) + '">' + WAICO + 'WhatsApp</a></aside>' +
    '<form class="ct-form" id="cform"><div class="ct-two"><div class="fld"><label for="fn">' + t("name") + '</label><input id="fn" name="n" autocomplete="name"></div><div class="fld"><label for="fi">' + t("interest") + '</label><select id="fi" name="i"><option>' + t("products") + '</option><option>' + t("ds") + '</option>' + D.brandOrder.map(function(b){ return "<option>" + D.brands[b].name + "</option>"; }).join("") + '</select></div></div><div class="fld"><label for="fm">' + t("msg") + '</label><textarea id="fm" name="m"></textarea></div><div class="btns"><button class="btn dark" type="submit" data-via="wa">' + WAICO + t("sendWa") + '</button><button class="btn line" type="submit" data-via="mail">' + t("sendMail") + '</button></div></form></div></div><div class="sec tight"></div>';
}
function pProduct(id){
  var p = PID[id]; if (!p) return p404();
  var B = D.brands[p.b], dk = designerOf(p), g = GROUPS.filter(function(x){ return x !== "outdoor" && inGroup(p, x); })[0] || (p.out ? "outdoor" : "");
  var story = p.st ? L(p.st) : (p.n + (p.d ? ", " + t("by") + " " + p.d : "") + (p.y ? ", " + p.y : "") + ". " + (p.c ? t("collection") + ": " + p.c + ". " : "") + t("generic").replace("{b}", B.name));
  var cr = [[t("products"), "products"]]; if (g) cr.push([t(g), "cat-" + g]); if (g && g !== "outdoor" && TAX[g].indexOf(p.t) > -1) cr.push([t(p.t), "cat-" + g + "-" + p.t]); cr.push([p.n]);
  var m0 = p.im[0], rel = D.products.filter(function(x){ return x.id !== p.id && x.b === p.b && x.c === p.c; });
  var specs = '<details open><summary>' + t("collection") + '</summary><div class="body"><a class="ul" href="#col-' + bs(p.b) + '-' + slug(p.c || "") + '">' + B.name + ' · ' + esc(p.c || "") + '</a><span>' + t("category") + ': ' + typeLabel(p) + (p.out ? " · " + t("outdoor") : "") + '</span>' + ((p.r || []).length ? '<span>' + t("roomsFor") + ': ' + p.r.map(function(k){ var r = ROOMS.filter(function(x){ return x[0] === k; })[0]; return '<a class="ul" href="#room-' + k + '">' + t(r[1]) + '</a>'; }).join(", ") + '</span>' : '') + '</div></details>' +
    (p.mat ? '<details><summary>' + t("materials") + '</summary><div class="body">' + L(p.mat).split(" · ").map(function(x){ return '<span>' + esc(x) + '</span>'; }).join("") + '</div></details>' : '') +
    ((p.docs || p.cad) ? '<details><summary>' + t("files") + '</summary><div class="body"><span>' + t("filesTxt") + '</span></div></details>' : '') +
    '<details><summary>' + t("delivery") + '</summary><div class="body"><span>' + t("deliveryTxt") + '</span></div></details>';
  return '<div class="wrap" style="padding-top:clamp(20px,3vw,40px)">' + crumbs(cr) + '<div class="prod"><div class="gal"><div class="main' + (m0[1] === 1 ? " pk" : m0[1] === 2 ? " dr" : "") + '" id="gmain"><img id="gimg" src="' + img(m0[0]) + '" alt="' + esc(p.n) + '"><span class="zoom">' + t("zoom") + '</span></div>' +
    (p.im.length > 1 ? '<div class="thumbs">' + p.im.map(function(k, i){ return '<button class="' + (i ? "" : "on") + (k[1] ? " pk" : "") + '" data-i="' + i + '"><img loading="lazy" src="' + img(k[0]) + '" alt=""></button>'; }).join("") + '</div>' : '') + '</div>' +
    '<div class="info"><div class="stick"><a class="label brand" href="#brand-' + p.b + '">' + B.name + '</a><h1>' + esc(p.n) + '</h1><p class="by">' + (p.d ? (dk ? '<a href="#designer-' + dk + '">' + esc(p.d) + '</a>' : esc(p.d)) : typeLabel(p)) + (p.y ? ", " + p.y : "") + '</p>' +
    '<div class="price"><span>' + t("available") + '</span><span>' + t("por") + '</span></div><p class="story">' + esc(story) + '</p>' +
    '<div class="acts"><a class="btn dark" target="_blank" rel="noopener" href="' + wa(t("waProd") + p.n + " (" + B.name + ")") + '">' + WAICO + t("quote") + '</a><a class="btn line" target="_blank" rel="noopener" href="' + wa(t("waOrder") + p.n + " (" + B.name + ")") + '">' + t("orderNow") + '</a></div><div class="specs">' + specs + '</div></div></div></div></div>' +
    (rel.length ? '<section class="sec tight"><div class="wrap"><div class="sec-h"><h2>' + t("more") + '</h2><a class="more" href="#col-' + bs(p.b) + '-' + slug(p.c || "") + '">' + esc(p.c || "") + '</a></div><div class="rail">' + sortList(rel).slice(0, 10).map(card).join("") + '</div></div></section>' : '<div class="sec tight"></div>');
}
/* ---------- custom pages (admin "Faqet") ---------- */
function customPages(){ var c = window.ETERNA_CONTENT && window.ETERNA_CONTENT.custom_pages; return Array.isArray(c) ? c.slice().sort(function(a, b){ return (a.order || 0) - (b.order || 0); }) : []; }
function customPage(sl){ return customPages().filter(function(p){ return p.slug === sl && p.published; })[0] || null; }
function customLinks(key){ return customPages().filter(function(p){ return p.published && p[key] && p[key].show; }).map(function(p){ return { slug:p.slug, label:L(p[key].label) || L(p.title) }; }); }
function pCustom(sl){
  var p = customPage(sl); if (!p) return p404();
  var body = L(p.body), paras = Array.isArray(body) ? body : (body ? [body] : []);
  return phead([[L(p.title)]], L(p.title), L(p.intro)) + (p.heroImg ? '<section class="wrap"><div class="wide"><img src="' + esc(img(p.heroImg)) + '" alt=""></div></section>' : '') +
    '<section class="sec"><div class="wrap cols"><div></div><div>' + paras.map(function(x){ return '<p style="margin-bottom:18px">' + esc(x) + '</p>'; }).join("") + '</div></div></section>';
}
function setMeta(attr, key, val){ var m = document.querySelector("meta[" + attr + '="' + key + '"]'); if (!val) return; if (!m) { m = document.createElement("meta"); m.setAttribute(attr, key); document.head.appendChild(m); } m.setAttribute("content", val); }
function p404(){ return '<div class="wrap phead"><h1>' + t("notFound") + '</h1><p><a class="more" href="#home">' + t("home") + '</a></p></div>'; }

/* ---------- router ---------- */
function route(){
  var h = (location.hash || "#home").slice(1) || "home", m;
  if (h === "home") return { page:"home", sec:"" };
  if (h === "products") return { page:"products", sec:"products" };
  if (h === "brands") return { page:"brands", sec:"products" };
  if ((m = h.match(/^cat-([a-z]+)(?:-(.+))?$/))) return { page:"cat", a:m[1], b:m[2], sec:"products" };
  if ((m = h.match(/^brand-(.+)-collections$/)) && D.brands[m[1]]) return { page:"brand", a:m[1], cols:1, sec:"products" };
  if ((m = h.match(/^brand-(.+)$/))) return { page:"brand", a:m[1], sec:"products" };
  if ((m = h.match(/^shop-(.+)$/))) return { page:"shop", a:m[1], sec:"products" };
  if ((m = h.match(/^col-([a-z]{2})-(.+)$/))) return { page:"col", a:m[1], b:m[2], sec:"products" };
  if ((m = h.match(/^product-(.+)$/))) return { page:"product", a:m[1], sec:"products" };
  if (h === "icons") return { page:"icons", sec:"icons" };
  if (h === "rooms") return { page:"rooms", sec:"rooms" };
  if ((m = h.match(/^room-(.+)$/))) return { page:"room", a:m[1], sec:"rooms" };
  if (h === "designers") return { page:"designers", sec:"designers" };
  if ((m = h.match(/^designer-(.+)$/))) return { page:"designer", a:m[1], sec:"designers" };
  if (h === "about") return { page:"about", sec:"about" };
  if (h === "design-services") return { page:"ds", sec:"about" };
  if (h === "philosophy") return { page:"ph", sec:"about" };
  if (h === "contact") return { page:"contact", sec:"contact" };
  if ((m = h.match(/^(?:page-|\/page\/)(.+)$/))) return { page:"custom", a:m[1], sec:"about" };
  return { page:"404", sec:"" };
}
var app = document.getElementById("app"), lastHash = null, GOICON = -1;
function render(keepScroll){
  var r = route(), over = false, body, title = "ETERNA · Timeless Design", fabText = "";
  switch (r.page) {
    case "home": body = pHome(); over = true; break;
    case "products": body = pProducts(); title = t("products"); break;
    case "brands": body = pBrands(); title = t("brands"); break;
    case "cat": body = pCat(r.a, r.b); title = t(r.b ? subFromKey(r.a, r.b) : r.a); break;
    case "brand": body = pBrand(r.a); over = !!D.brands[r.a]; title = D.brands[r.a] ? D.brands[r.a].name : ""; break;
    case "shop": body = pShop(r.a); title = D.brands[r.a] ? D.brands[r.a].name : ""; break;
    case "col": body = pCol(r.a, r.b); break;
    case "product": body = pProduct(r.a); if (PID[r.a]) { title = PID[r.a].n; fabText = t("waProd") + PID[r.a].n + " (" + D.brands[PID[r.a].b].name + ")"; } break;
    case "icons": body = pIcons(); title = t("icons"); break;
    case "rooms": body = pRooms(); title = t("rooms"); break;
    case "room": body = pRoom(r.a); break;
    case "designers": body = pDesigners(); title = t("designers"); break;
    case "designer": body = pDesigner(r.a); if (D.designers[r.a]) title = D.designers[r.a].name; break;
    case "about": body = pAbout(); title = t("about"); break;
    case "ds": body = pDS(); over = true; title = t("ds"); break;
    case "ph": body = pPhilosophy(); over = true; title = t("ph"); break;
    case "contact": body = pContact(); title = t("contact"); break;
    case "custom": body = pCustom(r.a); var cp = customPage(r.a); if (cp) title = (cp.seo && L(cp.seo.title)) || L(cp.title); break;
    default: body = p404();
  }
  if (r.page === "home" && SL("seoTitle")) title = SL("seoTitle");
  document.title = title.indexOf("ETERNA") === 0 ? title : title + " · ETERNA";
  setMeta("name", "description", SL("seoDescription")); setMeta("property", "og:description", SL("seoDescription"));
  if (S("seoImage")) setMeta("property", "og:image", img(S("seoImage")));
  document.documentElement.lang = lang === "sq" ? "sq" : "en";
  app.innerHTML = header(over, r) + '<main class="' + (over ? "" : "pad ") + 'fade">' + body + '</main>' + footer() + fab(fabText);
  bind(r, over);
  if (!keepScroll) {
    if (r.page === "brand" && r.cols) { var c = document.getElementById("collections"); if (c) { c.scrollIntoView(); window.scrollBy(0, -70); return; } }
    window.scrollTo(0, 0);
    if (r.page === "icons" && GOICON > -1) { var ie = document.getElementById("icon" + GOICON); GOICON = -1; if (ie) window.scrollTo(0, ie.getBoundingClientRect().top + window.scrollY - 90); }
  }
}
function bind(r, over){
  var hdr = document.getElementById("hdr"), tm;
  function upd(){ if (over) hdr.classList.toggle("over", window.scrollY < 80 && !hdr.classList.contains("ddopen")); }
  if (over) { window.onscroll = upd; upd(); } else window.onscroll = null;
  function open(k){ clearTimeout(tm); hdr.classList.add("ddopen"); hdr.classList.remove("over"); hdr.querySelectorAll(".mega").forEach(function(m){ m.classList.toggle("show", m.getAttribute("data-p") === k); }); hdr.querySelectorAll(".ddt").forEach(function(a){ a.classList.toggle("open", a.getAttribute("data-dd") === k); }); }
  function shut(){ tm = setTimeout(function(){ hdr.classList.remove("ddopen"); hdr.querySelectorAll(".mega.show,.ddt.open").forEach(function(m){ m.classList.remove("show"); m.classList.remove("open"); }); upd(); }, 140); }
  hdr.querySelectorAll(".ddt").forEach(function(a){ a.addEventListener("mouseenter", function(){ open(a.getAttribute("data-dd")); }); a.addEventListener("focus", function(){ open(a.getAttribute("data-dd")); }); a.addEventListener("mouseleave", shut); });
  hdr.querySelectorAll(".mega").forEach(function(m){ m.addEventListener("mouseenter", function(){ clearTimeout(tm); }); m.addEventListener("mouseleave", shut); });
  hdr.querySelectorAll("[data-lang]").forEach(function(b){ b.addEventListener("click", function(){ lang = b.getAttribute("data-lang"); try { localStorage.setItem("eterna-lang", lang); } catch(e){} render(true); }); });
  document.getElementById("burger").addEventListener("click", openMenu);
  document.querySelectorAll("[data-brand]").forEach(function(b){ b.addEventListener("click", function(){ LS.brand = b.getAttribute("data-brand"); LS.n = 36; render(true); }); });
  var more = document.getElementById("more"); if (more) more.addEventListener("click", function(){ LS.n += 36; var y = window.scrollY; render(true); window.scrollTo(0, y); });
  document.querySelectorAll("[data-dzb]").forEach(function(b){ b.addEventListener("click", function(){ DZ.brand = b.getAttribute("data-dzb"); render(true); }); });
  document.querySelectorAll("[data-goicon]").forEach(function(a){ a.addEventListener("click", function(){ GOICON = +a.getAttribute("data-goicon"); if (location.hash === "#icons") { render(false); } }); });
  document.querySelectorAll("[data-icon]").forEach(function(b){ b.addEventListener("click", function(){ var e = document.getElementById("icon" + b.getAttribute("data-icon")); if (e) { var y = e.getBoundingClientRect().top + window.scrollY - 90; window.scrollTo({ top:y, behavior:"smooth" }); } }); });
  if (r.page === "product" && PID[r.a]) bindGallery(PID[r.a]);
  var f = document.getElementById("cform");
  if (f) { var via = "wa"; f.querySelectorAll("button[type=submit]").forEach(function(b){ b.addEventListener("click", function(){ via = b.getAttribute("data-via"); }); });
    f.addEventListener("submit", function(e){ e.preventDefault(); var txt = (f.n.value ? f.n.value + ": " : "") + "[" + f.i.value + "] " + (f.m.value || t("waDef")); var a = document.createElement("a"); a.target = "_blank"; a.rel = "noopener"; a.href = via === "wa" ? wa(txt) : "mailto:" + INFO + "?subject=" + encodeURIComponent("Eterna · " + f.i.value) + "&body=" + encodeURIComponent(txt); document.body.appendChild(a); a.click(); a.remove(); }); }
}
function bindGallery(p){
  var cur = 0, main = document.getElementById("gmain"), im = document.getElementById("gimg");
  function show(i){ cur = (i + p.im.length) % p.im.length; im.src = img(p.im[cur][0]); main.className = "main" + (p.im[cur][1] === 1 ? " pk" : p.im[cur][1] === 2 ? " dr" : ""); document.querySelectorAll(".thumbs button").forEach(function(b, j){ b.classList.toggle("on", j === cur); }); }
  document.querySelectorAll(".thumbs button").forEach(function(b){ b.addEventListener("click", function(){ show(+b.getAttribute("data-i")); }); });
  main.addEventListener("click", function(){
    var lb = document.createElement("div"); lb.className = "lb";
    function draw(){ lb.innerHTML = '<img class="' + (p.im[cur][1] ? "pkl" : "") + '" src="' + img(p.im[cur][0]) + '" alt=""><button class="x">' + t("close") + '</button>' + (p.im.length > 1 ? '<button class="pv">←</button><button class="nx">→</button>' : ''); }
    draw(); document.body.appendChild(lb);
    lb.addEventListener("click", function(e){ var c = e.target.className; if (c === "pv") { show(cur - 1); draw(); } else if (c === "nx") { show(cur + 1); draw(); } else lb.remove(); });
  });
}
function openMenu(){
  var m = document.createElement("div"); m.className = "menu";
  function acc(title, inner, href){ return '<details class="macc"><summary class="big">' + title + '</summary><div class="msubs">' + inner + '</div></details>'; }
  var prod = MENU_GROUPS.map(function(g){
    if (g === "icons") return "";
    return '<div class="msub"><a href="#cat-' + g + '"><b>' + t(g) + '</b></a>' + TAX[g].map(function(s){ return '<a href="#cat-' + g + '-' + subKey(g, s) + '">' + t(s) + '</a>'; }).join("") + '<a href="#cat-' + g + '">' + t("viewAll") + '</a></div>';
  }).join("");
  var brs = '<div class="msub"><a href="#brands"><b>' + t("brands") + '</b></a>' + D.brandOrder.map(function(b){ return '<a href="#brand-' + b + '">' + D.brands[b].name + '</a>'; }).join("") + '</div>';
  m.innerHTML = '<div class="top"><span class="mark">ETERNA</span><button class="label" id="mx">' + t("close") + '</button></div>' +
    acc(t("products"), '<div class="msub"><a href="#products"><b>' + t("allProducts") + '</b></a></div>' + prod + brs) + '<a class="big" href="#icons">' + t("icons") + '</a>' +
    acc(t("rooms"), '<div class="msub"><a href="#rooms"><b>' + t("viewAll") + '</b></a></div>' + '<div class="msub">' + ROOMS.slice(0, 4).map(function(r){ return '<a href="#room-' + r[0] + '">' + t(r[1]) + '</a>'; }).join("") + '</div><div class="msub">' + ROOMS.slice(4).map(function(r){ return '<a href="#room-' + r[0] + '">' + t(r[1]) + '</a>'; }).join("") + '</div>') +
    '<a class="big" href="#designers">' + t("designers") + '</a>' + acc(t("about"), '<div class="msub"><a href="#design-services"><b>' + t("ds") + '</b></a><a href="#philosophy"><b>' + t("ph") + '</b></a>' + customLinks("menu").map(function(l){ return '<a href="#page-' + esc(l.slug) + '"><b>' + esc(l.label) + '</b></a>'; }).join("") + '</div>') + '<a class="big" href="#contact">' + t("contact") + '</a>' +
    '<div class="foot"><a href="' + wa(t("waDef")) + '" target="_blank" rel="noopener">WhatsApp ' + PHONE + '</a><span>' + INFO + '</span><span>' + t("appt") + '</span></div>';
  document.body.appendChild(m); document.body.style.overflow = "hidden";
  function close(){ m.remove(); document.body.style.overflow = ""; }
  m.addEventListener("click", function(e){ if (e.target.id === "mx" || e.target.closest("a")) close(); });
}
window.addEventListener("hashchange", function(){ render(false); });
/* Called by db-loader when fresh data arrives from Supabase. */
window.ETERNA_REFRESH = function(first){ prep(); render(!first); };
if (!window.ETERNA_HOLD) render(false);
})();
