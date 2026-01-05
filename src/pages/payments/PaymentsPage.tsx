import React from 'react';
import { useWallet } from '../../context/WalletContext';
import { Wallet, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const PaymentsPage: React.FC = () => {
  const { balance, transactions } = useWallet();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Finance Hub</h1>
      
      {/* Wallet Card */}
      <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-xl mb-8 flex justify-between items-center">
        <div>
          <p className="text-indigo-100 mb-1">Available Balance</p>
          <h2 className="text-5xl font-extrabold">${balance.toLocaleString()}</h2>
        </div>
        <Wallet size={60} className="opacity-20" />
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b font-bold text-gray-700">Recent Transactions</div>
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-500 text-sm">
            <tr>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id} className="border-b hover:bg-gray-50">
                <td className="p-4 flex items-center gap-2">
                  {tx.type === 'deposit' ? <ArrowDownLeft className="text-green-500" /> : <ArrowUpRight className="text-red-500" />}
                  <span className="capitalize">{tx.type}</span>
                </td>
                <td className="p-4 font-semibold">${tx.amount}</td>
                <td className="p-4 text-gray-500">{tx.date}</td>
                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsPage;