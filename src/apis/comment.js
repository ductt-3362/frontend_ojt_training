import { api } from "./axios";

export const getCommentsApi = async (bookId, params) =>
  api.get(`/comments`, {
    params: { bookId, _expand: ["user", "book"], ...params },
  });

export const postCommentApi = async (params) => api.post(`/comments`, params);

export const putCommentApi = async (id, params) =>
  api.put(`/comments/${id}`, params);
