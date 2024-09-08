import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { MagicaAppointmentPartner, MagicaServiceEntity, MagicaUserEntity, MagicaLoginEntity } from './entity_schemat/entity_schemat';
import { MineindService } from 'src/mineind/mineind.service';


@Injectable()
export class MagicaService {

  constructor(
    @InjectModel('MagicaUser') private userModel: Model<MagicaUserEntity>,
    @InjectModel('MagicaService') private serviceModel: Model<MagicaServiceEntity>,
    @InjectModel('MagicaAppointment') private appointmentModel: Model<MagicaAppointmentPartner>,
    private readonly mineindService: MineindService) { }


  indrog(dd: any) {
    const dae = this.mineindService.whatisthis(dd)
    const adaa = dae.replaceAll("undefined", "");
    return adaa
  }

  enderog(nez: any, ood: any): Boolean {
    const dae = this.mineindService.thisiswhat(nez)
    const adaa = dae.replaceAll("undefined", "");

    if (adaa === ood)
      return true
    return false
  }

  generatToken(User: MagicaUserEntity): Object {
    const { _id, name, phone, role, allow } = User;
    const perset = `${_id}°${name}°${role}°${phone}°${allow}`;
    const dae = this.mineindService.whatisthis(perset);
    const adaa = dae.replaceAll("undefined", "");
    const doa = { token: adaa };
    return doa;
  }

  async sendExpoPushNotifications(notification: any) {
    const pushTokens = await this.userModel.find({
      allow: true,
      role: { $ne: "client" },
      pushtoken: { $ne: "null" },
    });
    const maxConcurrentRequests = 7; // Limitez le nombre de requêtes simultanées ici

    const sendNotification = async (pushToken: string) => {
      try {
        console.log("sending...");
        await axios.post("https://exp.host/--/api/v2/push/send", {
          ...notification,
          to: pushToken,
        });
      } catch (err) {
        console.log(err);
        console.error("Erreur lors de l'envoi de la notification : ");
      }
    };

    const promises = [];
    let concurrentRequests = 0;

    pushTokens.forEach((notif: any) => {
      if (concurrentRequests < maxConcurrentRequests && notif.pushtoken) {
        concurrentRequests++;
        promises.push(sendNotification(notif.pushtoken));
      } else {
        // Si le nombre maximal de requêtes simultanées est atteint, ajoutez-les à la file d'attente ici ou attendez avant de continuer.
      }
    });
    await Promise.all(promises);
  }


  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Creations Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Creations Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Creations Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Creations Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Creations Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Creations Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */




  async magicaCreatingUser(User: MagicaUserEntity) {
    const { phone } = User;
    const user = await this.userModel.findOne({ phone });
    if (user) {
      return { ee: "phoneused" }
    } else {
      const passincript = this.indrog(User.password);
      User.password = passincript;

      const inva = await this.userModel.create({
        ...User
      });
      await inva.save();
      return this.generatToken(inva);
    }
  }

  async magicaConnexion(login: MagicaLoginEntity) {
    const { phone, password } = login;
    const person = await this.userModel.findOne({ phone })
    if (!person) {
      return { ee: "Invalid" }
    } else if (this.enderog(password, person.password)) {
      return this.generatToken(person);
    }
    return { ee: "Invalid" }
  }


  //creating service
  async magicaServiceCreation(magicaService: MagicaServiceEntity) {
    const inva = await this.serviceModel.create({
      ...magicaService
    });
    await inva.save();
    return await this.serviceModel.find();

  }



  //Creating appointment
  async magicaAppointmentCreation(magicaAppointment: MagicaAppointmentPartner) {
    const inva = await this.appointmentModel.create({
      ...magicaAppointment
    });
    await inva.save();
    const dato = {
      "sound": "default",
      "title": `Rendez-vous de service ${magicaAppointment.services.servicetype}`,
      "body": `${magicaAppointment.services.service} • ${magicaAppointment.dete} à ${magicaAppointment.heure}`
    }

    await this.sendExpoPushNotifications(dato);

    // Populate the 'client' field (assuming it references 'MagicaUser')
    return await this.appointmentModel.find({ client: magicaAppointment.client })
      .sort({ created: -1 })
      .populate('client');
  }



  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Creations Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Creations Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Creations Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Creations Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Creations Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Creations Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */







  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Geting Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Geting Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Geting Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Geting Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Geting Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Geting Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */





  async gettingAllMagicaUser(): Promise<MagicaUserEntity[]> {
    return await this.userModel.find();
  }



