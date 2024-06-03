// daily-task.service.ts
import { Injectable } from '@nestjs/common';
import * as cron from 'node-cron';
import { TransactionsRecurrentsService } from 'src/transactions-recurrents/transactions-recurrents.service';
import { TransactionsService } from 'src/transactions/transactions.service';

@Injectable()
export class DailyTaskService {
  constructor(
    private readonly transactionRecurrentService: TransactionsRecurrentsService,
    private readonly transactionService: TransactionsService,
  ) {
    // Agendar tarefa diária às 00:00
    cron.schedule('0 0 * * *', () => {
      this.runDailyTask();
    });
  }

  // Usado para iniciar no momento em que o servidor é iniciado apenas para fins de teste
  async onModuleInit() {
    await this.testRun();
  }

  async runDailyTask() {
    console.log('Running daily task...');
    const transactions = await this.transactionRecurrentService.findAll();
    await Promise.all(
      transactions.map(async (transaction) => {
        await this.transactionService.create(transaction);
      }),
    );
  }

  async testRun() {
    console.log('Running initial test...');
    await this.runDailyTask();
  }
}
