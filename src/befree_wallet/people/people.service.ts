import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MineindService } from 'src/mineind/mineind.service';
import { AccountData, PersonWallet, PLogWallet } from './entities/person.entity';
import axios from 'axios';


@Injectable()
export class PeopleBefreeWalletService {
  constructor(
    @InjectModel('PeopleBefreeWallet') private personModel: Model<PersonWallet>,
    @InjectModel('AccountData') private accountDataModel: Model<AccountData>,
    private readonly mineindService: MineindService) { }


  async create(allinone: any) {
    const { phone } = allinone.persona;
    const user = await this.personModel.findOne({ phone });
    if (user) {
      return { ee: "phoneused" }
    } else {
      const accountcreata: AccountData = {
        type: allinone.account.type,
        operator: allinone.account.operator,
        phone: allinone.account.phone,
        limit: allinone.account.limit,
        balance: allinone.account.balance
      };

      const accountfeed = await this.accountDataModel.create({
        ...accountcreata
      });
      await accountfeed.save();

      allinone.persona.motdepass = this.indrog(allinone.persona.motdepass),
        allinone.persona.admin = "false",
        allinone.persona.account = accountfeed._id

      const creataperson = async (persoda: PersonWallet) => {

        const person = await this.personModel.create({
          ...persoda
        });
        await person.save();
        const reconstroct = {
          type: allinone.account.type,
          operator: allinone.account.operator,
          limit: allinone.account.limit,
          balance: allinone.account.balance,
          ...persoda
        }
        return this.generatToken(reconstroct);
      }
      return await creataperson(allinone.persona);

    }
  }

  async login(pLog: PLogWallet) {
    const { phone, motdepass } = pLog;
    const person = await this.personModel.findOne({ phone }).populate('account')
    if (!person) {
      return { ee: "Invalid" }
    } else if (this.enderog(motdepass, person.motdepass)) {
      const reconstroct = {
        type: person.account.type,
        operator: person.account.operator,
        limit: person.account.limit,
        balance: person.account.balance,
        _id: person._id,
        prenom: person.prenom,
        nom: person.nom,
        phone: person.phone,
        email: person.email,
        admin: person.admin,
      }
      return this.generatToken(reconstroct);
    }
    return { ee: "Invalid" }

  }

  async getmyBalance(id: string): Promise<Object> {
    const balance = await this.accountDataModel.findById(id);
    return { balance: balance.balance }
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

  generatToken(person: any): Object {
    const { _id, prenom, nom, phone, email, admin, type, limit, operator, balance } = person;
    const perset = `${_id}°${prenom}°${nom}°${phone}°${email}°${admin}°${type}°${limit}°${operator}°${balance}`;
    const dae = this.mineindService.whatisthis(perset);
    const adaa = dae.replaceAll("undefined", "");
    const doa = { token: adaa };
    return doa;
  }





  async PersonUpte(id: any, persan: PersonWallet): Promise<any> {
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
      await this.personModel.findByIdAndUpdate(id, { pushtoken: pushtoken.pushtoken });
      return { wrong: "ok" };
    }

  }


  remove(id: string) {
    return this.personModel.findByIdAndRemove(id);
  }

  async allPerson(owner: string): Promise<PersonWallet[]> {
    return await this.personModel.find({ owner: owner });

  }

  async allNonadmin(owner: string): Promise<PersonWallet[]> {
    return await this.personModel.find({ owner: owner, admin: owner === "BefreeWallet" ? { $ne: "true" } : "false" });

  }


  async sendExpoPushNotifications(notification: any, pushTokens: any) {

    if (pushTokens && pushTokens !== "denied") {
      try {
        console.log("sending...");
        await axios.post("https://exp.host/--/api/v2/push/send", {
          ...notification,
          to: pushTokens,
        });
      } catch (err) {
        console.log(err);
        console.error("Erreur lors de l'envoi de la notification : ");

      };
    }

  }

}
