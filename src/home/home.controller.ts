import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Annonce, Article, VersionAvailabe, ActionedData } from './entities/activity.entity';
import { ActivityService } from './home.service';

@Controller('boutique')
export class ActivityController {
  constructor(private activityService: ActivityService) { }

  @Post('uploadImage')
  async createImage(@Body() base64Data: any): Promise<{ ima: String }> {
    return await this.activityService.createImage(base64Data, base64Data.old_image);
  }

  @Post('annonce/:owner/:id') // Change the endpoint to reflect the more general nature of handling files
  async uploadFile(@Param('owner') owner: string, @Param('id') id: string, @Body() fileData: any): Promise<{ url: string }> {
    return await this.activityService.createFile(fileData, owner, id, fileData.old_image);
  }

  @Post('deleteImage')
  async deleteImage(@Body() image_url: any): Promise<any> {
    return await this.activityService.deleteImage(image_url);
  }

  @Post('deleteannonce/annonce/:id') // Change the endpoint to reflect the more general nature of handling files
  async deleteAnnonces(@Param('id') id: string, @Body() g: any): Promise<any> {
    return await this.activityService.DeleteAnnonces(id, g);
  }

  @Post('version/new/poasting') // Change the endpoint to reflect the more general nature of handling files
  async versionAvailabe(@Body() versionAvailabe: VersionAvailabe): Promise<VersionAvailabe> {
    return await this.activityService.versionAvailabe(versionAvailabe);
  }

  @Get('version/new/pc/software/:device') // Change the endpoint to reflect the more general nature of handling files
  async versionAvailabeget(@Param('device') device: string): Promise<VersionAvailabe> {
    return await this.activityService.versionAvailabeget(device);
  }

  @Post('/:soft_use/:creata_id')
  async create(@Param('soft_use') soft_use: string, @Param('creata_id') creata_id: string, @Body() article: Article) {
    return await this.activityService.create(soft_use, creata_id, article);

  };

  @Get('/:owner')
  async allData(@Param('owner') owner: string): Promise<any> {
    return await this.activityService.allData(owner);
  };


  @Get('only/article/:owner/:wh')
  async allArticles(@Param('owner') owner: string, @Param('wh') wh: string): Promise<any> {
    return await this.activityService.allArticles(owner, wh);
  };


  @Get('searchArticles/only/article/:owner')
  async searchArticles(@Param('owner') owner: string): Promise<any> {
    return await this.activityService.searchArticles(owner);
  };



  @Get('returnData/Length/:owner')
  async returnDataLength(@Param('owner') owner: string): Promise<any> {
    return await this.activityService.returnDataLength(owner);
  };

  @Get('annoncedata/:owner')
  async allAnonnces(@Param('owner') owner: string): Promise<Annonce[]> {
    return await this.activityService.allAnonnces(owner);
  };

  @Get('Action/Records/request')
  async userActionRecord(): Promise<ActionedData[]> {
    return await this.activityService.userActionRecord();
  };

  // Update the existing PUT route to handle article update
  @Put('/:soft_use/:creata_id/:id')
  async updateArticle(@Param('soft_use') soft_use: string, @Param('creata_id') creata_id: string, @Param('id') id: string, @Body() article: Article): Promise<Article> {
    return this.activityService.updateArticles(soft_use, creata_id, id, article);
  };


  // Update the existing PUT route to handle article update
  @Put('discountall/:soft_use/:creata_id/:owner/:perc')
  async discountAll(@Param('soft_use') soft_use: string, @Param('creata_id') creata_id: string, @Param('owner') owner: string, @Param('perc') perc: number, @Body() bon: any): Promise<any> {
    return this.activityService.discountAll(soft_use, creata_id, owner, perc, bon);
  };

  // Update the existing PUT route to handle article update
  @Put('onediscount/one/:soft_use/:creata_id/:id')
  async discountOne(@Param('soft_use') soft_use: string, @Param('creata_id') creata_id: string, @Param('id') id: string, @Body() article: Article): Promise<Article> {
    return this.activityService.discountOne(soft_use, creata_id, id, article);
  };

  // Update the existing DELETE route to handle article removal
  @Delete('/:soft_use/:creata_id/:id')
  async removeArticle(@Param('soft_use') soft_use: string, @Param('creata_id') creata_id: string, @Param('id') id: string): Promise<any> {
    return this.activityService.removeArticle(soft_use, creata_id, id);
  }
}

