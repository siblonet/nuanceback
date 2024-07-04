import { Module } from '@nestjs/common';
import { BefreePersonController } from './befree.person.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BefreeUserSchema } from './person.schema';
import { BefreePersonService } from './befree.person.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'befreeuser', schema: BefreeUserSchema },
    ])
  ],

  controllers: [BefreePersonController],
  providers: [BefreePersonService]
})
export class PersonBefreeModule { }
