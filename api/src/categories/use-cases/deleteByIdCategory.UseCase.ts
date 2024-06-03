import { Inject, Injectable, Logger } from '@nestjs/common';
import { CategoriesService } from '../categories.service';

@Injectable()
export class DeleteByIdCategoryUseCase {
  private readonly logger = new Logger(DeleteByIdCategoryUseCase.name);

  constructor(
    @Inject('CategoriesService')
    private readonly categoriesService: CategoriesService,
  ) {}

  async execute(id: string) {
    this.logger.log('DeleteByIdCategoryUseCase.execute');
    return this.categoriesService.remove(id);
  }
}
