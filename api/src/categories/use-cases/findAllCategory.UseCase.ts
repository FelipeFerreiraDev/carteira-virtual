import { Inject, Injectable, Logger } from '@nestjs/common';
import { CategoriesService } from '../categories.service';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class FindAllCategoryUseCase {
  private readonly logger = new Logger(FindAllCategoryUseCase.name);

  constructor(
    @Inject('CategoriesService')
    private readonly categoriesService: CategoriesService,
  ) {}

  async execute(): Promise<CategoryEntity[]> {
    this.logger.log('FindAllWalletUseCase.execute');
    return this.categoriesService.findAll();
  }
}
