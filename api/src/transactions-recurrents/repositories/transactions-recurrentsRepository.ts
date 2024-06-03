import { TransactionRecurrentEntity } from '../entities/transactions-recurrent.entity';

export interface ITransactionRecurrentRepository {
  create(
    create: TransactionRecurrentEntity,
  ): Promise<TransactionRecurrentEntity>;
}
