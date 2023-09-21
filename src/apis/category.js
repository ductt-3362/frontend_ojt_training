import { api } from "./axios";

export const getCategoriesApi = async () => api.get(`/categories`);
