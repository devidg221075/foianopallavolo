import { isInnerPage } from "../lib/routes";

export function SiteLink({ to, children, className = "", ...h }) {
  return (
    <a
      className={className}
      href={
        ["sponsor", "partner"].includes(to)
          ? "/sponsor.html"
          : to === "contatti"
            ? "/contatti.html"
            : to === "galleria"
              ? "/galleria.html"
              : ["partite", "prossime-partite"].includes(to)
                ? "/partite-risultati.html"
                : to === "club"
                  ? "/il-club.html"
                  : to === "storia"
                    ? "/dal-1976.html"
                    : to === "squadre"
                      ? "/squadre.html"
                      : to === "home"
                        ? "/"
                        : (isInnerPage ? "/" : "") + "#" + to
      }
      {...h}
    >
      {children}
    </a>
  );
}
