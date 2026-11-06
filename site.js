// Lingue del sito: lo spagnolo è scritto nella pagina, italiano e inglese qui.
// La lingua si sceglie da sola (lingua del browser) e si ricorda se la si cambia.
// Link per le donazioni (Ko-fi, pagamenti con Stripe): vuoto = la sezione non si vede
const DONATE_URL = 'https://ko-fi.com/supplyville';

const TEXT = {
  it: {
    'nav.features': 'Caratteristiche', 'nav.gallery': 'Immagini', 'nav.download': 'Scarica', 'nav.play': 'Gioca',
    'hero.badge': 'In sviluppo · novità ogni settimana',
    'hero.tagline': 'Costruisci la città. Gestisci la filiera.',
    'hero.lead': "Un city builder isometrico retro dove ogni pagnotta del supermercato è partita come grano in una fattoria. Strade, fabbriche, furgoni, navi, corrente e acqua: decidi tu come funziona tutto.",
    'hero.play': '▶ Gioca gratis nel browser', 'hero.download': '⏳ Disponibile a breve',
    'hero.mobile': 'Si gioca meglio al computer con mouse e tastiera.',
    'feat.title': 'Tutto è collegato',
    'feat.sub': 'Niente spunta dal nulla: ogni prodotto viaggia sulle tue strade, dalla materia prima al negozio.',
    'chain.1': 'Fattoria', 'chain.1s': 'grano', 'chain.2': 'Fabbrica', 'chain.2s': 'farina', 'chain.3': 'Panificio', 'chain.3s': 'pane e torte', 'chain.4': 'Supermercato', 'chain.4s': 'tasse = soldi',
    'f1.t': 'Una città viva', 'f1.p': "Gli abitanti arrivano in auto da fuori mappa, cercano casa e vanno a lavorare nelle tue attività. Senza lavoratori vicini la produzione si ferma.",
    'f2.t': 'Catene di produzione', 'f2.p': 'Agricoltura, allevamento, latticini, carne, legno, mobili, tessile e abbigliamento. Più di 50 prodotti, ognuno con la sua ricetta.',
    'f3.t': 'Logistica vera', 'f3.p': 'Furgoni con carichi misti, magazzini, destinazioni scelte da te e distribuzione in percentuale. I percorsi cercano la strada più rapida.',
    'f4.t': 'Energia', 'f4.p': "Centrali eoliche, solari e a carbone, rete di bassa e alta tensione, tralicci, sottostazioni e corrente comprata e venduta fuori mappa.",
    'f5.t': 'Acqua e sottosuolo', 'f5.p': 'Pozzi, depuratori, tubi sotto le strade e scarichi in mare. Premi U per vedere il sottosuolo della città.',
    'f6.t': 'Porto, petrolio e navi', 'f6.p': 'Piattaforme in mare, petroliere e portacontainer che viaggiano tra i porti fino alla raffineria.',
    'f7.t': 'Strade come vuoi tu', 'f7.p': 'Autostrade, sensi unici, ponti, tunnel sotto le montagne, autobus... e ogni tanto un incidente.',
    'f8.t': 'Terreno generato', 'f8.p': 'Isole, montagne, boschi e coste diverse in ogni partita, da 128×128 a 1024×1024 caselle.',
    'gal.title': 'Immagini del gioco', 'gal.sub': 'Tutto disegnato nel codice, pixel per pixel, in stile retro.',
    'gal.1': 'Quartieri, negozi e il viale principale', 'gal.2': 'Zona industriale e porto', 'gal.3': 'Fattoria, campi di grano e magazzino',
    'gal.4': 'Una nave arriva al porto', 'gal.5': 'Parco eolico, pannelli solari e piattaforma petrolifera',
    'dl.title': 'Scarica', 'dl.t': 'Supplyville per PC', 'dl.p': 'Stiamo preparando la versione da scaricare per installare Supplyville sul tuo computer e giocare anche senza internet. Molto presto sarà disponibile qui!', 'dl.b': '⏳ Prossimamente',
    'dl.web.t': 'Nel browser', 'dl.web.p': 'Senza installare niente. Sempre l\'ultima versione. Le partite si salvano nel browser.', 'dl.web.b': '▶ Gioca ora',
    'dl.win.t': 'Versione per PC', 'dl.win.p': 'Presto potrai scaricare Supplyville e installarlo sul tuo computer. Nel frattempo gioca gratis nel browser.', 'dl.win.b': '⏳ Prossimamente',
    'dl.versions': 'Guarda tutte le versioni dello sviluppo →',
    'don.title': 'Sostieni lo sviluppo', 'don.p1': 'Supplyville lo sto creando da solo, nel tempo libero. Se il progetto ti piace e vuoi vederlo crescere più in fretta, una piccola donazione mi aiuta tantissimo a dedicarci più ore e ad aggiungere nuove funzioni.',
    'don.p2': 'È del tutto volontario: il gioco andrà avanti comunque. Grazie di essere qui!', 'don.btn': '☕ Sostienimi su Ko-fi',
    'cat.title': 'Tutto quello che c\'è in Supplyville', 'cat.sub': 'Veicoli, strade, colture, negozi, acqua, energia... e più di 50 prodotti che viaggiano per la tua città.', 'cat.prod': 'Prodotti', 'cat.hint': '👆 Tocca un elemento per vedere a cosa serve',
    'foot.rights': 'Tutti i diritti riservati.', 'foot.bug': 'Hai trovato un bug? Segnalamelo',
  },
  en: {
    'nav.features': 'Features', 'nav.gallery': 'Screenshots', 'nav.download': 'Download', 'nav.play': 'Play',
    'hero.badge': 'In development · new features every week',
    'hero.tagline': 'Build the city. Run the supply chain.',
    'hero.lead': 'A retro isometric city builder where every loaf of bread in the supermarket started as wheat on a farm. Roads, factories, vans, ships, power and water: you decide how it all works.',
    'hero.play': '▶ Play free in your browser', 'hero.download': '⏳ Coming soon',
    'hero.mobile': 'Best played on a computer with mouse and keyboard.',
    'feat.title': 'Everything is connected',
    'feat.sub': 'Nothing appears out of thin air: every product travels on your roads, from raw material to the shop.',
    'chain.1': 'Farm', 'chain.1s': 'wheat', 'chain.2': 'Factory', 'chain.2s': 'flour', 'chain.3': 'Bakery', 'chain.3s': 'bread and cakes', 'chain.4': 'Supermarket', 'chain.4s': 'taxes = money',
    'f1.t': 'A living city', 'f1.p': 'Residents drive in from outside the map, look for a home and go to work at your businesses. With no workers nearby, production stops.',
    'f2.t': 'Production chains', 'f2.p': 'Farming, livestock, dairy, meat, wood, furniture, textiles and clothing. Over 50 products, each with its own recipe.',
    'f3.t': 'Real logistics', 'f3.p': 'Vans with mixed cargo, warehouses, destinations you choose and percentage splits. Routes find the fastest way.',
    'f4.t': 'Power', 'f4.p': 'Wind, solar and coal plants, low and high voltage grids, pylons, substations, and buying and selling power beyond the map.',
    'f5.t': 'Water and underground', 'f5.p': 'Wells, treatment plants, pipes under the streets and sewage outlets to the sea. Press U to see what lies beneath your city.',
    'f6.t': 'Port, oil and ships', 'f6.p': 'Offshore platforms, tankers and container ships sailing between ports all the way to the refinery.',
    'f7.t': 'Roads your way', 'f7.p': 'Highways, one-way streets, bridges, tunnels through mountains, buses... and the occasional crash.',
    'f8.t': 'Generated terrain', 'f8.p': 'Different islands, mountains, forests and coasts every game, from 128×128 to 1024×1024 tiles.',
    'gal.title': 'Screenshots', 'gal.sub': 'Everything drawn in code, pixel by pixel, in retro style.',
    'gal.1': 'Neighbourhoods, shops and the main avenue', 'gal.2': 'Industrial zone and port', 'gal.3': 'Farm, wheat fields and warehouse',
    'gal.4': 'A ship arrives at the port', 'gal.5': 'Wind farm, solar panels and oil platform',
    'dl.title': 'Download', 'dl.t': 'Supplyville for PC', 'dl.p': "We're preparing the downloadable version so you can install Supplyville on your computer and play offline. It will be available here very soon!", 'dl.b': '⏳ Coming soon',
    'dl.web.t': 'In your browser', 'dl.web.p': 'Nothing to install. Always the latest version. Games are saved in your browser.', 'dl.web.b': '▶ Play now',
    'dl.win.t': 'PC version', 'dl.win.p': 'Soon you will be able to download Supplyville and install it on your computer. In the meantime, play free in your browser.', 'dl.win.b': '⏳ Coming soon',
    'dl.versions': 'See every development version →',
    'don.title': 'Support development', 'don.p1': "I'm building Supplyville on my own, in my spare time. If you like the project and want to see it grow faster, a small donation helps me a lot to spend more hours on it and add new features.",
    'don.p2': "It's completely optional: the game will keep moving forward anyway. Thanks for being here!", 'don.btn': '☕ Support me on Ko-fi',
    'cat.title': 'Everything in Supplyville', 'cat.sub': 'Vehicles, roads, crops, shops, water, power... and over 50 products travelling around your city.', 'cat.prod': 'Products', 'cat.hint': '👆 Tap any item to see what it does',
    'foot.rights': 'All rights reserved.', 'foot.bug': 'Found a bug? Let me know',
  },
};

