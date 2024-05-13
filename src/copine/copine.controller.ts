import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CopineService } from './copine.service';
import { CopineLoginEntity, CopineUserEntity } from './entity_schemat/entity_schemat';

@Controller('copine')
export class CopineController {
  constructor(private copineService: CopineService) { }

  @Post()
  copineCreatingUser(@Body() copineuser: CopineUserEntity) {
    return this.copineService.copineCreatingUser(copineuser);
  }

  @Post("/copineconnexion")
  copineConnexion(@Body() copinelogin: CopineLoginEntity) {
    return this.copineService.copineConnexion(copinelogin);
  }

  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Creations Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Geting Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  @Get(":what")
  async gettingAllCopineUser(@Param('what') what: string,): Promise<CopineUserEntity[]> {
    return await this.copineService.gettingAllCopineUser(what);
  }

  @Get("/gettingmyaccountinfo/:user_id")
  async gettingMyAccountInfo(@Param('user_id') user_id: string): Promise<CopineUserEntity> {
    return await this.copineService.gettingMyAccountInfo(user_id);
  }

  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Geting Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Updatting Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  @Put(":id")
  copineUserUpdate(@Param('id') id: string, @Body() copineuser: CopineUserEntity) {
    return this.copineService.copineUserUpdate(id, copineuser);
  }

  @Put("notificationcopineuser/:id")
  copineUserNotification(@Param('id') id: string, @Body() copineuser: CopineUserEntity) {
    return this.copineService.copineUserNotification(id, copineuser);
  }


  @Put("pushcandidateimage/:imageid")
  PushCandidateImage(@Param('imageid') imageid: string, @Body() imago: any) {
    return this.copineService.PushCandidateImage(imageid, imago);
  }

  @Put("changecandidateimage/:ed/:emageedi")
  changeCandidateImage(@Param('ed') ed: string, @Param('emageedi') emageedi: string, @Body() emageurl: any) {
    return this.copineService.changeCandidateImage(ed, emageedi, emageurl);
  }

  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Updatting Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Delete Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  @Delete('/copinedeletinguser/:id')
  copineDeletingUser(@Param('id') id: string) {
    return this.copineService.copineDeletingUser(id);
  }

}
