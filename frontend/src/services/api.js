import axios from "axios";

// base url
const api = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createPersonality = (data) =>
  api.post("/personalities", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const fetchPersonalities = () => api.get("/personalities");

export const getPersonalityById = (id) => api.get(`/personalities/${id}`);

export const updatePersonality = (id, data) =>
  api.put(`/personalities/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deletePersonality = (id) => api.delete(`/personalities/${id}`);


//auth
export const signup = (data) => api.post('/auth/signup', data);
export const login = (data) => api.post('/auth/login', data);

export default api;
