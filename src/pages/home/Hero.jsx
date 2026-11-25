import { useRef } from "react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
  PauseIcon,
  PlayIcon,
} from "@phosphor-icons/react";
import { Eyebrow } from "../../components/Eyebrow";
import { SiteLink } from "../../components/SiteLink";
import { ASSET_BASE } from "../../config";
import { HERO_SLIDES } from "../../data/heroSlides";
import { featuredNews } from "../../data/news";

export function Hero({
  heroPaused,
  motionOff,
  setHeroPaused,
  setSlideIndex,
  slideIndex,
}) {
  const heroRef = useRef();
  const slide = HERO_SLIDES[slideIndex];
  function onHeroPointerMove(event) {
    if (motionOff || innerWidth < 900) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--mx",
      ((event.clientX - rect.left) / rect.width - 0.5) * 12 + "px",
    );
    event.currentTarget.style.setProperty(
      "--my",
      ((event.clientY - rect.top) / rect.height - 0.5) * 9 + "px",
    );
  }
  return (
    <section
      id="home"
      className={"hero slide-" + slide.k + (motionOff ? " no-motion" : "")}
      ref={heroRef}
      onPointerMove={onHeroPointerMove}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--mx", "0px");
        event.currentTarget.style.setProperty("--my", "0px");
      }}
      aria-roledescription="carosello"
      aria-label="In evidenza"
    >
      <div className="hero-red" />
      <div className="hero-court" />
      <div key={"text" + slideIndex} className="hero-copy">
        <Eyebrow light>{slide.eyebrow}</Eyebrow>
        <h1>
          {slide.lines.map((line, index) => (
            <span
              key={index}
              style={{
                "--i": index,
              }}
            >
              <b>{line}</b>
            </span>
          ))}
        </h1>
        {slide.news ? (
          <>
            <a href={slide.href} className="hero-link">
              {slide.cta}
              <ArrowUpRightIcon weight="bold" />
            </a>
            <span className="hero-news-date">{slide.dateLabel}</span>
          </>
        ) : (
          <SiteLink to={slide.target} className="hero-link">
            {slide.cta}
            <ArrowUpRightIcon weight="bold" />
          </SiteLink>
        )}
      </div>
      <img
        className="hero-50"
        src="/assets/logo-50-su-scuro.webp"
        alt="50 anni di Foiano Pallavolo, 1976–2026"
        width="2000"
        height="919"
      />
      <div className="hero-word" aria-hidden="true">
        {slide.news ? slide.word : "FOIANO"}
      </div>
      {slide.news ? (
        <img
          className="hero-news-photo"
          src="/assets/story.webp"
          alt="Atleti e atlete festeggiano in campo, fotografia dimostrativa"
        />
      ) : (
        <>
          {" "}
          <div key={"athlete" + slideIndex} className="athlete-layer">
            <img
              className="hero-athlete"
              src={ASSET_BASE + slide.image + ".webp"}
              alt={
                slide.k === "woman"
                  ? "Atleta di pallavolo in maglia rossa in azione"
                  : "Atleta in maglia rossa in salto per la schiacciata"
              }
              fetchPriority="high"
            />
          </div>
          <div key={"inset" + slideIndex} className="hero-inset">
            <img
              src={ASSET_BASE + slide.small + ".webp"}
              alt={
                slide.k === "young"
                  ? "Allenamento del settore giovanile"
                  : slide.k === "man"
                    ? "Foto di squadra della Serie C maschile davanti al fondale Foiano Pallavolo"
                    : "Pallavolo femminile, energia in campo"
              }
            />
            <span>{slide.label}</span>
          </div>
        </>
      )}
      {HERO_SLIDES.length > 1 && (
        <div className="hero-controls">
          <span className="slide-number">
            <strong>{String(slideIndex + 1).padStart(2, "0")}</strong>
            <i>/{String(HERO_SLIDES.length).padStart(2, "0")}</i>
          </span>
          <div className="slide-track">
            {HERO_SLIDES.map((slideItem, index) => (
              <button
                key={slideItem.k}
                className={slideIndex === index ? "active" : ""}
                aria-label={
                  slideItem.news
                    ? "Vai alla notizia in evidenza"
                    : "Vai alla foto " + (index + 1)
                }
                aria-current={slideIndex === index ? "true" : undefined}
                onClick={() => setSlideIndex(index)}
              >
                <span
                  key={slideIndex === index ? slideIndex + "active" : index}
                  style={{
                    animationPlayState:
                      heroPaused || motionOff ? "paused" : "running",
                  }}
                />
              </button>
            ))}
          </div>
          <button
            aria-label="Foto precedente"
            onClick={() =>
              setSlideIndex(
                (slideIndex + HERO_SLIDES.length - 1) % HERO_SLIDES.length,
              )
            }
          >
            <CaretLeftIcon weight="bold" />
          </button>
          <button
            aria-label={
              heroPaused ? "Riprendi slideshow" : "Metti in pausa slideshow"
            }
            onClick={() => setHeroPaused((paused) => !paused)}
          >
            {heroPaused ? (
              <PlayIcon weight="fill" size={16} />
            ) : (
              <PauseIcon weight="fill" size={16} />
            )}
          </button>
          <button
            aria-label="Foto successiva"
            onClick={() => setSlideIndex((slideIndex + 1) % HERO_SLIDES.length)}
          >
            <CaretRightIcon weight="bold" />
          </button>
        </div>
      )}
      {featuredNews && !slide.news && (
        <a
          className="hero-news-shortcut"
          href={"/dal-1976.html#" + featuredNews.id}
        >
          <span>
            <small>IN EVIDENZA · DAL CLUB</small>
            {featuredNews.hero.shortLabel || featuredNews.title}
          </span>
          <ArrowUpRightIcon />
        </a>
      )}
      {slide.k !== "man" && (
        <span className="photo-note">FOTO DIMOSTRATIVE</span>
      )}
      <span className="hero-index">
        SCORRI PER SCOPRIRE <ArrowRightIcon />
      </span>
    </section>
  );
}
