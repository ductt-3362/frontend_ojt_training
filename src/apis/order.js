import { api } from "./axios";

export const getOrderDetailApi = async (orderId) =>
  api.get(`/orderDetails`, {
    params: { orderId, _expand: "order" },
  });

export const getOrdersByUserApi = async (userId) =>
  api.get(`/orders`, { params: { userId } });

export const postOrderApi = async (data) => api.post("/orders", data);

export const postOrderDetailApi = async (data) =>
  api.post("/orderDetails", data);
