import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

export interface ICategoryUpdate {
  id: string;
  name: string;
}

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(category: CategoryEntity): Promise<CategoryEntity> {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.category.create({
          data: {
            name: category.name,
          },
        });
      });
    } catch (error) {
      console.error(error);
    }
    return category;
  }

  async findAll(): Promise<CategoryEntity[]> {
    const categories = await this.prisma.category.findMany();

    return categories;
  }

  async update(
    id: string,
    updateCategoryDto: CreateCategoryDto,
  ): Promise<ICategoryUpdate> {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.category.update({
          where: {
            id: id,
          },
          data: {
            name: updateCategoryDto.name,
          },
        });
      });
    } catch (error) {
      console.error(error);
    }
    return {
      id: id,
      name: updateCategoryDto.name,
    };
  }

  async remove(id: string) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.category.delete({
          where: {
            id: id,
          },
        });
      });
    } catch (error) {
      console.error(error);
    }
  }
}
