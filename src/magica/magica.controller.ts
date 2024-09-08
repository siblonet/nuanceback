import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MagicaService } from './magica.service';
import { MagicaAppointmentPartner, MagicaLoginEntity, MagicaServiceEntity, MagicaUserEntity } from './entity_schemat/entity_schemat';

@Controller('magica')
export class MagicaController {
  constructor(private magicaService: MagicaService) { }

  @Post()
  //@UseGuards(AuthGuard('jwt'), AdminGuard)
  magicaCreatingUser(@Body() magicauser: MagicaUserEntity) {
    return this.magicaService.magicaCreatingUser(magicauser);
  }

  @Post("/magicaconnexion")
  //@UseGuards(AuthGuard('jwt'), AdminGuard)
  magicaConnexion(@Body() magicalogin: MagicaLoginEntity) {
    return this.magicaService.magicaConnexion(magicalogin);
  }

  @Post("/magicaservicecreation")
  //@UseGuards(AuthGuard('jwt'), AdminGuard)
  magicaServiceCreation(@Body() magicaServicecreation: MagicaServiceEntity) {
    return this.magicaService.magicaServiceCreation(magicaServicecreation);
  }

  @Post("/magicaappointmentcreation")
  //@UseGuards(AuthGuard('jwt'), AdminGuard)
  magicaAppointmentCreation(@Body() magicaappointmentcreation: MagicaAppointmentPartner) {
    return this.magicaService.magicaAppointmentCreation(magicaappointmentcreation);
  }
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Creations Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Geting Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  @Get()
  async gettingAllMagicaUser(): Promise<MagicaUserEntity[]> {
    return await this.magicaService.gettingAllMagicaUser();
  }

  @Get("/magicaservicegetting")
  async gettingAllMagicaServices(): Promise<MagicaServiceEntity[]> {
    return await this.magicaService.gettingAllMagicaServices();
  }

  @Get("/magicaappointmentgettingall")
  async gettingAllMagicaAppointment(): Promise<MagicaAppointmentPartner[]> {
    return await this.magicaService.gettingAllMagicaAppointment();
  }

  @Get("/magicaappointmentgettingone/:user_id")
  async gettingAllMyMagicaApointment(@Param('user_id') user_id: string): Promise<MagicaAppointmentPartner[]> {
    return await this.magicaService.gettingAllMyMagicaApointment(user_id);
  }

  @Get("/gettingallmychargedapointment/:user_id")
  async gettingAllMyChargedApointment(@Param('user_id') user_id: string): Promise<MagicaAppointmentPartner[]> {
    return await this.magicaService.gettingAllMyChargedApointment(user_id);
  }

  @Get("/gettingmyaccountinfo/:user_id")
  async gettingMyAccountInfo(@Param('user_id') user_id: string): Promise<MagicaUserEntity> {
    return await this.magicaService.gettingMyAccountInfo(user_id);
  }

  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Geting Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Updatting Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  @Put(":id")
  magicaUserUpdate(@Param('id') id: string, @Body() magicauser: MagicaUserEntity) {
    return this.magicaService.magicaUserUpdate(id, magicauser);
  }

  @Put("notificationmagicauser/:id")
  magicaUserNotification(@Param('id') id: string, @Body() magicauser: MagicaUserEntity) {
    return this.magicaService.magicaUserNotification(id, magicauser);
  }


  @Put("/magicaservicespdate/:service_id/:service_service_id")
  magicaServiceUpdate(@Param('service_id') service_id: string, @Param('service_service_id') service_service_id: string, @Body() upser: MagicaServiceEntity) {
    return this.magicaService.magicaServiceUpdate(service_id, service_service_id, upser);
  }

  @Put("/magicaserviceadd/magicaservicespdate/:service_type")
  magicaServiceAdd(@Param('service_type') service_type: string, @Body() service_data: MagicaServiceEntity) {
    return this.magicaService.magicaServiceAdd(service_type, service_data);
  }


  @Put("/magicaserviceupdateavailability/:service_id")
  magicaServiceUpdateAvailability(@Param('service_id') service_id: string, @Body() avai: MagicaServiceEntity) {
    return this.magicaService.magicaServiceUpdateAvailability(service_id, avai);
  }

  @Put("/magicaappointmentstatusupdate/:appoi_id")
  magicaAppointmentStatusUpdate(@Param('appoi_id') appoi_id: string, @Body() stau: MagicaAppointmentPartner) {
    return this.magicaService.magicaAppointmentStatusUpdate(appoi_id, stau);
  }

  @Put("/magicaappointmentupdate/:appoi_id")
  magicaAppointmentUpdate(@Param('appoi_id') appoi_id: string, @Body() Appointment: MagicaAppointmentPartner) {
    return this.magicaService.magicaAppointmentUpdate(appoi_id, Appointment);
  }
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Updatting Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Delete Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  @Delete('/magicadeletinguser/:id')
  magicaDeletingUser(@Param('id') id: string) {
    return this.magicaService.magicaDeletingUser(id);
  }

  @Delete('/magicadeletingservice/:id')
  magicaDeletingService(@Param('id') id: string) {
    return this.magicaService.magicaDeletingService(id);
  }

  @Delete('/removemagicaserviceadd/:id/:serviid')
  removemagicaServiceAdd(@Param('id') id: string, @Param('serviid') serviid: string) {
    return this.magicaService.removemagicaServiceAdd(id, serviid);
  }


  @Delete('/magicacancelingappointment/:id')
  magicaCancelingAppointment(@Param('id') id: string) {
    return this.magicaService.magicaCancelingAppointment(id);
  }

}
