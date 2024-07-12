import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BefreeAgrulter, BefreeCategorie, BefreeCooperative, BefreeExploitationAgricole, BefreeExtraExploitationAgricole, BefreeInspecteurAgricole, BefreePays, BefreeProprieteurAgricole, BefreeTravailleurAgricole } from './home.entity';


@Injectable()
export class BefreeAgriculterService {

  constructor(
    @InjectModel('BefreePays') private befreePays: Model<BefreePays>,
    @InjectModel('BefreeCooperative') private befreeCooperative: Model<BefreeCooperative>,
    @InjectModel('BefreeCategorie') private befreeCategorie: Model<BefreeCategorie>,
    @InjectModel('BefreeAgrulter') private befreeAgrulter: Model<BefreeAgrulter>,
    @InjectModel('BefreeExploitationAgricole') private befreeExploitationAgricole: Model<BefreeExploitationAgricole>,
    @InjectModel('BefreeTravailleurAgricole') private befreeTravailleurAgricole: Model<BefreeTravailleurAgricole>,
    @InjectModel('BefreeInspecteurAgricole') private befreeInspecteurAgricole: Model<BefreeInspecteurAgricole>,
    @InjectModel('BefreeProprieteurAgricole') private befreeProprieteurAgricole: Model<BefreeProprieteurAgricole>,
    @InjectModel('BefreeExtraExploitationAgricole') private befreeExtraExploitationAgricole: Model<BefreeExtraExploitationAgricole>,
  ) { }



  async postBefreePays(housea: BefreePays): Promise<BefreePays> {
    return await this.befreePays.create(housea);
  }

  async postBefreeCooperative(houseb: BefreeCooperative): Promise<BefreeCooperative> {
    return await this.befreeCooperative.create(houseb);
  }


  async postBefreeCategorie(housed: BefreeCategorie): Promise<BefreeCategorie> {
    return await this.befreeCategorie.create(housed);
  }




  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Post Agrulter @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

  async postBefreeAgrulter(housec: BefreeAgrulter): Promise<{ message: string } | { _id: string }> {
    const { identifiant_interne_exploitation } = housec;

    try {
      const existingAgri = await this.befreeAgrulter.findOne({ identifiant_interne_exploitation });

      if (existingAgri) {
        return { message: "phoneused" };
      } else {
        const newAgriculter = await this.befreeAgrulter.create(housec);
        return { _id: newAgriculter._id };
      }
    } catch (error) {
      throw new Error(`Error while creating agriculter: ${error.message}`);
    }
  }


  async postBefreeExploitationAgricole(housed: BefreeExploitationAgricole): Promise<BefreeExploitationAgricole> {
    return await this.befreeExploitationAgricole.create(housed);
  }

  async postBefreeTravailleurAgricole(housed: BefreeTravailleurAgricole): Promise<BefreeTravailleurAgricole> {
    return await this.befreeTravailleurAgricole.create(housed);
  }

  async postBefreeInspecteurAgricole(housed: BefreeInspecteurAgricole): Promise<BefreeInspecteurAgricole> {
    return await this.befreeInspecteurAgricole.create(housed);
  }

  async postBefreeProprieteurAgricole(housed: BefreeProprieteurAgricole): Promise<BefreeProprieteurAgricole> {
    return await this.befreeProprieteurAgricole.create(housed);
  }

