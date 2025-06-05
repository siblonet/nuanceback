import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RockspaController } from './rockspa.controller';
import { RockspaService } from './rockspa.service';
import { MineindService } from 'src/mineind/mineind.service';
import {
  RockspaAppointmentSchema,
  RockspaServiceSchema,
  RockspaUserSchema,
} from './entity_schemat/entity_schemat';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RockspaUser', schema: RockspaUserSchema },
      { name: 'RockspaService', schema: RockspaServiceSchema },
      { name: 'RockspaAppointment', schema: RockspaAppointmentSchema },
    ]),
  ],
  controllers: [RockspaController],
  providers: [RockspaService, MineindService],
})
export class RockspaModule {}