const ES = {};
document.querySelectorAll('[data-t]').forEach(e => { ES[e.dataset.t] = e.textContent; });
const DOC_LANG = { es: 'es', it: 'it', en: 'en' };

function esc(t) { const d = document.createElement('span'); d.textContent = t; return d.innerHTML; }
let CUR_LANG = 'es';
const ITEMS = [];   // tutti gli elementi cliccabili (catalogo + prodotti), indice = data-i
function chip(item, l) {
  let i = ITEMS.indexOf(item); if (i < 0) { ITEMS.push(item); i = ITEMS.length - 1; }
  const ic = item.icon ? '<img src="' + item.icon + '" alt="">' : '<span class="emo">' + (item.emoji || '') + '</span>';
  return '<li><button type="button" class="chip" data-i="' + i + '">' + ic + esc(item.name[l]) + '</button></li>';
}
function renderCatalog(l) {
  const list = document.getElementById('catalog-list'), prod = document.getElementById('product-list');
  if (!list || typeof CATALOG === 'undefined') return;
  list.innerHTML = CATALOG.map(c => '<div class="cat"><h3><span>' + c.icon + '</span>' + esc(c.t[l]) + '</h3><ul>' +
    c.items.map(i => chip(i, l)).join('') + '</ul></div>').join('');
  prod.innerHTML = PRODUCTS.map(g => '<div class="prow"><b>' + esc(g.t[l]) + '</b><ul>' + g.items.map(i => chip(i, l)).join('') + '</ul></div>').join('');
}

