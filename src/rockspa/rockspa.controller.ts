import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RockspaService } from './rockspa.service';
import {
  RockspaAppointmentPartner,
  RockspaLoginEntity,
  RockspaServiceEntity,
  RockspaUserEntity,
} from './entity_schemat/entity_schemat';

@Controller('rockspa')
export class RockspaController {
  constructor(private readonly rockspaService: RockspaService) { }

  /** ---------------------------- CREATE ---------------------------- */

  @Post()
  createUser(@Body() userDto: RockspaUserEntity) {
    return this.rockspaService.createUser(userDto);
  }

  @Post('/login')
  login(@Body() loginDto: RockspaLoginEntity) {
    return this.rockspaService.loginUser(loginDto);
  }

  @Post('/services')
  createService(@Body() serviceDto: RockspaServiceEntity) {
    return this.rockspaService.createService(serviceDto);
  }

  @Post('/appointments')
  createAppointment(@Body() appointmentDto: RockspaAppointmentPartner) {
    return this.rockspaService.createAppointment(appointmentDto);
  }

  /** ---------------------------- READ ---------------------------- */

  @Get('/users')
  getAllUsers(): Promise<RockspaUserEntity[]> {
    return this.rockspaService.getAllUsers();
  }

  @Get('/services')
  getAllServices(): Promise<RockspaServiceEntity[]> {
    return this.rockspaService.getAllServices();
  }

  @Get('/appointments')
  getAllAppointments(): Promise<RockspaAppointmentPartner[]> {
    return this.rockspaService.getAllAppointments();
  }

  @Get('/appointments/client/:userId')
  getAppointmentsByClient(@Param('userId') userId: string): Promise<RockspaAppointmentPartner[]> {
    return this.rockspaService.getUserAppointments(userId);
  }

  @Get('/appointments/worker/:userId')
  getAppointmentsByWorker(@Param('userId') userId: string): Promise<RockspaAppointmentPartner[]> {
    return this.rockspaService.getWorkerAppointments(userId);
  }

  @Get('/users/:userId')
  getAccountInfo(@Param('userId') userId: string): Promise<RockspaUserEntity> {
    return this.rockspaService.getUserById(userId);
  }

  /** ---------------------------- UPDATE ---------------------------- */

  @Put('/users/:id')
  updateUser(@Param('id') id: string, @Body() update: RockspaUserEntity) {
    return this.rockspaService.updateUser(id, update);
  }

  @Put('/users/notification/:id')
  updateUserNotification(@Param('id') id: string, @Body() update: RockspaUserEntity) {
    return this.rockspaService.updatePushToken(id, update);
  }

  @Put('/services/:serviceId')
  updateService(@Param('serviceId') serviceId: string, @Body() update: RockspaServiceEntity) {
    return this.rockspaService.updateService(serviceId, update);
  }

  @Put('/services/availability/:serviceId')
  updateServiceAvailability(@Param('serviceId') serviceId: string, @Body() update: RockspaServiceEntity) {
    return this.rockspaService.updateServiceAvailability(serviceId, update);
  }

  @Put('/appointments/:appointmentId')
  updateAppointment(@Param('appointmentId') appointmentId: string, @Body() update: RockspaAppointmentPartner) {
    return this.rockspaService.updateAppointment(appointmentId, update);
  }

  @Put('/appointments/status/:appointmentId')
  updateAppointmentStatus(@Param('appointmentId') appointmentId: string, @Body() update: RockspaAppointmentPartner) {
    return this.rockspaService.updateAppointmentStatus(appointmentId, update.statut, update.worker);
  }

  /** ---------------------------- DELETE ---------------------------- */

  @Delete('/users/:id')
  deleteUser(@Param('id') id: string) {
    return this.rockspaService.deleteUser(id);
  }

  @Delete('/services/:id')
  deleteService(@Param('id') id: string) {
    return this.rockspaService.deleteService(id);
  }

  @Delete('/appointments/:id')
  cancelAppointment(@Param('id') id: string) {
    return this.rockspaService.cancelAppointment(id);
  }
}
