import { Inject, Injectable, Logger } from '@nestjs/common';
import { WalletsService } from '../wallets.service';

@Injectable()
export class DeleteByIdWalletUseCase {
  private readonly logger = new Logger(DeleteByIdWalletUseCase.name);

  constructor(
    @Inject('WalletsService')
    private readonly walletsService: WalletsService,
  ) {}

  async execute(id: string) {
    this.logger.log('DeleteByIdWalletUseCase.execute');
    console.log('id', id);
    return this.walletsService.remove(id);
  }
}
