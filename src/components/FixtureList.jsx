import { ClockIcon, MapPinIcon } from "@phosphor-icons/react";
import { EmptyState } from "./EmptyState";
import { MATCH_TEAMS } from "../data/teams";

export function FixtureList({ fixtures, emptyTitle, emptyText }) {
  return fixtures.length ? (
    <div className="fixture-list">
      {fixtures.map((fixture) => {
        return (
          <article key={fixture.id}>
            <time dateTime={fixture.date}>
              {new Intl.DateTimeFormat("it-IT", {
                day: "numeric",
                month: "short",
              }).format(new Date(fixture.date + "T12:00:00"))}
            </time>
            <div>
              <span>
                {MATCH_TEAMS.find((team) => team.id === fixture.team)?.name}
              </span>
              <h3>
                {fixture.home}{" "}
                <b>{fixture.status === "played" ? fixture.score : "VS"}</b>{" "}
                {fixture.away}
              </h3>
              <p>
                <ClockIcon /> {fixture.time || "Orario da confermare"}{" "}
                <MapPinIcon /> {fixture.venue || "Campo da confermare"}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  ) : (
    <EmptyState title={emptyTitle} text={emptyText} />
  );
}
