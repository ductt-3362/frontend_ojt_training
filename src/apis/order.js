import { api } from "./axios";

export const getOrderDetailApi = async (id) =>
  api.get(`/orderDetails/?orderId=${id}&_expand=order`);

export const getOrdersByUserApi = async (id) => api.get(`/orders?userId=${id}`);
