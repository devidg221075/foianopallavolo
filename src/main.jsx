import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { App } from "./App";
import "./styles/01-fondamenta.css";
import "./styles/02-home-ridisegnata.css";
import "./styles/03-header-footer.css";
import "./styles/04-squadre.css";
import "./styles/05-storia-club-news.css";
import "./styles/06-sponsor-contatti.css";
import "./styles/07-partite-risultati.css";
import "./styles/08-correzioni-finali.css";
import "./styles/09-galleria.css";
import "./styles/10-fipav.css";
import "./styles/11-rosa.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
