import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigService } from '@nestjs/config';
import { WalletsService } from './wallets.service';
import { CreateWalletUseCase } from './use-cases/createWallet.UseCase';
import { FindAllWalletUseCase } from './use-cases/findAllWallet.UseCase';
import { FindByIdWalletUseCase } from './use-cases/findByIdWallet.UseCase';
import { DeleteByIdWalletUseCase } from './use-cases/deleteByIdWallet.UseCase';
import { UpdateWalletUseCase } from './use-cases/updateWallet.UseCase';

@Module({
  imports: [PrismaModule],
  controllers: [WalletsController],
  providers: [
    WalletsService,
    ConfigService,
    {
      provide: 'WalletsService',
      useExisting: WalletsService,
    },
    CreateWalletUseCase,
    FindAllWalletUseCase,
    FindByIdWalletUseCase,
    DeleteByIdWalletUseCase,
    UpdateWalletUseCase,
  ],
})
export class WalletsModule {}
