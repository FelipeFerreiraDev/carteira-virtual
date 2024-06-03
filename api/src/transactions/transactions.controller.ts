import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CreateTransactionUseCase } from './use-cases/createTransaction.UseCase';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionEntity } from './entities/transaction.entity';
import { FindAllTransactionUseCase } from './use-cases/findAllTransaction.UseCase';
import { DeleteTransactionUseCase } from './use-cases/deleteTransaction.UseCase';
import { TransactionsService } from './transactions.service';
import { join } from 'path';
import { Response } from 'express';
import * as fs from 'fs';

interface IDateSearchProps {
  dateStart: Date;
  dateEnd: Date;
}

@Controller('transactions')
export class TransactionsController {
  constructor(
    @Inject('TransactionsService')
    private readonly transactionsService: TransactionsService,
  ) {}

  @Inject(CreateTransactionUseCase)
  private readonly createTransactionUseCase: CreateTransactionUseCase;

  @Inject(FindAllTransactionUseCase)
  private readonly findAllTransactionUseCase: FindAllTransactionUseCase;

  @Inject(DeleteTransactionUseCase)
  private readonly deleteTransactionUseCase: DeleteTransactionUseCase;

  @Post('create-transaction')
  create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionEntity> {
    return this.createTransactionUseCase.execute(createTransactionDto);
  }

  @Get('find-all/:id')
  findAll(@Param('id') id: string) {
    return this.findAllTransactionUseCase.execute(id);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.deleteTransactionUseCase.execute(id);
  }

  @Get('export/:id')
  async exportTransactions(
    @Param('id') id: string,
    @Res() res: Response,
    @Query() data: IDateSearchProps,
  ) {
    const fileName = await this.transactionsService.exportTransactionsToCSV(
      id,
      new Date(data.dateStart),
      new Date(data.dateEnd),
    );
    const filePath = join(__dirname, '../../exports', fileName);

    res.download(filePath, (err) => {
      if (err) {
        res.status(500).send('Could not download the file.');
      } else {
        fs.unlinkSync(filePath);
      }
    });
  }
}
