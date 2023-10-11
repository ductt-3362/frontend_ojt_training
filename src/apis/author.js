import { api } from "./axios";

export const getAuthorBySlugApi = (slug) => api.get(`/Authors?slug=${slug}`);
