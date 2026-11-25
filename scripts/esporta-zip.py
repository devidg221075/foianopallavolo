#!/usr/bin/env python3
"""Crea lo ZIP del sito da pubblicare (cartella dist/) con permessi corretti.

Uso:  npm run build && python3 scripts/esporta-zip.py [nome.zip]

Imposta cartelle a 755 e file a 644 dentro lo ZIP: così il server può leggere tutti i file
(un file con permessi 600, per esempio copiato da una cartella di download, dà errore 403
e l'immagine sembra "sparita"). Controlla anche che ogni file citato dal sito esista.
"""
import os
import re
import sys
import zipfile

RADICE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DIST = os.path.join(RADICE, "dist")
nome = sys.argv[1] if len(sys.argv) > 1 else os.path.join(RADICE, "export", "foiano-pallavolo-sito-completo.zip")
os.makedirs(os.path.dirname(nome), exist_ok=True)

files = []
for cartella, _, nomi in os.walk(DIST):
    for n in nomi:
        files.append(os.path.relpath(os.path.join(cartella, n), DIST))
files.sort()

# controllo: ogni risorsa citata dalle pagine, dal JavaScript e dal CSS deve essere nello ZIP
citati = set()
for f in files:
    if f.endswith((".html", ".js", ".css")):
        testo = open(os.path.join(DIST, f), encoding="utf-8", errors="ignore").read()
        citati |= set(re.findall(r"/assets/[A-Za-z0-9_./-]+\.(?:webp|png|jpg|woff2)", testo))
mancanti = sorted(c for c in citati if c[1:] not in files)
if mancanti:
    sys.exit("File citati dal sito ma mancanti: %s" % mancanti)

with zipfile.ZipFile(nome, "w", zipfile.ZIP_DEFLATED) as z:
    for f in files:
        info = zipfile.ZipInfo(f.replace(os.sep, "/"), date_time=(2026, 1, 1, 0, 0, 0))
        info.external_attr = (0o100644 << 16)
        info.compress_type = zipfile.ZIP_DEFLATED
        z.writestr(info, open(os.path.join(DIST, f), "rb").read())
print("%s: %d file, %d MB, tutti i file citati sono presenti." % (nome, len(files), os.path.getsize(nome) // 1048576))
