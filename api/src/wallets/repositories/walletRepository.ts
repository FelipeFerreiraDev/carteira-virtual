import { CreateWalletDto } from '../dto/create-wallet.dto';
import { WalletEntity } from '../entities/wallet.entity';
import { IWalletUpdate } from '../wallets.service';

export interface IWalletRepository {
  create(create: WalletEntity): Promise<WalletEntity>;
  findAll(): Promise<WalletEntity[]>;
  findOne(id: string): Promise<WalletEntity>;
  update(id: string, updateWalletDto: CreateWalletDto): Promise<IWalletUpdate>;
  remove(id: string): Promise<void>;
}
