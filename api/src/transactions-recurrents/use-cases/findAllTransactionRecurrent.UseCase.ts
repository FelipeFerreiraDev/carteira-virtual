import { Inject, Injectable, Logger } from '@nestjs/common';
import { TransactionsRecurrentsService } from '../transactions-recurrents.service';

@Injectable()
export class FindAllTransactionRecurrentUseCase {
  private readonly logger = new Logger(FindAllTransactionRecurrentUseCase.name);

  constructor(
    @Inject('TransactionsRecurrentsService')
    private readonly transactionsService: TransactionsRecurrentsService,
  ) {}

  async execute(): Promise<any> {
    return this.transactionsService.findAll();
  }
}
