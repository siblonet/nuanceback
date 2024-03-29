import { Controller, Post, Body, Param, Delete, Get, Put } from '@nestjs/common';
import { Insapay, IntaPlog } from './entities/person.entity';
import { InstaPayService } from './insta.service';

@Controller('instapay')
export class InstaPayController {
  constructor(private readonly peopleService: InstaPayService) { }

  @Post()
  create(@Body() person: Insapay) {
    return this.peopleService.create(person);
  }

  @Post('login/:owner')
  async login(@Param('owner') owner: string, @Body() pLog: IntaPlog) {
    return await this.peopleService.login(pLog, owner);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peopleService.remove(id);
  }


  @Get("/:owner")
  async allPersons(@Param('owner') owner: string): Promise<Insapay[]> {
    return await this.peopleService.allPerson(owner);
  }

}
