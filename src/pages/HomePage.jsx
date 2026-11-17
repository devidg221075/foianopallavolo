import { ArrowRightIcon } from "@phosphor-icons/react";
import { NewsSection } from "../components/NewsSection";
import { ClubSection } from "./home/ClubSection";
import { Hero } from "./home/Hero";
import { HistorySection } from "./home/HistorySection";
import { LegacySection } from "./home/LegacySection";
import { MatchCenter } from "./home/MatchCenter";
import { NextMatches } from "./home/NextMatches";
import { NumbersSection } from "./home/NumbersSection";
import { PartnerRibbon } from "./home/PartnerRibbon";
import { PartnersWall } from "./home/PartnersWall";
import { SponsorSection } from "./home/SponsorSection";
import { TeamsSection } from "./home/TeamsSection";
import { YouthSection } from "./home/YouthSection";

export function HomePage({
  gotoCalendar,
  heroPaused,
  motionOff,
  openContact,
  openTeam,
  setHeroPaused,
  setLightbox,
  setSlideIndex,
  slideIndex,
}) {
  return (
    <>
      <Hero
        heroPaused={heroPaused}
        motionOff={motionOff}
        setHeroPaused={setHeroPaused}
        setSlideIndex={setSlideIndex}
        slideIndex={slideIndex}
      />
      <NextMatches gotoCalendar={gotoCalendar} />
      <PartnerRibbon />
      <TeamsSection openTeam={openTeam} />
      <NewsSection />
      <NumbersSection />
      <ClubSection openContact={openContact} openTeam={openTeam} />
      <MatchCenter openContact={openContact} />
      <div className="home-match-center-link section-wrap">
        <a className="text-link" href="/partite-risultati.html">
          Apri Partite e risultati <ArrowRightIcon />
        </a>
      </div>
      <HistorySection />
      <LegacySection openContact={openContact} />
      <YouthSection openContact={openContact} setLightbox={setLightbox} />
      <PartnersWall />
      <SponsorSection openContact={openContact} />
    </>
  );
}
