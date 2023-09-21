import { api } from "./axios";

export const registerApi = (param) => api.post("/users", param);
export const loginApi = (param) => api.post("/login", param);
