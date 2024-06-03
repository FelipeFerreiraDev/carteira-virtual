import { Inject, Injectable, Logger } from '@nestjs/common';
import { TransactionsRecurrentsService } from '../transactions-recurrents.service';

@Injectable()
export class DeleteTransactionRecurrentUseCase {
  private readonly logger = new Logger(DeleteTransactionRecurrentUseCase.name);

  constructor(
    @Inject('TransactionsRecurrentsService')
    private readonly transactionRecurrentService: TransactionsRecurrentsService,
  ) {}

  async execute(id: string) {
    this.logger.log('DeleteTransactionRecurrentUseCase.execute');
    return this.transactionRecurrentService.delete(id);
  }
}
