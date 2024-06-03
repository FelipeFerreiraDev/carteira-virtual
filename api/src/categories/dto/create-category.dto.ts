import { IsString, IsDate } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsDate()
  readonly createdAt: Date;

  @IsDate()
  readonly updatedAt: Date;
}
