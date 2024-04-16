import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MineindService } from 'src/mineind/mineind.service';
import { Insapay, IntaPlog, Invitaion, Invited } from './entities/person.entity';
import axios from 'axios';


@Injectable()
export class InstaPayService {
  constructor(
    @InjectModel('Instapay') private personModel: Model<Insapay>,
    @InjectModel('Invitaion') private invitaionModel: Model<Invitaion>,
    @InjectModel('Invited') private InvitedModel: Model<Invited>,
    private readonly mineindService: MineindService) { }


  async create(persondto: Insapay) {
    const { phone, owner } = persondto;
    const user = await this.personModel.findOne({ phone, owner });
    if (user) {
      return { ee: "phoneused" }
    } else {
      const personreset: Insapay = {
        prenom: persondto.prenom,
        nom: persondto.nom,
        phone: persondto.phone,
        owner: persondto.owner,
        motdepass: this.indrog(persondto.motdepass),
        allow: true
      };

      const person = await this.personModel.create({
        ...personreset
      });
      await person.save();
      const instatoken = await this.requesttoBackendAutantikation();
      return { ...this.generatToken(person), instapaytoken: instatoken };
    }

  }



  async requesttoBackendAutantikation() {
    const apiKeyA = this.mineindService.thisiswhat("607V01VW:Y979:75VY:360Y:2VX2Y74W4W00");
    const secretKeyA = this.mineindService.thisiswhat("WmBwWlE5RpOv1Rr");

    const options = {
      apiKey: `${apiKeyA}`,
      secretKey: `${secretKeyA}`
    };


    try {
      const apiUrl = 'https://api-rnpp.verif.ci/api/v1/authenticate';
      const response = await axios.post(apiUrl, options);
      if (!response || !response.data || !response.data.bearerToken) {
        return false;
      }
      return response.data.bearerToken;

    } catch (error) {
      return false;
    }
  };

  async login(pLog: IntaPlog, owner: string) {
    const { phone, motdepass } = pLog;
    const person = await this.personModel.findOne({ phone, owner })
    if (!person) {
      return { ee: "Invalid" }
    } else if (this.enderog(motdepass, person.motdepass)) {
      const instatoken = await this.requesttoBackendAutantikation();
      return { ...this.generatToken(person), instapaytoken: instatoken };
    }
    return { ee: "Invalid" }

  }




  remove(id: string) {
    return this.personModel.findByIdAndRemove(id);
  }



  async allPerson(owner: string): Promise<Insapay[]> {
    return await this.personModel.find({ owner: owner });

  }

  async bearerFetcher(owner: string): Promise<any> {
    const instatoken = await this.requesttoBackendAutantikation();
    if (!instatoken) {
      return { ee: "Invalid" }

    }
    return { instapaytoken: instatoken };
  }


  enderog(nez: any, ood: any): Boolean {
    const dae = this.mineindService.thisiswhat(nez)
    const adaa = dae.replaceAll("undefined", "");

    if (adaa === ood)
      return true
    return false
  }

  generatToken(person: Insapay): Object {
    const { _id, prenom, nom, phone, allow } = person;
    const perset = `${_id}°${prenom}°${nom}°${phone}°${allow}`;
    const dae = this.mineindService.whatisthis(perset);
    const adaa = dae.replaceAll("undefined", "");
    const doa = { token: adaa };
    return doa;
  }


  indrog(dd: any) {
    const dae = this.mineindService.whatisthis(dd)
    const adaa = dae.replaceAll("undefined", "");
    return adaa
  }


  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  async invitaion(invitaion: Invitaion) {
    const { phone } = invitaion;
    const user = await this.invitaionModel.findOne({ phone });
    if (user) {
      return { ee: "phoneused" }
    } else {
      const passincript = this.indrog(invitaion.password);
      invitaion.password = passincript;

      const inva = await this.invitaionModel.create({
        ...invitaion
      });
      await inva.save();
      return { id: inva._id };
    }
  }

  async createInvitaion(invited: any): Promise<any> {
    const fone = invited.phone;
    const inviter = await this.invitaionModel.findById(invited.invita);
    const user = await this.InvitedModel.findOne({ fone });
    if (user) {
      return { ee: "phoneused" }
    } else if (inviter) {


      const Invitaionset: Invited = {
        invita: invited.invita ? invited.invita : invited._id,
        phone: invited.phone
      };
      const inva = await this.InvitedModel.create({
        ...Invitaionset
      });
      await inva.save();

      return { done: "done" };
    } else {
      throw new HttpException('wrong id', HttpStatus.NOT_FOUND);

    }
  }


  async loginInvitaion(invitaionlo: Invitaion) {
    const { phone, password } = invitaionlo;
    const person = await this.invitaionModel.findOne({ phone })
    if (!person) {
      return { ee: "Invalid" }
    } else if (this.enderog(password, person.password)) {
      return { id: person._id };
    }
    return { ee: "Invalid" }
  }
}
