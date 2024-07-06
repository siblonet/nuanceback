import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BefreeAgrulter, BefreeAgrulture, BefreeCategorie, BefreeCooperative, BefreePays } from './home.entity';


@Injectable()
export class BefreeAgriculterService {

  constructor(
    @InjectModel('BefreePays') private befreePays: Model<BefreePays>,
    @InjectModel('BefreeCooperative') private befreeCooperative: Model<BefreeCooperative>,
    @InjectModel('BefreeAgrulter') private befreeAgrulter: Model<BefreeAgrulter>,
    @InjectModel('BefreeAgrulture') private befreeAgrulture: Model<BefreeAgrulture>,
    @InjectModel('BefreeCategorie') private befreeCategorie: Model<BefreeCategorie>
  ) { }



  async postBefreePays(housea: BefreePays): Promise<BefreePays> {
    return await this.befreePays.create(housea);
  }

  async postBefreeCooperative(houseb: BefreeCooperative): Promise<BefreeCooperative> {
    return await this.befreeCooperative.create(houseb);
  }

  async postBefreeAgrulter(housec: BefreeAgrulter): Promise<any> {
    const { identifiant_interne_exploitation } = housec;
    const agri = await this.befreeAgrulter.findOne({ identifiant_interne_exploitation });
    if (agri) {
      return { ee: "phoneused" }
    } else {
      return await this.befreeAgrulter.create(housec);
    }
  }

  async postBefreeAgrulture(housed: BefreeAgrulture): Promise<BefreeAgrulture> {
    return await this.befreeAgrulture.create(housed);
  }

  async postBefreeCategorie(housed: BefreeCategorie): Promise<BefreeCategorie> {
    return await this.befreeCategorie.create(housed);
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
  async getAllBefreePays(): Promise<BefreePays[]> {
    return await this.befreePays.find()//.populate('person').sort({ created: -1 });
  }

  async getAllBefreeCooperative(): Promise<BefreeCooperative[]> {
    return await this.befreeCooperative.find();
  }


  async getAllBefreePayCooperative(id: string): Promise<BefreeCooperative[]> {
    return await this.befreeCooperative.find({ categorie: id });
  }

  async getAllBefreeAgrulter(): Promise<BefreeAgrulter[]> {
    return await this.befreeAgrulter.find();
  }

  async getAllBefreeAgrulture(): Promise<BefreeAgrulture[]> {
    return await this.befreeAgrulture.find();
  }


  async getAllBefreeCategorie(): Promise<BefreeCategorie[]> {
    return await this.befreeCategorie.find();
  }


  async getAllBefreePayCategorie(id: string): Promise<BefreeCategorie[]> {
    return await this.befreeCategorie.find({ pays: id });
  }

  async getBefreeAgrulterById(id: string): Promise<BefreeAgrulter[]> {
    return await this.befreeAgrulter.findOne({ cooperative: id });
  }


  async getByIdItergetBefreeAgrulter(id: string): Promise<BefreeAgrulter> {
    return await this.befreeAgrulter.findOne({ identifiant_interne_exploitation: id });
  }
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */





  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Update starts @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  async updateBefreePays(id: string, house: BefreePays): Promise<any> {
    const housea = await this.befreePays.findByIdAndUpdate(id, house);
    if (!housea) {
      throw new HttpException('house not found', HttpStatus.NOT_FOUND);
    }
  }


  async updateBefreeCooperative(id: string, house: BefreeCooperative): Promise<any> {
    const housea = await this.befreeCooperative.findByIdAndUpdate(id, house);
    if (!housea) {
      throw new HttpException('house not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateBefreeAgrulter(id: string, house: BefreeAgrulter): Promise<any> {
    const housea = await this.befreeAgrulter.findByIdAndUpdate(id, house);
    if (!housea) {
      throw new HttpException('house not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateBefreeAgrulture(id: string, house: BefreeAgrulture): Promise<any> {
    const housea = await this.befreeAgrulture.findByIdAndUpdate(id, house);
    if (!housea) {
      throw new HttpException('house not found', HttpStatus.NOT_FOUND);
    }
  }


  async updateBefreeCategorie(id: string, house: BefreeCategorie): Promise<any> {
    const housea = await this.befreeCategorie.findByIdAndUpdate(id, house);
    if (!housea) {
      throw new HttpException('house not found', HttpStatus.NOT_FOUND);
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

  async deleteBefreePays(id: string): Promise<any> {
    return await this.befreePays.findByIdAndRemove(id);
  }


  async deleteBefreeCooperative(id: string): Promise<any> {
    return await this.befreeCooperative.findByIdAndRemove(id);
  }

  async deleteBefreeAgrulter(id: string): Promise<any> {
    return await this.befreeAgrulter.findByIdAndRemove(id);
  }


  async deleteBefreeAgrulture(id: string): Promise<any> {
    return await this.befreeAgrulture.findByIdAndRemove(id);
  }


  async deleteBefreeCategorie(id: string): Promise<any> {
    return await this.befreeCategorie.findByIdAndRemove(id);
  }
}
