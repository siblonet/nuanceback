import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AccessRequest, BefreeUser } from './person.entity';
import { BefreePersonService } from './befree.person.service';

@Controller('BefreeAccess')
export class BefreePersonController {
  constructor(private personService: BefreePersonService) { }



  @Post()
  async postUser(@Body() triumphUser: BefreeUser) {
    return await this.personService.postUser(triumphUser);
  };


  @Post('login')
  async loginUser(@Body() pLog: AccessRequest) {
    return await this.personService.loginUser(pLog);
  }

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

  @Get()
  async getAllUsers(): Promise<BefreeUser[]> {
    return await this.personService.getAllUsers();
  };

  @Get("/:id")
  async getMe(@Param('id') id: string): Promise<BefreeUser> {
    return await this.personService.getMe(id);
  };


  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */





  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() triumphUser: BefreeUser): Promise<BefreeUser> {
    return this.personService.updateUser(id, triumphUser);
  };

  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */





  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ delete starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ delete starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ delete starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ delete starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  @Delete('delete/:id')
  async deleteHouse(@Param('id') id: string): Promise<any> {
    return this.personService.deleteUser(id);
  }
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ delete ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

}

