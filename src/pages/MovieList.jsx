import { useEffect, useState } from "react";
import { Movies } from "../services/movies";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { safeImage } from "../utils/images";
import { useFavoritos } from "../context/FavoritesContext"; // 👈 importar

export default function MovieList() {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const { agregarFavorito, eliminarFavorito, isFavorito } = useFavoritos(); // 👈 usar

  useEffect(() => {
    (async () => {
      setCargando(true);
      try {
        const { data } = await Movies.list();
        setPeliculas(data);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setCargando(false);
      }
    })();
  }, []);

  if (cargando) return <p className="text-center mt-6">Cargando...</p>;
  if (!peliculas.length) return <p className="text-center mt-6">Sin películas aún</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
      {peliculas.map((m) => (
        <div
          key={m.id}
          className="h-full p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col dark:bg-slate-800 dark:border-slate-700"
        >
          {/* Imagen */}
          {m.imagen && (
            <div className="w-full h-44 flex items-center justify-center bg-slate-50 rounded-lg overflow-hidden mb-3 dark:bg-slate-700">
              <img
                src={safeImage(m.imagen)}
                alt={m.titulo}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/300x200?text=Sin+imagen";
                  e.currentTarget.className =
                    "max-h-full max-w-full object-contain opacity-70";
                }}
              />
            </div>
          )}

          {/* Contenido */}
          <h3 className="font-semibold text-slate-900 truncate dark:text-slate-100">
            {m.titulo || m.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {m.genero} • {m.year ?? m.año}
          </p>

          {/* Acciones siempre al fondo */}
          <div className="mt-auto pt-3 flex flex-wrap gap-2">
            <Link
              to={`/items/${m.id}`}
              className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
            >
              Ver
            </Link>
            <Link
              to={`/items/${m.id}/edit`}
              className="px-3 py-1 text-sm rounded bg-amber-500 text-white hover:bg-amber-600 shadow-sm"
            >
              Editar
            </Link>

            {/* ❤️ Favoritos */}
            {isFavorito(m.id) ? (
              <button
                onClick={() => eliminarFavorito(m.id)}
                className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700 shadow-sm"
                aria-label="Quitar de favoritos"
                title="Quitar de favoritos"
              >
                Quitar
              </button>
            ) : (
              <button
                onClick={() => agregarFavorito(m)}
                className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700 shadow-sm"
                aria-label="Agregar a favoritos"
                title="Agregar a favoritos"
              >
                Favorito
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}