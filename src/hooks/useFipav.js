import { useSyncExternalStore } from "react";
import snapshot from "../data/fipav-snapshot.json";
import { FIXTURES } from "../data/fixtures";
import { normalizeFipav, withLogos } from "../lib/fipav";

// Gare da FIPAV (Serie C maschile) più quelle inserite a mano (Prima Divisione femminile e altre).
function build(raw) {
  const data = normalizeFipav(raw);
  return {
    ...data,
    fixtures: [...data.fixtures, ...withLogos(FIXTURES)].sort(
      (a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time),
    ),
  };
}

// Un solo caricamento condiviso da tutti i componenti della pagina.
// Parte subito con la copia salvata nel sito (src/data/fipav-snapshot.json), poi chiede i dati
// aggiornati a /api/fipav.php all'apertura e ogni 5 minuti. Se il servizio non risponde
// (per esempio senza PHP) resta la copia salvata.
let state = { ...build(snapshot), live: false };
const listeners = new Set();
let started = false;

function publish(next) {
  state = next;
  listeners.forEach((listener) => listener());
}

async function load() {
  try {
    const response = await fetch("/api/fipav.php", { cache: "no-store" });
    if (!response.ok) throw new Error();
    publish({ ...build(await response.json()), live: true });
  } catch {
    if (state.live) publish({ ...state, live: false });
  }
}

function subscribe(listener) {
  listeners.add(listener);
  if (!started) {
    started = true;
    load();
    setInterval(load, 300000);
  }
  return () => listeners.delete(listener);
}

export const useFipav = () => useSyncExternalStore(subscribe, () => state);
