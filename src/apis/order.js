import { api } from "./axios";

export const getOrderDetailApi = async (id) =>
  api.get(`/orderDetails/?orderId=${id}&_expand=order`);

export const getOrdersByUserApi = async (id) => api.get(`/orders?userId=${id}`);

export const postOrderApi = async (data) => api.post("/orders", data);

export const postOrderDetailApi = async (data) =>
  api.post("/orderDetails", data);
