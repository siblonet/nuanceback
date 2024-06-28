import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsSchema } from './schema/cars.schema';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Aboucars', schema: CarsSchema }])
  ],

  controllers: [CarsController],
  providers: [CarsService]
})
export class CarsModule { }
