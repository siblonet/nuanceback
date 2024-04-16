import { Module } from '@nestjs/common';
import { InstaPayService } from './insta.service';
import { InstaPayController } from './insta.controller';
import { MineindService } from 'src/mineind/mineind.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InstapaySchema, InvitaionSchema, InvitedSchema } from './entities/create-person.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Instapay', schema: InstapaySchema },
      { name: 'Invitaion', schema: InvitaionSchema },
      { name: 'Invited', schema: InvitedSchema }
    ])
  ],
  controllers: [InstaPayController],
  providers: [InstaPayService, MineindService]
})
export class InstaModule { }
