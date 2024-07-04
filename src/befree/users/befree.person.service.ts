import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccessRequest, BefreeUser } from './person.entity';

@Injectable()
export class BefreePersonService {
  constructor(
    @InjectModel('befreeuser') private befreeuserModel: Model<BefreeUser>) { }



  async postUser(befreeUser: BefreeUser): Promise<any> {
    const { access } = befreeUser;
    const user = await this.befreeuserModel.findOne({ access });
    if (user) {
      return { ee: "phoneused" }
    } else {
      const person = await this.befreeuserModel.create(befreeUser);
      await person.save();
      return person;
    }
  }

  async loginUser(AccessCode: AccessRequest): Promise<any> {
    const { access } = AccessCode;
    const person = await this.befreeuserModel.findOne({ access })
    if (!person) {
      return { ee: "Invalid" }
    } else {
      return person;
    }
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
