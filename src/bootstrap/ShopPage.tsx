import { useMemo, useState } from "react";
import type { User } from "../shared/types";
import Footer from "./Footer";
import Navbar from "./Navbar";
import StarSky from "../shared/StarSky";
import "./ShopPage.css";

type ShopCategory = "all" | "ballons" | "tenues" | "protections" | "materiel";

type ShopItem = {
  id: number;
  name: string;
  description: string;
  photoUrl: string;
  price: number;
  stock: number;
  category: Exclude<ShopCategory, "all">;
};

const CATEGORIES: { id: ShopCategory; label: string }[] = [
  { id: "all", label: "Tout le catalogue" },
  { id: "ballons", label: "Ballons" },
  { id: "tenues", label: "Tenues" },
  { id: "protections", label: "Protections" },
  { id: "materiel", label: "Matériel sportif" },
];

const SHOP_ITEMS: ShopItem[] = [];

export default function ShopPage({
  user = null,
  onLogout,
}: {
  user?: User | null;
  onLogout?: () => void;
}) {
  const [category, setCategory] = useState<ShopCategory>("all");
  const [query, setQuery] = useState("");

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("fr");
    return SHOP_ITEMS.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesQuery =
        !normalizedQuery ||
        `${item.name} ${item.description}`.toLocaleLowerCase("fr").includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const emptyMessage =
    category === "materiel"
      ? "Aucun matériel sportif n’est actuellement proposé à la vente."
      : query.trim()
        ? "Aucun article ne correspond à cette recherche."
        : "Aucun article n’est actuellement référencé dans cette catégorie.";

  return (
    <div className="sb-page">
      <StarSky />
      <Navbar user={user} onLogout={onLogout} />

      <main className="container sb-shop-main py-5">
        <header className="sb-shop-heading mb-4 mb-lg-5">
          <div>
            <p className="sb-shop-eyebrow mb-2">Équipement du club</p>
            <h1 className="sb-display sb-title sb-title-3d mb-3">La boutique</h1>
            <p className="fs-5 text-body-secondary m-0 sb-shop-lead">
              Équipement sportif et matériel à acheter, réunis au même endroit.
            </p>
          </div>
          <div className="sb-shop-count" aria-live="polite">
            <span className="sb-shop-count__number">{visibleItems.length}</span>
            <span>{visibleItems.length > 1 ? "articles" : "article"}</span>
          </div>
        </header>

        <section aria-label="Catalogue de la boutique">
          <div className="sb-shop-toolbar">
            <div className="sb-shop-categories" role="group" aria-label="Catégories d’articles">
              {CATEGORIES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`sb-shop-category ${category === item.id ? "active" : ""}`}
                  aria-pressed={category === item.id}
                  onClick={() => setCategory(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <label className="sb-shop-search">
              <span className="sb-shop-search__icon" aria-hidden="true">⌕</span>
              <span className="visually-hidden">Rechercher un article</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rechercher"
              />
            </label>
          </div>

          {visibleItems.length > 0 ? (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-4 pt-4">
              {visibleItems.map((item) => (
                <article className="col" key={item.id}>
                  <div className="sb-shop-item h-100">
                    <div className="sb-shop-item__image-wrap">
                      <img className="sb-shop-item__image" src={item.photoUrl} alt={item.name} />
                    </div>
                    <div className="sb-shop-item__body">
                      <div className="d-flex justify-content-between align-items-start gap-3">
                        <h2 className="fs-5 fw-bold mb-2">{item.name}</h2>
                        <span className="sb-shop-item__kind">Vente</span>
                      </div>
                      <p className="text-body-secondary mb-4">{item.description}</p>
                      <div className="d-flex justify-content-between align-items-center gap-3 mt-auto">
                        <span className="fw-bold">
                          {item.price} spacebucks
                        </span>
                        <span className="small text-body-secondary">
                          {item.stock > 0 ? "Disponible" : "Indisponible"}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="sb-shop-empty" role="status">
              <div className="sb-shop-empty__mark" aria-hidden="true">
                <span />
              </div>
              <p className="sb-shop-eyebrow mb-2">Catalogue en préparation</p>
              <h2 className="sb-display fs-3 mb-2">Les rayons sont vides pour le moment.</h2>
              <p className="text-body-secondary m-0">{emptyMessage}</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}