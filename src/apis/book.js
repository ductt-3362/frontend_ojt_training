import { api } from "./axios";

export const getBooksByCategoryApi = (categoryId, params) =>
  api.get(`/categories/${categoryId}/books`, {
    params,
  });

export const getDetailBookApi = (slug) =>
  api.get(`/books/?slug=${slug}&_expand=category&_expand=author`);

export const getBooksByKeywordApi = (keyword, params) =>
  api.get(`/books?q=${keyword}`, {
    params,
  });

export const getBooksByAuthorApi = (authorId, params) =>
  api.get(`/authors/${authorId}/books`, {
    params,
  });
