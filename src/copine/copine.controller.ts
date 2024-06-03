import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CopineService } from './copine.service';
import { CopineCommentEntity, CopineLoginEntity, CopineRecordEntity, CopineReplyEntity, CopineUserEntity, Job } from './entity_schemat/entity_schemat';

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


  @Post("/commentcopinecreating")
  copineCreatingComment(@Body() copinecomment: CopineCommentEntity) {
    return this.copineService.copineCreatingComment(copinecomment);
  }

  @Post("/replycopinecreating")
  copineCreatingReply(@Body() copinereply: CopineReplyEntity) {
    return this.copineService.copineCreatingReply(copinereply);
  }

  @Post("/JobcopineCreating")
  copineCreatingJob(@Body() copinejob: Job) {
    return this.copineService.copineCreatingJob(copinejob);
  }
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Creations Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Geting Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  @Get(":what")
  async gettingAllCopineUser(@Param('what') what: string): Promise<CopineUserEntity[]> {
    return await this.copineService.gettingAllCopineUser(what);
  }


  @Get("/team/show/giveaccess/:what")
  async teamgettingGiveAccess(@Param('what') what: string): Promise<CopineUserEntity[]> {
    return await this.copineService.teamgettingGiveAccess(what);
  }


  @Get("/gettingmyaccountinfo/:user_id")
  async gettingMyAccountInfo(@Param('user_id') user_id: string): Promise<CopineUserEntity> {
    return await this.copineService.gettingMyAccountInfo(user_id);
  }


  @Get("/gettingbycopinecomment/:whors")
  gettingAllCopineComment(@Param('whors') whors: string): Promise<CopineCommentEntity[]> {
    return this.copineService.gettingAllCopineComment(whors);
  }

  @Get("/gettingbycopinereply/:whors")
  gettingAllCopineReply(@Param('whors') whors: string): Promise<CopineReplyEntity[]> {
    return this.copineService.gettingAllCopineReply(whors);
  }

  @Get("/suscribed/services/users")
  async SuscribedServicesUsers(): Promise<CopineRecordEntity> {
    return await this.copineService.SuscribedServicesUsers();
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


  @Put("/updatecopinecomment/:whors")
  copineCommentUpdate(@Param('whors') whors: string, @Body() comment: any) {
    return this.copineService.copineCommentUpdate(whors, comment);
  }

  @Put("/copineupdatereply/:whars")
  copineReplyUpdate(@Param('whars') whars: string, @Body() replay: any) {
    return this.copineService.copineReplyUpdate(whars, replay);
  }

  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Updatting Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Delete Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  @Delete('/copinedeletinguser/:id')
  copineDeletingUser(@Param('id') id: string) {
    return this.copineService.copineDeletingUser(id);
  }


  @Delete("/deletingcopinecomment/:whors")
  copineDeletingComment(@Param('whors') whors: string) {
    return this.copineService.copineDeletingComment(whors);
  }

  @Delete("/deletingreplycopine/:whars")
  copineDeletingReply(@Param('whars') whars: string) {
    return this.copineService.copineDeletingReply(whars);
  }
}
