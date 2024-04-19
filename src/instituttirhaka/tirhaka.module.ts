import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MineindService } from 'src/mineind/mineind.service';
import { TirhakaAppointmentSchema, TirhakaServiceSchema, TirhakaUserSchema } from './entity_schemat/entity_schemat';
import { TirhakaController } from './tirhaka.controller';
import { TirhakaService } from './tirhaka.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TirhakaUser', schema: TirhakaUserSchema },
      { name: 'TirhakaService', schema: TirhakaServiceSchema },
      { name: 'TirhakaAppointment', schema: TirhakaAppointmentSchema }
    ])
  ],

  controllers: [TirhakaController],
  providers: [TirhakaService, MineindService]
})
export class TirhakaModule { }
