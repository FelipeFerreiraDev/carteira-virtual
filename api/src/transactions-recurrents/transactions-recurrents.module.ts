import { Module } from '@nestjs/common';
import { TransactionsRecurrentsService } from './transactions-recurrents.service';
import { TransactionsRecurrentsController } from './transactions-recurrents.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigService } from '@nestjs/config';
import { CreateTransactionsRecurrentUseCase } from './use-cases/createTransactionRecurrent.UseCase';
import { FindAllTransactionRecurrentUseCase } from './use-cases/findAllTransactionRecurrent.UseCase';
import { TransactionsService } from 'src/transactions/transactions.service';
import { DeleteTransactionRecurrentUseCase } from './use-cases/deleteTransactionRecurrent.UseCase';
import { FindAllTransactionRecurrentByWalletUseCase } from './use-cases/findAllTransactionByWalletRecurrent.UseCase';

@Module({
  imports: [PrismaModule],
  controllers: [TransactionsRecurrentsController],
  providers: [
    TransactionsRecurrentsService,
    ConfigService,
    {
      provide: 'TransactionsRecurrentsService',
      useExisting: TransactionsRecurrentsService,
    },
    CreateTransactionsRecurrentUseCase,
    FindAllTransactionRecurrentUseCase,
    DeleteTransactionRecurrentUseCase,
    FindAllTransactionRecurrentByWalletUseCase,
    TransactionsService,
  ],
  exports: [TransactionsRecurrentsService],
})
export class TransactionsRecurrentsModule {}
