import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MineindService } from 'src/mineind/mineind.service';
import { MagicaAppointmentSchema, MagicaServiceSchema, MagicaUserSchema } from './entity_schemat/entity_schemat';
import { MagicaController } from './magica.controller';
import { MagicaService } from './magica.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MagicaUser', schema: MagicaUserSchema },
      { name: 'MagicaService', schema: MagicaServiceSchema },
      { name: 'MagicaAppointment', schema: MagicaAppointmentSchema }
    ])
  ],

  controllers: [MagicaController],
  providers: [MagicaService, MineindService]
})
export class MagicaModule { }
