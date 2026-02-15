import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { TradeLog } from './components/TradeLog';
import { Capital } from './components/Capital';
import { Psychology } from './components/Psychology';
import { AppData, View, Trade, Transaction, PsychologyEntry } from './types';

const App: React.FC = () => {
  const [currentView, setView] = useState<View>('dashboard');
  const [isLoaded, setIsLoaded] = useState(false);

  // Application State
  const [trades, setTrades] = useState<Trade[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [psychology, setPsychology] = useState<PsychologyEntry[]>([]);
  const [startingBalance, setStartingBalance] = useState<number>(10000);

  // Load Data
  useEffect(() => {
    const savedData = localStorage.getItem('asareForexData');
    if (savedData) {
      const parsed: AppData = JSON.parse(savedData);
      setTrades(parsed.trades || []);
      setTransactions(parsed.transactions || []);
      setPsychology(parsed.psychology || []);
      setStartingBalance(parsed.startingBalance || 10000);
    }
    setIsLoaded(true);
  }, []);

  // Save Data
  useEffect(() => {
    if (isLoaded) {
      const data: AppData = {
        trades,
        transactions,
        psychology,
        startingBalance
      };
      localStorage.setItem('asareForexData', JSON.stringify(data));
    }
  }, [trades, transactions, psychology, startingBalance, isLoaded]);

  // Derived State
  const totalPnL = trades.reduce((acc, t) => acc + t.pnl, 0);
  const totalDeposits = transactions.filter(t => t.type === 'Deposit').reduce((acc, t) => acc + t.amount, 0);
  const totalWithdrawals = transactions.filter(t => t.type === 'Withdrawal').reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'Expense').reduce((acc, t) => acc + t.amount, 0);
  
  const currentBalance = startingBalance + totalDeposits - totalWithdrawals - totalExpenses + totalPnL;

  const appData: AppData = { trades, transactions, psychology, startingBalance };

  if (!isLoaded) return null;

  return (
    <Layout currentView={currentView} setView={setView}>
      {currentView === 'dashboard' && <Dashboard data={appData} currentBalance={currentBalance} />}
      {currentView === 'tradelog' && <TradeLog trades={trades} setTrades={setTrades} />}
      {currentView === 'capital' && (
        <Capital 
          startingBalance={startingBalance} 
          setStartingBalance={setStartingBalance}
          transactions={transactions}
          setTransactions={setTransactions}
          currentBalance={currentBalance}
        />
      )}
      {currentView === 'psychology' && <Psychology entries={psychology} setEntries={setPsychology} />}
    </Layout>
  );
};

export default App;