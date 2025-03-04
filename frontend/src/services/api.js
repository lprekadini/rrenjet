import axios from "axios";

// base url
const api = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

//personalities
export const createPersonality = (data) =>
  api.post("/personalities", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  export const fetchPersonalities = (categoryId = null) => {
    return api.get(`/personalities`, {
      params: categoryId ? { categoryId } : {},
    });
  };
export const getPersonalityById = (id) => api.get(`/personalities/${id}`);
export const updatePersonality = (id, data) =>
  api.put(`/personalities/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deletePersonality = (id) => api.delete(`/personalities/${id}`);

//categories
export const createCategory = (data) =>
  api.post("/categories", data, {
    headers: { "Content-Type": "application/json" },
  });
export const fetchCategories = () => api.get("/categories");
export const getCategoryById = (id) => api.get(`/categories/${id}`);
export const updateCategory = (id, data) =>
  api.put(`/categories/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

//auth
export const signup = (data) => api.post("/auth/signup", data);
export const login = (data) => api.post("/auth/login", data);

export default api;
