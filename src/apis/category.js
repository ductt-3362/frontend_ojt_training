import { api } from "./axios";
export const getAllCategoriesApi = () => api.get("/categories");
export const getDetailProductApi = (id) =>
  api.get(`/books/${id}?_expand=category`);
