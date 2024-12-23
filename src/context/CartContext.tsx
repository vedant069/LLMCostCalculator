import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LLMCartItem {
  type: 'llm';
  provider: string;
  model: string;
  version: string;
  cost: number;
  inputTokens: number;
  outputTokens: number;
}

interface SpeechToTextCartItem {
  type: 'speech-to-text';
  provider: string;
  model: string;
  duration: number;
  cost: number;
}

interface ObjectStorageCartItem {
  type: 'object-storage';
  provider: string;
  storageTier: string;
  storageAmount: number;
  transferAmount: number;
  cost: number;
}

type CartItem = LLMCartItem | SpeechToTextCartItem | ObjectStorageCartItem;

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setItems([...items, item]);
  };

  const removeFromCart = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.cost, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
