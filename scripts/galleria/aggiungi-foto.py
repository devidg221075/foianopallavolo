#!/usr/bin/env python3
"""Aggiunge foto a un album della galleria.

Uso:
    python3 scripts/galleria/aggiungi-foto.py <id-album> <cartella-con-le-foto>

Cosa fa:
  - legge le foto (jpg, jpeg, png, webp, tif) in ordine "naturale" (1, 2, 10, non 1, 10, 2);
  - salta le copie identiche (tra loro e rispetto a quelle già nell'album);
  - le converte in public/assets/galleria/<id-album>/NN.webp (max 1800 px) e NN-t.webp (miniatura 700 px),
    continuando la numerazione dopo l'ultima foto già presente;
  - aggiunge le misure nell'elenco foto dell'album in src/data/gallery.js.

Serve Pillow:  python3 -m pip install pillow
L'album deve già esistere in src/data/gallery.js con photos: photosFromSizes([...]).
"""
import os
import re
import sys

from PIL import Image, ImageOps

RADICE = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
ESTENSIONI = (".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff")


def ordine_naturale(nome):
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r"(\d+)", nome)]


def impronta(immagine):
    # versione 24x24 in grigi: due foto uguali hanno impronte quasi uguali
    return list(immagine.convert("L").resize((24, 24)).get_flattened_data()) if hasattr(
        Image.Image, "get_flattened_data"
    ) else list(immagine.convert("L").resize((24, 24)).getdata())


def distanza(a, b):
    return sum(abs(x - y) for x, y in zip(a, b)) / len(a)


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    album_id, cartella = sys.argv[1], sys.argv[2]
    dest = os.path.join(RADICE, "public", "assets", "galleria", album_id)
    bozza = os.path.join(RADICE, "bozze", "galleria", album_id)
    if os.path.isdir(bozza) and not os.path.isdir(dest):
        dest = bozza  # album non ancora pubblicato: le foto restano fuori da public/
    os.makedirs(dest, exist_ok=True)

    # ordine numerico (non alfabetico: "100" viene dopo "99")
    esistenti = sorted(
        (f for f in os.listdir(dest) if re.fullmatch(r"\d+\.webp", f)),
        key=lambda f: int(f[:-5]),
    )
    prossimo = int(esistenti[-1][:-5]) + 1 if esistenti else 1
    note = [impronta(Image.open(os.path.join(dest, f[:-5] + "-t.webp"))) for f in esistenti]

    file_foto = sorted(
        (f for f in os.listdir(cartella) if f.lower().endswith(ESTENSIONI) and not f.startswith(".")),
        key=ordine_naturale,
    )
    misure, saltate = [], []
    for nome in file_foto:
        img = ImageOps.exif_transpose(Image.open(os.path.join(cartella, nome))).convert("RGB")
        imp = impronta(img)
        if any(distanza(imp, n) < 6 for n in note):
            saltate.append(nome)
            continue
        note.append(imp)
        num = "%02d" % prossimo
        assert not os.path.exists(os.path.join(dest, num + ".webp")), "non sovrascrivo " + num
        grande = img.copy()
        grande.thumbnail((1800, 1800), Image.LANCZOS)
        grande.save(os.path.join(dest, num + ".webp"), quality=78, method=6)
        mini = img.copy()
        mini.thumbnail((700, 700), Image.LANCZOS)
        mini.save(os.path.join(dest, num + "-t.webp"), quality=74, method=6)
        misure.append(list(grande.size))
        prossimo += 1

    if misure:
        percorso = os.path.join(RADICE, "src", "data", "gallery.js")
        testo = open(percorso, encoding="utf-8").read()
        inizio = testo.find('id: "%s"' % album_id)
        if inizio < 0:
            sys.exit("Album %r non trovato in src/data/gallery.js: aggiungilo prima." % album_id)
        fine = testo.find("\n      ],", inizio)
        if fine < 0:
            sys.exit("L'album %r non usa photosFromSizes([...]): aggiungi le misure a mano:\n%s" % (album_id, misure))
        righe = "".join("\n        [%d, %d]," % (w, h) for w, h in misure)
        testo = testo[:fine] + righe + testo[fine:]
        open(percorso, "w", encoding="utf-8").write(testo)

    print("Aggiunte %d foto a %s (ora %d)." % (len(misure), album_id, prossimo - 1))
    if saltate:
        print("Saltate perché già presenti: " + ", ".join(saltate))


if __name__ == "__main__":
    main()
