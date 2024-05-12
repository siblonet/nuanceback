import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { CopineUserEntity, CopineLoginEntity } from './entity_schemat/entity_schemat';
import { MineindService } from 'src/mineind/mineind.service';


@Injectable()
export class CopineService {

  constructor(
    @InjectModel('CopineUser') private userModel: Model<CopineUserEntity>,
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




  async copineCreatingUser(User: CopineUserEntity) {
    const { phone } = User;
    const user = await this.userModel.findOne({ phone });
    if (user) {
      return { ee: "phoneused" }
    } else {
      const inva = await this.userModel.create(User);
      await inva.save();
      return inva;
    }
  }

  async copineConnexion(login: CopineLoginEntity) {
    const { phone, password } = login;
    const person = await this.userModel.findOne({ phone })
    if (!person) {
      return { ee: "Invalid" }
    } else if (this.enderog(password, person.password)) {
      return person;
    }
    return { ee: "Invalid" }
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



  async gettingAllCopineUser(what: string): Promise<CopineUserEntity[]> {
    const convo = this.indrog(what);
    return await this.userModel.find({ role: convo });
  }


  async gettingMyAccountInfo(user_id: any): Promise<CopineUserEntity> {
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

  async copineUserUpdate(id: any, User: CopineUserEntity): Promise<any> {
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


  async copineUserNotification(id: any, User: CopineUserEntity): Promise<any> {
    const person = await this.userModel.findByIdAndUpdate(id, {
      pushtoken: User.pushtoken
    });

    if (!person) {
      throw new HttpException('Utilisateur introuvable', HttpStatus.NOT_FOUND);
    }
    return { done: "done" };

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


  async copineDeletingUser(id: string) {
    await this.userModel.findByIdAndRemove(id);
    return { done: "done" };
  };


}
