import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Annonce, Article } from './entities/activity.entity';
import { ActivityMatasaService } from './home.service';

@Controller('matasa')
export class ActivityMatasaController {
  constructor(private activityService: ActivityMatasaService) { }

  @Post('uploadImage')
  async createImage(@Body() base64Data: any): Promise<{ ima: String }> {
    return await this.activityService.createImage(base64Data);
  }

  @Post('annonce/:owner/:id') // Change the endpoint to reflect the more general nature of handling files
  async uploadFile(@Param('owner') owner: string, @Param('id') id: string, @Body() fileData: any): Promise<{ url: string }> {
      return await this.activityService.createFile(fileData, owner, id);
  }

  @Post()
  async create(@Body() article: Article) {
    return await this.activityService.create(article);

  };

  @Get('/:owner')
  async allData(@Param('owner') owner: string): Promise<any> {
    return await this.activityService.allData(owner);
  };


  @Get('only/article/:owner')
  async allArticles(@Param('owner') owner: string): Promise<any> {
    return await this.activityService.allArticles(owner);
  };


  @Get('annoncedata/:owner')
  async allAnonnces(@Param('owner') owner: string): Promise<Annonce[]> {
    return await this.activityService.allAnonnces(owner);
  };

  // Update the existing PUT route to handle article update
  @Put('/:id')
  async updateArticle(@Param('id') id: string, @Body() article: Article): Promise<Article> {
    return this.activityService.updateArticles(id, article);
  };

  // Update the existing DELETE route to handle article removal
  @Delete('/:id')
  async removeArticle(@Param('id') id: string): Promise<void> {
    return this.activityService.removeArticle(id);
  }
}

