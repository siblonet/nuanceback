import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WaveSchema } from './dto/wave-dto';
import { WaveController } from './wave.controller';
import { WaveService } from './wave.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Qrcodes', schema: WaveSchema }])
  ],

  controllers: [WaveController],
  providers: [WaveService]
})


export class WaveModule { }
