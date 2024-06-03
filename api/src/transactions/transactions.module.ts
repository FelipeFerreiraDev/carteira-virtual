import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigService } from '@nestjs/config';
import { CreateTransactionUseCase } from './use-cases/createTransaction.UseCase';
import { FindAllTransactionUseCase } from './use-cases/findAllTransaction.UseCase';
import { DeleteTransactionUseCase } from './use-cases/deleteTransaction.UseCase';

@Module({
  imports: [PrismaModule],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    ConfigService,
    {
      provide: 'TransactionsService',
      useExisting: TransactionsService,
    },
    CreateTransactionUseCase,
    FindAllTransactionUseCase,
    DeleteTransactionUseCase,
  ],
  exports: [TransactionsService],
})
export class TransactionsModule {}
