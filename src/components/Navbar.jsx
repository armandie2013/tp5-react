import { NavLink, useNavigate } from "react-router-dom";
import { useFavoritos } from "../context/FavoritesContext";
import ThemeButton from "./ThemeButton";

const linkBase = "px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition";
const linkActive = "bg-slate-100 dark:bg-slate-700 font-semibold";

export default function Navbar() {
  const navigate = useNavigate();
  const { favoritos } = useFavoritos();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/")} className="text-xl font-bold" title="Inicio">
            🎬 PelisDATA
          </button>
          <NavLink to="/items" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
            Listado
          </NavLink>
          <NavLink to="/items/create" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
            Crear
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          <NavLink
            to="/favorites"
            className={({ isActive }) => `relative ${linkBase} ${isActive ? linkActive : ""}`}
            title="Favoritos"
          >
            ❤️ Favoritos
            {favoritos.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 grid place-items-center">
                {favoritos.length}
              </span>
            )}
          </NavLink>

          {/* Toggle de tema */}
          <ThemeButton />
        </div>
      </nav>
    </header>
  );
}