import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { WaveService } from './wave.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Wave } from './entities/wave-schemat';

@Controller('wave')
export class WaveController {
  constructor(private waveService: WaveService) { }

  @Post()
  createQrcode(@Body() wave: Wave) {
    return this.waveService.createQrcode(wave);
  }

  @Get("get-qrcode/:id")
  async collectQrcode(@Param('id') id: string): Promise<Wave> {
    return await this.waveService.collectQrcode(id);
  };


  @Put('putqrcode/:id')
  updateQrcode(@Param('id') id: string, @Body() wave: Wave): Promise<Wave> {
    return this.waveService.updateQrcode(id, wave);
  }

  @Delete('deleteqrcode/:id')
  deleteQrcode(@Param('id') id: string) {
    return this.waveService.deleteQrcode(id);
  }

}
