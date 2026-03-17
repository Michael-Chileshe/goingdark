// ============================================================
// Kwacha Capital - Type Definitions
// ============================================================

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: "client" | "admin";
  balance: number;
  totalInvested: number;
  totalReturns: number;
  joinedAt: string;
  kycVerified: boolean;
}

export interface Position {
  id: string;
  ticker: string;
  company: string;
  strategy: StrategyType;
  entryPrice: number;
  currentPrice: number;
  shares: number;
  entryDate: string;
  exitDate?: string;
  pnl: number;
  pnlPercent: number;
  status: "open" | "closed";
  reasoning: string;
  sector: string;
}

export type StrategyType =
  | "value-investing"
  | "dividend-yield"
  | "momentum"
  | "mean-reversion"
  | "risk-parity";

export interface Strategy {
  id: StrategyType;
  name: string;
  description: string;
  allocation: number; // percentage
  riskLevel: "low" | "medium" | "medium-low";
  targetReturn: number;
  active: boolean;
  positions: number;
  pnl: number;
}

export interface Fund {
  id: string;
  name: string;
  totalAum: number; // Assets Under Management
  totalInvestors: number;
  monthlyReturn: number;
  ytdReturn: number;
  allTimeReturn: number;
  inflows: number;
  outflows: number;
  netFlow: number;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: "deposit" | "withdrawal";
  amount: number;
  currency: "ZMW" | "USD" | "USDT" | "BTC";
  method: "bank" | "mobile-money" | "crypto";
  status: "pending" | "completed" | "failed";
  date: string;
  reference: string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalInvested: number;
  totalReturns: number;
  returnPercent: number;
  monthlyReturn: number;
  positions: number;
}

export interface PerformancePoint {
  date: string;
  value: number;
  benchmark: number;
}

export interface AdminDashboard {
  totalAum: number;
  totalInvestors: number;
  monthlyReturn: number;
  ytdReturn: number;
  totalInflows: number;
  totalOutflows: number;
  netFlow: number;
  activePositions: number;
  winRate: number;
}

export interface PaymentMethod {
  id: string;
  type: "bank" | "mobile-money" | "crypto";
  name: string;
  details: string;
  icon: string;
}
