import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateTransactionsRecurrentDto } from '../dto/create-transactions-recurrent.dto';
import { TransactionRecurrentEntity } from '../entities/transactions-recurrent.entity';
import { TransactionsRecurrentsService } from '../transactions-recurrents.service';

@Injectable()
export class CreateTransactionsRecurrentUseCase {
  private readonly logger = new Logger(CreateTransactionsRecurrentUseCase.name);

  constructor(
    @Inject('TransactionsRecurrentsService')
    private readonly transactionRecurrentService: TransactionsRecurrentsService,
  ) {}

  async execute(
    transaction: CreateTransactionsRecurrentDto,
  ): Promise<TransactionRecurrentEntity> {
    this.logger.log('CreateTransactionsRecurrent.execute');

    const recurrentEntity = new TransactionRecurrentEntity(
      transaction.amount,
      transaction.type,
      transaction.observation,
      transaction.walletId,
      transaction.categoryId,
      transaction.dateFinish,
    );

    return this.transactionRecurrentService.create(recurrentEntity);
  }
}
