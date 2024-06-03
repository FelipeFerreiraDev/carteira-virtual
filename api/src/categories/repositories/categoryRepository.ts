import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryEntity } from '../entities/category.entity';

export interface ICategoryRepository {
  create(create: CategoryEntity): Promise<CategoryEntity>;
  findAll(): Promise<CategoryEntity[]>;
  findOne(id: string): Promise<CategoryEntity>;
  update(id: string, updateCategoryDto: CreateCategoryDto): Promise<any>;
  remove(id: string): Promise<void>;
}
