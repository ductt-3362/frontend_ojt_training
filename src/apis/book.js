import { api } from "./axios";

export const getBooksByCategoryApi = (categoryId, params) =>
  api.get(`/categories/${categoryId}/books`, {
    params: { _expand: "author", ...params },
  });

export const getDetailBookApi = (slug) =>
  api.get(`/books/`, {
    params: { slug, _expand: ["category", "author"] },
  });

export const getBooksByKeywordApi = (keyword, params) =>
  api.get(`/books`, {
    params: { _expand: "author", q: keyword, ...params },
  });

export const getBooksByAuthorApi = (authorId, params) =>
  api.get(`/authors/${authorId}/books`, {
    params: { _expand: "author", ...params },
  });
