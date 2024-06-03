import {
  Controller,
  Post,
  Body,
  Inject,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateTransactionsRecurrentDto } from './dto/create-transactions-recurrent.dto';
import { CreateTransactionsRecurrentUseCase } from './use-cases/createTransactionRecurrent.UseCase';
import { FindAllTransactionRecurrentUseCase } from './use-cases/findAllTransactionRecurrent.UseCase';
import { DeleteTransactionRecurrentUseCase } from './use-cases/deleteTransactionRecurrent.UseCase';
import { FindAllTransactionRecurrentByWalletUseCase } from './use-cases/findAllTransactionByWalletRecurrent.UseCase';

@Controller('transactions-recurrents')
export class TransactionsRecurrentsController {
  @Inject(CreateTransactionsRecurrentUseCase)
  private readonly createTransactionUseCase: CreateTransactionsRecurrentUseCase;

  @Inject(FindAllTransactionRecurrentUseCase)
  private readonly findTransactionUseCase: FindAllTransactionRecurrentUseCase;

  @Inject(FindAllTransactionRecurrentByWalletUseCase)
  private readonly findTransactionByWallet: FindAllTransactionRecurrentByWalletUseCase;

  @Inject(DeleteTransactionRecurrentUseCase)
  private readonly deleteTransactionUseCase: DeleteTransactionRecurrentUseCase;

  @Post('create-transaction-recurrent')
  create(
    @Body() createTransactionsRecurrentDto: CreateTransactionsRecurrentDto,
  ) {
    return this.createTransactionUseCase.execute(
      createTransactionsRecurrentDto,
    );
  }

  @Get('find-all')
  findAll() {
    return this.findTransactionUseCase.execute();
  }

  @Get('find-all-by-wallet/:id')
  findAllByWallet(@Param('id') id: string) {
    return this.findTransactionByWallet.execute(id);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.deleteTransactionUseCase.execute(id);
  }
}
