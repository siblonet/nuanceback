import { Module } from '@nestjs/common';
import { TriumphPersonService } from './triumph.person.service';
import { TriumphPersonController } from './triumph.person.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TriumphUserSchema } from './person.schema';
import { MineindService } from 'src/mineind/mineind.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'triumphuser', schema: TriumphUserSchema },
    ])
  ],

  controllers: [TriumphPersonController],
  providers: [TriumphPersonService, MineindService]
})
export class PersonTriumphModule { }
