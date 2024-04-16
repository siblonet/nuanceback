import { Controller, Post, Body, Param, Delete, Get, Put } from '@nestjs/common';
import { Insapay, IntaPlog, Invitaion, Invited } from './entities/person.entity';
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
  async bearerFetcher(@Param('owner') owner: string): Promise<any> {
    return await this.peopleService.bearerFetcher(owner);
  }


  @Get("allperson/:owner")
  async allPersons(@Param('owner') owner: string): Promise<Insapay[]> {
    return await this.peopleService.allPerson(owner);
  }



  /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  @Post('invitaion/')
  async invitaion(@Body() invitaion: Invitaion) {
    return await this.peopleService.invitaion(invitaion);
  }

  @Post('invited/invitaion/')
  createInvitaion(@Body() invited: Invited) {
    return this.peopleService.createInvitaion(invited);
  }


  @Post('login/invitaion/invited')
  async loginInvitaion(@Body() invuser: Invitaion) {
    return await this.peopleService.loginInvitaion(invuser);
  }

}
