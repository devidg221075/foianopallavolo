import { ArrowRightIcon } from "@phosphor-icons/react";
import { AlbumCard } from "../../components/AlbumCard";
import { SectionHeading } from "../../components/SectionHeading";
import { ALBUMS } from "../../data/gallery";

// Anteprima della Galleria in home: gli ultimi album.
export function GalleryPreview() {
  return (
    <section className="gallery-home section-wrap" id="galleria">
      <SectionHeading
        aside={
          <a className="text-link" href="/galleria.html">
            Tutta la galleria <ArrowRightIcon />
          </a>
        }
      >
        Momenti da ricordare.
      </SectionHeading>
      <div className="gallery-albums">
        {ALBUMS.slice(0, 3).map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </section>
  );
}
