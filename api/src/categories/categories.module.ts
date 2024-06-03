import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateCategoryUseCase } from './use-cases/createCategory.UseCase';
import { DeleteByIdCategoryUseCase } from './use-cases/deleteByIdCategory.UseCase';
import { FindAllCategoryUseCase } from './use-cases/findAllCategory.UseCase';
import { UpdateCategoryUseCase } from './use-cases/updateCategory.UseCase';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    ConfigService,
    {
      provide: 'CategoriesService',
      useExisting: CategoriesService,
    },
    CreateCategoryUseCase,
    DeleteByIdCategoryUseCase,
    FindAllCategoryUseCase,
    UpdateCategoryUseCase,
  ],
})
export class CategoriesModule {}
