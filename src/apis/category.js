import { api } from "./axios";

export const getCategoriesApi = async () => api.get(`/categories`);

export const getCategoryBySlugApi = (slug) =>
  api.get(`/categories`, { params: { slug } });
