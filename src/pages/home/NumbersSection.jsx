import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { CountUp } from "../../components/CountUp";
import { Eyebrow } from "../../components/Eyebrow";
import { SiteLink } from "../../components/SiteLink";

export function NumbersSection() {
  return (
    <section className="numbers-section" aria-label="I numeri del club">
      <div className="numbers-intro" data-reveal>
        <Eyebrow>Le nostre radici</Eyebrow>
        <h2>
          La passione
          <br />
          si tramanda.
        </h2>
        <SiteLink to="storia">
          La nostra storia <ArrowUpRightIcon />
        </SiteLink>
      </div>
      <div className="number-cell" data-reveal>
        <div className="number">
          <CountUp value={1976} />
          <small>DAL</small>
        </div>
        <span>L'anno del primo palleggio.</span>
      </div>
      <div className="number-cell" data-reveal>
        <div className="number">
          <CountUp value={new Date().getFullYear() - 1976} />
          <small>ANNI</small>
        </div>
        <span>Generazioni, una stessa passione.</span>
      </div>
      <div className="number-cell" data-reveal>
        <div className="number">
          <CountUp value={2} pad />
          <small>PRIME SQUADRE</small>
        </div>
        <span>Serie C maschile · 1ª Divisione femminile.</span>
      </div>
    </section>
  );
}
