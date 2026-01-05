// src/context/WalletContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface WalletContextType {
  balance: number;
  transactions: any[];
  sendFunds: (amount: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [balance, setBalance] = useState(5000);
  const [transactions, setTransactions] = useState([{ id: 1, amount: 1000, status: 'Success' }]);

  const sendFunds = (amount: number) => {
    if (amount > balance) return alert("Low Balance!");
    setBalance(prev => prev - amount);
    setTransactions([{ id: Date.now(), amount, status: 'Success' }, ...transactions]);
  };

  return (
    <WalletContext.Provider value={{ balance, transactions, sendFunds }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext)!;