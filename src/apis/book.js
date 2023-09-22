import { api } from "./axios";

export const getBooksByCategoryApi = (categoryId, params) =>
  api.get(`/categories/${categoryId}/books`, {
    params,
  });

export const getDetailBookApi = (id) =>
  api.get(`/books/${id}?_expand=category`);
