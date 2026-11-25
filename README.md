# Foiano Pallavolo – sito web

Sito della società **Foiano Pallavolo** (dal 1976): 12 pagine, React + Vite, uscita statica.

Il sorgente è stato **ricostruito dal pacchetto statico v1.5** (`Foiano_Pallavolo_COMPLETO_v1_5.zip`, generato con ChatGPT), di cui non esisteva il codice originale. Vedi [Provenienza e fedeltà](#provenienza-e-fedeltà).

## Avvio

```bash
npm install
npm run dev      # anteprima locale con ricarica automatica
npm run build    # genera la cartella dist/
npm run preview  # prova locale di dist/
```

Per pubblicare: copia il contenuto di `dist/` nella document root del sottodominio (`https://foianopallavolo.keyidea.it/`). Non servono PHP, Node.js, database o regole di riscrittura. Tutti i file `.html` e la cartella `assets` stanno allo stesso livello.

## Struttura

```
*.html                 12 pagine: ognuna monta la stessa app (titolo, descrizione e immagine di anteprima cambiano)
public/assets/         immagini (.webp, .png), caratteri (.woff2) e licenze font, copiati così come sono
public/robots.txt      oggi vieta la scansione (anteprima temporanea)
src/main.jsx           punto d'ingresso, importa i CSS nell'ordine di cascata
src/App.jsx            intestazione, contenuto della pagina, piè di pagina, finestra di contatto, scorciatoie da tastiera
src/lib/routes.js      sceglie la pagina da mostrare in base all'URL (nessun router: pagine HTML vere)
src/lib/calendar.js    stagione, griglia del mese, nomi dei mesi
src/data/              testi e dati: squadre, pagine squadra, notizie, capitoli di storia, slide della home
src/pages/             una pagina per file (Squadre, Squadra, Dal 1976, Partite, Il club, Sponsor, Contatti, Home)
src/pages/home/        le sezioni della home, una per file
src/components/        componenti condivisi (intestazione, menu, piè di pagina, finestra, hero di pagina, ecc.)
src/styles/            CSS a strati, vedi sotto
scripts/verifica/      strumenti per confrontare due build (vedi sotto)
docs/                  progetto, linea grafica e materiale di partenza
```

### Pagine e URL

| URL | Pagina |
|---|---|
| `/` | Home |
| `/squadre.html` | Panoramica squadre |
| `/serie-c-maschile.html`, `/prima-divisione-femminile.html`, `/giovanili-maschili.html`, `/giovanili-femminili.html`, `/minivolley.html` | Pagina di ogni squadra |
| `/dal-1976.html` | Storia, Loredano Vannuccini, rassegna stampa |
| `/partite-risultati.html` | Calendari, risultati, classifiche |
| `/galleria.html` | Galleria fotografica: indice degli album; `?album=<id>` apre un album |
| `/il-club.html` | Società, percorsi, informazioni |
| `/sponsor.html` | Sponsor e partnership |
| `/contatti.html` | Recapiti e modulo email |

Per aggiungere una pagina: crea il file `.html`, aggiungilo all'elenco `pages` in `vite.config.js` e al riconoscimento in `src/lib/routes.js`.

### CSS

I fogli sono otto, numerati, e **vanno caricati in quest'ordine**: il CSS originale era scritto a passate successive, e le ultime correggono le prime. Cambiare l'ordine cambia l'aspetto. Per modificare lo stile di una sezione, cerca la classe in tutti i file e controlla anche i file con numero più alto.

| File | Contenuto |
|---|---|
| `01-fondamenta.css` | Base, pulsanti, intestazione, home di partenza, sezioni, piè di pagina, finestre |
| `02-home-ridisegnata.css` | Intestazione e hero rifatti, prossime partite, partner |
| `03-header-footer.css` | Ritocchi a intestazione, menu e piè di pagina |
| `04-squadre.css` | Pagina Squadre e pagine delle singole squadre |
| `05-storia-club-news.css` | Dal 1976, Il club, notizie |
| `06-sponsor-contatti.css` | Pagine Sponsor e Contatti |
| `07-partite-risultati.css` | Partite e risultati |
| `08-correzioni-finali.css` | Correzioni finali e adattamenti |
| `09-galleria.css` | Galleria fotografica e ritocco dell'intestazione |

I colori e i caratteri seguono la linea grafica (`docs/linea-grafica-foiano-pallavolo.md`).

## Contenuti

- **Squadre, notizie, storia, slide:** modifica i file in `src/data/`.
- **Galleria:** album e categorie in `src/data/gallery.js` (istruzioni in testa al file), foto in `public/assets/galleria/<id-album>/` in due versioni per foto (`01.webp` grande, `01-t.webp` miniatura). Primo album: «FIPAV 3G».
- **Mascotte:** due civette (`mascotte-maschio.webp`, `mascotte-femmina.webp` in `public/assets/`), gestite da `src/components/Mascots.jsx`: maschio per Serie C e giovanili maschili, femmina per Prima Divisione e giovanili femminili, entrambe per Minivolley. Stanno nella fascia rossa in fondo alle pagine squadra e Squadre, e accanto al pulsante nella sezione Minivolley della home, mai sopra le foto.
- **Loghi:** 50 anni a colori (testata Dal 1976) e chiaro (hero della home); comitati FIPAV Etruria e Toscana nella fascia «Campionati organizzati da» di Partite e risultati.
- **Etichetta «Gara»:** ogni partita ha il campo `team` (`c`, `f`, `gm`, `gf`, `mini`); il calendario mostra la squadra del club (SERIE C MASCHILE, PRIMA DIV. FEMMINILE, …). Campi spiegati in `src/data/fixtures.js`.
- **Calendari e rose:** `src/data/fixtures.js` è oggi **vuoto** (`FIXTURES`, `TEAM_ROSTERS`). Le partite e le rose compariranno quando verranno inserite; finché sono vuoti le pagine mostrano "calendario in aggiornamento".
- **Foto:** sono dimostrative (indicato anche sul sito) e vanno sostituite con foto vere della società, con le liberatorie per i minorenni. Per cambiarle sostituisci i file in `public/assets/` mantenendo lo stesso nome.
- **Moduli:** non c'è un server. Il pulsante "Prepara l'email" apre l'app di posta del visitatore con il messaggio già scritto (`mailto:`). Chi non ha un'app di posta configurata non riesce a inviare.
- **Dati della società:** nessun dato ufficiale è stato inventato. Date, avversari, risultati, rose, staff e loghi sponsor aspettano conferma.

## Prima della pubblicazione definitiva

Il pacchetto è un'**anteprima temporanea**:

- tutte le pagine hanno `noindex, nofollow` (nei file `*.html`);
- `public/robots.txt` vieta la scansione.

Queste impostazioni non proteggono la pagina con una password. Vanno tolte quando il sito diventa pubblico. Da rivedere anche: foto dimostrative, dati non confermati, informativa privacy e cookie.

## Provenienza e fedeltà

Il pacchetto v1.5 conteneva solo il sito compilato (HTML di una riga, un JavaScript minificato, un CSS), senza sorgenti né sourcemap. Il codice qui dentro è stato **ricostruito in modo guidato** dal bundle:

1. il codice dell'applicazione è stato isolato dalle librerie (React, icone Phosphor) e riportato a JSX leggibile;
2. funzioni, costanti e variabili hanno ricevuto nomi veri (`TeamsPage`, `HERO_SLIDES`, `openContact`, …);
3. l'app è stata spezzata in moduli, componenti e sezioni; dove uno stato serve a una sola sezione è stato spostato dentro di lei;
4. il CSS originale è stato diviso in file senza cambiarne l'ordine né il contenuto.

**Cosa è identico all'originale:** il DOM generato e il rendering. Sono state confrontate le 12 pagine a due larghezze (1280 e 390 pixel), con data fissata e animazioni ferme: HTML generato identico carattere per carattere e screenshot identici pixel per pixel. In più è stato simulato il click su ciascun pulsante di ogni pagina, confrontando lo stato risultante.

**Cosa non è identico:** i nomi delle variabili e la forma del codice (l'originale non è recuperabile), l'ordine interno dei moduli JavaScript compilati e le dimensioni dei file (il JavaScript compilato pesa circa 8% in più, per le icone importate dal pacchetto invece che incluse a mano).

Per ripetere il confronto dopo una modifica (serve `npm i -D playwright`):

```bash
npm run build
node scripts/verifica/confronta-pagine.cjs <cartella-build-originale> dist --shots
node scripts/verifica/confronta-click.cjs <cartella-build-originale> dist 1280
```

La cartella del build originale è lo zip `Foiano_Pallavolo_COMPLETO_v1_5.zip` estratto.
