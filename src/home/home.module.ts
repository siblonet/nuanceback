import { Module } from '@nestjs/common';
import { ActivityService } from './home.service';
import { ActivityController } from './home.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnnonceSchema, ArticleSchema, VersionAvailabeSchema } from './dto/create-activity.dto';
import { MineindService } from 'src/mineind/mineind.service';
import { OrderSchema } from 'src/order/dto/create-order.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'NuanceDoud', schema: ArticleSchema },
      { name: 'VersionAvailabe', schema: VersionAvailabeSchema },
      { name: 'OrderDoud', schema: OrderSchema },
      { name: 'AnnonceDoud', schema: AnnonceSchema }
    ])
  ],

  controllers: [ActivityController],
  providers: [ActivityService, MineindService]
})
export class ActivityModule { }
