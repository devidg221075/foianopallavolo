# Foiano Pallavolo – Linea grafica (sintesi)

Sintesi della linea grafica "Foiano Pallavolo" (design system condiviso su claude.ai, proprietario esterno a Idealogy; l'utente ha accesso da editor). Ricavata da tre PDF della società (pacchetto sponsorizzazione completo e prime squadre, manuale consegna loghi sponsor) e dal logo ufficiale.

Materiale estratto il 16/11/2026: PDF "Foiano-Pallavolo-estratto-linea-grafica.pdf" (6 pagine), 6 loghi PNG, colori.css, caratteri web. Copia locale sul Mac in Download › __TEMP › FOIANO PALLAVOLO (ZIP "Foiano-Pallavolo-materiale-estratto.zip").

## Colori (tema unico, chiaro)

| Token | Valore | Uso |
|---|---|---|
| rosso | #c1272d | colore della società |
| rosso-scuro | #8c1a1f | pannelli, pulsante al passaggio del mouse |
| rosso-notte | #5e1114 | fine gradiente pannelli |
| rosso-pannello | #b3232a | inizio gradiente pannelli |
| rosso-righe | #e0474d | righe su fondo scuro, solo decorazione |
| arancio-logo | #f7931e | solo nel logo |
| bianco | #ffffff | fondo; testo su rosso (su-rosso) |
| inchiostro | #2b2b2e | titoli, testo forte |
| testo | #45454b | testo corrente |
| testo-tenue | #6e6e76 | testo secondario |
| didascalia | #8a8a92 | solo da 24 px o info non essenziali |
| su-fascia-chiara | #4a0b0f | testo sulle fasce chiare |
| rosa-chip / rosa-superficie / rosa-riga | #fbecec / #fbf3f3 / #fdf6f6 | chip, schede, righe alterne |
| linea / linea-rosa / bordo-card | #f0e2e2 / #ebd3d4 / #ebcfd0 | filetti e bordi |
| fascia-1000 / 500 / 350 / 300 / 200 | #7a1218 / = rosso / #de5a5f / #ee9396 / #f6c4c5 | fasce di prezzo, dal più scuro (€ 1.000) al più chiaro (€ 200) |

Regole: testo su rosso sempre bianco; il rosso come testo solo su bianco o rosa; contrasto testo ≥ 4,5:1.

## Caratteri (licenza SIL OFL 1.1)

- Poppins 500, 700, 700 corsivo – titoli (hero 56 px, h1 36, h2 29, h3 16), nome nel lockup, motti dello striscione.
- Inter Display 700/800/900 (anche corsivi) – carattere "sportivo": Black corsivo maiuscolo per slab (61/40/29 px) e numeri (53 px); occhielli, etichette, codici, prezzi.
- Inter 400, 400 corsivo, 600, 700 – testo corrente 16 px, piccolo 13 px (mai sotto i 13 px sul web).
- Parola in evidenza di un titolo: rosso corsivo (Poppins Bold Italic), una per titolo.

## Forme e misure

- Slab: blocchi rossi inclinati −10°, testo maiuscolo bianco; due slab in pila sfalsati.
- Righe diagonali −55°, spesse 8 px ogni 17 px (sopra il piede e sui pannelli scuri).
- Pannello scuro: gradiente radiale rosso-pannello → rosso-notte, puntinato verso destra, gigli in trasparenza.
- Striscione: pennellata ruotata −6° con motto in Poppins corsivo.
- Niente ombre sfocate: bordi sottili, superfici rosa o ombre piene.
- Spazi: 4, 8, 12, 16, 20, 24, 32 px; margine pagina 53 px (14 mm).
- Raggi: 4 (chip), 10 (intestazioni tabella), 13 (schede rosa), 15 (schede bianche), pill; slab e piede angoli vivi.

## Componenti (classi CSS prefisso fp- in components/bundle.css)

Intestazione, Titolo, Slab, PannelloScuro, Fascia (righe + piede), Striscione, Kpi, Passi, Callout, Scheda, Checklist, Sequenza, Tabella, Codici, Contatti, Pulsante (solo sito: inclinato come lo slab, hover rosso-scuro, focus anello 3 px inchiostro).

## Marchio

- logo-rosso.png su bianco e rosa; logo-bianco.png su rosso e pannelli scuri; logo-ufficiale-fondo-rosso.png per avatar e icone (tutti PNG 1304×1304).
- Intestazione: logo + filetto rosso + "FOIANO PALLAVOLO" su due righe in Poppins Bold rosso + "1976" tra due filetti.
- Solo PNG: per stampe grandi chiedere il vettoriale alla società.
- Non ricolorare, deformare, ruotare, ritagliare; niente ombre o contorni. Giglio e pallone da soli: solo segni decorativi.

## Tono

Italiano, si dà del tu. Frasi brevi e concrete. Importi "€ 1.000" con spazio non separabile, sempre "IVA esclusa". Nessuna emoji; icone lineari rosse 64×64 dal gruppo Icone. Dati della società solo se confermati.

Motti: "Sostieni lo sport, sostieni il territorio." (piede) · "Insieme per lo sport, per i nostri ragazzi!" (striscione) · "DIVENTA SPONSOR DI FOIANO PALLAVOLO" (piede, maiuscolo). "STAYWITHUSANDFEELLIKEHOME" fa parte del logo, non va riscritto come testo.

## Sito web (indicazioni della linea grafica)

Fondo bianco, intestazione con lockup ridotto, footer = Fascia. Sezioni importanti (apertura, numeri, contatti) su pannelli scuri a tutta larghezza alternati a sezioni bianche. Un solo titolo a slab per schermata. Testo ~65 caratteri per riga; su telefono griglie in colonna, tabelle che scorrono. Mettere in download pacchetto sponsor e manuale loghi.

## Contatti della società (componente Contatti)

Referente tel. 333 9331480 · marketing.foianopallavolo@gmail.com · Via Foro Boario, Foiano della Chiana (AR) · Matricola FIPAV 100460024.
