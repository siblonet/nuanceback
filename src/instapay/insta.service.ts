import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MineindService } from 'src/mineind/mineind.service';
import { Insapay, IntaPlog } from './entities/person.entity';
import axios from 'axios';


@Injectable()
export class InstaPayService {
  constructor(
    @InjectModel('Instapay') private personModel: Model<Insapay>,
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
    const options = {
      apiKey: "514e10ed-b242-46eb-851b-9ec9b47d7d11",
      secretKey: "dNyDdOv6iKlE0iI"
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
      return this.generatToken(person);
    }
    return { ee: "Invalid" }

  }

  remove(id: string) {
    return this.personModel.findByIdAndRemove(id);
  }



  async allPerson(owner: string): Promise<Insapay[]> {
    return await this.personModel.find({ owner: owner });

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

}
