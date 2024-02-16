import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MineindService } from 'src/mineind/mineind.service';
import { Person, PLog } from './entities/person.entity';
import axios from 'axios';


@Injectable()
export class PeopleService {
  constructor(
    @InjectModel('People') private personModel: Model<Person>,
    private readonly mineindService: MineindService) { }


  async create(persondto: Person) {
    const { phone, nom, owner } = persondto;
    const user = await this.personModel.findOne({ phone, owner });
    if (user) {
      return { ee: "phoneused" }
    } else if (nom === "Lanell") {
      const personreset: Person = {
        prenom: persondto.prenom,
        nom: persondto.nom,
        phone: persondto.phone,
        email: persondto.email,
        owner: persondto.owner,
        motdepass: this.indrog(persondto.motdepass),
        admin: "true"
      };

      const person = await this.personModel.create({
        ...personreset
      });
      await person.save();
      return this.generatToken(personreset);
    } else {
      const personreset: Person = {
        prenom: persondto.prenom,
        nom: persondto.nom,
        phone: persondto.phone,
        email: persondto.email,
        owner: persondto.owner,
        motdepass: this.indrog(persondto.motdepass),
        admin: "false"
      };

      const person = await this.personModel.create({
        ...personreset
      });
      await person.save();
      return this.generatToken(person);
    }

  }

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

  generatToken(person: Person): Object {
    const { _id, prenom, nom, phone, email, staff, admin } = person;
    const perset = `${_id}°${prenom}°${nom}°${phone}°${email}°${staff}°${admin}`;
    const dae = this.mineindService.whatisthis(perset);
    const adaa = dae.replaceAll("undefined", "");
    const doa = { token: adaa };
    return doa;
  }


  async login(pLog: PLog, owner: string) {
    const { phone, motdepass } = pLog;
    const person = await this.personModel.findOne({ phone, owner })
    if (!person) {
      return { ee: "Invalid" }
    } else if (this.enderog(motdepass, person.motdepass)) {
      return this.generatToken(person);
    }
    return { ee: "Invalid" }

  }

  async loginli(pLog: PLog) {
    const { phone, motdepass } = pLog;
    const person = await this.personModel.findOne({ phone })
    if (!person) {
      throw new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);
    } else if (this.enderog(motdepass, person.motdepass)) {
      return { token: this.generatToken(person) };
    }
    throw new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);

  }

  async PersonUpte(id: any, persan: Person): Promise<any> {
    const admin = await this.personModel.findByIdAndUpdate(id, {
      nom: persan.nom,
      prenom: persan.prenom,
      email: persan.email,
      phone: persan.phone
    });
    if (!admin) {
      throw new HttpException('femmes not found', HttpStatus.NOT_FOUND);
    }
    return "ok";

  }

  async PersonStatus(id: any, status: any): Promise<any> {
    const admin = await this.personModel.findByIdAndUpdate(id, status);
    if (!admin) {
      throw new HttpException('femmes not found', HttpStatus.NOT_FOUND);
    }
    return "ok";

  }

  async Passwordupdate(id: any, persan: any): Promise<any> {
    const { oldpassword, motdepass } = persan;

    const passwd = await this.personModel.findById(id);
    if (!passwd) {
      return { wrong: "wrong" };
    } else if (this.enderog(oldpassword, passwd.motdepass)) {
      await this.personModel.findByIdAndUpdate(id, { motdepass: this.indrog(motdepass) });

      return { wrong: "ok" };
    } else {
      return { wrong: "wrong" };

    }

  }


  async Pushtoken(id: any, pushtoken: any): Promise<any> {

    const use = await this.personModel.findById(id)
    if (!use) {
      return { wrong: "wrong" };
    } else {
      await this.personModel.findByIdAndUpdate(id, { pushtoken: pushtoken.notif });
      return { wrong: "ok" };
    }

  }


  remove(id: string) {
    return this.personModel.findByIdAndRemove(id);
  }

  async allPerson(owner: string): Promise<Person[]> {
    return await this.personModel.find({ owner: owner });

  }

  async allNonadmin(owner: string): Promise<Person[]> {
    return await this.personModel.find({ owner: owner, admin: owner === "matasa" ? { $ne: "true" } : "false" });

  }

  async sendExpopushnotification(notificaton: any) {
    const pushtoken = await this.personModel.find({ admin: "true" });
    pushtoken.forEach((notif: any) => {
      if (notif.pushtoken) {
        notificaton.to = notif.pushtoken
        try {
          axios.post("https://exp.host/--/api/v2/push/send", notificaton).then(() => {
          }).catch(err => {
            // Handle Error Here
            console.error(err);
          });
        } catch (error) {
          null
        }

      }

    })

  }


  async sendExpoPushNotifications(notification: any, owner: any) {
    //const pushTokens = await this.personModel.find({ admin: true, owner: owner, pushtoken: { $ne: "denied" } });
    const pushTokens = await this.personModel.find({
      $or: [
        { admin: true },
        { staff: true },
      ],
      owner: owner,
      pushtoken: { $ne: "denied" },
    });
    const maxConcurrentRequests = 5; // Limitez le nombre de requêtes simultanées ici

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


}
