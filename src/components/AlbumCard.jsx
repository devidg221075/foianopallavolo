import { ArrowRightIcon, ImagesIcon } from "@phosphor-icons/react";
import { albumThumbSrc } from "../data/gallery";

const photoCount = (n) => n + " foto";

// Scheda di un album: copertina, titolo, data e numero di foto.
export function AlbumCard({ album }) {
  const cover =
    album.photos.find((photo) => photo.file === album.cover) || album.photos[0];
  return (
    <a className="gallery-album-card" href={"/galleria.html?album=" + album.id}>
      <span className="gallery-album-image">
        <img src={albumThumbSrc(album, cover)} alt="" loading="lazy" />
      </span>
      <span className="gallery-album-body">
        <strong>{album.title}</strong>
        <small>
          <ImagesIcon />
          {album.date ? album.date + " · " : ""}
          {photoCount(album.photos.length)}
        </small>
        <span className="gallery-album-go">
          Apri l’album <ArrowRightIcon />
        </span>
      </span>
    </a>
  );
}
