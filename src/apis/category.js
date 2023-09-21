import { api } from "./axios";
export const getAllCategoriesApi = async () => await api.get("/categories");
export const getDetailProductApi = async (id) =>
  await api.get(`/books/${id}?_expand=category`);
