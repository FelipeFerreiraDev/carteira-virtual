import { Inject, Injectable, Logger } from '@nestjs/common';
import { WalletEntity } from '../entities/wallet.entity';
import { WalletsService } from '../wallets.service';

@Injectable()
export class FindAllWalletUseCase {
  private readonly logger = new Logger(FindAllWalletUseCase.name);

  constructor(
    @Inject('WalletsService')
    private readonly walletsService: WalletsService,
  ) {}

  async execute(): Promise<WalletEntity[]> {
    this.logger.log('FindAllWalletUseCase.execute');
    return this.walletsService.findAll();
  }
}
