import { useState, type FormEvent } from "react";
import { Link, NavLink } from "react-router-dom";
import StarSky from "../shared/StarSky";
import type { User } from "../shared/types";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./AuthPage.css";

type AuthMode = "login" | "register";

export default function AuthPage({ initialMode }: { initialMode: AuthMode }) {
  const [notice, setNotice] = useState("");
  const user: User | null = null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (
      initialMode === "register" &&
      formData.get("password") !== formData.get("passwordConfirmation")
    ) {
      setNotice("Les deux mots de passe doivent être identiques.");
      return;
    }
    setNotice(
      initialMode === "login"
        ? "La connexion sera disponible lorsque l'authentification sera branchée."
        : "Le formulaire est valide, mais aucun compte n'a été enregistré."
    );
  }

  return (
    <div className="sb-page">
      <StarSky />
      <Navbar user={user} />
      <main className="container sb-auth-main py-5">
        <section className="sb-auth-panel sb-glass border mx-auto" aria-labelledby="auth-title">
          <Link className="sb-auth-back" to="/">← Retour à l'accueil</Link>
          <p className="sb-auth-kicker mb-2">BASKETINSPACE · ESPACE MEMBRE</p>
          <h1 id="auth-title" className="sb-display sb-auth-title mb-2">
            {initialMode === "login" ? "Bon retour." : "Rejoignez l'équipe."}
          </h1>
          <p className="text-body-secondary mb-4">
            {initialMode === "login"
              ? "Connectez-vous pour retrouver votre activité."
              : "Créez votre profil de joueur en quelques instants."}
          </p>

          <div className="sb-auth-tabs" role="group" aria-label="Choisir un formulaire">
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/connexion" end>
              Connexion
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/inscription" end>
              Inscription
            </NavLink>
          </div>

          <form className="sb-auth-form" onSubmit={handleSubmit}>
            {initialMode === "register" ? (
              <>
                <div className="sb-auth-row">
                  <Field label="Prénom" name="prenom" autoComplete="given-name" required />
                  <Field label="Nom" name="nom" autoComplete="family-name" required />
                </div>
                <Field label="Pseudo" name="pseudo" autoComplete="nickname" required minLength={3} />
              </>
            ) : null}

            <Field label="Adresse e-mail" name="email" type="email" autoComplete="email" required />

            {initialMode === "register" ? (
              <>
                <div className="sb-auth-row">
                  <Field label="Téléphone" name="telephone" type="tel" autoComplete="tel" required />
                  <Field
                    label="Année de naissance"
                    name="anneeNaissance"
                    type="number"
                    min={1900}
                    max={new Date().getFullYear()}
                    autoComplete="bday-year"
                    required
                  />
                </div>
                <div className="sb-auth-row">
                  <Field label="Planète / système" name="planete" required />
                  <Field label="District" name="district" required />
                </div>
              </>
            ) : null}

            <Field
              label="Mot de passe"
              name="password"
              type="password"
              autoComplete={initialMode === "login" ? "current-password" : "new-password"}
              minLength={8}
              required
            />
            {initialMode === "register" ? (
              <Field label="Confirmer le mot de passe" name="passwordConfirmation" type="password" autoComplete="new-password" minLength={8} required />
            ) : (
              <div className="text-end">
                <Link className="sb-auth-small-link" to="/connexion">Mot de passe oublié ?</Link>
              </div>
            )}

            {notice ? <p className="sb-auth-notice" role="status">{notice}</p> : null}
            <button className="btn btn-primary sb-raised sb-auth-submit" type="submit">
              {initialMode === "login" ? "Se connecter" : "Créer mon compte"}
            </button>
          </form>

          <p className="sb-auth-footnote mb-0">
            Maquette front-end : vos informations ne sont ni envoyées ni enregistrées.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required = false,
  minLength,
  min,
  max,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  min?: number;
  max?: number;
}) {
  const id = `auth-${name}`;
  return (
    <div className="sb-auth-field">
      <label htmlFor={id}>{label}</label>
      <input
        className="form-control"
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        min={min}
        max={max}
      />
    </div>
  );
}
