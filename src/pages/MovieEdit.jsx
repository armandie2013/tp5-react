import { useEffect, useState } from "react";
import { Movies } from "../services/movies";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function MovieEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Movies.get(id);
        setForm({
          ...data,
          year: data.year ?? data.año ?? "", // <-- compatibilidad
        });
      } catch {
        toast.error("No se pudo cargar la película");
      }
    })();
  }, [id]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviamos siempre "year"
      const payload = { ...form, year: form.year ?? "" };
      delete payload.año; // por si existía, no lo mandamos
      await Movies.update(id, payload);
      toast.success("Película actualizada");
      navigate(`/items/${id}`);
    } catch {
      toast.error("No se pudo actualizar");
    }
  };

  if (!form) return <p className="text-center mt-6">Cargando...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-3">
      {["titulo", "director", "genero", "imagen"].map((name) => (
        <input
          key={name}
          name={name}
          placeholder={name}
          value={form[name] || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-slate-100 dark:bg-slate-800"
        />
      ))}

      <input
        name="year"                                        // <-- antes "año"
        placeholder="año"
        value={form.year || ""}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded bg-slate-100 dark:bg-slate-800"
      />

      <textarea
        name="descripcion"
        placeholder="descripcion"
        value={form.descripcion || ""}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded bg-slate-100 dark:bg-slate-800"
      />

      <input
        name="rating"
        type="number"
        min="0"
        max="10"
        step="0.1"
        placeholder="rating"
        value={form.rating ?? 0}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded bg-slate-100 dark:bg-slate-800"
      />

      <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
        Guardar cambios
      </button>
    </form>
  );
}