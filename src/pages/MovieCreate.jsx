import { useState, useMemo } from "react";
import { Movies } from "../services/movies";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { safeImage } from "../utils/images";

export default function MovieCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: "",
    director: "",
    year: "",
    genero: "",
    descripcion: "",
    imagen: "",
    rating: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  const previewSrc = useMemo(() => {
    if (!form.imagen?.trim()) return "";
    return safeImage(form.imagen);
  }, [form.imagen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.titulo.trim()) {
      toast.warn("El título es obligatorio");
      return false;
    }
    if (form.year && !/^\d{4}$/.test(String(form.year))) {
      toast.warn("El año debe tener 4 dígitos (ej: 2023)");
      return false;
    }
    if (Number(form.rating) < 0 || Number(form.rating) > 10) {
      toast.warn("El rating debe estar entre 0 y 10");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      await Movies.create({
        ...form,
        year: form.year || "",
      });
      toast.success("Película creada");
      navigate("/items");
    } catch {
      toast.error("No se pudo crear");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
      {/* Vista previa */}
      {previewSrc && (
        <div className="w-full bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-center dark:bg-slate-800 dark:border-slate-700">
          <img
            src={previewSrc}
            alt="Vista previa"
            className="w-full h-auto max-h-[40vh] object-contain rounded"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/800x450?text=Sin+imagen";
              e.currentTarget.className =
                "w-full h-auto max-h-[40vh] object-contain rounded opacity-70";
            }}
          />
        </div>
      )}

      {/* Título */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Título <span className="text-red-600">*</span>
        </label>
        <input
          name="titulo"
          placeholder="Ej: Interstellar"
          value={form.titulo}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-white text-slate-800 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:text-white dark:border-slate-600"
          required
        />
      </div>

      {/* Director */}
      <div>
        <label className="block text-sm font-medium mb-1">Director</label>
        <input
          name="director"
          placeholder="Ej: Christopher Nolan"
          value={form.director}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-white text-slate-800 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:text-white dark:border-slate-600"
        />
      </div>

      {/* Año y Género */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Año</label>
          <input
            name="year"
            placeholder="Ej: 2023"
            value={form.year}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-white text-slate-800 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:text-white dark:border-slate-600"
            inputMode="numeric"
            pattern="\d{4}"
            title="Cuatro dígitos, ej: 2023"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Género</label>
          <input
            name="genero"
            placeholder="Ej: Ciencia ficción"
            value={form.genero}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-white text-slate-800 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:text-white dark:border-slate-600"
          />
        </div>
      </div>

      {/* Imagen */}
      <div>
        <label className="block text-sm font-medium mb-1">URL de la imagen</label>
        <input
          name="imagen"
          placeholder="URL https"
          value={form.imagen}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-white text-slate-800 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:text-white dark:border-slate-600"
        />
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Se muestra una vista previa automática si la URL es válida.
        </p>
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium mb-1">Descripción</label>
        <textarea
          name="descripcion"
          placeholder="Breve sinopsis"
          value={form.descripcion}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 rounded bg-white text-slate-800 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:text-white dark:border-slate-600"
        />
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium mb-1">Rating (0–10)</label>
        <input
          name="rating"
          type="number"
          min="0"
          max="10"
          step="0.1"
          placeholder="Ej: 8.5"
          value={form.rating}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-white text-slate-800 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:text-white dark:border-slate-600"
        />
      </div>

      <div className="pt-2">
        <button
          disabled={submitting}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
}