import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BefreeAgriculterController } from './home.controller';
import { BefreeAgriculterService } from './home.service';
import { BefreePaysSchema, BefreeCooperativeSchema, BefreeAgrulterSchema, BefreeAgrultureSchema } from './home.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BefreePays', schema: BefreePaysSchema },
      { name: 'BefreeCooperative', schema: BefreeCooperativeSchema },
      { name: 'BefreeAgrulter', schema: BefreeAgrulterSchema },
      { name: 'BefreeAgrulture', schema: BefreeAgrultureSchema },
    ])
  ],

  controllers: [BefreeAgriculterController],
  providers: [BefreeAgriculterService]
})
export class BefreeAgriculterModule { }
