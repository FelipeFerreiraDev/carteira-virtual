import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { IWalletRepository } from './repositories/walletRepository';
import { PrismaService } from 'src/prisma/prisma.service';
import { WalletEntity } from './entities/wallet.entity';

export interface IWalletUpdate {
  id: string;
  balance: number;
}

@Injectable()
export class WalletsService implements IWalletRepository {
  constructor(private prisma: PrismaService) {}

  async create(wallet: WalletEntity): Promise<WalletEntity> {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.wallet.create({
          data: {
            name: wallet.name,
            balance: wallet.balance,
          },
        });
      });
    } catch (error) {
      console.error(error);
    }
    return wallet;
  }

  async findAll(): Promise<WalletEntity[]> {
    const wallets = this.prisma.wallet.findMany();

    return wallets;
  }

  async findOne(id: string): Promise<WalletEntity> {
    try {
      const wallet = await this.prisma.wallet.findUnique({
        where: {
          id: id,
        },
      });
      return wallet;
    } catch (error) {
      console.error(error);
    }
  }

  async update(
    id: string,
    updateWalletDto: CreateWalletDto,
  ): Promise<IWalletUpdate> {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.wallet.update({
          where: {
            id: id,
          },
          data: {
            balance: updateWalletDto.balance,
          },
        });
      });
    } catch (error) {
      console.error(error);
    }
    return {
      id: id,
      balance: updateWalletDto.balance,
    };
  }

  async remove(id: string) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.wallet.delete({
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
