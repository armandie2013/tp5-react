import { useEffect, useState } from "react";
import { Movies } from "../services/movies";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function MovieList() {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(false);

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
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {peliculas.map((m) => (
    <div
      key={m.id}
      className="h-full p-3 rounded bg-slate-100 dark:bg-slate-800 shadow hover:shadow-lg transition flex flex-col"
    >
      {/* Imagen */}
      {m.imagen && (
        <div className="w-full h-40 flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded overflow-hidden mb-2">
          <img
            src={m.imagen}
            alt={m.titulo}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        </div>
      )}

      {/* Contenido */}
      <h3 className="font-semibold truncate">{m.titulo || m.title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        {m.genero} • {m.year ?? m.año}
      </p>

      {/* Botones siempre abajo-izquierda */}
      <div className="mt-auto pt-3 flex gap-2">
        <Link
          to={`/items/${m.id}`}
          className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Ver
        </Link>
        <Link
          to={`/items/${m.id}/edit`}
          className="px-3 py-1 text-sm rounded bg-amber-500 text-white hover:bg-amber-600"
        >
          Editar
        </Link>
      </div>
    </div>
  ))}
</div>
  );
}