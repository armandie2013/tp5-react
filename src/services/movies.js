import { api } from "./http";

const normalize = (obj) => {
  if (obj && obj.año != null && obj.year == null) {
    return { ...obj, year: obj.año };
  }
  return obj;
};

export const Movies = {
  list: async () => {
    const res = await api.get("");
    const data = Array.isArray(res.data) ? res.data.map(normalize) : res.data;
    return { ...res, data };
  },
  get: async (id) => {
    const res = await api.get(`/${id}`);
    return { ...res, data: normalize(res.data) };
  },
  create: (payload) => {
    const p = { ...payload };
    delete p.año; // aseguramos enviar sólo "year"
    return api.post("", p);
  },
  update: (id, payload) => {
    const p = { ...payload };
    delete p.año;
    return api.put(`/${id}`, p);
  },
  remove: (id) => api.delete(`/${id}`),
};