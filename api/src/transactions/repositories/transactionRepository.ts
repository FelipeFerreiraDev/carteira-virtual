import { TransactionEntity } from '../entities/transaction.entity';

export interface ITransactionRepository {
  create(create: TransactionEntity): Promise<TransactionEntity>;
  findAll(id: string): Promise<TransactionEntity[]>;
  //   findOne(id: string): Promise<TransactionEntity>;
  //   //   update(id: string, updateWalletDto: CreateTransactionDto): Promise<IWalletUpdate>;
  //   remove(id: string): Promise<void>;
}
