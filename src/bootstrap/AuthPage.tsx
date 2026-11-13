import { useState, type FormEvent } from "react";
import StarSky from "../shared/StarSky";
import type { User } from "../shared/types";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./AuthPage.css";

type AuthMode = "login" | "register";

export default function AuthPage({ initialMode }: { initialMode: AuthMode }) {
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user: User | null = null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (
      initialMode === "register" &&
      formData.get("password") !== formData.get("passwordConfirmation")
    ) {
      setNotice("Les deux mots de passe doivent être identiques.");
      return;
    }

    const isLogin = initialMode === "login";
    const payload = isLogin
      ? {
          email: formData.get("email"),
          motDePasse: formData.get("password"),
        }
      : {
          nom: formData.get("nom"),
          prenom: formData.get("prenom"),
          pseudo: formData.get("pseudo"),
          email: formData.get("email"),
          telephone: formData.get("telephone"),
          anneeNaissance: Number(formData.get("anneeNaissance")),
          planete: formData.get("planete"),
          district: formData.get("district"),
          motDePasse: formData.get("password"),
        };

    setIsSubmitting(true);
    setNotice("");

    try {
      const response = await fetch(isLogin ? "/api/auth/login" : "/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as {
        error?: string;
        user?: User;
      };

      if (!response.ok) {
        setNotice(result.error ?? "Impossible de créer le compte.");
        return;
      }

      if (isLogin) {
        localStorage.setItem("basketinspace.user", JSON.stringify(result.user));
        window.location.href = "/";
      } else {
        setNotice("Compte créé avec succès. Bienvenue dans l'équipe !");
        form.reset();
      }
    } catch (error: unknown) {
      console.error("Erreur de connexion à l'API :", error);
      setNotice("Le serveur est indisponible. Vérifiez que l'API est démarrée.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="sb-page">
      <StarSky />
      <Navbar user={user} currentPath="/connexion" />
      <main className="container sb-auth-main py-5">
        <section className="sb-auth-panel sb-glass border mx-auto" aria-labelledby="auth-title">
          <a className="sb-auth-back" href="/">← Retour à l'accueil</a>
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
            <a className={initialMode === "login" ? "active" : ""} href="/connexion" aria-current={initialMode === "login" ? "page" : undefined}>
              Connexion
            </a>
            <a className={initialMode === "register" ? "active" : ""} href="/inscription" aria-current={initialMode === "register" ? "page" : undefined}>
              Inscription
            </a>
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
                <a className="sb-auth-small-link" href="/connexion">Mot de passe oublié ?</a>
              </div>
            )}

            {notice ? <p className="sb-auth-notice" role="status">{notice}</p> : null}
            <button className="btn btn-primary sb-raised sb-auth-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Connexion en cours..." : initialMode === "login" ? "Se connecter" : "Créer mon compte"}
            </button>
          </form>

          <p className="sb-auth-footnote mb-0">
            Vos informations sont enregistrées de façon sécurisée dans votre profil.
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
