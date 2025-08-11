import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Movies } from "../services/movies";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Movies.get(id);
        setMovie(data);
      } catch (e) {
        toast.error("No se pudo cargar la película");
      }
    })();
  }, [id]);

  const onDelete = async () => {
    const res = await Swal.fire({
      title: "¿Eliminar película?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (res.isConfirmed) {
      try {
        await Movies.remove(id);
        toast.success("Película eliminada");
        navigate("/items");
      } catch {
        toast.error("No se pudo eliminar");
      }
    }
  };

  if (!movie) return <p className="text-center mt-6">Cargando...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {movie.imagen && (
        <img
          src={movie.imagen}
          alt={movie.titulo}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <h1 className="text-2xl font-bold mb-2">{movie.titulo}</h1>
      <p className="text-slate-700 dark:text-slate-300 mb-1">{movie.genero}</p>
      <p className="text-slate-600 dark:text-slate-400 mb-4">
        {movie.year ?? movie.año}   {/* <- compat */}
      </p>
      <p className="mb-6">{movie.descripcion}</p>

      <div className="flex gap-2">
        <Link
          to={`/items/${id}/edit`}
          className="px-3 py-2 rounded bg-amber-500 text-white hover:bg-amber-600"
        >
          Editar
        </Link>
        <button
          onClick={onDelete}
          className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}