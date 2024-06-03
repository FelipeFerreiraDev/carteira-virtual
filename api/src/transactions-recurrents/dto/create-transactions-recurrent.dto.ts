import {
  IsString,
  IsNumber,
  IsDate,
  ValidateNested,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateWalletDto } from 'src/wallets/dto/create-wallet.dto';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';

export class CreateTransactionsRecurrentDto {
  @IsString()
  readonly id: string;

  @IsNumber()
  readonly amount: number;

  @IsString()
  readonly type: string;

  @IsString()
  readonly observation: string;

  @IsDate()
  readonly createdAt: Date;

  @IsDate()
  readonly updatedAt: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateWalletDto)
  readonly wallet: CreateWalletDto;

  @IsOptional()
  readonly walletId: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateCategoryDto)
  readonly category: CreateCategoryDto;

  @IsOptional()
  readonly categoryId: string;

  @IsDate()
  @IsOptional()
  readonly nextDate: Date;

  @IsDate()
  @IsOptional()
  readonly lastDate: Date;

  @IsBoolean()
  @IsOptional()
  readonly active: boolean;

  @IsDate()
  readonly dateFinish: Date;
}
