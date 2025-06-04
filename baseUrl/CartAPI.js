import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/cart';

export const getCartByUser = (userId) =>
  axios.get(`${API_BASE}/getCartByUser/${userId}`);

export const getAllCartItems = (userId) =>
  axios.get(`${API_BASE}/${userId}/items`);

export const addItemToCart = (userId, item) =>
  axios.post(`${API_BASE}/${userId}/items`, item);

export const updateItemQuantity = (userId, itemId, quantity) =>
  axios.put(`${API_BASE}/${userId}/items/${itemId}?quantity=${quantity}`);

export const removeItemFromCart = (userId, itemId) =>
  axios.delete(`${API_BASE}/${userId}/items/${itemId}`);

export const clearCart = (userId) =>
  axios.delete(`${API_BASE}/${userId}/clear`);
