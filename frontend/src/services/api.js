import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  getProducts: () => api.get('/products'),
  getProductById: (id) => api.get(`/products/${id}`),
};

export const orderService = {
  createOrder: (orderData) => api.post('/create-order', orderData),
  getOrders: () => api.get('/orders'),
  getOrderStatus: (orderId) => api.get(`/order-status/${orderId}`),
};

export default api;
