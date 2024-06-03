import { Prisma } from '@prisma/client';

export class TransactionRecurrentEntity
  implements Prisma.TransactionRecurrentCreateInput
{
  id?: string;
  amount: number;
  type: string;
  observation: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  nextDate: string | Date;
  lastDate: string | Date;
  active: boolean;
  dateFinish?: string | Date;
  wallet: Prisma.WalletCreateNestedOneWithoutTransactionRecurrentsInput;
  walletId: string;
  category: Prisma.CategoryCreateNestedOneWithoutTransactionRecurrentsInput;
  categoryId: string;

  constructor(
    amount: number,
    type: string,
    observation: string,
    walletId: string,
    categoryId?: string,
    dateFinish?: Date,
  ) {
    this.amount = amount;
    this.type = type;
    this.observation = observation;
    this.walletId = walletId;
    this.categoryId = categoryId;
    this.dateFinish = dateFinish;
  }
}
