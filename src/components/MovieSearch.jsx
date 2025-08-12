import { useState } from "react";
import { Movies } from "../services/movies";
import { toast } from "react-toastify";
import MovieCard from "./MovieCard";

// Lista "bonita" (con tildes donde corresponde)
const GENRES_CANON = [
  "acción","drama","comedia","terror","romance","aventura",
  "animación","thriller","suspenso","ciencia ficción",
  "sci-fi","fantasía","documental","biografía","crimen","bélico"
];

// Normaliza texto: sin tildes, minúsculas, espacios uniformes
const normalize = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// Conjunto de géneros normalizados para comparar
const GENRES_NORM_SET = new Set(GENRES_CANON.map(normalize));

// Mapa de normalizado -> forma canónica (la que mandamos a la API)
const CANON_MAP = GENRES_CANON.reduce((acc, g) => {
  acc[normalize(g)] = g;
  return acc;
}, {});

function resolverCampo(texto) {
  const q = texto.trim();
  const simple = normalize(q);

  // Año (4 dígitos)
  if (/^\d{4}$/.test(simple)) return { field: "year", value: simple };

  // Género (si coincide normalizado, devolvemos la forma canónica)
  if (GENRES_NORM_SET.has(simple)) {
    return { field: "genero", value: CANON_MAP[simple] }; // p.ej. "belico" -> "bélico"
  }

  // Por defecto: título (coincidencia parcial con ?search=)
  return { field: "titulo", value: q };
}

export default function MovieSearch() {
  const [term, setTerm] = useState("");
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const q = term.trim();
    if (!q) return;

    const { field, value } = resolverCampo(q);

    setCargando(true);
    try {
      const { data } = await Movies.search({ field, value });
      const list = Array.isArray(data) ? data : [];
      setResultados(list);

      if (!list.length) {
        // Fallback opcional: si buscaste por género y no hay nada, probá un search global
        if (field === "genero") {
          const { data: alt } = await Movies.search({ field: "titulo", value: q });
          const altList = Array.isArray(alt) ? alt : [];
          setResultados(altList);
          altList.length
            ? toast.info("Mostrando resultados relacionados")
            : toast.info("Sin resultados para tu búsqueda");
        } else {
          toast.info("Sin resultados para tu búsqueda");
        }
      } else {
        toast.success("Resultados actualizados");
      }
    } catch (err) {
      setResultados([]);
      setError(err.message || "Error buscando películas");
      toast.error(err.message || "Error buscando películas");
    } finally {
      setCargando(false);
    }
  };

  return (
    <section>
      {/* Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 items-center mb-6">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Título, género o año (ej: 'Interestelar', 'drama', '2023')"
          className="flex-1 px-4 py-2 rounded bg-white text-slate-800 border border-slate-300
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
             dark:bg-slate-700 dark:text-white dark:border-slate-600"
        />
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 shadow-sm">
          Buscar
        </button>
        {term && (
          <button
            type="button"
            onClick={() => { setTerm(""); setResultados([]); setError(""); }}
            className="px-3 py-2 rounded border border-slate-300 bg-white hover:bg-slate-50
                   text-slate-800 shadow-sm dark:border-slate-600 dark:bg-slate-600 dark:text-white dark:hover:bg-slate-500"
          >
            Limpiar
          </button>
        )}
      </form>

      {cargando && <p className="text-center mt-6">Cargando...</p>}
      {error && <p className="text-center mt-6 text-red-500">{error}</p>}

      {/* Grid resultados */}
      {!cargando && resultados.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resultados.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}

      {!cargando && !error && term && resultados.length === 0 && (
        <p className="text-center mt-6">No se encontraron resultados.</p>
      )}
    </section>
  );
}