import { IsString, IsNumber, IsDate, IsArray, IsEmpty } from 'class-validator';
import { CreateTransactionDto } from 'src/transactions/dto/create-transaction.dto';

export class CreateWalletDto {
  @IsEmpty()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  balance: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsArray()
  transactions: CreateTransactionDto[];
}
