import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size?: 'regular'|'medium'|'large') => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, amount: number) => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Calculate total whenever cart changes
  const total = cart.reduce((acc, item) => acc + (item.finalPrice * item.quantity), 0);
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (product: Product, size?: 'regular'|'medium'|'large') => {
    // Determine price based on size
    let finalPrice = product.price;
    if (size && product.prices) {
      finalPrice = product.prices[size];
    }

    // Check if item with same ID and size exists
    const existingItemIndex = cart.findIndex(
      (item) => item.id === product.id && item.selectedSize === size
    );

    if (existingItemIndex > -1) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += 1;
      setCart(newCart);
    } else {
      const newItem: CartItem = {
        ...product,
        cartId: Math.random().toString(36).substr(2, 9),
        quantity: 1,
        selectedSize: size,
        finalPrice: finalPrice
      };
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (cartId: string) => {
    setCart(cart.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, amount: number) => {
    setCart(cart.map((item) => {
      if (item.cartId === cartId) {
        const newQuantity = item.quantity + amount;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};