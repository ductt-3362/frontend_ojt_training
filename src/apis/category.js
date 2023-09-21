import { api } from "./axios";

export const getCategoriesApi = async () => api.get(`/categories`);
export const getCategoryApi = (id) => api.get(`/categories/${id}`);
