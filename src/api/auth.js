import { api } from "./axios";

export const registerApi = async (param) => api.post("/users", param);
export const loginApi = async (param) => api.post("/login", param);
