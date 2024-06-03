import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateWalletDto } from '../dto/create-wallet.dto';
import { IWalletUpdate, WalletsService } from '../wallets.service';

@Injectable()
export class UpdateWalletUseCase {
  private readonly logger = new Logger(UpdateWalletUseCase.name);

  constructor(
    @Inject('WalletsService')
    private readonly walletsService: WalletsService,
  ) {}

  async execute(id: string, wallet: CreateWalletDto): Promise<IWalletUpdate> {
    this.logger.log('UpdateWalletUseCase.execute');

    return this.walletsService.update(id, wallet);
  }
}
