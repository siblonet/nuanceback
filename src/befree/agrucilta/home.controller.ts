import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BefreeAgriculterService } from './home.service';
import { BefreePays, BefreeCooperative, BefreeAgrulter, BefreeCategorie, BefreeExploitationAgricole, BefreeExtraExploitationAgricole, BefreeInspecteurAgricole, BefreeProprieteurAgricole, BefreeTravailleurAgricole } from './home.entity';

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


  @Post("postBefreeCategorie")
  async postBefreeCategorie(@Body() housee: BefreeCategorie) {
    return await this.befreeAgriculterService.postBefreeCategorie(housee);
  };





  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Post agricole @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Post agricole @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Post agricole @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  @Post("postBefreeExploitationAgricole")
  async postBefreeExploitationAgricole(@Body() housed: BefreeExploitationAgricole) {
    return await this.befreeAgriculterService.postBefreeExploitationAgricole(housed);
  };


  @Post("postBefreeTravailleurAgricole")
  async postBefreeTravailleurAgricole(@Body() housed: BefreeTravailleurAgricole) {
    return await this.befreeAgriculterService.postBefreeTravailleurAgricole(housed);
  };


  @Post("postBefreeInspecteurAgricole")
  async postBefreeInspecteurAgricole(@Body() housed: BefreeInspecteurAgricole) {
    return await this.befreeAgriculterService.postBefreeInspecteurAgricole(housed);
  };

  @Post("postBefreeProprieteurAgricole")
  async postBefreeProprieteurAgricole(@Body() housed: BefreeProprieteurAgricole) {
    return await this.befreeAgriculterService.postBefreeProprieteurAgricole(housed);
  };

  @Post("postBefreeExtraExploitationAgricole")
  async postBefreeExtraExploitationAgricole(@Body() housed: BefreeExtraExploitationAgricole) {
    return await this.befreeAgriculterService.postBefreeExtraExploitationAgricole(housed);
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

  @Get("getLastItemtogenerate")
  async getLastItemtogenerate(): Promise<any> {
    return await this.befreeAgriculterService.getLastItemToGenerate();
  };


  @Get("getAllBefreePays")
  async getAllBefreePays(): Promise<BefreePays[]> {
    return await this.befreeAgriculterService.getAllBefreePays();
  };

  @Get("getAllBefreeCooperative")
  async getAllBefreeCooperative(): Promise<BefreeCooperative[]> {
    return await this.befreeAgriculterService.getAllBefreeCooperative();
  };

  @Get("getAllBefreePayCooperative/:id")
  async getAllBefreePayCooperative(@Param('id') id: string): Promise<BefreeCooperative[]> {
    return await this.befreeAgriculterService.getAllBefreePayCooperative(id);
  };


  @Get("getAllBefreeAgrulter/:skipNum/:limitNum")
  async getAllBefreeAgrulter(@Param('skipNum') skipNum: number, @Param('limitNum') limitNum: number): Promise<any> {
    return await this.befreeAgriculterService.getAllBefreeAgrulter(skipNum, limitNum);
  };


  @Get("getAllBefreeCategorie")
  async getAllBefreeCategorie(): Promise<BefreeCategorie[]> {
    return await this.befreeAgriculterService.getAllBefreeCategorie();
  };

  @Get("getAllBefreePayCategorie/:id")
  async getAllBefreePayCategorie(@Param('id') id: string): Promise<BefreeCategorie[]> {
    return await this.befreeAgriculterService.getAllBefreePayCategorie(id);
  };

  @Get("ByIdgetBefreeAgrulter/:id/:skipNum/:limitNum")
  async getBefreeAgrulterById(@Param('id') id: string, @Param('skipNum') skipNum: number, @Param('limitNum') limitNum: number): Promise<any> {
    return await this.befreeAgriculterService.getBefreeAgrulterById(id, skipNum, limitNum);
  };

  @Get("ByIdItergetBefreeAgrulter/:id")
  async getByIdItergetBefreeAgrulter(@Param('id') id: string): Promise<any> {
    return await this.befreeAgriculterService.getByIdItergetBefreeAgrulter(id);
  };



  @Get("getByIdBefreeAgrulter/:id")
  async getByIdBefreeAgrulter(@Param('id') id: string): Promise<any> {
    return await this.befreeAgriculterService.getByIdBefreeAgrulter(id);
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

  @Put('updateBefreeCategorie/:id')
  async updateBefreeCategorie(@Param('id') id: string, @Body() housee: BefreeCategorie): Promise<BefreeCategorie> {
    return this.befreeAgriculterService.updateBefreeCategorie(id, housee);
  };



  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update Agricole @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  @Put('updateByidBefreeExploitationAgricole/:id')
  async updateByidBefreeExploitationAgricole(@Param('id') id: string, @Body() housee: BefreeExploitationAgricole): Promise<BefreeExploitationAgricole> {
    return this.befreeAgriculterService.updateByidBefreeExploitationAgricole(id, housee);
  };

  @Put('updateByidBefreeTravailleurAgricole/:id')
  async updateByidBefreeTravailleurAgricole(@Param('id') id: string, @Body() housee: BefreeTravailleurAgricole): Promise<BefreeTravailleurAgricole> {
    return this.befreeAgriculterService.updateByidBefreeTravailleurAgricole(id, housee);
  };

  @Put('updateByidBefreeInspecteurAgricole/:id')
  async updateByidBefreeInspecteurAgricole(@Param('id') id: string, @Body() housee: BefreeInspecteurAgricole): Promise<BefreeInspecteurAgricole> {
    return this.befreeAgriculterService.updateByidBefreeInspecteurAgricole(id, housee);
  };

  @Put('updateByidBefreeProprieteurAgricole/:id')
  async updateByidBefreeProprieteurAgricole(@Param('id') id: string, @Body() housee: BefreeProprieteurAgricole): Promise<BefreeProprieteurAgricole> {
    return this.befreeAgriculterService.updateByidBefreeProprieteurAgricole(id, housee);
  };

  @Put('updateByidBefreeExtraExploitationAgricole/:id')
  async updateByidBefreeExtraExploitationAgricole(@Param('id') id: string, @Body() housee: BefreeExtraExploitationAgricole): Promise<BefreeExtraExploitationAgricole> {
    return this.befreeAgriculterService.updateByidBefreeProprieteurAgricole(id, housee);
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



  @Delete('deleteBefreeCategorie/:id')
  async deleteBefreeCategorie(@Param('id') id: string): Promise<any> {
    return this.befreeAgriculterService.deleteBefreeCategorie(id);
  }

  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ delete ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

}

