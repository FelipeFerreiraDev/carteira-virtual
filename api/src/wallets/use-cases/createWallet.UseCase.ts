import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateWalletDto } from '../dto/create-wallet.dto';
import { WalletEntity } from '../entities/wallet.entity';
import { WalletsService } from '../wallets.service';

@Injectable()
export class CreateWalletUseCase {
  private readonly logger = new Logger(CreateWalletUseCase.name);

  constructor(
    @Inject('WalletsService')
    private readonly walletsService: WalletsService,
  ) {}

  async execute(wallet: CreateWalletDto): Promise<WalletEntity> {
    this.logger.log('CreateWalletUseCase.execute');

    const walletEntity = new WalletEntity(wallet.name, wallet.balance);

    return this.walletsService.create(walletEntity);
  }
}
