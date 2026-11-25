import { useState } from "react";
import { VolleyballIcon } from "@phosphor-icons/react";

// Logo di una società; se l'immagine non si carica mostra un pallone.
export function ClubLogo({ src, name = "" }) {
  const [failed, setFailed] = useState(null);
  return src && failed !== src ? (
    <img
      className="club-logo"
      src={src}
      alt={name ? "Logo " + name : ""}
      loading="lazy"
      onError={() => setFailed(src)}
    />
  ) : (
    <VolleyballIcon
      className="club-logo-fallback"
      aria-label={name || "Logo non disponibile"}
      weight="thin"
    />
  );
}
