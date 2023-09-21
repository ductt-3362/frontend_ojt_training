import { api } from "./axios";

export const getSortProductApi = (sort, order) =>
  api.get(`/books/?_sort=${sort}&_order=${order}`);
