import { useFavoritos } from "../context/FavoritesContext";

export default function Favorites() {
  const { favoritos, eliminarFavorito, eliminarTodos } = useFavoritos();

  if (favoritos.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-10">
        <p className="text-center text-sm text-slate-500 dark:text-slate-300">
          Sin películas favoritas por ahora.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 mt-10">
      <h2 className="text-xl font-bold mb-4">Favoritos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {favoritos.map((peli) => (
          <div
            key={peli.id}
            className="bg-slate-100 dark:bg-slate-800 rounded shadow p-4 flex flex-col items-center text-center"
          >
            {peli.imagen && (
              <img
                src={peli.imagen}
                alt={peli.titulo}
                className="w-32 h-32 rounded mb-4 object-cover"
              />
            )}
            <h3 className="text-lg font-semibold">{peli.titulo}</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">{peli.genero}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {peli.year ?? peli.año}
            </p>
            <button
              onClick={() => eliminarFavorito(peli.id)}
              className="mt-3 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              Quitar
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={eliminarTodos}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
        >
          Eliminar todos
        </button>
      </div>
    </div>
  );
}