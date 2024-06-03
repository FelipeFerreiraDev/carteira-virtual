import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionEntity } from './entities/transaction.entity';
import { ITransactionRepository } from './repositories/transactionRepository';
import { createObjectCsvWriter } from 'csv-writer';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class TransactionsService implements ITransactionRepository {
  constructor(private prisma: PrismaService) {}

  async create(transaction: TransactionEntity): Promise<TransactionEntity> {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.transaction.create({
          data: {
            amount: transaction.amount,
            type: transaction.type,
            observation: transaction.observation,
            wallet: {
              connect: {
                id: transaction.walletId,
              },
            },
            category: {
              connect: {
                id: transaction.categoryId,
              },
            },
          },
        });
        await prisma.wallet.update({
          where: {
            id: transaction.walletId,
          },
          data: {
            balance: {
              increment:
                transaction.type === 'expense'
                  ? -transaction.amount
                  : transaction.amount,
            },
          },
        });
      });
    } catch (error) {
      console.error(error);
    }

    return transaction;
  }

  async findAll(id: string): Promise<TransactionEntity[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        walletId: id,
      },
      include: {
        wallet: true,
        category: true,
      },
    });

    return transactions;
  }

  async delete(id: string) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        const transaction = await prisma.transaction.findUnique({
          where: {
            id,
          },
        });

        await prisma.wallet.update({
          where: {
            id: transaction.walletId,
          },
          data: {
            balance: {
              increment:
                transaction.type === 'expense'
                  ? transaction.amount
                  : -transaction.amount,
            },
          },
        });

        await prisma.transaction.delete({
          where: {
            id,
          },
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  async exportTransactionsToCSV(
    id: string,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<string> {
    console.log('Exporting transactions to CSV...');
    console.log('Date start:', dateStart);
    console.log('Date end:', dateEnd);
    const transactions = await this.prisma.transaction.findMany({
      where: {
        walletId: id,
        createdAt: {
          gte: dateStart,
          lte: dateEnd,
        },
      },
      include: {
        wallet: true,
        category: true,
      },
    });

    const exportPath = path.join(__dirname, '../../exports');
    if (!fs.existsSync(exportPath)) {
      fs.mkdirSync(exportPath);
    }

    const filePath = path.join(exportPath, 'transactions.csv');

    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: [
        { id: 'id', title: 'ID' },
        { id: 'amount', title: 'Amount' },
        { id: 'type', title: 'Type' },
        { id: 'observation', title: 'Observation' },
        { id: 'createdAt', title: 'Created At' },
        { id: 'updatedAt', title: 'Updated At' },
        { id: 'walletId', title: 'Wallet ID' },
        { id: 'walletName', title: 'Wallet Name' },
        { id: 'categoryId', title: 'Category ID' },
        { id: 'categoryName', title: 'Category Name' },
      ],
    });

    const records = transactions.map((transaction) => ({
      id: transaction.id,
      amount: transaction.amount,
      type: transaction.type,
      observation: transaction.observation,
      createdAt: transaction.createdAt.toISOString(),
      updatedAt: transaction.updatedAt.toISOString(),
      walletId: transaction.wallet.id,
      walletName: transaction.wallet.name,
      categoryId: transaction.category.id,
      categoryName: transaction.category.name,
    }));

    await csvWriter.writeRecords(records);

    return 'transactions.csv';
  }
}
