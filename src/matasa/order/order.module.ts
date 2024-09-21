import { Module } from '@nestjs/common';
import { OrderMatasaService } from './order.service';
import { OrderMatasaController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './dto/create-order.dto';
import { ArticleSchema } from 'src/home/dto/create-activity.dto';
import { PersonSchema } from 'src/people/dto/create-person.dto';
import { PeopleMatasaService } from 'src/matasa/people/people.service';
import { MineindService } from 'src/mineind/mineind.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Matasa', schema: ArticleSchema },
      { name: 'OrderMatasa', schema: OrderSchema },
      { name: 'PeopleMatasa', schema: PersonSchema }
    ])
  ],

  controllers: [OrderMatasaController],
  providers: [OrderMatasaService, PeopleMatasaService, MineindService]
})
export class OrderMatasaModule { }
