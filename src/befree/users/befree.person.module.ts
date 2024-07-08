import { Module } from '@nestjs/common';
import { BefreePersonController } from './befree.person.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BefreeUserSchema, BefreeAccessSchema } from './person.schema';
import { BefreePersonService } from './befree.person.service';
import { MineindService } from 'src/mineind/mineind.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'befreeuser', schema: BefreeUserSchema },
      { name: 'befreeaccess', schema: BefreeAccessSchema },
    ])
  ],

  controllers: [BefreePersonController],
  providers: [BefreePersonService, MineindService]
})
export class PersonBefreeModule { }
