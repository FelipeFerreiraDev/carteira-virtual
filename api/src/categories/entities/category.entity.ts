import { Prisma } from '@prisma/client';

export class CategoryEntity implements Prisma.CategoryCreateInput {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  transactions?: Prisma.TransactionCreateNestedManyWithoutCategoryInput;

  constructor(name: string) {
    this.name = name;
  }
}
