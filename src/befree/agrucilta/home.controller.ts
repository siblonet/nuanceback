import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BefreeAgriculterService } from './home.service';
import { BefreePays, BefreeCooperative, BefreeAgrulter, BefreeAgrulture } from './home.entity';

@Controller('BefreeAgriculter')
export class BefreeAgriculterController {
  constructor(private befreeAgriculterService: BefreeAgriculterService) { }


  @Post("postBefreePays")
  async postBefreePays(@Body() housea: BefreePays) {
    return await this.befreeAgriculterService.postBefreePays(housea);
  };

  @Post("postBefreeCooperative")
  async postBefreeCooperative(@Body() houseb: BefreeCooperative) {
    return await this.befreeAgriculterService.postBefreeCooperative(houseb);

  };

  @Post("postBefreeAgrulter")
  async postBefreeAgrulter(@Body() housec: BefreeAgrulter) {
    return await this.befreeAgriculterService.postBefreeAgrulter(housec);

  };

  @Post("postBefreeAgrulture")
  async postBefreeAgrulture(@Body() housed: BefreeAgrulture) {
    return await this.befreeAgriculterService.postBefreeAgrulture(housed);

  };

  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Post ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Post ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Post ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Post ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Post ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */





  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  @Get("getAllBefreePays")
  async getAllBefreePays(): Promise<BefreePays[]> {
    return await this.befreeAgriculterService.getAllBefreePays();
  };

  @Get("getAllBefreeCooperative")
  async getAllBefreeCooperative(): Promise<BefreeCooperative[]> {
    return await this.befreeAgriculterService.getAllBefreeCooperative();
  };

  @Get("getAllBefreeAgrulter")
  async getAllBefreeAgrulter(): Promise<BefreeAgrulter[]> {
    return await this.befreeAgriculterService.getAllBefreeAgrulter();
  };

  @Get("getAllBefreeAgrulture")
  async getAllBefreeAgrulture(): Promise<BefreeAgrulture[]> {
    return await this.befreeAgriculterService.getAllBefreeAgrulture();
  };
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */





  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  @Put('updateBefreePays/:id')
  async updateBefreePays(@Param('id') id: string, @Body() housea: BefreePays): Promise<BefreePays> {
    return this.befreeAgriculterService.updateBefreePays(id, housea);
  };

  @Put('updateBefreeCooperative/:id')
  async updateBefreeCooperative(@Param('id') id: string, @Body() houseb: BefreeCooperative): Promise<BefreeCooperative> {
    return this.befreeAgriculterService.updateBefreeCooperative(id, houseb);
  };

  @Put('updateBefreeAgrulter/:id')
  async updateBefreeAgrulter(@Param('id') id: string, @Body() housec: BefreeAgrulter): Promise<BefreeAgrulter> {
    return this.befreeAgriculterService.updateBefreeAgrulter(id, housec);
  };

  @Put('updateBefreeAgrulture/:id')
  async updateBefreeAgrulture(@Param('id') id: string, @Body() housed: BefreeAgrulture): Promise<BefreeAgrulture> {
    return this.befreeAgriculterService.updateBefreeAgrulture(id, housed);
  };
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */





  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ delete starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ delete starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ delete starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ delete starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  @Delete('deleteBefreePays/:id')
  async deleteBefreePays(@Param('id') id: string): Promise<any> {
    return this.befreeAgriculterService.deleteBefreePays(id);
  }


  @Delete('deleteBefreeCooperative/:id')
  async deleteBefreeCooperative(@Param('id') id: string): Promise<any> {
    return this.befreeAgriculterService.deleteBefreeCooperative(id);
  }


  @Delete('deleteBefreeAgrulter/:id')
  async deleteBefreeAgrulter(@Param('id') id: string): Promise<any> {
    return this.befreeAgriculterService.deleteBefreeAgrulter(id);
  }


  @Delete('deleteBefreeAgrulture/:id')
  async deleteBefreeAgrulture(@Param('id') id: string): Promise<any> {
    return this.befreeAgriculterService.deleteBefreeAgrulture(id);
  }
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ delete ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

}

