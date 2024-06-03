import { Inject, Injectable, Logger } from '@nestjs/common';
import { TransactionsService } from '../transactions.service';

@Injectable()
export class DeleteTransactionUseCase {
  private readonly logger = new Logger(DeleteTransactionUseCase.name);

  constructor(
    @Inject('TransactionsService')
    private readonly transactionsService: TransactionsService,
  ) {}

  async execute(id: string) {
    this.logger.log('DeleteTransactionUseCase.execute');
    console.log('id', id);
    return this.transactionsService.delete(id);
  }
}
