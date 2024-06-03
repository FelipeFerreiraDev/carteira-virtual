import {
  Controller,
  Post,
  Body,
  Inject,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { CreateWalletUseCase } from './use-cases/createWallet.UseCase';
import { WalletEntity } from './entities/wallet.entity';
import { FindAllWalletUseCase } from './use-cases/findAllWallet.UseCase';
import { FindByIdWalletUseCase } from './use-cases/findByIdWallet.UseCase';
import { DeleteByIdWalletUseCase } from './use-cases/deleteByIdWallet.UseCase';
import { UpdateWalletUseCase } from './use-cases/updateWallet.UseCase';

@Controller('wallets')
export class WalletsController {
  @Inject(CreateWalletUseCase)
  private readonly createWalletUseCase: CreateWalletUseCase;

  @Inject(FindAllWalletUseCase)
  private readonly findAllWalletUseCase: FindAllWalletUseCase;

  @Inject(FindByIdWalletUseCase)
  private readonly findByIdWalletUseCase: FindByIdWalletUseCase;

  @Inject(DeleteByIdWalletUseCase)
  private readonly deleteByIdWalletUseCase: DeleteByIdWalletUseCase;

  @Inject(UpdateWalletUseCase)
  private readonly updateByIdWalletUseCase: UpdateWalletUseCase;

  @Post('create-wallet')
  create(@Body() createWalletDto: CreateWalletDto): Promise<WalletEntity> {
    return this.createWalletUseCase.execute(createWalletDto);
  }

  @Get('find-all-wallets')
  findAll() {
    return this.findAllWalletUseCase.execute();
  }

  @Get('find-by-id/:id')
  findOne(@Param('id') id: string) {
    console.log('id', id);
    return this.findByIdWalletUseCase.execute(id);
  }

  @Patch('update-by-id/:id')
  update(@Param('id') id: string, @Body() updateWalletDto: CreateWalletDto) {
    return this.updateByIdWalletUseCase.execute(id, updateWalletDto);
  }

  @Delete('delete-by-id/:id')
  remove(@Param('id') id: string) {
    return this.deleteByIdWalletUseCase.execute(id);
  }
}
