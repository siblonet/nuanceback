import { Module } from '@nestjs/common';
import { TriumphService } from './home.service';
import { TriumphController } from './home.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HouseSchema } from './dto/house.schema';
import { TriumphUserSchema } from '../users/person.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Triumph', schema: HouseSchema },
      { name: 'triumphuser', schema: TriumphUserSchema },
    ])
  ],

  controllers: [TriumphController],
  providers: [TriumphService]
})
export class TriumphModule { }
