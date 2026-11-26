// Page d'accueil, version Bootstrap 5.3 (npm i bootstrap).
// Dans main.tsx, importer dans cet ordre :
//   import "bootstrap/dist/css/bootstrap.min.css";
//   import "./shared/tokens.css";
//   import "./shared/base.css";
//   import "./bootstrap/bridge.css";
import StarSky from "../shared/StarSky";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Rules from "./Rules";
import Tiles from "./Tiles";
import Footer from "./Footer";
import type { User } from "../shared/types";

export default function HomePage({
  user = null,
  onLogout,
}: {
  user?: User | null;
  onLogout?: () => void;
}) {
  return (
    <div className="sb-page">
      <StarSky />
      <Navbar user={user} onLogout={onLogout} />
      <main>
        <Hero user={user} />
        <Rules />
        <Tiles />
      </main>
      <Footer />
    </div>
  );
}
