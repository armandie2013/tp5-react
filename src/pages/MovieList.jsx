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
        <div key={m.id} className="p-3 rounded bg-slate-100 dark:bg-slate-800">
          <h3 className="font-semibold">{m.titulo || m.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {m.genero} • {m.year ?? m.año}
          </p>
          <div className="mt-2 flex gap-2">
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