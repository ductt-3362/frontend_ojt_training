import { api } from "./axios";

export const getBannersApi = () => api.get("/banners");
