import { Prisma } from '@prisma/client';

export class WalletEntity implements Prisma.WalletCreateInput {
  id: string;

  name: string;

  balance: number;

  createdAt: Date;

  updatedAt: Date;

  transactions?: Prisma.TransactionCreateNestedManyWithoutWalletInput;

  constructor(name: string, balance: number) {
    this.name = name;
    this.balance = balance;
  }
}
