# Sito di Supplyville (www.supplyville.com)

Pagina di sole informazioni sul gioco (il gioco è nel repository FlattFall/city-builder, pubblicato su https://flattfall.github.io/city-builder/).
- `index.html`, `site.css`, `site.js`: pagina statica. Testo spagnolo scritto nella pagina (`data-t`), italiano e inglese in `TEXT` di site.js. Si apre SEMPRE in spagnolo (richiesta dell'utente); IT/EN con i pulsanti.
- Niente link per giocare o alle versioni; sezione "Descargar" con la versione per PC "Próximamente" (pulsante finto `btn-soon`, nessun link) — richiesta dell'utente. In fondo "© 2026 SUPPLYVILLE" (non FlattFall). Titolo SUPPLYVILLE: font Press Start 2P, grandezza `min(64px, calc((100vw - 110px) / 12))` così ci sta sempre (più grande usciva dal riquadro e da telefono allargava la pagina). Dopo ogni modifica a site.css/site.js alzare `?v=N` nei link di index.html: i telefoni tenevano in cache il CSS vecchio.
- Donazioni: `DONATE_URL` in site.js = https://ko-fi.com/supplyville (Ko-fi con Stripe: così chi dona non vede il nome dell'utente; niente PayPal personale); vuoto = la sezione "Apoya el desarrollo" resta nascosta.
- `img/`: immagini fatte con il gioco vero (script di rendering con Playwright).
- Pubblicazione: GitHub Pages con GitHub Actions (`.github/workflows/pages.yml`, ad ogni push su main), dominio nel file `CNAME`; DNS su GoDaddy (CNAME www -> flattfall.github.io, 4 record A @ -> 185.199.108-111.153).
- L'utente scrive in italiano; messaggi dei commit in italiano.
