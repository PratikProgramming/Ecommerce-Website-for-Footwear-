import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (modelNo) => {
    setCartItems((prev) => prev.filter(item => item.modelNo !== modelNo));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
