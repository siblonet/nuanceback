import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccessRequest, AccessUser, BefreeLogin, BefreeUser } from './person.entity';
import { MineindService } from 'src/mineind/mineind.service';

@Injectable()
export class BefreePersonService {
  constructor(
    @InjectModel('befreeaccess') private befreeaccessModel: Model<AccessUser>,
    @InjectModel('befreeuser') private befreeuserModel: Model<BefreeUser>,
    private readonly mineindService: MineindService
  ) { }




  enderog(nez: any, ood: any): Boolean {
    const dae = this.mineindService.thisiswhat(nez)
    const adaa = dae.replaceAll("undefined", "");

    if (adaa === ood)
      return true
    return false
  }



  generatToken(person: BefreeUser): Object {
    const { _id, nomcomplet, phone, email, admin } = person;
    const perset = `${_id}°${nomcomplet}°${phone}°${email}°${admin}`;
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


  async postAccess(befreeAccess: AccessUser): Promise<any> {
    const { access } = befreeAccess;
    const user = await this.befreeaccessModel.findOne({ access });
    if (user) {
      return { ee: "phoneused" }
    } else {
      const person = await this.befreeaccessModel.create(befreeAccess);
      await person.save();
      return person;
    }
  }

  async loginAccess(AccessCode: AccessRequest): Promise<any> {
    const { access } = AccessCode;
    const person = await this.befreeaccessModel.findOne({ access })
    if (!person) {
      return { ee: "Invalid" }
    } else {
      return person;
    }
  }



  async postUser(befreeUser: BefreeUser): Promise<any> {
    const { phone } = befreeUser;
    const user = await this.befreeuserModel.findOne({ phone });
    if (user) {
      return { ee: "phoneused" }
    } else {
      befreeUser.motdepass = this.indrog(befreeUser.motdepass);
      const person = await this.befreeuserModel.create(befreeUser);
      await person.save();
      return person;
    }
  }

  async loginUser(logindata: BefreeLogin): Promise<any> {
    const { phone, motdepass } = logindata;
    const person = await this.befreeuserModel.findOne({ phone })
    if (!person) {
      return { ee: "Invalid" }
    } else if (this.enderog(motdepass, person.motdepass)) {
      return this.generatToken(person);
    }
    return { ee: "Invalid" }
  }


  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Post ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Post ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Post ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Post ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Post ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */





  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  async getAllUsers(): Promise<BefreeUser[]> {
    return await this.befreeuserModel.find().sort({ created: -1 });
  }

  async getMe(id: string): Promise<BefreeUser> {
    return await this.befreeuserModel.findById(id);
  }
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */





  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  async updateUser(id: string, triumphUser: BefreeUser): Promise<any> {
    const triumphUse = await this.befreeuserModel.findByIdAndUpdate(id, triumphUser);
    if (!triumphUse) {
      throw new HttpException('triumphUser not found', HttpStatus.NOT_FOUND);
    }
  }

  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */





  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ delete starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ delete starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ delete starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ delete starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  async deleteUser(id: string): Promise<any> {
    return await this.befreeuserModel.findByIdAndRemove(id);
  }

}
