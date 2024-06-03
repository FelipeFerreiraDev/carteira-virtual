export interface ITransactionProps {
  id: string;
  amount: number;
  type: string;
  observation: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  walletId: string;
  wallet: {
    id: string;
    name: string;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
  };
  category: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface ICategoryProps {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWalletProps {
  id: string;
  name: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransactionRecurrentProps {
  id: string;
  amount: number;
  type: string;
  observation: string;
  createdAt: Date;
  updatedAt: Date;
  walletId: string;
  categoryId: string;
  nextDate: Date;
  lastDate: Date;
  active: boolean;
  dateFinish: Date;
  wallet: {
    id: string;
    name: string;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
  },
  category: {
    id: string;
    name: String;
    createdAt: Date;
    updatedAt: Date;
  }
}