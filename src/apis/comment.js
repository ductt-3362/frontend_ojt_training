import { api } from "./axios";
export const getCommentApi = async (bookId, params) =>
  api.get(`/comments/?bookId=${bookId}&_expand=user&_expand=book`, {
    params,
  });
export const postCommentApi = async (params) => api.post(`/comments`, params);
export const putCommentApi = async (id, params) =>
  api.put(`/comments/${id}`, params);
