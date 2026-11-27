import { TEAM_SLUGS } from "../data/teams";

export function matchesUrl(teamId = "", view = "calendario") {
  const params = new URLSearchParams();
  if (teamId) {
    params.set("squadra", teamId);
  }
  if (view !== "calendario") {
    params.set("vista", view);
  }
  return (
    "/partite-risultati.html" +
    (params.size ? "?" + params : "") +
    "#calendario"
  );
}

export const isTeamsPage = /\/squadre(?:\.html)?\/?$/.test(location.pathname);

export const teamHref = (team) => "/" + TEAM_SLUGS[team.id] + ".html";

export const currentTeamId = Object.keys(TEAM_SLUGS).find(
  (item) => location.pathname === "/" + TEAM_SLUGS[item] + ".html",
);

export const isHistoryPage = /\/dal-1976(?:\.html)?\/?$/.test(
  location.pathname,
);

export const isMatchesPage = /\/partite-risultati(?:\.html)?\/?$/.test(
  location.pathname,
);

export const isClubPage = /\/il-club(?:\.html)?\/?$/.test(location.pathname);

export const isSponsorPage = /\/sponsor(?:\.html)?\/?$/.test(location.pathname);

export const isContactPage = /\/contatti(?:\.html)?\/?$/.test(
  location.pathname,
);

export const isGalleryPage = /\/galleria(?:\.html)?\/?$/.test(
  location.pathname,
);

export const isInnerPage =
  isTeamsPage ||
  !!currentTeamId ||
  isHistoryPage ||
  isMatchesPage ||
  isClubPage ||
  isSponsorPage ||
  isContactPage ||
  isGalleryPage;
