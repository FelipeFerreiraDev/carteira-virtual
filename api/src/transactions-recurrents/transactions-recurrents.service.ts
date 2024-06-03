import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ITransactionRecurrentRepository } from './repositories/transactions-recurrentsRepository';
import { TransactionRecurrentEntity } from './entities/transactions-recurrent.entity';

@Injectable()
export class TransactionsRecurrentsService
  implements ITransactionRecurrentRepository
{
  constructor(private prisma: PrismaService) {}
  async create(
    transaction: TransactionRecurrentEntity,
  ): Promise<TransactionRecurrentEntity> {
    // a data atual + 1 dia
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    const dateFinish = new Date(transaction.dateFinish);
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.transactionRecurrent.create({
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
            nextDate: nextDate,
            dateFinish: dateFinish,
            active: true,
            lastDate: new Date(),
          },
        });
      });
    } catch (error) {
      console.error(error);
    }

    return transaction;
  }

  async findAllByWallet(id: string) {
    const transactions = await this.prisma.transactionRecurrent.findMany({
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

  async findAll() {
    const transactions = await this.prisma.transactionRecurrent.findMany({
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
        await prisma.transactionRecurrent.delete({
          where: {
            id: id,
          },
        });
      });
    } catch (error) {
      console.error(error);
    }
  }
}
