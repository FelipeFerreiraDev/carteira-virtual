import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { WalletsModule } from './wallets/wallets.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CategoriesModule } from './categories/categories.module';
import { DailyTaskService } from './daily-task/daily-task.service';
import { TransactionsRecurrentsModule } from './transactions-recurrents/transactions-recurrents.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(),
    WalletsModule,
    TransactionsModule,
    CategoriesModule,
    TransactionsRecurrentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, DailyTaskService],
})
export class AppModule {}
