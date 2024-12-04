import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItemToCart = (price) => {
    setTotalItems((prevItems) => prevItems + 1);
    setTotalPrice((prevPrice) => prevPrice + price);
  };

  return (
    <CartContext.Provider value={{ totalItems, totalPrice, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};
