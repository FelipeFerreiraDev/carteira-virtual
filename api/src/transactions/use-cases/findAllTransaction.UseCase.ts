import { Inject, Injectable, Logger } from '@nestjs/common';
import { TransactionsService } from '../transactions.service';

@Injectable()
export class FindAllTransactionUseCase {
  private readonly logger = new Logger(FindAllTransactionUseCase.name);

  constructor(
    @Inject('TransactionsService')
    private readonly transactionsService: TransactionsService,
  ) {}

  async execute(id: string): Promise<any> {
    this.logger.log('FindAllTransactiontUseCase.execute');

    return this.transactionsService.findAll(id);
  }
}
