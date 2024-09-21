import { Module } from '@nestjs/common';
import { ActivityMatasaService } from './home.service';
import { ActivityMatasaController } from './home.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnnonceSchema, ArticleSchema } from './dto/create-activity.dto';
import { MineindService } from 'src/mineind/mineind.service';
import { OrderSchema } from 'src/order/dto/create-order.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Matasa', schema: ArticleSchema },
      { name: 'OrderMatasa', schema: OrderSchema },
      { name: 'AnnonceMatasa', schema: AnnonceSchema }
    ])
  ],

  controllers: [ActivityMatasaController],
  providers: [ActivityMatasaService, MineindService]
})
export class ActivityMatasaModule { }
