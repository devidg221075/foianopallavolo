import { useState } from "react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
  VolleyballIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Eyebrow } from "./Eyebrow";
import { ASSET_BASE } from "../config";
import { TEAMS } from "../data/teams";

export function Modal({
  closeDialog,
  contactInterest,
  dialog,
  dialogRef,
  emailPrepared,
  gotoCalendar,
  lightbox,
  openContact,
  openTeam,
  setContactInterest,
  setEmailPrepared,
}) {
  const [contactName, setContactName] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  function prepareEmail() {
    const body = `Ciao Foiano Pallavolo,
sono ${contactName}.

${contactMessage}

Interesse: ${contactInterest}`;
    window.location.href = `mailto:marketing.foianopallavolo@gmail.com?subject=${encodeURIComponent(contactInterest + " - " + contactName)}&body=${encodeURIComponent(body)}`;
    setEmailPrepared(true);
  }
  return (
    <div className="modal-backdrop" onClick={closeDialog}>
      <section
        className={"dialog " + (lightbox ? "lightbox" : "")}
        role="dialog"
        aria-modal="true"
        aria-label={lightbox?.title || "Foiano Pallavolo"}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="dialog-close"
          aria-label="Chiudi finestra"
          onClick={closeDialog}
        >
          <XIcon />
        </button>
        {lightbox ? (
          <>
            <img
              src={ASSET_BASE + lightbox.src + ".webp"}
              alt={lightbox.title}
            />
            <div className="lightbox-caption">
              <h2>{lightbox.title}</h2>
              <span>Foto dimostrativa</span>
            </div>
          </>
        ) : dialog.type === "team" ? (
          <>
            <img
              className="dialog-cover"
              src={ASSET_BASE + dialog.team.image + ".webp"}
              alt={dialog.team.name}
            />
            <div className="dialog-body">
              <Eyebrow>{dialog.team.tag}</Eyebrow>
              <h2>{dialog.team.name}</h2>
              <p>{dialog.team.text}</p>
              <div className="team-facts">
                <span>
                  <MapPinIcon /> Foiano della Chiana
                </span>
                <span>
                  <VolleyballIcon /> Foiano Pallavolo · Dal 1976
                </span>
              </div>
              <p className="muted">
                Per conoscere rosa, staff, orari di allenamento e modalità di
                partecipazione, contatta la società.
              </p>
              <div className="dialog-actions">
                <button
                  className="button primary"
                  onClick={() =>
                    openContact("Informazioni " + dialog.team.name)
                  }
                >
                  Chiedi informazioni <ArrowUpRightIcon />
                </button>
                <button
                  className="text-link"
                  onClick={() => gotoCalendar(dialog.team.id)}
                >
                  Calendario <ArrowRightIcon />
                </button>
              </div>
            </div>
          </>
        ) : dialog.type === "teams" ? (
          <div className="dialog-body">
            <Eyebrow>Tante squadre. Una sola identità.</Eyebrow>
            <h2>Trova la tua squadra.</h2>
            <div className="team-list">
              {TEAMS.map((item) => (
                <button key={item.id} onClick={() => openTeam(item)}>
                  <img src={ASSET_BASE + item.image + ".webp"} alt="" />
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.tag}</small>
                  </span>
                  <ArrowUpRightIcon />
                </button>
              ))}
            </div>
          </div>
        ) : dialog.type === "history" ? (
          <div className="dialog-body">
            <Eyebrow>Dal 1976</Eyebrow>
            <h2>
              Una passione
              <br />
              che continua.
            </h2>
            <p>
              Foiano Pallavolo nasce nel 1976. Da allora la sua storia
              attraversa generazioni di atleti e atlete, fino a percorsi in
              Nazionale e in Serie A.
            </p>
            <p>
              Oggi la società riunisce la Serie C maschile, la Prima Divisione
              femminile, il settore giovanile e il Minivolley.
            </p>
            <div className="history-callout">
              Hai una foto, una storia o un ricordo?
              <br />
              <strong>Aiutaci a raccontare la nostra storia.</strong>
            </div>
            <button
              className="button primary"
              onClick={() => openContact("Storia e archivio Foiano Pallavolo")}
            >
              Condividi un ricordo <ArrowUpRightIcon />
            </button>
          </div>
        ) : dialog.type === "sponsor" ? (
          <div className="dialog-body">
            <Eyebrow>Insieme per lo sport</Eyebrow>
            <h2>
              Il tuo marchio.
              <br />
              La nostra squadra.
            </h2>
            <p>
              Scopri gli spazi sulle divise e le opportunità di sponsorizzazione
              di Foiano Pallavolo.
            </p>
            <div className="sponsor-tiers">
              {[200, 300, 350, 500, 1e3].map((item) => (
                <span key={item}>€ {item.toLocaleString("it-IT")}</span>
              ))}
            </div>
            <span className="small-note">
              Fasce previste dal materiale della società. Importi IVA esclusa.
            </span>
            <div className="history-callout">
              <strong>Pacchetto visibilità · + € 50</strong>
              <br />
              Maglia da gioco, post social dedicato e pubblicità sul TV
              segnapunti. Condizioni e disponibilità da confermare con la
              società.
            </div>
            <button
              className="button primary"
              onClick={() => openContact("Richiesta pacchetto sponsor")}
            >
              Richiedi il pacchetto <ArrowUpRightIcon />
            </button>
          </div>
        ) : (
          <div className="dialog-body">
            <Eyebrow>Facciamo squadra</Eyebrow>
            <h2>
              {contactInterest.includes("sponsor") ||
              contactInterest.includes("Sponsorizzazione")
                ? "Sostieni il territorio."
                : "Il prossimo passo è tuo."}
            </h2>
            <p>Scrivi alla società per ricevere tutte le informazioni.</p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                prepareEmail();
              }}
            >
              <label>
                Il tuo nome
                <input
                  value={contactName}
                  onChange={(event) => setContactName(event.target.value)}
                  required
                  autoComplete="name"
                  placeholder="Nome e cognome"
                />
              </label>
              <label>
                Mi interessa
                <select
                  value={contactInterest}
                  onChange={(event) => setContactInterest(event.target.value)}
                >
                  {[
                    ...new Set([
                      contactInterest,
                      "Vieni a giocare",
                      "Serie C maschile",
                      "Prima Divisione femminile",
                      "Giovanili maschili",
                      "Giovanili femminili",
                      "Minivolley",
                      "Sponsorizzazione Foiano Pallavolo",
                      "Storia e archivio Foiano Pallavolo",
                    ]),
                  ].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label>
                Il tuo messaggio
                <textarea
                  value={contactMessage}
                  onChange={(event) => setContactMessage(event.target.value)}
                  required
                  rows={3}
                  placeholder="Raccontaci cosa vorresti sapere…"
                />
              </label>
              <button type="submit" className="button primary">
                Prepara l'email <EnvelopeSimpleIcon />
              </button>
              <span className="small-note">
                Si apre la tua app email. Potrai controllare il messaggio prima
                di inviarlo.
              </span>
              {emailPrepared && (
                <p className="form-status" role="status">
                  <CheckIcon /> Email preparata. Se l'app non si apre, scrivi a
                  marketing.foianopallavolo@gmail.com.
                </p>
              )}
            </form>
            <div className="contact-alternatives">
              <a href="tel:+393339331480">
                <PhoneIcon />
                333 9331480
              </a>
              <a href="mailto:marketing.foianopallavolo@gmail.com">
                <EnvelopeSimpleIcon />
                Scrivi direttamente
              </a>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
