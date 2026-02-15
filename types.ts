export type View = 'dashboard' | 'tradelog' | 'capital' | 'psychology';

export interface Trade {
  id: string;
  date: string;
  pair: string;
  type: 'Buy' | 'Sell';
  lotSize: number;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'Deposit' | 'Withdrawal' | 'Expense';
  amount: number;
  note: string;
}

export interface PsychologyEntry {
  id: string;
  date: string;
  emotionBefore: string;
  emotionAfter: string;
  discipline: boolean;
  notes: string;
}

export interface AppData {
  trades: Trade[];
  transactions: Transaction[];
  psychology: PsychologyEntry[];
  startingBalance: number;
}