import { api } from "./axios";

export const registerApi = async (param) => api.post("/users", param);
