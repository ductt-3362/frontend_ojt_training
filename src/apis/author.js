import { api } from "./axios";

export const getAuthorBySlugApi = (slug) => api.get(`/authors?slug=${slug}`);
