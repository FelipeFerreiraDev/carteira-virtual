import { Inject, Injectable, Logger } from '@nestjs/common';
import { WalletEntity } from '../entities/wallet.entity';
import { WalletsService } from '../wallets.service';

@Injectable()
export class FindByIdWalletUseCase {
  private readonly logger = new Logger(FindByIdWalletUseCase.name);

  constructor(
    @Inject('WalletsService')
    private readonly walletsService: WalletsService,
  ) {}

  async execute(id: string): Promise<WalletEntity> {
    this.logger.log('FindByIdWalletUseCase.execute');
    console.log('id', id);
    return this.walletsService.findOne(id);
  }
}
