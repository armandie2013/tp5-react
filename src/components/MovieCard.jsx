import { Link } from "react-router-dom";
import { safeImage } from "../utils/images";
import { useFavoritos } from "../context/FavoritesContext";
import { toast } from "react-toastify";

export default function MovieCard({ movie }) {
  const { agregarFavorito, favoritos, eliminarFavorito } = useFavoritos();

  const esFavorito = favoritos.some((f) => f.id === movie.id);

  const handleFavorito = () => {
    if (esFavorito) {
      eliminarFavorito(movie.id);
      toast.info("Eliminado de favoritos");
    } else {
      agregarFavorito({
        id: movie.id,
        titulo: movie.titulo,
        genero: movie.genero,
        year: movie.year ?? movie.año,
        imagen: movie.imagen,
      });
      toast.success("Agregado a favoritos");
    }
  };

  return (
    <div className="h-full p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col dark:bg-slate-800 dark:border-slate-700">
      {movie.imagen && (
        <div className="w-full h-44 flex items-center justify-center bg-slate-50 rounded-lg overflow-hidden mb-3 dark:bg-slate-700">
          <img
            src={safeImage(movie.imagen)}
            alt={movie.titulo}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/300x200?text=Sin+imagen";
              e.currentTarget.className =
                "max-h-full max-w-full object-contain opacity-70";
            }}
          />
        </div>
      )}

      <h3 className="font-semibold text-slate-900 truncate dark:text-slate-100">
        {movie.titulo || movie.title}
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        {movie.genero} • {movie.year ?? movie.año}
      </p>

      <div className="mt-auto pt-3 flex gap-2 flex-wrap">
        <Link
          to={`/items/${movie.id}`}
          className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
        >
          Ver
        </Link>
        <Link
          to={`/items/${movie.id}/edit`}
          className="px-3 py-1 text-sm rounded bg-amber-500 text-white hover:bg-amber-600 shadow-sm"
        >
          Editar
        </Link>
        <button
          onClick={handleFavorito}
          className={`px-3 py-1 text-sm rounded shadow-sm transition ${
            esFavorito
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {esFavorito ? "Quitar" : "Favorito"}
        </button>
      </div>
    </div>
  );
}