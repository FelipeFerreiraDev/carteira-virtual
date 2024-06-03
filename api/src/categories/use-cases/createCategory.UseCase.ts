import { Inject, Injectable, Logger } from '@nestjs/common';
import { CategoriesService } from '../categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CreateCategoryUseCase {
  private readonly logger = new Logger(CreateCategoryUseCase.name);

  constructor(
    @Inject('CategoriesService')
    private readonly categoriesService: CategoriesService,
  ) {}

  async execute(category: CreateCategoryDto): Promise<CategoryEntity> {
    this.logger.log('CreateCategoryUseCase.execute');

    const categoryEntity = new CategoryEntity(category.name);

    return this.categoriesService.create(categoryEntity);
  }
}
