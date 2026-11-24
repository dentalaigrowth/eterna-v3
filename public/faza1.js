/* ETERNA · Faza 1 content (demo).
   Adds the brands, designers, products and icons from the FAZA 1 brief on top of
   whatever the catalogue source is (Supabase or data.js). Nothing here is written
   to the database: app.js calls window.ETERNA_FAZA1(D) inside prep().
   Images live in /public/faza1/ and are referenced as "/faza1/<file>.jpg". */
(function () {
  "use strict";
  var F = "/faza1/";
  function ph(n) { return F + n + ".jpg"; }

  /* ---------- brands ---------- */
  var ORDER = ["fritz-hansen", "cassina", "knoll", "vitra", "flos", "exteta", "fiam", "amura"];
  var BRANDS = {
    knoll: {
      name: "Knoll", code: "kn", hero: ph("kn-barcelona-chair-3"), project: 1,
      origin: { en: "New York, since 1938", sq: "Nju Jork, që nga 1938" },
      tag: { en: "Available for architecture and interior projects through Eterna.", sq: "E disponueshme për projekte arkitekture dhe interieri përmes Eterna." },
      intro: { en: "Hans Knoll founded the company in New York in 1938 to bring European modernism to America. With Florence Knoll it became the home of the Bauhaus and mid-century masters.", sq: "Hans Knoll e themeloi kompaninë në Nju Jork në vitin 1938 për të sjellë modernizmin evropian në Amerikë. Bashkë me Florence Knoll u bë shtëpia e mjeshtrave të Bauhaus dhe të mesit të shekullit." },
      history: {
        en: ["Florence Knoll, whom Hans married in 1946, shaped the company's identity and ran it after 1955. Knoll has held the exclusive rights to Mies van der Rohe's furniture since 1953, including the Barcelona chair.", "More than 40 Knoll designs are in the permanent collection of MoMA in New York. Since 2021 Knoll has been part of MillerKnoll."],
        sq: ["Florence Knoll, me të cilën Hans u martua në 1946, i dha formë identitetit të kompanisë dhe e drejtoi pas vitit 1955. Që nga 1953 Knoll mban të drejtat ekskluzive për mobiliet e Mies van der Rohe, përfshirë karrigen Barcelona.", "Mbi 40 dizajne të Knoll janë në koleksionin e përhershëm të MoMA në Nju Jork. Që nga 2021 Knoll është pjesë e MillerKnoll."]
      },
      facts: [["1938", { en: "Founded in New York by Hans Knoll.", sq: "Themeluar në Nju Jork nga Hans Knoll." }], ["1953", { en: "Exclusive rights to Mies van der Rohe's furniture.", sq: "Të drejta ekskluzive për mobiliet e Mies van der Rohe." }], ["40+", { en: "Designs in the permanent collection of MoMA.", sq: "Dizajne në koleksionin e përhershëm të MoMA." }]]
    },
    vitra: {
      name: "Vitra", code: "vi", hero: ph("vi-eames-lounge-1"),
      origin: { en: "Switzerland, since 1950", sq: "Zvicër, që nga 1950" },
      tag: { en: "The Eames, Panton and Noguchi, made in Europe.", sq: "Eames, Panton dhe Noguchi, të prodhuar në Evropë." },
      intro: { en: "A Swiss family company that has produced the work of Charles & Ray Eames, George Nelson, Verner Panton and Isamu Noguchi for decades, alongside today's leading designers.", sq: "Një kompani familjare zvicerane që prodhon prej dekadash veprat e Charles & Ray Eames, George Nelson, Verner Panton dhe Isamu Noguchi, krahas projektuesve më të njohur të sotëm." },
      history: {
        en: ["Vitra was founded in 1950 in Birsfelden, near Basel, by Willi and Erika Fehlbaum. In the 1950s it began producing the designs of Charles & Ray Eames and George Nelson for Europe.", "In 1967 it launched the Panton Chair, the first chair moulded from a single piece of plastic. Today its campus in Weil am Rhein, with buildings by Frank Gehry, Tadao Ando and Zaha Hadid, is a landmark of architecture."],
        sq: ["Vitra u themelua në 1950 në Birsfelden, pranë Bazelit, nga Willi dhe Erika Fehlbaum. Në vitet '50 nisi të prodhonte për Evropën dizajnet e Charles & Ray Eames dhe George Nelson.", "Në 1967 nxori Panton Chair, karrigen e parë të derdhur nga një copë e vetme plastike. Sot kampusi i saj në Weil am Rhein, me ndërtesa nga Frank Gehry, Tadao Ando dhe Zaha Hadid, është pikë referimi në arkitekturë."]
      },
      facts: [["1950", { en: "Founded in Switzerland by the Fehlbaum family.", sq: "Themeluar në Zvicër nga familja Fehlbaum." }], ["1956", { en: "The Eames Lounge Chair, still in production.", sq: "Eames Lounge Chair, ende në prodhim." }], ["1967", { en: "The Panton Chair, a single piece of plastic.", sq: "Panton Chair, nga një copë e vetme plastike." }]]
    },
    flos: {
      name: "Flos", code: "fl", hero: ph("fl-hero"),
      origin: { en: "Italy, since 1962", sq: "Itali, që nga 1962" },
      tag: { en: "Six decades of Italian light.", sq: "Gjashtë dekada dritë italiane." },
      intro: { en: "Flos was founded in 1962 and has served for six decades as a laboratory of ideas for the world's leading designers.", sq: "Flos u themelua në 1962 dhe prej gjashtë dekadash është një laborator idesh për projektuesit më të mirë të botës." },
      history: {
        en: ["Its early creative direction came from the Castiglioni brothers and Tobia Scarpa. Several of its lamps, from Arco to Parentesi, are among the most imitated objects in Italian design.", "Today Flos works with Michael Anastassiades, Philippe Starck, Jasper Morrison, Konstantin Grcic, Piero Lissoni and Patricia Urquiola."],
        sq: ["Drejtimi i saj krijues i hershëm erdhi nga vëllezërit Castiglioni dhe Tobia Scarpa. Disa nga llambat e saj, nga Arco te Parentesi, janë ndër objektet më të imituara të dizajnit italian.", "Sot Flos punon me Michael Anastassiades, Philippe Starck, Jasper Morrison, Konstantin Grcic, Piero Lissoni dhe Patricia Urquiola."]
      },
      facts: [["1962", { en: "Founded in Italy; Arco and Toio launched the same year.", sq: "Themeluar në Itali; Arco dhe Toio dolën po atë vit." }], ["Castiglioni", { en: "The brothers who drew its greatest icons.", sq: "Vëllezërit që vizatuan ikonat e saj më të mëdha." }], ["Today", { en: "Anastassiades, Starck, Morrison, Grcic.", sq: "Anastassiades, Starck, Morrison, Grcic." }]]
    },
    fiam: {
      name: "Fiam", code: "fi", hero: ph("fi-hero"),
      origin: { en: "Tavullia, Italy", sq: "Tavullia, Itali" },
      tag: { en: "Furniture in curved glass.", sq: "Mobilie prej xhami të lakuar." },
      intro: { en: "For more than fifty years Fiam has made furniture and objects in curved glass, turning a fragile material into the centrepiece of an interior.", sq: "Prej më shumë se pesëdhjetë vitesh Fiam prodhon mobilie dhe objekte prej xhami të lakuar, duke e kthyer një material të brishtë në qendrën e interierit." },
      history: {
        en: ["Fiam works from Tavullia, in the province of Pesaro and Urbino. Its tables, mirrors, chairs and lighting are shaped from single sheets of glass, bent and finished by hand.", "In 2001 Fiam received the Compasso d'Oro career award for its work with glass."],
        sq: ["Fiam punon në Tavullia, në provincën e Pesaro dhe Urbino. Tavolinat, pasqyrat, karriget dhe ndriçuesit e saj formohen nga fletë të vetme xhami, të lakuara dhe të përfunduara me dorë.", "Në vitin 2001 Fiam mori çmimin Compasso d'Oro për karrierë për punën e saj me xhamin."]
      },
      facts: []
    },
    amura: {
      name: "Amura", code: "am", hero: ph("am-hero"),
      origin: { en: "Puglia, Italy", sq: "Puglia, Itali" },
      tag: { en: "Handmade Italian upholstery.", sq: "Mobilie të veshura italiane, të punuara me dorë." },
      intro: { en: "A young Italian company from Puglia that makes sofas, armchairs and beds by hand, with design as the balance of form, function and comfort.", sq: "Një kompani e re italiane nga Puglia që prodhon me dorë divanë, kolltukë dhe shtretër, ku dizajni është ekuilibër mes formës, funksionit dhe rehatisë." },
      history: {
        en: ["Amura's collection covers sofas, armchairs, beds, tables and outdoor pieces, including the Lapis and Panis families.", "Every piece is made by hand in Italy, with materials chosen for quality and comfort."],
        sq: ["Koleksioni i Amura përfshin divanë, kolltukë, shtretër, tavolina dhe pjesë për jashtë, përfshirë familjet Lapis dhe Panis.", "Çdo pjesë punohet me dorë në Itali, me materiale të zgjedhura për cilësi dhe rehati."]
      },
      facts: []
    }
  };

  /* ---------- new designers ---------- */
  function dz(name, brand, life, country, m, photo, bio, works, extra) {
    var d = { name: name, brand: brand, life: life, country: country, m: m, photo: photo ? ph(photo) : "", bio: bio, story: { en: [], sq: [] }, works: works || [] };
    for (var k in (extra || {})) d[k] = extra[k];
    return d;
  }
  var IT = { en: "Italy", sq: "Itali" }, US = { en: "United States", sq: "SHBA" }, DE = { en: "Germany", sq: "Gjermani" };
  var DESIGNERS = {
    "mies-van-der-rohe": dz("Ludwig Mies van der Rohe", "knoll", "1886–1969", { en: "Germany · United States", sq: "Gjermani · SHBA" }, "Mies", "pt-mies",
      { en: "German-American architect, last director of the Bauhaus and author of \"less is more\". Knoll has held the exclusive rights to his furniture since 1953, including the Barcelona chair, designed with Lilly Reich for the 1929 Barcelona Pavilion.", sq: "Arkitekt gjermano-amerikan, drejtori i fundit i Bauhaus dhe autori i \"më pak është më shumë\". Që nga 1953 Knoll mban të drejtat ekskluzive për mobiliet e tij, përfshirë karrigen Barcelona, të projektuar me Lilly Reich për Pavijonin e Barcelonës në 1929." },
      [["Barcelona® Chair", 1929, "kn-barcelona-chair"], ["Barcelona® Stool", 1929, "kn-barcelona-stool"], ["Barcelona® Day Bed", 1930, "kn-barcelona-daybed"], ["Brno Chair", 1930, "kn-brno-chair"], ["MR Chairs", 1927, null]], { short: "Mies van der Rohe" }),
    "eero-saarinen": dz("Eero Saarinen", "knoll", "1910–1961", { en: "Finland · United States", sq: "Finlandë · SHBA" }, "Saarinen", "pt-saarinen",
      { en: "Finnish-American architect of the TWA Terminal and the Gateway Arch, who set out to clear up the \"slum of legs\" under tables and chairs.", sq: "Arkitekt finlandezo-amerikan i Terminalit TWA dhe i Gateway Arch, që synoi të pastronte \"rrëmujën e këmbëve\" nën tavolina dhe karrige." },
      [["Womb Chair", 1948, "kn-womb-chair"], ["Tulip Chair", 1956, "kn-tulip-chair"], ["Tulip Table", 1956, "kn-tulip-table"]]),
    "harry-bertoia": dz("Harry Bertoia", "knoll", "1915–1978", { en: "Italy · United States", sq: "Itali · SHBA" }, "Bertoia", "pt-bertoia",
      { en: "Italian-born sculptor who saw his chairs as sculpture made mostly of air.", sq: "Skulptor me origjinë italiane që i shihte karriget e tij si skulptura të bëra kryesisht prej ajri." },
      [["Diamond Chair", 1952, null], ["Side Chair", 1952, null], ["Bird Chair", 1952, null]]),
    "marcel-breuer": dz("Marcel Breuer", "knoll", "1902–1981", { en: "Hungary · United States", sq: "Hungari · SHBA" }, "Breuer", "pt-breuer",
      { en: "Bauhaus master who first bent tubular steel into furniture.", sq: "Mjeshtër i Bauhaus që i pari e përkuli tubin e çelikut në mobilie." },
      [["Wassily Chair", 1925, "kn-wassily-chair"], ["Cesca Chair", 1928, null]]),
    "florence-knoll": dz("Florence Knoll", "knoll", "1917–2019", US, "Florence Knoll", "pt-florence-knoll",
      { en: "Architect and co-founder who shaped the modern office and the Knoll identity, and ran the company after 1955.", sq: "Arkitekte dhe bashkëthemeluese që i dha formë zyrës moderne dhe identitetit të Knoll, dhe e drejtoi kompaninë pas vitit 1955." },
      [["Florence Knoll Sofa", 1954, null], ["Florence Knoll Lounge Collection", 1954, null]]),
    "castiglioni": dz("Achille & Pier Giacomo Castiglioni", "flos", "1918–2002 · 1913–1968", IT, "Castiglioni", "pt-castiglioni",
      { en: "Milanese architect brothers who brought wit and invention to everyday objects. They were Flos's first designers and the authors of its greatest icons.", sq: "Vëllezër arkitektë milanezë që sollën zgjuarsi dhe shpikje në objektet e përditshme. Ishin projektuesit e parë të Flos dhe autorët e ikonave të saj më të mëdha." },
      [["Taraxacum", 1960, null], ["Splugen Brau", 1961, null], ["Arco", 1962, "fl-arco"], ["Toio", 1962, "fl-toio"], ["Taccia", 1962, "fl-taccia"], ["Snoopy", 1967, "fl-snoopy"]], { short: "Castiglioni" }),
    "tobia-afra-scarpa": dz("Tobia & Afra Scarpa", "flos", "1935 · 1937–2011", IT, "Scarpa", "pt-tobia-scarpa",
      { en: "Venetian architect-designer couple, part of Flos's early creative leadership. For Cassina they designed the Soriana sofa.", sq: "Çift arkitektësh dhe projektuesish venecianë, pjesë e drejtimit të hershëm krijues të Flos. Për Cassina projektuan divanin Soriana." },
      [["Biagio", 1968, null], ["Seki-Han", null, null]]),
    "gino-sarfatti": dz("Gino Sarfatti", "flos", "1912–1985", IT, "Sarfatti", "pt-sarfatti",
      { en: "Pioneer of Italian lighting design, whose work is now part of the Flos collection.", sq: "Pionier i dizajnit italian të ndriçimit, vepra e të cilit sot është pjesë e koleksionit Flos." },
      [["2097 Chandelier", 1958, null]]),
    "michael-anastassiades": dz("Michael Anastassiades", "flos", "b. 1967", { en: "Cyprus · United Kingdom", sq: "Qipro · Mbretëri e Bashkuar" }, "Anastassiades", "pt-anastassiades",
      { en: "Cypriot-born, London-based designer whose geometric, balanced lights define Flos today.", sq: "Projektues me origjinë nga Qiproja, me bazë në Londër, ndriçuesit gjeometrikë dhe të ekuilibruar të të cilit e përcaktojnë Flos-in sot." },
      [["IC Lights", 2014, null], ["Coordinates", 2020, null], ["Arrangements", 2018, null]]),
    "philippe-starck": dz("Philippe Starck", "flos", "b. 1949", { en: "France", sq: "Francë" }, "Starck", "pt-starck",
      { en: "French designer whose playful, provocative lamps helped shape Flos from the 1980s onward.", sq: "Projektues francez llambat lozonjare dhe provokuese të të cilit ndihmuan në formësimin e Flos nga vitet '80 e tutje." },
      [["Miss Sissi", 1990, null], ["Romeo Moon", 1995, null]]),
    "charles-ray-eames": dz("Charles & Ray Eames", "vitra", "1907–1978 · 1912–1988", US, "Eames", "pt-eames",
      { en: "The American husband-and-wife team who moulded plywood, fibreglass and plastic into some of the most loved furniture of the twentieth century. Vitra produces their work for Europe and the Middle East.", sq: "Çifti amerikan që e formësoi kompensatën, fibrën e qelqit dhe plastikën në disa nga mobiliet më të dashura të shekullit XX. Vitra prodhon veprën e tyre për Evropën dhe Lindjen e Mesme." },
      [["Plywood Group LCW", 1945, "vi-lcw"], ["Eames Elephant", 1945, "vi-eames-elephant"], ["La Chaise", 1948, "vi-la-chaise"], ["Eames Plastic Side Chair", 1950, "vi-eames-plastic-side-chair"], ["Lounge Chair & Ottoman", 1956, "vi-eames-lounge-chair"]], { short: "Charles & Ray Eames" }),
    "verner-panton": dz("Verner Panton", "vitra", "1926–1998", { en: "Denmark", sq: "Danimarkë" }, "Panton", "pt-panton",
      { en: "Danish designer of colour, curve and plastic, whose cantilevered Panton Chair became a symbol of 1960s optimism.", sq: "Projektues danez i ngjyrës, lakoreve dhe plastikës, Panton Chair i të cilit u bë simbol i optimizmit të viteve '60." },
      [["Panton Chair", 1959, "vi-panton-chair"]]),
    "frank-gehry": dz("Frank Gehry", "vitra", "b. 1929", { en: "Canada · United States", sq: "Kanada · SHBA" }, "Gehry", "pt-gehry",
      { en: "Architect of the Guggenheim Bilbao and the Vitra Design Museum, who turned corrugated cardboard into furniture years before his buildings made him famous.", sq: "Arkitekti i Guggenheim Bilbao dhe i Vitra Design Museum, që e ktheu kartonin e valëzuar në mobilie vite para se ndërtesat ta bënin të famshëm." },
      [["Wiggle Side Chair", 1972, "vi-wiggle-side-chair"]]),
    "george-nelson": dz("George Nelson", "vitra", "1908–1986", US, "Nelson", "pt-nelson",
      { en: "American architect, writer and design director whose studio produced the Marshmallow Sofa, the Coconut Chair and a family of clocks.", sq: "Arkitekt, shkrimtar dhe drejtor dizajni amerikan, studio e të cilit krijoi Marshmallow Sofa, Coconut Chair dhe një familje orësh." },
      [["Marshmallow Sofa", 1956, null], ["Coconut Chair", 1955, null]]),
    "isamu-noguchi": dz("Isamu Noguchi", "vitra", "1904–1988", { en: "United States · Japan", sq: "SHBA · Japoni" }, "Noguchi", "pt-noguchi",
      { en: "Japanese-American sculptor who brought a sculptor's eye to furniture and light, from the Coffee Table to the Akari lamps.", sq: "Skulptor japonezo-amerikan që solli syrin e skulptorit te mobiliet dhe drita, nga Coffee Table te llambat Akari." },
      [["Noguchi Coffee Table", 1944, "vi-noguchi-coffee-table"]]),
    "frank-lloyd-wright": dz("Frank Lloyd Wright", "cassina", "1867–1959", US, "Lloyd Wright", "pt-wright",
      { en: "The great American architect of Fallingwater and the Guggenheim in New York. Cassina reissues the furniture he drew for his own buildings in the i Maestri collection.", sq: "Arkitekti i madh amerikan i Fallingwater dhe i Guggenheim në Nju Jork. Cassina riboton në koleksionin i Maestri mobiliet që ai vizatoi për ndërtesat e veta." },
      [["Barrel", 1937, null]])
  };
  /* portraits for designers already in the catalogue */
  var PHOTOS = {
    "hans-j-wegner": "pt-wegner", "cecilie-manz": "pt-cecilie-manz", "jaime-hayon": "pt-hayon",
    "le-corbusier": "pt-le-corbusier", "charlotte-perriand": "pt-perriand", "gio-ponti": "pt-ponti", "gerrit-rietveld": "pt-rietveld",
    "vico-magistretti": "pt-magistretti", "mario-bellini": "pt-bellini", "patricia-urquiola": "pt-urquiola",
    "gae-aulenti": "pt-aulenti", "franco-albini": "pt-albini", "marco-zanuso": "pt-zanuso", "massimo-castagna": "pt-castagna",
    "paola-navone": "pt-navone", "palomba": "pt-palomba", "studiopepe": "pt-studiopepe"
  };

  /* ---------- new products ---------- */
  function pr(id, n, b, d, y, t, c, r, im, st, extra) {
    var p = { id: id, n: n, b: b, d: d, y: y, t: t, c: c, r: r, im: im.map(function (x) { return [ph(x[0]), x[1]]; }), st: st, f: 1 };
    for (var k in (extra || {})) p[k] = extra[k];
    return p;
  }
  var ICON_TXT = {}; /* filled below, shared by products and icons */
  function T2(en, sq) { return { en: en, sq: sq }; }
  ICON_TXT.egg = T2("Sculpted for the lobby of the SAS Royal Hotel in Copenhagen, the Egg wraps its sitter in a single flowing shell, offering privacy in the middle of a busy room. More than sixty years on, it remains the most recognisable silhouette in Danish design.", "E skalitur për hollin e SAS Royal Hotel në Kopenhagë, Egg e mbështjell atë që ulet në një guaskë të vetme të rrjedhshme, duke i dhënë privatësi në mes të një dhome plot lëvizje. Mbi gjashtëdhjetë vjet më vonë, mbetet silueta më e njohur e dizajnit danez.");
  ICON_TXT.swan = T2("Created for the same hotel as the Egg, the Swan has not a single straight line. Its soft, winged shell gives a lounge chair's comfort in a compact form, at home in a living room, a hotel lobby or a quiet office corner.", "E krijuar për të njëjtin hotel si Egg, Swan nuk ka asnjë vijë të drejtë. Guaska e saj e butë me krahë jep rehatinë e një kolltuku në një formë kompakte, që i shkon një dhome ndenjeje, një holli hoteli ose një këndi të qetë zyre.");
  ICON_TXT.s7 = T2("One sheet of pressed, moulded veneer, shaped into a waist that gives the chair its gentle flex. Light, stackable and endlessly adaptable, the Series 7 is the best-selling chair in Fritz Hansen's history and a natural choice for dining rooms and workspaces alike.", "Një fletë e vetme rimeso e presuar dhe e formuar, me një bel që i jep karriges elasticitetin e butë. E lehtë, e mbivendosshme dhe pafundësisht e përshtatshme, Series 7 është karrigia më e shitur në historinë e Fritz Hansen dhe zgjedhje e natyrshme si për dhomat e ngrënies ashtu edhe për zyrat.");
  ICON_TXT.ant = T2("The chair that started it all: Jacobsen's first chair with seat and back formed from a single piece of moulded veneer. Its slender waist and light frame make it as practical as it is graceful, around a dining table or in a café.", "Karrigia me të cilën nisi gjithçka: karrigia e parë e Jacobsen me ndenjëse dhe shpinë nga një copë e vetme rimeso e formuar. Beli i hollë dhe struktura e lehtë e bëjnë po aq praktike sa edhe elegante, rreth një tavoline ngrënieje ose në një kafene.");
  ICON_TXT.gp = T2("Named after the prize it received at the Milan Triennale in 1957. The Grand Prix refines Jacobsen's moulded-veneer language with a sharper, more sculptural back, an elegant chair for the dining room and the boardroom.", "Mban emrin e çmimit që mori në Trienalen e Milanos në 1957. Grand Prix e përsos gjuhën e Jacobsen me rimeso të formuar me një shpinë më të mprehtë e më skulpturore, një karrige elegante për dhomën e ngrënies dhe sallën e mbledhjeve.");
  ICON_TXT.oxford = T2("Designed for the dons of St Catherine's College, Oxford, where Jacobsen designed the entire college. Its tall back gives the chair quiet authority, making it a classic for executive offices and meeting rooms.", "E projektuar për profesorët e St Catherine's College në Oksford, ku Jacobsen projektoi të gjithë kolegjin. Shpina e lartë i jep karriges një autoritet të qetë dhe e bën klasike për zyrat drejtuese dhe sallat e mbledhjeve.");
  ICON_TXT.pk22 = T2("Kjærholm treated steel with the same respect a cabinetmaker gives wood. The PK22 pairs a precise, brushed steel frame with leather or woven cane: a low lounge chair of perfect proportions, minimal in form and generous in presence.", "Kjærholm e trajtonte çelikun me të njëjtin respekt që një marangoz i jep drurit. PK22 bashkon një strukturë të saktë çeliku të lëmuar me lëkurë ose kallam të thurur: një kolltuk i ulët me përmasa të përsosura, minimal në formë dhe bujar në prani.");
  ICON_TXT.bchair = T2("Designed for the German Pavilion at the 1929 International Exposition in Barcelona, this chair became the defining image of modern elegance. Hand-tufted leather cushions rest on a polished steel X-frame, and Knoll has produced it with Mies's authorisation since 1953.", "E projektuar për Pavijonin Gjerman në Ekspozitën Ndërkombëtare të Barcelonës në 1929, kjo karrige u bë imazhi përcaktues i elegancës moderne. Jastëkët prej lëkure të kapitonuar me dorë mbështeten mbi një strukturë X prej çeliku të lëmuar, dhe Knoll e prodhon me autorizimin e Mies që nga 1953.");
  ICON_TXT.bstool = T2("The companion to the Barcelona Chair, built on the same crossed steel frame. It serves as an ottoman, an extra seat or a sculptural bench at the foot of a bed.", "Shoqëruesi i karriges Barcelona, i ndërtuar mbi të njëjtën strukturë çeliku të kryqëzuar. Shërben si mbështetëse këmbësh, ndenjëse shtesë ose stol skulpturor në fund të shtratit.");
  ICON_TXT.bday = T2("A single tufted leather cushion resting on a wooden frame with steel legs. Mies's day bed brings the calm of the Barcelona collection to living rooms, studies and gallery-like spaces.", "Një jastëk i vetëm lëkure i kapitonuar mbi një strukturë druri me këmbë çeliku. Shtrati i ditës i Mies sjell qetësinë e koleksionit Barcelona në dhoma ndenjeje, studio dhe hapësira si galeri.");
  ICON_TXT.brno = T2("Created for the dining room of Villa Tugendhat in Brno, now a UNESCO World Heritage Site. Its cantilevered frame lets the chair float without back legs, a quiet piece of architecture around any dining or conference table.", "E krijuar për dhomën e ngrënies së Vilës Tugendhat në Brno, sot pjesë e Trashëgimisë Botërore UNESCO. Struktura në konsol e lë karrigen të qëndrojë pezull pa këmbë të pasme, një copë e qetë arkitekture rreth çdo tavoline ngrënieje ose mbledhjesh.");
  ICON_TXT.womb = T2("Florence Knoll asked Saarinen for a chair she could curl up in. The answer was the Womb: a generous moulded shell that invites you to sit however you like, still one of the most comfortable lounge chairs ever made.", "Florence Knoll i kërkoi Saarinen një karrige ku të mund të mblidhej kruspull. Përgjigjja ishte Womb: një guaskë bujare e formuar që të fton të ulesh si të duash, ende një nga kolltukët më të rehatshëm të bërë ndonjëherë.");
  ICON_TXT.tchair = T2("Saarinen wanted to clear away what he called the slum of legs beneath tables and chairs. The Tulip Chair rises from a single slender pedestal, giving dining rooms and kitchens a calm, uninterrupted line.", "Saarinen donte të pastronte atë që e quante rrëmuja e këmbëve nën tavolina dhe karrige. Tulip Chair ngrihet mbi një këmbë të vetme të hollë dhe u jep dhomave të ngrënies dhe kuzhinave një vijë të qetë e të pandërprerë.");
  ICON_TXT.ttable = T2("The pedestal table that completes the Tulip collection, with tops in marble, wood or laminate. With no legs to work around, every seat at the table is a good one.", "Tavolina me një këmbë që plotëson koleksionin Tulip, me sipërfaqe mermeri, druri ose laminati. Pa këmbë që të pengojnë, çdo vend rreth tavolinës është i mirë.");
  ICON_TXT.wassily = T2("Designed at the Bauhaus and reportedly inspired by the tubular frame of a bicycle, the Wassily was one of the first chairs made of bent steel tube. Its leather straps and open frame turned a lounge chair into a statement of modernity.", "E projektuar në Bauhaus dhe, siç thuhet, e frymëzuar nga korniza tubulare e një biçiklete, Wassily ishte ndër karriget e para prej tubi çeliku të përkulur. Rripat prej lëkure dhe struktura e hapur e kthyen një kolltuk në një deklaratë moderniteti.");
  ICON_TXT.lc1 = T2("A lightweight armchair whose backrest pivots to follow the sitter's movement. Leather straps on a polished steel frame give it a refined, almost architectural lightness.", "Një kolltuk i lehtë, shpina e të cilit rrotullohet për të ndjekur lëvizjen e atij që ulet. Rripat prej lëkure mbi një strukturë çeliku të lëmuar i japin një lehtësi të rafinuar, thuajse arkitekturore.");
  ICON_TXT.lc2 = T2("The Fauteuil Grand Confort, petit modèle: soft cushions held inside an exposed steel cage, turning the traditional club chair inside out. A cornerstone of modern interiors for nearly a century.", "Fauteuil Grand Confort, petit modèle: jastëkë të butë brenda një kafazi çeliku të dukshëm, që e kthen përmbys kolltukun tradicional të klubit. Gur themeli i interierëve modernë prej gati një shekulli.");
  ICON_TXT.lc3 = T2("The grand modèle of the LC2, lower and deeper, made for long conversations and slow afternoons. Available as an armchair and as two- and three-seat sofas.", "Grand modèle i LC2, më i ulët dhe më i thellë, i bërë për biseda të gjata dhe pasdite të qeta. Ofrohet si kolltuk dhe si divan me dy ose tre vende.");
  ICON_TXT.lc4 = T2("Le Corbusier called it a machine for resting. The curved chaise slides freely on its base so the sitter can find any angle from upright to fully reclined. Cassina has produced it since 1965.", "Le Corbusier e quajti një makinë për të pushuar. Shezlongu i lakuar rrëshqet lirshëm mbi bazë që ai që ulet të gjejë çdo kënd, nga ulur drejt deri plotësisht i shtrirë. Cassina e prodhon që nga 1965.");
  ICON_TXT.zigzag = T2("Four flat planes joined in a single bold zigzag, with no conventional legs at all. Nearly a century on, it still looks radically new.", "Katër plane të sheshta të bashkuara në një zigzag të vetëm e të guximshëm, pa asnjë këmbë të zakonshme. Gati një shekull më vonë, duket ende rrënjësisht e re.");
  ICON_TXT.utrecht = T2("Rietveld's softest design: a deep, angular armchair upholstered in fabric and finished with visible blanket stitching. Playful and comfortable, it brings character to any living room.", "Dizajni më i butë i Rietveld: një kolltuk i thellë dhe këndor, i veshur me stof dhe i përfunduar me qepje të dukshme. Lozonjar dhe i rehatshëm, i jep karakter çdo dhome ndenjeje.");
  ICON_TXT.superleggera = T2("Inspired by the traditional light chairs of Chiavari, Ponti refined every element until the chair weighed under two kilos, light enough to lift with one finger. A masterpiece of Italian craftsmanship.", "I frymëzuar nga karriget tradicionale të lehta të Chiavari-t, Ponti e përsosi çdo element derisa karrigia peshoi nën dy kilogramë, aq e lehtë sa ngrihet me një gisht. Kryevepër e mjeshtërisë italiane.");
  ICON_TXT.maralunga = T2("A sofa with a clever gesture: its backrest folds up to become a headrest. Magistretti's design won the Compasso d'Oro and remains one of the most comfortable sofas in the Cassina collection.", "Një divan me një gjest të zgjuar: shpina paloset lart dhe bëhet mbështetëse koke. Dizajni i Magistretti fitoi Compasso d'Oro dhe mbetet një nga divanët më të rehatshëm të koleksionit Cassina.");
  ICON_TXT.cab = T2("A steel frame dressed in a fitted saddle-leather skin, closed with zips along the legs. Tailored rather than upholstered, the Cab brings warmth and craft to dining rooms and offices.", "Një strukturë çeliku e veshur me një lëkurë shale të qepur me masë, e mbyllur me zinxhirë përgjatë këmbëve. E qepur si rrobë më shumë se e tapicuar, Cab sjell ngrohtësi dhe mjeshtëri në dhomat e ngrënies dhe zyrat.");
  ICON_TXT.arco = T2("A steel arc that reaches across the room from a block of Carrara marble, lighting a table as if from the ceiling. A hole in the marble lets two people lift it with a broom handle: Castiglioni's wit in a single detail.", "Një hark çeliku që shtrihet përgjatë dhomës nga një bllok mermeri Carrara dhe ndriçon tavolinën si nga tavani. Një vrimë në mermer lejon dy veta ta ngrenë me një bisht fshese: zgjuarsia e Castiglioni në një detaj të vetëm.");
  ICON_TXT.taccia = T2("A glass bowl that reflects light upward, resting on a finned base that recalls a classical column. Monumental and soft at once, it turns any surface into a stage.", "Një tas xhami që e reflekton dritën lart, mbi një bazë me brinjë që të kujton një kolonë klasike. Monumentale dhe e butë njëkohësisht, e kthen çdo sipërfaqe në skenë.");
  ICON_TXT.toio = T2("A floor lamp assembled from everyday parts, including a car headlamp and fishing-rod rings. A celebration of industrial ready-mades and one of the boldest lamps of the century.", "Një llambë dyshemeje e montuar nga pjesë të përditshme, përfshirë një fener makine dhe unaza kallami peshkimi. Një festë e objekteve industriale të gatshme dhe një nga llambat më të guximshme të shekullit.");
  ICON_TXT.snoopy = T2("A marble base, a glass disc and an enamelled shade whose profile recalls the famous cartoon dog. Witty, sculptural and perfectly at home on a desk or side table.", "Një bazë mermeri, një disk xhami dhe një abazhur i smaltuar, profili i të cilit të kujton qenin e famshëm të filmave vizatimorë. E zgjuar, skulpturore dhe në vendin e saj mbi një tryezë pune ose komodinë.");
  ICON_TXT.lounge = T2("The Eameses wanted a modern version of the English club chair. Moulded plywood shells, soft leather cushions and a design made to age beautifully have made it the most celebrated lounge chair of the twentieth century.", "Çifti Eames donte një version modern të kolltukut anglez të klubit. Guaskat prej kompensate të formuar, jastëkët e butë prej lëkure dhe një dizajn që plaket bukur e kanë bërë kolltukun më të famshëm të shekullit XX.");
  ICON_TXT.plastic = T2("Born from a Museum of Modern Art competition for low-cost furniture, it was one of the first chairs made of industrially produced plastic. Endlessly versatile, with bases from wood to steel wire.", "E lindur nga një konkurs i Museum of Modern Art për mobilie me kosto të ulët, ishte ndër karriget e para prej plastike të prodhuar industrialisht. Pafundësisht e përshtatshme, me baza nga druri te teli i çelikut.");
  ICON_TXT.lcw = T2("The result of the Eameses' experiments with moulding plywood in three dimensions. Low, light and inviting, the LCW has been hailed as one of the defining designs of the century.", "Rezultati i eksperimenteve të çiftit Eames me formimin e kompensatës në tre dimensione. E ulët, e lehtë dhe ftuese, LCW është cilësuar si një nga dizajnet përcaktuese të shekullit.");
  ICON_TXT.lachaise = T2("Inspired by a reclining sculpture by Gaston Lachaise, this flowing shell on a wood-and-steel base is as much an artwork as a lounge chair. A centrepiece for a room meant to be looked at.", "E frymëzuar nga një skulpturë e shtrirë e Gaston Lachaise, kjo guaskë e rrjedhshme mbi një bazë druri dhe çeliku është po aq vepër arti sa edhe kolltuk. Pjesa qendrore e një dhome që është bërë për t'u parë.");
  ICON_TXT.elephant = T2("First shaped in plywood by the Eameses, the Elephant is a toy, a seat and a small sculpture in one, beloved by children and collectors alike.", "I formuar fillimisht në kompensatë nga çifti Eames, Elephant është lodër, ndenjëse dhe skulpturë e vogël njëherësh, i dashur nga fëmijët dhe koleksionistët njësoj.");
  ICON_TXT.panton = T2("The first chair made from a single piece of plastic, cantilevered in one continuous curve. Sensual, colourful and unmistakable, it remains a symbol of 1960s optimism.", "Karrigia e parë e bërë nga një copë e vetme plastike, në konsol me një lakore të vetme të pandërprerë. Sensuale, plot ngjyrë dhe e pagabueshme, mbetet simbol i optimizmit të viteve '60.");
  ICON_TXT.wiggle = T2("Made from layers of corrugated cardboard, the Wiggle turned a humble material into a sculptural, surprisingly sturdy chair, years before Gehry became a world-famous architect.", "E bërë nga shtresa kartoni të valëzuar, Wiggle e ktheu një material të thjeshtë në një karrige skulpturore dhe çuditërisht të fortë, vite para se Gehry të bëhej arkitekt me famë botërore.");
  ICON_TXT.noguchi = T2("Two identical curved wooden pieces interlock to support a heavy glass top. The sculptor's eye shows in every angle: a table that is also a work of art.", "Dy copa druri identike dhe të lakuara ndërthuren për të mbajtur një sipërfaqe të rëndë xhami. Syri i skulptorit duket në çdo kënd: një tavolinë që është edhe vepër arti.");

  var X = ICON_TXT;
  var PRODUCTS = [
    pr("kn-barcelona-chair", "Barcelona® Chair", "knoll", "Ludwig Mies van der Rohe", 1929, "armchairs", "Barcelona® Collection", ["living", "office"], [["kn-barcelona-chair-1", 1], ["kn-barcelona-chair-3", 0], ["kn-barcelona-chair-2", 0]], X.bchair, { cur: 1 }),
    pr("kn-barcelona-stool", "Barcelona® Stool", "knoll", "Ludwig Mies van der Rohe", 1929, "chairs", "Barcelona® Collection", ["living", "bedroom"], [["kn-barcelona-stool-1", 1], ["kn-barcelona-stool-2", 1]], X.bstool, { sub: "stool" }),
    pr("kn-barcelona-daybed", "Barcelona® Day Bed", "knoll", "Ludwig Mies van der Rohe", 1930, "sofas", "Barcelona® Collection", ["living"], [["kn-barcelona-daybed-1", 1], ["kn-barcelona-daybed-2", 0]], X.bday),
    pr("kn-brno-chair", "Brno Chair", "knoll", "Ludwig Mies van der Rohe", 1930, "chairs", "Brno Collection", ["dining", "office"], [["kn-brno-1", 1], ["kn-brno-2", 1]], X.brno),
    pr("kn-womb-chair", "Womb Chair", "knoll", "Eero Saarinen", 1948, "armchairs", "Saarinen Collection", ["living"], [["kn-womb-1", 1], ["kn-womb-2", 1]], X.womb, { cur: 1 }),
    pr("kn-tulip-chair", "Tulip Chair", "knoll", "Eero Saarinen", 1956, "chairs", "Saarinen Collection", ["dining", "kitchen"], [["kn-tulip-chair-1", 1], ["kn-tulip-chair-2", 1]], X.tchair),
    pr("kn-tulip-table", "Tulip Table", "knoll", "Eero Saarinen", 1956, "tables", "Saarinen Collection", ["dining", "kitchen"], [["kn-tulip-table-1", 1]], X.ttable, { sub: "dining" }),
    pr("kn-wassily-chair", "Wassily Chair", "knoll", "Marcel Breuer", 1925, "armchairs", "Breuer Collection", ["living", "office"], [["kn-wassily-1", 1], ["kn-wassily-2", 0]], X.wassily),
    pr("fl-arco", "Arco", "flos", "Achille & Pier Giacomo Castiglioni", 1962, "floor-lamp", "Castiglioni", ["living", "dining"], [["fl-arco-1", 1]], X.arco, { cur: 1 }),
    pr("fl-taccia", "Taccia", "flos", "Achille & Pier Giacomo Castiglioni", 1962, "table-lamp", "Castiglioni", ["living"], [["fl-taccia-1", 1]], X.taccia),
    pr("fl-toio", "Toio", "flos", "Achille & Pier Giacomo Castiglioni", 1962, "floor-lamp", "Castiglioni", ["living", "office"], [["fl-toio-1", 1]], X.toio),
    pr("fl-snoopy", "Snoopy", "flos", "Achille & Pier Giacomo Castiglioni", 1967, "table-lamp", "Castiglioni", ["living", "bedroom", "office"], [["fl-snoopy-1", 1]], X.snoopy),
    pr("vi-eames-lounge-chair", "Eames Lounge Chair & Ottoman", "vitra", "Charles & Ray Eames", 1956, "armchairs", "Eames", ["living"], [["vi-eames-lounge-1", 1]], X.lounge, { cur: 1 }),
    pr("vi-eames-plastic-side-chair", "Eames Plastic Side Chair", "vitra", "Charles & Ray Eames", 1950, "chairs", "Eames", ["dining", "kitchen", "office"], [["vi-eames-plastic-1", 1]], X.plastic),
    pr("vi-lcw", "Plywood Group LCW", "vitra", "Charles & Ray Eames", 1945, "armchairs", "Eames", ["living"], [["vi-lcw-1", 1]], X.lcw),
    pr("vi-la-chaise", "La Chaise", "vitra", "Charles & Ray Eames", 1948, "armchairs", "Eames", ["living"], [["vi-la-chaise-1", 1]], X.lachaise),
    pr("vi-eames-elephant", "Eames Elephant", "vitra", "Charles & Ray Eames", 1945, "decor", "Eames", ["living", "bedroom"], [["vi-elephant-1", 1]], X.elephant),
    pr("vi-panton-chair", "Panton Chair", "vitra", "Verner Panton", 1959, "chairs", "Panton", ["dining", "living"], [["vi-panton-1", 1]], X.panton),
    pr("vi-wiggle-side-chair", "Wiggle Side Chair", "vitra", "Frank Gehry", 1972, "chairs", "Gehry", ["living"], [["vi-wiggle-1", 1]], X.wiggle),
    pr("vi-noguchi-coffee-table", "Noguchi Coffee Table", "vitra", "Isamu Noguchi", 1944, "tables", "Noguchi", ["living"], [["vi-noguchi-table-1", 1]], X.noguchi)
  ];

  /* ---------- icons, in the order of the FAZA 1 brief ---------- */
  function ic(t, p, by, k, cta) { return { t: t, p: p, by: by, en: X[k].en, sq: X[k].sq, cta: cta || 0 }; }
  var ICONS = [
    ic("Egg™", "egg-chair", "Arne Jacobsen, 1958", "egg"),
    ic("Swan™", "swan-chair", "Arne Jacobsen, 1958", "swan", 1),
    ic("Series 7™", "series-7", "Arne Jacobsen, 1955", "s7", 2),
    ic("Ant™", "ant-chair", "Arne Jacobsen, 1952", "ant"),
    ic("Grand Prix™", "grand-prix", "Arne Jacobsen, 1957", "gp", 1),
    ic("Oxford™", "oxford-chair", "Arne Jacobsen, 1965", "oxford", 2),
    ic("PK22™", "pk22", "Poul Kjærholm, 1956", "pk22"),
    ic("Barcelona® Chair", "kn-barcelona-chair", "Ludwig Mies van der Rohe, 1929", "bchair", 2),
    ic("Barcelona® Stool", "kn-barcelona-stool", "Ludwig Mies van der Rohe, 1929", "bstool", 2),
    ic("Barcelona® Day Bed", "kn-barcelona-daybed", "Ludwig Mies van der Rohe, 1930", "bday", 2),
    ic("Brno Chair", "kn-brno-chair", "Ludwig Mies van der Rohe, 1930", "brno", 2),
    ic("Womb Chair", "kn-womb-chair", "Eero Saarinen, 1948", "womb", 2),
    ic("Tulip Chair", "kn-tulip-chair", "Eero Saarinen, 1956", "tchair", 2),
    ic("Tulip Table", "kn-tulip-table", "Eero Saarinen, 1956", "ttable", 2),
    ic("Wassily Chair", "kn-wassily-chair", "Marcel Breuer, 1925", "wassily", 2),
    ic("LC1", "ca-lc1", "Le Corbusier, Jeanneret, Perriand, 1928", "lc1"),
    ic("LC2", "ca-lc2", "Le Corbusier, Jeanneret, Perriand, 1928", "lc2", 1),
    ic("LC3", "ca-lc3", "Le Corbusier, Jeanneret, Perriand, 1928", "lc3", 2),
    ic("LC4", "ca-lc4", "Le Corbusier, Jeanneret, Perriand, 1928", "lc4"),
    ic("Zig-Zag", "ca-zig-zag", "Gerrit T. Rietveld, 1934", "zigzag", 1),
    ic("Utrecht", "ca-utrecht", "Gerrit T. Rietveld, 1935", "utrecht", 2),
    ic("Superleggera", "ca-699-superleggera", "Gio Ponti, 1957", "superleggera"),
    ic("Maralunga", "ca-maralunga", "Vico Magistretti, 1973", "maralunga", 1),
    ic("Cab", "ca-cab", "Mario Bellini, 1977", "cab", 2),
    ic("Arco", "fl-arco", "Achille & Pier Giacomo Castiglioni, 1962", "arco"),
    ic("Taccia", "fl-taccia", "Achille & Pier Giacomo Castiglioni, 1962", "taccia", 1),
    ic("Toio", "fl-toio", "Achille & Pier Giacomo Castiglioni, 1962", "toio", 2),
    ic("Snoopy", "fl-snoopy", "Achille & Pier Giacomo Castiglioni, 1967", "snoopy"),
    ic("Eames Lounge Chair & Ottoman", "vi-eames-lounge-chair", "Charles & Ray Eames, 1956", "lounge", 1),
    ic("Eames Plastic Side Chair", "vi-eames-plastic-side-chair", "Charles & Ray Eames, 1950", "plastic", 2),
    ic("Plywood Group LCW", "vi-lcw", "Charles & Ray Eames, 1945", "lcw"),
    ic("La Chaise", "vi-la-chaise", "Charles & Ray Eames, 1948", "lachaise", 1),
    ic("Eames Elephant", "vi-eames-elephant", "Charles & Ray Eames, 1945", "elephant", 2),
    ic("Panton Chair", "vi-panton-chair", "Verner Panton, 1959–1960", "panton"),
    ic("Wiggle Side Chair", "vi-wiggle-side-chair", "Frank Gehry, 1972", "wiggle", 1),
    ic("Noguchi Coffee Table", "vi-noguchi-coffee-table", "Isamu Noguchi, 1944", "noguchi", 2)
  ];

  window.ETERNA_FAZA1 = function (D) {
    var k;
    for (k in BRANDS) if (!D.brands[k]) D.brands[k] = JSON.parse(JSON.stringify(BRANDS[k]));
    D.brandOrder = ORDER.filter(function (b) { return D.brands[b]; }).concat(D.brandOrder.filter(function (b) { return ORDER.indexOf(b) < 0; }));
    for (k in DESIGNERS) if (!D.designers[k]) D.designers[k] = JSON.parse(JSON.stringify(DESIGNERS[k]));
    for (k in PHOTOS) if (D.designers[k] && !D.designers[k].portrait && !D.designers[k].photo) D.designers[k].photo = ph(PHOTOS[k]);
    var have = {}; D.products.forEach(function (p) { have[p.id] = 1; });
    PRODUCTS.forEach(function (p) { if (!have[p.id]) D.products.push(JSON.parse(JSON.stringify(p))); });
    D.icons = ICONS.map(function (i) { return { t: i.t, p: i.p, by: i.by, en: i.en, sq: i.sq, cta: i.cta }; });
  };
})();
