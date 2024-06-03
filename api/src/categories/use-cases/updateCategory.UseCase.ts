import { Inject, Injectable, Logger } from '@nestjs/common';
import { CategoriesService, ICategoryUpdate } from '../categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class UpdateCategoryUseCase {
  private readonly logger = new Logger(UpdateCategoryUseCase.name);

  constructor(
    @Inject('CategoriesService')
    private readonly categoriesService: CategoriesService,
  ) {}

  async execute(
    id: string,
    category: CreateCategoryDto,
  ): Promise<ICategoryUpdate> {
    this.logger.log('UpdateWalletUseCase.execute');

    return this.categoriesService.update(id, category);
  }
}
