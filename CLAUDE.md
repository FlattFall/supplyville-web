# Sito di Supplyville (www.supplyville.com)

Pagina di sole informazioni sul gioco (il gioco è nel repository FlattFall/city-builder, pubblicato su https://flattfall.github.io/city-builder/).
- `index.html`, `site.css`, `site.js`: pagina statica. Testo spagnolo scritto nella pagina (`data-t`), italiano e inglese in `TEXT` di site.js. Si apre SEMPRE in spagnolo (richiesta dell'utente); IT/EN con i pulsanti.
- Niente link per giocare, scaricare o alle versioni (richiesta dell'utente: "Muy pronto disponible").
- Donazioni: `DONATE_URL` in site.js = https://ko-fi.com/supplyville (Ko-fi con Stripe: così chi dona non vede il nome dell'utente; niente PayPal personale); vuoto = la sezione "Apoya el desarrollo" resta nascosta.
- `img/`: immagini fatte con il gioco vero (script di rendering con Playwright).
- Pubblicazione: GitHub Pages con GitHub Actions (`.github/workflows/pages.yml`, ad ogni push su main), dominio nel file `CNAME`; DNS su GoDaddy (CNAME www -> flattfall.github.io, 4 record A @ -> 185.199.108-111.153).
- L'utente scrive in italiano; messaggi dei commit in italiano.
