// src/utils/validation.js
export const currentYear = new Date().getFullYear();

// Helpers
const isEmpty = (v) => v == null || String(v).trim() === "";
const trimOrNull = (v) => (isEmpty(v) ? "" : String(v).trim());

const IMG_REGEX = /^https?:\/\/.*\.(jpg|jpeg|png|webp)$/i;
const YEAR_MIN = 1888;
const YEAR_MAX = currentYear + 1;

export function validateMovie(input) {
  // Normalizamos/“sanitizamos” primero
  const data = {
    titulo: trimOrNull(input.titulo),
    director: trimOrNull(input.director),
    year: trimOrNull(input.year),
    genero: trimOrNull(input.genero),
    descripcion: trimOrNull(input.descripcion),
    imagen: trimOrNull(input.imagen),
    rating:
      input.rating === "" || input.rating == null
        ? ""
        : String(input.rating).trim(),
  };

  const errors = {};

  // Título (obligatorio)
  if (isEmpty(data.titulo)) {
    errors.titulo = "El título es obligatorio";
  } else {
    if (data.titulo.length < 2) errors.titulo = "Mínimo 2 caracteres";
    else if (data.titulo.length > 150) errors.titulo = "Máximo 150 caracteres";
  }

  // Director (opcional)
  if (!isEmpty(data.director)) {
    if (data.director.length < 3) errors.director = "Mínimo 3 caracteres";
    else if (data.director.length > 100) errors.director = "Máximo 100 caracteres";
  }

  // Año (opcional/obligatorio: si lo querés obligatorio, descomentá)
  if (!isEmpty(data.year)) {
    if (!/^\d{4}$/.test(data.year)) {
      errors.year = "Debe tener 4 dígitos (ej: 2023)";
    } else {
      const y = Number(data.year);
      if (y < YEAR_MIN || y > YEAR_MAX) {
        errors.year = `Entre ${YEAR_MIN} y ${YEAR_MAX}`;
      }
    }
  }
  // // Si querés hacerlo obligatorio:
  // else {
  //   errors.year = "El año es obligatorio";
  // }

  // Género (obligatorio)
  if (isEmpty(data.genero)) {
    errors.genero = "El género es obligatorio";
  } else {
    if (data.genero.length < 3) errors.genero = "Mínimo 3 caracteres";
    else if (data.genero.length > 150) errors.genero = "Máximo 150 caracteres";
    // Si querés restringir a una lista fija, validalo acá
  }

  // Imagen (opcional)
  if (!isEmpty(data.imagen)) {
    if (!IMG_REGEX.test(data.imagen)) {
      errors.imagen = "Debe ser una URL https válida de imagen (.jpg, .jpeg, .png, .webp)";
    }
  }

  // Descripción (opcional)
  if (!isEmpty(data.descripcion)) {
    if (data.descripcion.length < 10) errors.descripcion = "Mínimo 10 caracteres";
    else if (data.descripcion.length > 500) errors.descripcion = "Máximo 500 caracteres";
  }

  // Rating (opcional)
  if (!isEmpty(data.rating)) {
    const r = Number(data.rating);
    if (Number.isNaN(r)) errors.rating = "Debe ser numérico";
    else if (r < 0 || r > 10) errors.rating = "Entre 0 y 10";
    // normalizamos a número con máximo 1 decimal (opcional)
    data.rating = Math.round(r * 10) / 10;
  }

  // Devolvemos flags útiles
  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors, data };
}

// helper para UI (saca el primer error de un campo)
export const fe = (errors, name) => errors?.[name] ?? "";