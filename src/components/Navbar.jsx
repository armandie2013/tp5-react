import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFavoritos } from "../context/FavoritesContext";
import ThemeButton from "./ThemeButton";

const linkBase =
  "px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition";
const linkActive = "bg-slate-100 dark:bg-slate-700 font-semibold";

export default function Navbar() {
  const navigate = useNavigate();
  const { favoritos } = useFavoritos();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Left: Logo + Desktop links */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              close();
              navigate("/");
            }}
            className="text-xl font-bold"
            title="Inicio"
          >
            🎬 PelisDATA
          </button>

          {/* Links (desktop) */}
          <div className="hidden md:flex items-center">
            <NavLink
              to="/items"
              end
              onClick={close}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              Listado
            </NavLink>
            <NavLink
              to="/items/create"
              end
              onClick={close}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              Crear
            </NavLink>
          </div>
        </div>

        {/* Right: Theme + Favoritos + Burger */}
        <div className="flex items-center gap-2">
          {/* Favoritos (desktop) */}
          <NavLink
            to="/favorites"
            onClick={close}
            className={({ isActive }) =>
              `relative hidden md:inline-block ${linkBase} ${
                isActive ? linkActive : ""
              }`
            }
            title="Favoritos"
          >
            ❤️ Favoritos
            {favoritos.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 grid place-items-center">
                {favoritos.length}
              </span>
            )}
          </NavLink>

          {/* Theme toggle */}
          <ThemeButton />

          {/* Burger (mobile only) */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded p-2 hover:bg-slate-100 dark:hover:bg-slate-700"
            aria-label="Abrir menú"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {/* ícono hamburguesa / close */}
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-64" : "max-h-0"
        }`}
      >
        <div className="px-4 pb-3 pt-2 border-t border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90">
          <nav className="flex flex-col gap-1">
            <NavLink
              to="/items"
              end
              onClick={close}
              className={({ isActive }) =>
                `w-full ${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              📄 Listado
            </NavLink>
            <NavLink
              to="/items/create"
              end
              onClick={close}
              className={({ isActive }) =>
                `w-full ${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              ➕ Crear
            </NavLink>
            <NavLink
              to="/favorites"
              onClick={close}
              className={({ isActive }) =>
                `w-full relative ${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              ❤️ Favoritos
              {favoritos.length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center bg-red-600 text-white text-xs rounded-full min-w-[20px] h-5 px-1">
                  {favoritos.length}
                </span>
              )}
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}