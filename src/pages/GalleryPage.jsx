import { useEffect, useRef, useState } from "react";
import {
  ArrowLeftIcon,
  CaretLeftIcon,
  CaretRightIcon,
  XIcon,
} from "@phosphor-icons/react";
import { AlbumCard } from "../components/AlbumCard";
import { PageHero } from "../components/PageHero";
import {
  ALBUMS,
  GALLERY_CATEGORIES,
  albumPhotoSrc,
  albumThumbSrc,
  photoAlt,
} from "../data/gallery";

export function GalleryPage() {
  const albumId = new URLSearchParams(location.search).get("album");
  const album = ALBUMS.find((item) => item.id === albumId);
  useEffect(() => {
    document.title = album
      ? album.title + " — Galleria — Foiano Pallavolo dal 1976"
      : "Galleria — Foiano Pallavolo dal 1976";
  }, [album]);
  return (
    <div className="gallery-page">
      <PageHero
        title={["GALLERIA.", "MOMENTI", "DA RICORDARE."]}
        sub="Le foto del club, album dopo album."
        image="story"
        crumb="GALLERIA"
      />
      {album ? <AlbumView album={album} /> : <AlbumIndex />}
    </div>
  );
}

function AlbumIndex() {
  const groups = GALLERY_CATEGORIES.map((category) => ({
    category,
    albums: ALBUMS.filter((album) => album.category === category.id),
  })).filter((group) => group.albums.length);
  return (
    <div className="gallery-index teams-wrap">
      {groups.map(({ category, albums }) => (
        <section key={category.id} aria-labelledby={"cat-" + category.id}>
          <div className="teams-kicker">{category.label.toUpperCase()}</div>
          <h2 id={"cat-" + category.id} className="gallery-category-title">
            {category.label}
          </h2>
          <div className="gallery-albums">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function AlbumView({ album }) {
  const [open, setOpen] = useState(null);
  const triggerRef = useRef(null);
  const category = GALLERY_CATEGORIES.find(
    (item) => item.id === album.category,
  );
  return (
    <div className="gallery-album teams-wrap">
      <a className="text-link gallery-back" href="/galleria.html">
        <ArrowLeftIcon /> Tutti gli album
      </a>
      <div className="teams-kicker">{category?.label.toUpperCase()}</div>
      <h2 className="gallery-album-title">{album.title}</h2>
      <p className="gallery-album-desc">{album.description}</p>
      <div
        className="gallery-grid"
        style={
          album.rowHeight ? { "--row-d": album.rowHeight + "px" } : undefined
        }
      >
        {album.photos.map((photo, index) => (
          <button
            key={photo.file}
            className="gallery-thumb"
            style={{ "--r": photo.width / photo.height }}
            aria-label={
              "Ingrandisci la foto " +
              (index + 1) +
              " di " +
              album.photos.length +
              ": " +
              photoAlt(album, photo, index)
            }
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setOpen(index);
            }}
          >
            <img
              src={albumThumbSrc(album, photo)}
              alt=""
              width={photo.width}
              height={photo.height}
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>
      {open !== null && (
        <Lightbox
          album={album}
          index={open}
          setIndex={setOpen}
          returnFocus={() => triggerRef.current?.focus()}
        />
      )}
    </div>
  );
}

function Lightbox({ album, index, setIndex, returnFocus }) {
  const total = album.photos.length;
  const photo = album.photos[index];
  const closeRef = useRef(null);
  const boxRef = useRef(null);
  const close = () => {
    setIndex(null);
    returnFocus();
  };
  const go = (delta) => setIndex((index + delta + total) % total);
  useEffect(() => {
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowLeft") go(-1);
      else if (event.key === "ArrowRight") go(1);
      else if (event.key === "Tab") {
        const items = boxRef.current.querySelectorAll("button");
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  });
  return (
    <div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={album.title + ", foto " + (index + 1) + " di " + total}
      ref={boxRef}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <button
        className="gallery-lightbox-close"
        aria-label="Chiudi"
        ref={closeRef}
        onClick={close}
      >
        <XIcon />
      </button>
      {total > 1 && (
        <button
          className="gallery-lightbox-nav prev"
          aria-label="Foto precedente"
          onClick={() => go(-1)}
        >
          <CaretLeftIcon />
        </button>
      )}
      <figure>
        <img
          src={albumPhotoSrc(album, photo)}
          alt={photoAlt(album, photo, index)}
        />
        <figcaption>
          <span>{album.title}</span>
          <span>
            {index + 1} / {total}
          </span>
        </figcaption>
      </figure>
      {total > 1 && (
        <button
          className="gallery-lightbox-nav next"
          aria-label="Foto successiva"
          onClick={() => go(1)}
        >
          <CaretRightIcon />
        </button>
      )}
    </div>
  );
}
