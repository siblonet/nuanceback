import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TirhakaService } from './tirhaka.service';
import { TirhakaAppointmentPartner, TirhakaLoginEntity, TirhakaServiceEntity, TirhakaUserEntity } from './entity_schemat/entity_schemat';

@Controller('tirhaka')
export class TirhakaController {
  constructor(private tirhakaService: TirhakaService) { }

  @Post()
  //@UseGuards(AuthGuard('jwt'), AdminGuard)
  tirhakaCreatingUser(@Body() tirhakauser: TirhakaUserEntity) {
    return this.tirhakaService.tirhakaCreatingUser(tirhakauser);
  }

  @Post("/tirhakaconnexion")
  //@UseGuards(AuthGuard('jwt'), AdminGuard)
  tirhakaConnexion(@Body() tirhakalogin: TirhakaLoginEntity) {
    return this.tirhakaService.tirhakaConnexion(tirhakalogin);
  }

  @Post("/tirhakaservicecreation")
  //@UseGuards(AuthGuard('jwt'), AdminGuard)
  tirhakaServiceCreation(@Body() tirhakaServicecreation: TirhakaServiceEntity) {
    return this.tirhakaService.tirhakaServiceCreation(tirhakaServicecreation);
  }

  @Post("/tirhakaappointmentcreation")
  //@UseGuards(AuthGuard('jwt'), AdminGuard)
  tirhakaAppointmentCreation(@Body() tirhakaappointmentcreation: TirhakaAppointmentPartner) {
    return this.tirhakaService.tirhakaAppointmentCreation(tirhakaappointmentcreation);
  }
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Creations Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Geting Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  @Get()
  async gettingAllTirhakaUser(): Promise<TirhakaUserEntity[]> {
    return await this.tirhakaService.gettingAllTirhakaUser();
  }

  @Get("/tirhakaservicegetting")
  async gettingAllTirhakaServices(): Promise<TirhakaServiceEntity[]> {
    return await this.tirhakaService.gettingAllTirhakaServices();
  }

  @Get("/tirhakaappointmentgettingall")
  async gettingAllTirhakaAppointment(): Promise<TirhakaAppointmentPartner[]> {
    return await this.tirhakaService.gettingAllTirhakaAppointment();
  }

  @Get("/tirhakaappointmentgettingone/:user_id")
  async gettingAllMyTirhakaApointment(@Param('user_id') user_id: string): Promise<TirhakaAppointmentPartner[]> {
    return await this.tirhakaService.gettingAllMyTirhakaApointment(user_id);
  }
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Geting Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Updatting Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  @Put(":id")
  tirhakaUserUpdate(@Param('id') id: string, @Body() tirhakauser: TirhakaUserEntity) {
    return this.tirhakaService.tirhakaUserUpdate(id, tirhakauser);
  }

  @Put("/tirhakaservicespdate/:service_id/:service_service_id")
  tirhakaServiceUpdate(@Param('service_id') service_id: string, @Param('service_service_id') service_service_id: string, @Body() upser: TirhakaServiceEntity) {
    return this.tirhakaService.tirhakaServiceUpdate(service_id, service_service_id, upser);
  }

  @Put("/tirhakaserviceadd/tirhakaservicespdate/:service_type")
  tirhakaServiceAdd(@Param('service_type') service_type: string, @Body() service_data: TirhakaServiceEntity) {
    return this.tirhakaService.tirhakaServiceAdd(service_type, service_data);
  }


  @Put("/tirhakaserviceupdateavailability/:service_id")
  tirhakaServiceUpdateAvailability(@Param('service_id') service_id: string, @Body() avai: TirhakaServiceEntity) {
    return this.tirhakaService.tirhakaServiceUpdateAvailability(service_id, avai);
  }

  @Put("/tirhakaappointmentstatusupdate/:appoi_id")
  tirhakaAppointmentStatusUpdate(@Param('appoi_id') appoi_id: string, @Body() stau: TirhakaAppointmentPartner) {
    return this.tirhakaService.tirhakaAppointmentStatusUpdate(appoi_id, stau);
  }

  @Put("/tirhakaappointmentupdate/:appoi_id")
  tirhakaAppointmentUpdate(@Param('appoi_id') appoi_id: string, @Body() Appointment: TirhakaAppointmentPartner) {
    return this.tirhakaService.tirhakaAppointmentUpdate(appoi_id, Appointment);
  }
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Updatting Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Delete Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  @Delete('/tirhakadeletinguser/:id')
  tirhakaDeletingUser(@Param('id') id: string) {
    return this.tirhakaService.tirhakaDeletingUser(id);
  }

  @Delete('/tirhakadeletingservice/:id')
  tirhakaDeletingService(@Param('id') id: string) {
    return this.tirhakaService.tirhakaDeletingService(id);
  }

  @Delete('/tirhakacancelingappointment/:id')
  tirhakaCancelingAppointment(@Param('id') id: string) {
    return this.tirhakaService.tirhakaCancelingAppointment(id);
  }

}
