import { api } from "./axios";

export const getCategoriesApi = async () => api.get(`/categories`);

// export const getCategoryApi = (slug) => api.get(`/categories/?slug=${slug}`);

export const getCategoryBySlugApi = (slug) =>
	api.get(`/categories?slug=${slug}`);
