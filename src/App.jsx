import { useState, useEffect, useRef } from "react";
import { HERO_SLIDES } from "./data/heroSlides";
import { TEAMS } from "./data/teams";
import {
  currentTeamId,
  isClubPage,
  isContactPage,
  isGalleryPage,
  isHistoryPage,
  isInnerPage,
  isMatchesPage,
  isSponsorPage,
  isTeamsPage,
  matchesUrl,
  teamHref,
} from "./lib/routes";
import { ClubPage } from "./pages/ClubPage";
import { ContactPage } from "./pages/ContactPage";
import { GalleryPage } from "./pages/GalleryPage";
import { HistoryPage } from "./pages/HistoryPage";
import { MatchesPage } from "./pages/MatchesPage";
import { SponsorPage } from "./pages/SponsorPage";
import { TeamPage } from "./pages/TeamPage";
import { TeamsPage } from "./pages/TeamsPage";
import { SiteHeader } from "./components/SiteHeader";
import { MobileMenu } from "./components/MobileMenu";
import { SiteFooter } from "./components/SiteFooter";
import { Modal } from "./components/Modal";
import { HomePage } from "./pages/HomePage";
export function App() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [teamsMenuOpen, setTeamsMenuOpen] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [motionOff, setMotionOff] = useState(
    () =>
      localStorage.getItem("foiano-motion") === "off" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [scrolled, setScrolled] = useState(false);
  const [contactInterest, setContactInterest] = useState("Vieni a giocare");
  const [emailPrepared, setEmailPrepared] = useState(false);
  const dialogRef = useRef();
  const openContact = (interest = "Vieni a giocare") => {
    setContactInterest(interest);
    setEmailPrepared(false);
    setDialog({
      type: "contact",
    });
  };
  const openTeam = (team) => {
    location.assign(teamHref(team));
  };
  const closeDialog = () => {
    setDialog(null);
    setLightbox(null);
  };
  useEffect(() => {
    const desktopQuery = matchMedia("(min-width:1101px)");
    const closeOnDesktop = () => {
      if (desktopQuery.matches) {
        setMobileMenuOpen(false);
      }
    };
    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!teamsMenuOpen) return;
    const closeOnOutsidePress = (event) => {
      if (!event.target.closest(".nav-with-menu")) {
        setTeamsMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () =>
      document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [teamsMenuOpen]);
  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => {
        return document
          .getElementById(decodeURIComponent(location.hash.slice(1)))
          ?.scrollIntoView({
            behavior: "instant",
          });
      });
    }
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = motionOff ? "off" : "on";
    localStorage.setItem("foiano-motion", motionOff ? "off" : "on");
  }, [motionOff]);
  useEffect(() => {
    if (isInnerPage || heroPaused || motionOff || dialog || lightbox) return;
    const timer = setInterval(
      () => setSlideIndex((current) => (current + 1) % HERO_SLIDES.length),
      8000,
    );
    return () => clearInterval(timer);
  }, [heroPaused, motionOff, dialog, lightbox]);
  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 35);
    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      {
        threshold: 0.08,
      },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const scrollLocked = !!dialog || !!lightbox || mobileMenuOpen;
    document.body.style.overflow = scrollLocked ? "hidden" : "";
    function onKeyDown(event) {
      if (
        (event.key === "Escape" &&
          (closeDialog(), setMobileMenuOpen(false), setTeamsMenuOpen(false)),
        event.key === "Tab" && dialogRef.current)
      ) {
        const focusable = dialogRef.current.querySelectorAll(
          "button,a,input,textarea,select",
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else {
          if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    if (dialog || lightbox) {
      requestAnimationFrame(() => {
        return dialogRef.current?.querySelector("button")?.focus();
      });
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [dialog, lightbox, mobileMenuOpen]);
  const gotoCalendar = (teamId) => location.assign(matchesUrl(teamId));
  return (
    <>
      <a href="#contenuto" className="skip-link">
        Vai al contenuto
      </a>
      <SiteHeader
        mobileMenuOpen={mobileMenuOpen}
        openContact={openContact}
        scrolled={scrolled}
        setMobileMenuOpen={setMobileMenuOpen}
        setTeamsMenuOpen={setTeamsMenuOpen}
        teamsMenuOpen={teamsMenuOpen}
      />
      <div className="header-spacer" aria-hidden="true" />
      {mobileMenuOpen && (
        <MobileMenu
          openContact={openContact}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      )}
      <main id="contenuto">
        {isGalleryPage ? (
          <GalleryPage />
        ) : isSponsorPage ? (
          <SponsorPage openContact={openContact} />
        ) : isContactPage ? (
          <ContactPage />
        ) : isMatchesPage ? (
          <MatchesPage
            openContact={openContact}
            openSponsors={() => location.assign("/sponsor.html")}
          />
        ) : isClubPage ? (
          <ClubPage
            teams={TEAMS}
            teamHref={teamHref}
            openContact={openContact}
            openSponsors={() => location.assign("/sponsor.html")}
          />
        ) : isHistoryPage ? (
          <HistoryPage openContact={openContact} />
        ) : currentTeamId ? (
          <TeamPage
            team={TEAMS.find((item) => item.id === currentTeamId)}
            teams={TEAMS}
            teamHref={teamHref}
            openContact={openContact}
            openSponsors={() => location.assign("/sponsor.html")}
          />
        ) : isTeamsPage ? (
          <TeamsPage
            teams={TEAMS}
            openTeam={openTeam}
            openContact={openContact}
            gotoCalendar={gotoCalendar}
            openSponsors={() => location.assign("/sponsor.html")}
            motionOff={motionOff}
          />
        ) : (
          <HomePage
            gotoCalendar={gotoCalendar}
            heroPaused={heroPaused}
            motionOff={motionOff}
            openContact={openContact}
            openStandings={() => setDialog({ type: "standings" })}
            openTeam={openTeam}
            setHeroPaused={setHeroPaused}
            setLightbox={setLightbox}
            setSlideIndex={setSlideIndex}
            slideIndex={slideIndex}
          />
        )}
      </main>
      <SiteFooter
        motionOff={motionOff}
        openContact={openContact}
        openTeam={openTeam}
        setMotionOff={setMotionOff}
      />
      {(dialog || lightbox) && (
        <Modal
          closeDialog={closeDialog}
          contactInterest={contactInterest}
          dialog={dialog}
          dialogRef={dialogRef}
          emailPrepared={emailPrepared}
          gotoCalendar={gotoCalendar}
          lightbox={lightbox}
          openContact={openContact}
          openTeam={openTeam}
          setContactInterest={setContactInterest}
          setEmailPrepared={setEmailPrepared}
        />
      )}
    </>
  );
}
