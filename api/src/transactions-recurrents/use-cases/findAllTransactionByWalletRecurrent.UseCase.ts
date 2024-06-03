import { Inject, Injectable, Logger } from '@nestjs/common';
import { TransactionsRecurrentsService } from '../transactions-recurrents.service';

@Injectable()
export class FindAllTransactionRecurrentByWalletUseCase {
  private readonly logger = new Logger(
    FindAllTransactionRecurrentByWalletUseCase.name,
  );

  constructor(
    @Inject('TransactionsRecurrentsService')
    private readonly transactionsService: TransactionsRecurrentsService,
  ) {}

  async execute(id: string): Promise<any> {
    this.logger.log('FindAllTransactionRecurrentByWalletUseCase.execute');
    return this.transactionsService.findAllByWallet(id);
  }
}
