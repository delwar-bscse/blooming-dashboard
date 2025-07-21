"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

type PriceContextType = {
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
};

const PriceContext = createContext<PriceContextType | undefined>(undefined);

export const PriceProvider = ({ children }: { children: ReactNode }) => {
  const [price, setPrice] = useState<number>(0);

  return (
    <PriceContext.Provider value={{ price, setPrice }}>
      {children}
    </PriceContext.Provider>
  );
};

export const usePrice = () => {
  const context = useContext(PriceContext);
  if (!context) {
    throw new Error('usePrice must be used within a PriceProvider');
  }
  return context;
};