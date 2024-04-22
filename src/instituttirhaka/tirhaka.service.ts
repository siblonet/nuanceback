import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { TirhakaAppointmentPartner, TirhakaServiceEntity, TirhakaUserEntity, TirhakaLoginEntity } from './entity_schemat/entity_schemat';
import { MineindService } from 'src/mineind/mineind.service';


@Injectable()
export class TirhakaService {

  constructor(
    @InjectModel('TirhakaUser') private userModel: Model<TirhakaUserEntity>,
    @InjectModel('TirhakaService') private serviceModel: Model<TirhakaServiceEntity>,
    @InjectModel('TirhakaAppointment') private appointmentModel: Model<TirhakaAppointmentPartner>,
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

  generatToken(User: TirhakaUserEntity): Object {
    const { _id, name, phone, role, allow, email, address } = User;
    const perset = `${_id}°${name}°${role}°${phone}°${allow}°${email}°${address}`;
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




  async tirhakaCreatingUser(User: TirhakaUserEntity) {
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

  async tirhakaConnexion(login: TirhakaLoginEntity) {
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
  async tirhakaServiceCreation(tirhakaService: TirhakaServiceEntity) {
    const inva = await this.serviceModel.create({
      ...tirhakaService
    });
    await inva.save();
    return await this.serviceModel.find();

  }



  //Creating appointment
  async tirhakaAppointmentCreation(tirhakaAppointment: TirhakaAppointmentPartner) {
    const inva = await this.appointmentModel.create({
      ...tirhakaAppointment
    });
    await inva.save();
    const dato = {
      "sound": "default",
      "title": `Rendez-vous de service ${tirhakaAppointment.services.servicetype}`,
      "body": `${tirhakaAppointment.services.service} • ${tirhakaAppointment.dete} à ${tirhakaAppointment.heure}`
    }

    await this.sendExpoPushNotifications(dato);

    // Populate the 'client' field (assuming it references 'TirhakaUser')
    return await this.appointmentModel.find({ client: tirhakaAppointment.client })
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





  async gettingAllTirhakaUser(): Promise<TirhakaUserEntity[]> {
    return await this.userModel.find();
  }



  async gettingAllTirhakaServices(): Promise<TirhakaServiceEntity[]> {
    return await this.serviceModel.find().sort({ created: -1 });
  }


  async gettingAllTirhakaAppointment(): Promise<TirhakaAppointmentPartner[]> {
    return await this.appointmentModel.find().sort({ created: -1 }).populate('client').populate('worker');
  }


  async gettingAllMyTirhakaApointment(user_id: any): Promise<TirhakaAppointmentPartner[]> {
    return await this.appointmentModel.find({client: user_id}).sort({ created: -1 }).populate('worker');
  }

  async gettingAllMyChargedApointment(user_id: any): Promise<TirhakaAppointmentPartner[]> {
    return await this.appointmentModel.find({worker: user_id}).sort({ created: -1 }).populate('client');
  }


  async gettingMyAccountInfo(user_id: any): Promise<TirhakaUserEntity> {
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

  async tirhakaUserUpdate(id: any, User: TirhakaUserEntity): Promise<any> {
    const person = await this.userModel.findByIdAndUpdate(id, {
      name: User.name,
      phone: User.phone,
      address: User.address,
      email: User.email,
    });

    if (!person) {
      throw new HttpException('Utilisateur introuvable', HttpStatus.NOT_FOUND);
    }
    return { done: "done" };

  }




  async tirhakaServiceUpdate(service_id: string, service_service_id: string, upser: any): Promise<TirhakaServiceEntity[]> {
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



  async tirhakaServiceUpdateAvailability(service_id: string, avai: TirhakaServiceEntity): Promise<TirhakaServiceEntity[]> {
    const service = await this.serviceModel.findByIdAndUpdate(service_id, { availability: avai.availability });
    if (!service) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }

    return await this.serviceModel.find();
  }


  async tirhakaServiceAdd(service_type: string, service_data: any): Promise<TirhakaServiceEntity[]> {
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


  async removetirhakaServiceAdd(id: string, serviid: string) {
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

  async tirhakaAppointmentStatusUpdate(appoi_id: string, stau: TirhakaAppointmentPartner): Promise<TirhakaAppointmentPartner[]> {
    const appointment = await this.appointmentModel.findByIdAndUpdate(appoi_id, { statut: stau.statut, worker: stau.worker });
    if (!appointment) {
      throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
    }

    return await this.appointmentModel.find();
  }

  async tirhakaAppointmentUpdate(appoi_id: string, Appointment: any): Promise<TirhakaAppointmentPartner[]> {
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


  async tirhakaDeletingUser(id: string) {
    await this.userModel.findByIdAndRemove(id);
    return { done: "done" };
  };


  async tirhakaDeletingService(id: string) {
    await this.serviceModel.findByIdAndRemove(id);
    return { done: "done" };
  };


  async tirhakaCancelingAppointment(id: string) {
    await this.appointmentModel.findByIdAndRemove(id);
    return { done: "done" };
  };


}