  async postBefreeExtraExploitationAgricole(housed: BefreeExtraExploitationAgricole): Promise<BefreeExtraExploitationAgricole> {
    return await this.befreeExtraExploitationAgricole.create(housed);
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
  async getLastItemToGenerate(): Promise<BefreeAgrulter> {
    return await this.befreeAgrulter.findOne().sort({ _id: -1 });
  }
  

  async getAllBefreePays(): Promise<BefreePays[]> {
    return await this.befreePays.find()//.populate('person').sort({ created: -1 });
  }

  async getAllBefreeCooperative(): Promise<BefreeCooperative[]> {
    return await this.befreeCooperative.find();
  }


  async getAllBefreePayCooperative(id: string): Promise<BefreeCooperative[]> {
    return await this.befreeCooperative.find({ categorie: id });
  }

  async getAllBefreeAgrulter(skipNum: number = 0, limitNum: number = 100): Promise<{ agriculter: BefreeAgrulter[], agrilength: any }> {
    const agrilength = await this.befreeAgrulter.countDocuments()//.exec();
    const agriculter = await this.befreeAgrulter.find()
      .skip(skipNum)
      .limit(limitNum);
    return { agriculter, agrilength };
  }


  async getAllBefreeCategorie(): Promise<BefreeCategorie[]> {
    return await this.befreeCategorie.find();
  }


  async getAllBefreePayCategorie(id: string): Promise<BefreeCategorie[]> {
    return await this.befreeCategorie.find({ pays: id });
  }

  async getBefreeAgrulterById(id: string, skipNum: number = 0, limitNum: number = 100): Promise<{ agriculter: BefreeAgrulter[], agrilength: any }> {
    const agrilength = await this.befreeAgrulter.countDocuments({ cooperative: id })//.exec();
    const agriculter = await this.befreeAgrulter.find({ cooperative: id })
      .skip(skipNum)
      .limit(limitNum);
    return { agriculter, agrilength };
  }


  async getByIdItergetBefreeAgrulter(inid: string): Promise<BefreeAgrulter> {
    return await this.befreeAgrulter.findOne({ identifiant_interne_exploitation: inid }).populate("cooperative");
  }


  async getByIdBefreeAgrulter(id: string): Promise<{
    operateur: BefreeAgrulter,
    agricole: BefreeExploitationAgricole,
    proprierteur: BefreeProprieteurAgricole,
    travailleur: BefreeTravailleurAgricole,
    inspecteur: BefreeInspecteurAgricole,
    ExtraExploitation: BefreeExtraExploitationAgricole,
  }> {
    const data = {
      operateur: {} as BefreeAgrulter,
      agricole: {} as BefreeExploitationAgricole,
      proprierteur: {} as BefreeProprieteurAgricole,
      travailleur: {} as BefreeTravailleurAgricole,
      inspecteur: {} as BefreeInspecteurAgricole,
      ExtraExploitation: {} as BefreeExtraExploitationAgricole,
    };

    try {
      const operateur = await this.befreeAgrulter.findById(id).populate("cooperative");
      if (!operateur) {
        throw new Error(`Agriculter with id ${id} not found`);
      }
      data.operateur = operateur;

      const agricole = await this.befreeExploitationAgricole.findOne({ agriculter: operateur._id });
      data.agricole = agricole ? agricole : {} as BefreeExploitationAgricole;

      const proprierteur = await this.befreeProprieteurAgricole.findOne({ agriculter: operateur._id });
      data.proprierteur = proprierteur ? proprierteur : {} as BefreeProprieteurAgricole;

      const travailleur = await this.befreeTravailleurAgricole.findOne({ agriculter: operateur._id });
      data.travailleur = travailleur ? travailleur : {} as BefreeTravailleurAgricole;

      const inspecteur = await this.befreeInspecteurAgricole.findOne({ agriculter: operateur._id });
      data.inspecteur = inspecteur ? inspecteur : {} as BefreeInspecteurAgricole;

      const ExtraExploitation = await this.befreeExtraExploitationAgricole.findOne({ agriculter: operateur._id });
      data.ExtraExploitation = ExtraExploitation ? ExtraExploitation : {} as BefreeExtraExploitationAgricole;

      return data;
    } catch (error) {
      throw new Error(`Error while retrieving agriculter or agriculture: ${error.message}`);
    }
  }






  async getBefreeExploitationAgricole(): Promise<BefreeExploitationAgricole[]> {
    return await this.befreeExploitationAgricole.find();
  }

  async getBefreeTravailleurAgricole(): Promise<BefreeTravailleurAgricole[]> {
    return await this.befreeTravailleurAgricole.find();
  }

  async getBefreeInspecteurAgricole(): Promise<BefreeInspecteurAgricole[]> {
    return await this.befreeInspecteurAgricole.find();
  }

  async getBefreeProprieteurAgricole(): Promise<BefreeProprieteurAgricole[]> {
    return await this.befreeProprieteurAgricole.find();
  }

  async getBefreeExtraExploitationAgricole(): Promise<BefreeExtraExploitationAgricole[]> {
    return await this.befreeExtraExploitationAgricole.find();
  }


  async getByidBefreeExploitationAgricole(id: string): Promise<BefreeExploitationAgricole> {
    return await this.befreeExploitationAgricole.findOne({ agriculter: id });
  }

  async getByidBefreeTravailleurAgricole(id: string): Promise<BefreeTravailleurAgricole> {
    return await this.befreeTravailleurAgricole.findOne({ agriculter: id });
  }

  async getByidBefreeInspecteurAgricole(id: string): Promise<BefreeInspecteurAgricole> {
    return await this.befreeInspecteurAgricole.findOne({ agriculter: id });
  }

  async getByidBefreeProprieteurAgricole(id: string): Promise<BefreeProprieteurAgricole> {
    return await this.befreeProprieteurAgricole.findOne({ agriculter: id });
  }

  async getByidBefreeExtraExploitationAgricole(id: string): Promise<BefreeExtraExploitationAgricole> {
    return await this.befreeExtraExploitationAgricole.findOne({ agriculter: id });
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
    return { done: "done" }

  }


  async updateBefreeCooperative(id: string, house: BefreeCooperative): Promise<any> {
    const housea = await this.befreeCooperative.findByIdAndUpdate(id, house);
    if (!housea) {
      throw new HttpException('house not found', HttpStatus.NOT_FOUND);
    }
    return { done: "done" }

  }

  async updateBefreeAgrulter(id: string, house: BefreeAgrulter): Promise<any> {
    const housea = await this.befreeAgrulter.findByIdAndUpdate(id, house);
    if (!housea) {
      throw new HttpException('house not found', HttpStatus.NOT_FOUND);
    }

    return { done: "done" }
  }

  async updateBefreeCategorie(id: string, house: BefreeCategorie): Promise<any> {
    const housea = await this.befreeCategorie.findByIdAndUpdate(id, house);
    if (!housea) {
      throw new HttpException('house not found', HttpStatus.NOT_FOUND);
    }
    return { done: "done" }
  }






  async updateByidBefreeExploitationAgricole(id: string, house: any): Promise<any> {
    const housea = await this.befreeExploitationAgricole.findByIdAndUpdate(id, house);
    if (!housea) {
      throw new HttpException('house not found', HttpStatus.NOT_FOUND);
    }
    return { done: "done" }
  }

  async updateByidBefreeTravailleurAgricole(id: string, house: any): Promise<any> {
    const housea = await this.befreeTravailleurAgricole.findByIdAndUpdate(id, house);
    if (!housea) {
      throw new HttpException('house not found', HttpStatus.NOT_FOUND);
    }
    return { done: "done" }
  }

  async updateByidBefreeInspecteurAgricole(id: string, house: any): Promise<any> {
    const housea = await this.befreeInspecteurAgricole.findByIdAndUpdate(id, house);
    if (!housea) {
      throw new HttpException('house not found', HttpStatus.NOT_FOUND);
    }
    return { done: "done" }
  }

  async updateByidBefreeProprieteurAgricole(id: string, house: any): Promise<any> {
    const housea = await this.befreeProprieteurAgricole.findByIdAndUpdate(id, house);
    if (!housea) {
      throw new HttpException('house not found', HttpStatus.NOT_FOUND);
    }
    return { done: "done" }
  }

  async updateByidBefreeExtraExploitationAgricole(id: string, house: any): Promise<any> {
    const housea = await this.befreeExtraExploitationAgricole.findByIdAndUpdate(id, house);
    if (!housea) {
      throw new HttpException('house not found', HttpStatus.NOT_FOUND);
    }
    return { done: "done" }
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


  async deleteBefreeCategorie(id: string): Promise<any> {
    return await this.befreeCategorie.findByIdAndRemove(id);
  }




  async deleteBefreeExploitationAgricole(id: string): Promise<any> {
    return await this.befreeExploitationAgricole.findByIdAndRemove(id);
  }
  async deleteBefreeTravailleurAgricole(id: string): Promise<any> {
    return await this.befreeTravailleurAgricole.findByIdAndRemove(id);
  }
  async deleteBefreeInspecteurAgricole(id: string): Promise<any> {
    return await this.befreeInspecteurAgricole.findByIdAndRemove(id);
  }
  async deleteBefreeProprieteurAgricole(id: string): Promise<any> {
    return await this.befreeProprieteurAgricole.findByIdAndRemove(id);
  }
  async deleteBefreeExtraExploitationAgricole(id: string): Promise<any> {
    return await this.befreeExtraExploitationAgricole.findByIdAndRemove(id);
  }

}
