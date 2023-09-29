import { api } from "./axios";

export const getBooksByCategoryApi = (categoryId, params) =>
	api.get(`/categories/${categoryId}/books`, {
		params,
	});

export const getDetailBookApi = (slug) =>
	api.get(`/books/?slug=${slug}&_expand=category`);

export const getBooksByKeywordApi = (keyword, params) =>
	api.get(`/books?q=${keyword}`, {
		params,
	});