// finestra con le informazioni di un elemento
function openInfo(item) {
  const l = CUR_LANG, box = document.getElementById('info');
  const ic = item.icon ? '<img src="' + item.icon + '" alt="">' : '<span class="emo">' + (item.emoji || '') + '</span>';
  const desc = item.desc && item.desc[l] ? '<p>' + esc(item.desc[l]) + '</p>' : '';
  const lines = item.lines && item.lines[l] && item.lines[l].length ? '<ul>' + item.lines[l].map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>' : '';
  box.querySelector('.info-body').innerHTML = '<div class="info-head">' + ic + '<h3>' + esc(item.name[l]) + '</h3></div>' + desc + lines;
  box.hidden = false;
  box.querySelector('.info-close').focus();
}
function closeInfo() { document.getElementById('info').hidden = true; }
document.addEventListener('click', e => {
  const c = e.target.closest('.chip');
  if (c) { openInfo(ITEMS[+c.dataset.i]); return; }
  if (e.target.id === 'info' || e.target.closest('.info-close')) closeInfo();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeInfo(); });

function setLang(l) {
  if (!DOC_LANG[l]) l = 'es';
  CUR_LANG = l;
  renderCatalog(l);
  const d = l === 'es' ? ES : TEXT[l];
  document.querySelectorAll('[data-t]').forEach(e => { const k = e.dataset.t; if (d[k] != null) e.textContent = d[k]; });
  document.documentElement.lang = l;
  document.querySelectorAll('.langs button').forEach(b => b.classList.toggle('on', b.dataset.lang === l));
}

document.querySelectorAll('.langs button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
// richiesta dell'utente: il sito si apre sempre in spagnolo; le altre lingue con i pulsanti in alto
setLang('es');
if (DONATE_URL) { document.getElementById('donate-link').href = DONATE_URL; document.getElementById('support').hidden = false; }
