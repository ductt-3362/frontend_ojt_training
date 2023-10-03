import { api } from "./axios";

export const updateUserApi = (id, data) => api.put(`/users/${id}`, data);
