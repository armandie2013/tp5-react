import { useState } from "react";
import { Movies } from "../services/movies";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Movies.create(form);
      toast.success("Película creada");
      navigate("/items");
    } catch {
      toast.error("No se pudo crear");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-3">
      {["titulo", "director", "genero", "imagen"].map((name) => (
        <input
          key={name}
          name={name}
          placeholder={name}
          value={form[name]}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-slate-100 dark:bg-slate-800"
        />
      ))}
      <input
        name="year"
        placeholder="año"
        value={form.año}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded bg-slate-100 dark:bg-slate-800"
      />
      <textarea
        name="descripcion"
        placeholder="descripcion"
        value={form.descripcion}
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
        value={form.rating}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded bg-slate-100 dark:bg-slate-800"
      />
      <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
        Guardar
      </button>
    </form>
  );
}