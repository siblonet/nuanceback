import { Module } from '@nestjs/common';
import { PeopleBefreeWalletService } from './people.service';
import { PeopleBefreeWalletController } from './people.controller';
import { MineindService } from 'src/mineind/mineind.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountDataSchema, PersonWalletSchema, WalletListTypeSchema } from './dto/create-person.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PeopleBefreeWallet', schema: PersonWalletSchema},
      { name: 'AccountData', schema: AccountDataSchema},
      { name: 'WalletList', schema: WalletListTypeSchema}
  ])
],
  controllers: [PeopleBefreeWalletController],
  providers: [PeopleBefreeWalletService, MineindService]
})
export class PeopleBefreeWalletModule {}
