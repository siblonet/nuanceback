import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MineindService } from 'src/mineind/mineind.service';
import { TransactionSchema } from './dto/create-transaction.dto';
import { AccountDataSchema, PersonWalletSchema } from '../people/dto/create-person.dto';
import { TransactionBefreeWalletController } from './transaction.controller';
import { TransactionBefreeWalletService } from './transaction.service';
import { PeopleBefreeWalletService } from '../people/people.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PeopleBefreeWallet', schema: PersonWalletSchema },
      { name: 'TransactionBefreeWallet', schema: TransactionSchema },
      { name: 'AccountData', schema: AccountDataSchema }
    ])
  ],

  controllers: [TransactionBefreeWalletController],
  providers: [TransactionBefreeWalletService, PeopleBefreeWalletService, MineindService]
})
export class TransactionsBefreeWalletModule { }
