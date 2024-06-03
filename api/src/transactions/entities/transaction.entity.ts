import { Prisma } from '@prisma/client';

export class TransactionEntity implements Prisma.TransactionCreateInput {
  id: string;
  amount: number;
  type: string;
  observation: string;
  createdAt: Date;
  updatedAt: Date;
  walletId: string;
  wallet: any;
  categoryId: string;
  category: any;

  constructor(
    amount: number,
    type: string,
    observation: string,
    walletId: string,
    categoryId?: string,
  ) {
    this.amount = amount;
    this.type = type;
    this.observation = observation;
    this.walletId = walletId;
    this.categoryId = categoryId;
  }
}
