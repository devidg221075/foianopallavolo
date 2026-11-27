#!/usr/bin/env python3
"""Importa nel sito il calendario gare di una squadra da un file Excel (.xlsx).

Uso:
    python3 scripts/calendario/importa-xlsx.py calendario_gare.xlsx [altro.xlsx ...]

Colonne attese (prima riga = intestazioni), come nell'esportazione del Comitato:
    Serie, Sesso, Girone, Numero, Giornata, A/R, Giorno, Data, Ora, Casa, Trasferta,
    Nome impianto, Indirizzo, Citta, Frazione, Provincia

Le gare vengono aggiunte (o aggiornate, se già presenti) in src/data/fixtures.json.
Per i risultati: aggiungi le colonne facoltative "Risultato" (es. 3-1) e "Parziali" (es. 25-20, 22-25).
Non serve nessuna libreria: legge il file .xlsx direttamente.
"""
import json
import os
import re
import sys
import xml.etree.ElementTree as ET
import zipfile

RADICE = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
FILE_DATI = os.path.join(RADICE, "src", "data", "fixtures.json")
NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}

# (Serie, Sesso) -> id squadra del sito: c, f, gm, gf, mini
SQUADRE = {("1DF", "F"): "f"}


def righe_xlsx(percorso):
    z = zipfile.ZipFile(percorso)
    stringhe = []
    if "xl/sharedStrings.xml" in z.namelist():
        for si in ET.fromstring(z.read("xl/sharedStrings.xml")).findall("m:si", NS):
            stringhe.append("".join(t.text or "" for t in si.iter("{%s}t" % NS["m"])))
    foglio = ET.fromstring(z.read("xl/worksheets/sheet1.xml"))
    tabella = []
    for riga in foglio.find("m:sheetData", NS).findall("m:row", NS):
        valori = {}
        for cella in riga.findall("m:c", NS):
            colonna = re.match(r"[A-Z]+", cella.get("r")).group(0)
            v = cella.find("m:v", NS)
            if cella.get("t") == "inlineStr":
                testo = "".join(t.text or "" for t in cella.iter("{%s}t" % NS["m"]))
            elif v is None:
                testo = ""
            elif cella.get("t") == "s":
                testo = stringhe[int(v.text)]
            else:
                testo = v.text
            valori[colonna] = testo.strip()
        tabella.append(valori)
    return tabella


def importa(percorso):
    tabella = righe_xlsx(percorso)
    intestazioni = {col: nome for col, nome in tabella[0].items()}
    gare = []
    for riga in tabella[1:]:
        r = {intestazioni[c]: v for c, v in riga.items() if c in intestazioni}
        if not r.get("Casa"):
            continue
        squadra = SQUADRE.get((r.get("Serie", ""), r.get("Sesso", "")))
        if not squadra:
            sys.exit("Serie/Sesso non riconosciuti (%s/%s): aggiungili a SQUADRE nello script." % (r.get("Serie"), r.get("Sesso")))
        giorno, mese, anno = r["Data"].split("-")
        luogo = " - ".join(x for x in (r.get("Nome impianto"), r.get("Indirizzo"), r.get("Citta")) if x)
        gara = {
            "id": "%s-%s-%s" % (r["Serie"], r["Girone"], r["Numero"]),
            "team": squadra,
            "date": "%s-%s-%s" % (anno, mese, giorno),
            "time": r.get("Ora", ""),
            "home": r["Casa"],
            "away": r["Trasferta"],
            "venue": luogo,
            "round": "Giornata " + r["Giornata"] if r.get("Giornata") else "",
            "status": "scheduled",
            "score": None,
            "sets": "",
            "official": False,
        }
        if r.get("Risultato"):
            casa, trasf = re.split(r"\s*[-–]\s*", r["Risultato"])
            gara["status"] = "played"
            gara["score"] = "%s–%s" % (casa, trasf)
            gara["sets"] = re.sub(r"\s*-\s*", "–", r.get("Parziali", ""))
        gare.append(gara)
    return gare


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    esistenti = json.load(open(FILE_DATI, encoding="utf-8")) if os.path.exists(FILE_DATI) else []
    per_id = {g["id"]: g for g in esistenti}
    nuove = 0
    for percorso in sys.argv[1:]:
        for gara in importa(percorso):
            nuove += gara["id"] not in per_id
            per_id[gara["id"]] = gara
    risultato = sorted(per_id.values(), key=lambda g: (g["date"], g["time"]))
    with open(FILE_DATI, "w", encoding="utf-8") as f:
        json.dump(risultato, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print("Gare nel file: %d (%d nuove)." % (len(risultato), nuove))


if __name__ == "__main__":
    main()
