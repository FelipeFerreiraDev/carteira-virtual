import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Inject,
  Body,
} from '@nestjs/common';
import { CreateCategoryUseCase } from './use-cases/createCategory.UseCase';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { DeleteByIdCategoryUseCase } from './use-cases/deleteByIdCategory.UseCase';
import { FindAllCategoryUseCase } from './use-cases/findAllCategory.UseCase';
import { UpdateCategoryUseCase } from './use-cases/updateCategory.UseCase';

@Controller('categories')
export class CategoriesController {
  @Inject(CreateCategoryUseCase)
  private readonly createCategoryUseCase: CreateCategoryUseCase;

  @Inject(DeleteByIdCategoryUseCase)
  private readonly deleteCategoryUseCase: DeleteByIdCategoryUseCase;

  @Inject(UpdateCategoryUseCase)
  private readonly updateCategoryUseCase: UpdateCategoryUseCase;

  @Inject(FindAllCategoryUseCase)
  private readonly findAllCategoryUseCase: FindAllCategoryUseCase;

  @Post('create-category')
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.createCategoryUseCase.execute(createCategoryDto);
  }

  @Get('find-all')
  findAll() {
    return this.findAllCategoryUseCase.execute();
  }

  @Patch('update-by-id/:id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: CreateCategoryDto,
  ) {
    return this.updateCategoryUseCase.execute(id, updateCategoryDto);
  }

  @Delete('delete-by-id/:id')
  remove(@Param('id') id: string) {
    return this.deleteCategoryUseCase.execute(id);
  }
}
