import { Module } from '@nestjs/common';
import { PoubyService } from './pouby.service';
import { PoubyController } from './pouby.controller';
import { MineindService } from 'src/mineind/mineind.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MembersSchema, OtpCodeSchema} from './entities/create-person.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PoubyShareholder', schema: MembersSchema },
      { name: 'OtpCode', schema: OtpCodeSchema },
    ])
  ],
  controllers: [PoubyController],
  providers: [PoubyService, MineindService]
})
export class PoubyModule { }
