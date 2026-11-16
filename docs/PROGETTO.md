# Foiano Pallavolo – Progetto del sito

Versione 1 · 16/11/2026 · bozza da confermare

## 1. Obiettivi

Il sito deve fare tre cose:

1. **Emozionare** chi conosce la società: 50 anni di storia (1976–2026), atleti arrivati in Nazionale e in Serie A.
2. **Aiutare subito** genitori, atleti e tifosi a trovare orari, partite, squadre, contatti.
3. **Portare sponsor**: partner attuali visibili, fasce da € 200 a € 1.000 (IVA esclusa), pacchetto e manuale loghi in download.

Tre punti forti da raccontare: la storia dal 1976, il percorso dei giovani, le squadre di oggi.

## 2. La società oggi

- Prime squadre: **Serie C maschile**, **Prima Divisione femminile** (molto forte). Pari visibilità.
- **Giovanili** maschili e femminili.
- **Minivolley** maschile e femminile (molte squadre).
- Storia: atleti passati da Foiano alla Nazionale e alla Serie A.

Dati della società solo se confermati: niente numeri, nomi o risultati inventati.

## 3. Mappa del sito

Menu principale (7 voci, a scomparsa su telefono) + pulsante sempre visibile **«Vieni a giocare»**.

| Voce | Contenuti |
|---|---|
| La società | Presentazione, valori, dirigenti, staff, impianti, documenti |
| Squadre | Prime squadre, giovanili M/F, Minivolley |
| Dal 1976 | Cronologia per decenni, archivio fotografico, stagioni memorabili, atleti ai massimi livelli, «Condividi un ricordo» |
| Partite e risultati | Calendari, risultati, classifiche, filtro per squadra |
| News e media | Notizie, racconti partita, eventi, foto, video |
| Sponsor | Partner attuali, fasce, download pacchetto e manuale loghi, modulo contatto |
| Contatti | Segreteria, palestre, indicazioni, richiesta informazioni |

Pagine collegate:
- **Pagina squadra** (una per squadra): foto di gruppo, presentazione, rosa, allenatori, campionato, calendario, classifica, notizie collegate. Per Minivolley e giovanili in primo piano: annate ammesse, orari, palestra, come fare una prova.
- **Vieni a giocare**: età, luoghi, orari, referente, modulo prova gratuita.
- **Scheda atleta** (in Dal 1976): foto, percorso a Foiano, traguardi documentati.

## 4. Homepage, in ordine

1. **Hero fotografica animata**: alterna Serie C M, Prima Divisione F, giovanili, Minivolley. Pannello scuro, slab, motto. Etichetta «50 anni» (1976–2026).
2. **Le nostre squadre**: 4 accessi: Prime squadre · Giovanili maschili · Giovanili femminili · Minivolley. In «Prime squadre» Serie C e Prima Divisione alla pari.
3. **Il prossimo appuntamento**: prossime gare delle due prime squadre, link al calendario. Molto semplice da telefono.
4. **Notizie dal campo**: ultime news con etichetta squadra, anche per i più piccoli.
5. **Dal 1976, una storia che continua**: sezione visiva forte, foto storiche, spazio al cinquantesimo.
6. **Da Foiano ai grandi campi**: selezione di atleti in Nazionale o Serie A.
7. **Comincia da qui**: invito a provare Minivolley e giovanili (età, luoghi, orari, referente).
8. **Sponsor e footer**: partner con ordine, poi contatti, palestre, documenti. Footer = componente Fascia.

## 5. Linea grafica

Si usa quella esistente, senza modifiche (vedi `docs/linea-grafica-foiano-pallavolo.md`).

- Token: `src/styles/colori.css`. Caratteri: Poppins e Inter in `public/fonts/`. Loghi: `public/logo/`.
- Componenti con prefisso `fp-`: Intestazione, Titolo, Slab, PannelloScuro, Fascia, Striscione, Kpi, Passi, Callout, Scheda, Checklist, Sequenza, Tabella, Codici, Contatti, Pulsante.
- Regole da rispettare: niente ombre sfocate; testo su rosso sempre bianco; contrasto ≥ 4,5:1; corpo testo mai sotto 13 px; un solo titolo a slab per schermata; ~65 caratteri per riga; loghi non ricolorati, deformati o ritagliati.
- Tono: italiano, si dà del tu, frasi brevi, nessuna emoji.