  async gettingAllMagicaServices(): Promise<MagicaServiceEntity[]> {
    return await this.serviceModel.find().sort({ created: -1 });
  }


  async gettingAllMagicaAppointment(): Promise<MagicaAppointmentPartner[]> {
    return await this.appointmentModel.find().sort({ created: -1 }).populate('client').populate('worker');
  }


  async gettingAllMyMagicaApointment(user_id: any): Promise<MagicaAppointmentPartner[]> {
    return await this.appointmentModel.find({client: user_id}).sort({ created: -1 }).populate('worker');
  }

  async gettingAllMyChargedApointment(user_id: any): Promise<MagicaAppointmentPartner[]> {
    return await this.appointmentModel.find({worker: user_id}).sort({ created: -1 }).populate('client');
  }


  async gettingMyAccountInfo(user_id: any): Promise<MagicaUserEntity> {
    return await this.userModel.findById(user_id);
  }

  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Geting Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Geting Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Geting Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Geting Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Geting Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */




  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Updatting Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Updatting Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Updatting Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Updatting Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Updatting Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  async magicaUserUpdate(id: any, User: MagicaUserEntity): Promise<any> {
    const person = await this.userModel.findByIdAndUpdate(id, {
      name: User.name,
      phone: User.phone,
    });

    if (!person) {
      throw new HttpException('Utilisateur introuvable', HttpStatus.NOT_FOUND);
    }
    return { done: "done" };

  }


  async magicaUserNotification(id: any, User: MagicaUserEntity): Promise<any> {
    const person = await this.userModel.findByIdAndUpdate(id, {
      pushtoken: User.pushtoken
    });

    if (!person) {
      throw new HttpException('Utilisateur introuvable', HttpStatus.NOT_FOUND);
    }
    return { done: "done" };

  }


  async magicaServiceUpdate(service_id: string, service_service_id: string, upser: any): Promise<MagicaServiceEntity[]> {
    const service = await this.serviceModel.findOneAndUpdate(
      { _id: service_id, 'services._id': service_service_id },
      {
        $set: {
          'services.$.service': upser.service,
          'services.$.availability': upser.availability,
          'services.$.price': upser.price,
          servicetype: upser.servicetype,
        },
      },
      { new: true }
    );

    if (!service) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }
    return await this.serviceModel.find();
  }



  async magicaServiceUpdateAvailability(service_id: string, avai: MagicaServiceEntity): Promise<MagicaServiceEntity[]> {
    const service = await this.serviceModel.findByIdAndUpdate(service_id, { availability: avai.availability });
    if (!service) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }

    return await this.serviceModel.find();
  }


  async magicaServiceAdd(service_type: string, service_data: any): Promise<MagicaServiceEntity[]> {
    // Find the document matching the service_type
    const service = await this.serviceModel.findOneAndUpdate(
      { servicetype: service_type },
      {
        // Use $push to add the new object to the services array
        $push: {
          services: service_data,
        },
      },
      { new: true }
    );

    if (!service) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }
    // Return the updated document
    return await this.serviceModel.find();
  }


  async removemagicaServiceAdd(id: string, serviid: string) {
    await this.serviceModel.findByIdAndUpdate(id,
      {
        $pull:
        {
          services: {
            _id: serviid
          }
        }
      },
      { new: true }
    );

    return { done: "done" };

  }

  async magicaAppointmentStatusUpdate(appoi_id: string, stau: MagicaAppointmentPartner): Promise<MagicaAppointmentPartner[]> {
    const appointment = await this.appointmentModel.findByIdAndUpdate(appoi_id, { statut: stau.statut, worker: stau.worker });
    if (!appointment) {
      throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
    }

    return await this.appointmentModel.find();
  }

  async magicaAppointmentUpdate(appoi_id: string, Appointment: any): Promise<MagicaAppointmentPartner[]> {
    const appointment = await this.appointmentModel.findByIdAndUpdate(appoi_id, Appointment);
    if (!appointment) {
      throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
    }

    return await this.appointmentModel.find();
  }
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Updatting Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Updatting Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Updatting Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Updatting Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Updatting Ending point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */




  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Delete Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Delete Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Delete Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Delete Starting point @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */


  async magicaDeletingUser(id: string) {
    await this.userModel.findByIdAndRemove(id);
    return { done: "done" };
  };


  async magicaDeletingService(id: string) {
    await this.serviceModel.findByIdAndRemove(id);
    return { done: "done" };
  };


  async magicaCancelingAppointment(id: string) {
    await this.appointmentModel.findByIdAndRemove(id);
    return { done: "done" };
  };


}
