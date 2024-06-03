import { Inject, Injectable, Logger } from '@nestjs/common';
import { TransactionsService } from '../transactions.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionEntity } from '../entities/transaction.entity';

@Injectable()
export class CreateTransactionUseCase {
  private readonly logger = new Logger(CreateTransactionUseCase.name);

  constructor(
    @Inject('TransactionsService')
    private readonly transactionsService: TransactionsService,
  ) {}

  async execute(transaction: CreateTransactionDto): Promise<TransactionEntity> {
    this.logger.log('CreateTransactiontUseCase.execute');

    const walletEntity = new TransactionEntity(
      transaction.amount,
      transaction.type,
      transaction.observation,
      transaction.walletId,
      transaction.categoryId,
    );

    return this.transactionsService.create(walletEntity);
  }
}
