import { useState } from "react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
  VolleyballIcon,
} from "@phosphor-icons/react";
import { PageHero } from "../components/PageHero";

export function ContactPage() {
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("Informazioni generali");
  const [message, setMessage] = useState("");
  const [emailPrepared, setEmailPrepared] = useState(false);
  function prepareEmail(event) {
    event.preventDefault();
    const Z = `Ciao Foiano Pallavolo,
sono ${name}.

${message}

Interesse: ${interest}`;
    location.href =
      "mailto:marketing.foianopallavolo@gmail.com?subject=" +
      encodeURIComponent(interest + " - " + name) +
      "&body=" +
      encodeURIComponent(Z);
    setEmailPrepared(true);
  }
  return (
    <div className="teams-page sc-page">
      <PageHero
        title={["PARLIAMO.", "FACCIAMO", "SQUADRA."]}
        sub="Per iniziare, collaborare o semplicemente conoscerci."
        image="youth"
        crumb="CONTATTI"
      />
      <section className="sc-contact teams-wrap">
        <div>
          <div className="teams-kicker">SIAMO QUI PER TE</div>
          <h2>
            Il prossimo passo <em>comincia da qui.</em>
          </h2>
          <p>
            Vuoi conoscere le squadre, chiedere informazioni per la tua famiglia
            o parlare di una collaborazione? Scrivici: saremo felici di
            aiutarti.
          </p>
          <div className="sc-contact-list">
            <a href="tel:+393339331480">
              <PhoneIcon />
              <span>
                <small>TELEFONO</small>
                <strong>333 9331480</strong>
              </span>
              <ArrowUpRightIcon />
            </a>
            <a href="mailto:marketing.foianopallavolo@gmail.com">
              <EnvelopeSimpleIcon />
              <span>
                <small>EMAIL</small>
                <strong>marketing.foianopallavolo@gmail.com</strong>
              </span>
              <ArrowUpRightIcon />
            </a>
            <div>
              <MapPinIcon />
              <span>
                <small>LA NOSTRA SEDE SPORTIVA</small>
                <strong>
                  Via Foro Boario
                  <br />
                  Foiano della Chiana (AR)
                </strong>
              </span>
            </div>
            <div>
              <VolleyballIcon />
              <span>
                <small>FOIANO PALLAVOLO</small>
                <strong>Matricola FIPAV 100460024</strong>
              </span>
            </div>
          </div>
        </div>
        <div className="sc-form">
          <div className="teams-kicker">SCRIVICI</div>
          <h2>Raccontaci di te.</h2>
          <p>
            Compila i campi: si aprirà la tua applicazione email con il
            messaggio pronto da controllare e inviare.
          </p>
          <form onSubmit={prepareEmail}>
            <label>
              Nome e cognome
              <input
                required
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Come ti chiami?"
              />
            </label>
            <label>
              Mi interessa
              <select
                value={interest}
                onChange={(event) => setInterest(event.target.value)}
              >
                {[
                  "Informazioni generali",
                  "Vieni a giocare",
                  "Serie C maschile",
                  "Prima Divisione femminile",
                  "Giovanili maschili",
                  "Giovanili femminili",
                  "Minivolley",
                  "Sponsorizzazione Foiano Pallavolo",
                  "Storia e archivio",
                ].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              Il tuo messaggio
              <textarea
                required
                rows="5"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Come possiamo aiutarti?"
              />
            </label>
            <button className="button primary" type="submit">
              Prepara l’email <ArrowRightIcon />
            </button>
            {emailPrepared && (
              <p role="status">
                Messaggio preparato. Se l’app email non si apre, scrivi a
                marketing.foianopallavolo@gmail.com.
              </p>
            )}
          </form>
        </div>
      </section>
      <section className="sc-location teams-wrap">
        <div>
          <div className="teams-kicker">LA NOSTRA CASA</div>
          <h2>
            Ci vediamo <em>in palestra.</em>
          </h2>
          <p>
            Palazzetto dello Sport Loredano Vannuccini
            <br />
            Via Foro Boario, Foiano della Chiana (AR).
          </p>
          <p>
            Contattaci per confermare sede e orari dell’attività che ti
            interessa.
          </p>
          <a
            className="button primary"
            href={
              "https://www.google.com/maps/search/?api=1&query=Palazzetto+dello+Sport+Via+Foro+Boario+Foiano+della+Chiana"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Apri la mappa <ArrowUpRightIcon />
          </a>
        </div>
        <div className="sc-location-art">
          <MapPinIcon weight="thin" />
          <strong>
            FOIANO
            <br />
            DELLA
            <br />
            CHIANA.
          </strong>
          <span>DAL 1976 · SEMPRE IN CAMPO</span>
        </div>
      </section>
      <section className="teams-join on-red">
        <div className="teams-wrap">
          <div>
            <h2>IL TUO POSTO È QUI.</h2>
            <p>Scopri tutte le nostre squadre.</p>
          </div>
          <a className="button white" href="/squadre.html">
            Scopri le squadre <ArrowRightIcon />
          </a>
        </div>
      </section>
    </div>
  );
}
