import { ASSET_BASE } from "../config";

export function PageHero({ title, sub, image, crumb }) {
  return (
    <section className="teams-hero on-red sc-hero">
      <img
        className="teams-hero-photo"
        src={ASSET_BASE + image + ".webp"}
        alt="Fotografia dimostrativa di pallavolo"
      />
      <div className="teams-hero-red" />
      <div className="teams-hero-copy">
        <div className="teams-breadcrumb">
          <a href="/">HOME</a>
          <span>/</span>
          {crumb}
        </div>
        <h1>
          {title.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </h1>
        <p>{sub}</p>
      </div>
      <span className="teams-photo-note">FOTO DIMOSTRATIVA</span>
    </section>
  );
}
