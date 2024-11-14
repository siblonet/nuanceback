import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wave } from './entities/wave-schemat';


@Injectable()
export class WaveService {

  constructor(
    @InjectModel('Qrcodes') private waveModel: Model<Wave>) { }


  async createQrcode(wave: any) {
    const savwave = await this.waveModel.create(wave);
    await savwave.save();
    return savwave;
  }


  async collectQrcode(reqesta: string): Promise<Wave> {
    const wave = await this.waveModel.findOne({ operator: reqesta });

    if (!wave) {
      throw new HttpException('Wave not found', HttpStatus.NOT_FOUND);
    }

    return wave;
  }


  async updateQrcode(id: string, wave: Wave): Promise<Wave> {
    const upwave = await this.waveModel.findByIdAndUpdate(id, wave);

    if (!upwave) {
      throw new HttpException('Wave not found', HttpStatus.NOT_FOUND);
    }

    return upwave;
  }


  async deleteQrcode(id: string) {
    await this.waveModel.findByIdAndRemove(id);
    return 'done';
  };

}