## 6. Animazioni

Coerenti con la grafica (slab −10°, righe −55°):

- **Hero**: slab che entrano in diagonale, titolo per parole, parola in rosso corsivo per ultima.
- **Scroll**: sezioni che si rivelano, contatori (anno, squadre, atleti), righe diagonali che si disegnano.
- **Dal 1976**: cronologia orizzontale guidata dallo scroll.
- **Schede squadra/atleta**: inclinazione al passaggio del mouse, foto con taglio a slab.
- **Dettagli**: transizioni tra pagine, pulsanti inclinati come lo slab.

Regole:
- `prefers-reduced-motion` sempre rispettato.
- Il pubblico principale usa lo smartphone: se un'animazione non è fluida su telefono medio, si toglie.
- Nessuna animazione su testi lunghi o su calendari e classifiche.

## 7. Tecnologia

- **Next.js** (App Router), CSS puro sui token `fp-`, deploy su Vercel. Alternativa semplice: HTML/CSS statico (da decidere).
- Animazioni: **Motion**; GSAP ScrollTrigger solo se la cronologia lo richiede.
- Immagini ottimizzate, SEO locale, dati strutturati (club e partite).
- Accessibilità: navigazione da tastiera, focus visibile (anello 3 px inchiostro), contrasti.

## 8. Contenuti e gestione

Obiettivo pratico: **gestione semplice per i volontari**. Una notizia inserita una volta compare da sola in home, nell'archivio e nella pagina della squadra interessata.

Modello dei contenuti (tutti con tag squadra e stagione dove serve):
- Squadra, Persona (atleta/staff/dirigente), Notizia, Partita, Stagione, Foto/Media, Partner, Documento.

Gestione:
- CMS leggero con login semplice, oppure file nel repo. **Da decidere** (vedi domande).
- Calendari e risultati: verificare se FIPAV / comitato di Arezzo permette un'esportazione utilizzabile. Altrimenti inserimento manuale guidato.
- Moduli (prova, sponsor, contatti, ricordi) → email + foglio, con risposta automatica.

### Minori e privacy

Molte foto e rose riguardano minorenni:
- servono liberatorie; nomi e foto delle giovanili solo con consenso;
- «Condividi un ricordo»: invio con consenso, **revisione prima della pubblicazione**;
- informativa privacy e cookie; niente tracciamenti inutili.

## 9. Fasi

1. **Fondamenta**: token, componenti `fp-`, layout, header, footer, home statica.
2. **Home animata** e pagine Squadre.
3. **Dal 1976**: cronologia, archivio, schede atleta, «Condividi un ricordo».
4. **Partite e risultati**, News e media, moduli.
5. **Sponsor** e download.
6. **SEO, prestazioni, accessibilità, privacy, pubblicazione.**

## 10. Cosa serve dalla società

Materiali:
- [ ] Elenco atleti arrivati in Nazionale / Serie A (nome, anni a Foiano, traguardi, foto)
- [ ] Foto vere di squadre, palestre, archivio storico
- [ ] PDF pacchetto sponsor e manuale consegna loghi
- [ ] Testi: presentazione, valori, dirigenti, staff
- [ ] Orari, palestre, annate per Minivolley e giovanili
- [ ] Icone SVG e `bundle.css` della linea grafica (se disponibili)
- [ ] Vettoriale del logo (per stampe)

Decisioni:
- [ ] Dominio e chi lo gestisce
- [ ] Chi aggiornerà i contenuti dopo la consegna
- [ ] CMS con login o file nel repo
- [ ] Stack: Next.js (consigliato) o HTML/CSS semplice
- [ ] Origine di calendari e classifiche

## 11. Fonti di questo documento

- Linea grafica "Foiano Pallavolo" (sintesi in `docs/`).
- Proposta di struttura di navigazione e homepage elaborata con ChatGPT, integrata con parte tecnica, animazioni, sponsor e privacy.
