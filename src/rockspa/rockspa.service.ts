import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import {
  RockspaAppointmentPartner,
  RockspaServiceEntity,
  RockspaUserEntity,
  RockspaLoginEntity
} from './entity_schemat/entity_schemat';
import { MineindService } from 'src/mineind/mineind.service';

@Injectable()
export class RockspaService {
  constructor(
    @InjectModel('RockspaUser') private userModel: Model<RockspaUserEntity>,
    @InjectModel('RockspaService') private serviceModel: Model<RockspaServiceEntity>,
    @InjectModel('RockspaAppointment') private appointmentModel: Model<RockspaAppointmentPartner>,
    private readonly mineindService: MineindService
  ) {}

  private encrypt(text: string): string {
    const encoded = this.mineindService.whatisthis(text);
    return encoded.replaceAll('undefined', '');
  }

  private matches(input: string, stored: string): boolean {
    return this.encrypt(input) === stored;
  }

  private generateToken(user: RockspaUserEntity): object {
    const { _id, name, phone, role, allow } = user;
    const payload = `${_id}°${name}°${role}°${phone}°${allow}`;
    return { token: this.encrypt(payload) };
  }

  private async batchSendPush(tokens: string[], notification: { sound: string; title: string; body: string }, batchSize = 7) {
    for (let i = 0; i < tokens.length; i += batchSize) {
      const batch = tokens.slice(i, i + batchSize);
      await Promise.all(
        batch.map(async (token) => {
          try {
            await axios.post('https://exp.host/--/api/v2/push/send', { ...notification, to: token });
          } catch (err) {
            console.error('Notification error:', err);
          }
        })
      );
    }
  }

  async sendPushToStaff(notification: { sound: string; title: string; body: string }) {
    const users = await this.userModel.find({ allow: true, role: { $ne: 'client' }, pushtoken: { $ne: 'null' } });
    const tokens = users.map(user => user.pushtoken);
    await this.batchSendPush(tokens, notification);
  }

  // ─── User Management ──────────────────────────────────────────
  async createUser(userDto: RockspaUserEntity) {
    const existing = await this.userModel.findOne({ phone: userDto.phone });
    if (existing) return { ee: 'phoneused' };

    userDto.password = this.encrypt(userDto.password);
    const newUser = await this.userModel.create(userDto);
    await newUser.save();
    return this.generateToken(newUser);
  }

  async loginUser(loginDto: RockspaLoginEntity) {
    const user = await this.userModel.findOne({ phone: loginDto.phone });
    if (!user || !this.matches(loginDto.password, user.password)) {
      return { ee: 'Invalid' };
    }
    return this.generateToken(user);
  }

  async updateUser(id: string, update: Partial<RockspaUserEntity>) {
    const updated = await this.userModel.findByIdAndUpdate(id, update);
    if (!updated) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return { done: 'done' };
  }

  async updatePushToken(id: string, pushtoken: any) {
    return this.updateUser(id, { pushtoken });
  }

  async deleteUser(id: string) {
    await this.userModel.findByIdAndRemove(id);
    return { done: 'done' };
  }

  async getUserById(id: string) {
    return await this.userModel.findById(id);
  }

  async getAllUsers() {
    return await this.userModel.find();
  }

  // ─── Services ─────────────────────────────────────────────────
  async createService(serviceDto: RockspaServiceEntity) {
    const newService = await this.serviceModel.create(serviceDto);
    await newService.save();
    return await this.serviceModel.find().sort({ created: -1 });
  }

  async updateService(id: string, update: Partial<RockspaServiceEntity>) {
    const updated = await this.serviceModel.findByIdAndUpdate(id, update);
    if (!updated) throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    return await this.serviceModel.find().sort({ created: -1 });
  }

  async updateServiceAvailability(id: string, availability: RockspaServiceEntity) {
    return this.updateService(id, { serviceAvailability: availability.serviceAvailability });
  }

  async deleteService(id: string) {
    await this.serviceModel.findByIdAndRemove(id);
    return { done: 'done' };
  }

  async getAllServices() {
    return await this.serviceModel.find().sort({ created: -1 });
  }

  // ─── Appointments ─────────────────────────────────────────────
  async createAppointment(appointmentDto: RockspaAppointmentPartner) {
    const newAppointment = await this.appointmentModel.create(appointmentDto);
    await newAppointment.save();

    const createdApp = await this.appointmentModel
      .findById(newAppointment._id)
      .populate('service')
      .populate('client');

    if (!createdApp || !createdApp.service || typeof createdApp.service === 'string') {
      throw new HttpException('Failed to populate service', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const service = createdApp.service as RockspaServiceEntity;

    const notification = {
      sound: 'default',
      title: `Appointment scheduled for ${service.serviceName}`,
      body: `${service.serviceName} • ${createdApp.dete} at ${createdApp.heure}`,
    };

    await this.sendPushToStaff(notification);

    return createdApp;
  }

  async updateAppointment(id: string, update: Partial<RockspaAppointmentPartner>) {
    const updated = await this.appointmentModel.findByIdAndUpdate(id, update);
    if (!updated) throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
    return await this.appointmentModel.find().sort({ created: -1 });
  }

  async updateAppointmentStatus(id: string, statut: any, worker: any) {
    return await this.updateAppointment(id, { statut, worker});
  }

  async cancelAppointment(id: string) {
    await this.appointmentModel.findByIdAndRemove(id);
    return { done: 'done' };
  }

  async getAllAppointments() {
    return await this.appointmentModel.find().sort({ created: -1 }).populate('client').populate('worker');
  }

  async getUserAppointments(clientId: string) {
    return await this.appointmentModel.find({ client: clientId }).sort({ created: -1 }).populate('worker');
  }

  async getWorkerAppointments(workerId: string) {
    return await this.appointmentModel.find({ worker: workerId }).sort({ created: -1 }).populate('client');
  }
}
