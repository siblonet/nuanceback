import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActionedData, Annonce, Article, VersionAvailabe } from './entities/activity.entity';
import { v4 as uuidv4 } from 'uuid';
import { Storage } from '@google-cloud/storage';
import { MineindService } from 'src/mineind/mineind.service';
import { Order } from 'src/order/entities/order.entity';
import { Person } from 'src/people/entities/person.entity';

@Injectable()
export class ActivityService {
  private bucketName = 'seeme-7a462.appspot.com';

  constructor(
    @InjectModel('NuanceDoud') private boutiqueModel: Model<Article>,
    @InjectModel('AnnonceDoud') private annonceModel: Model<Annonce>,
    @InjectModel('VersionAvailabe') private versionavailModel: Model<VersionAvailabe>,
    @InjectModel('OrderDoud') private orderModel: Model<Order>,
    @InjectModel('People') private personModel: Model<Person>,
    @InjectModel('ActionedData') private actionedModel: Model<ActionedData>,
    private readonly mineindService: MineindService) { }

  private async initializeGoogleCloudStorage(): Promise<Storage> {
    const credentials = {
      "type": this.mineindService.thisiswhat("HVIERXV*ZXXLFMG"),
      "project_id": this.mineindService.thisiswhat("HVVNV:4Z759"),
      "private_key_id": this.mineindService.thisiswhat("84819ZU598Y5W05X04V1VZ0Y24YY3U23493Z37XY"),
      "private_key": `-----BEGIN PRIVATE KEY-----\n${this.mineindService.thisiswhat("nrrvEjryzwzmyTPJSPRt2D1yzjvuzzhxypXDTThQzTvzzLryzjxqWg3Kv3dfZfL3")}\nl1vM0LJPBURSB2Hm25y/30Mn7qO5RB8NeC11YiJqCTCQRKc9rTHzmEjoE8nyeXwi\nSLK22zGXMnx751vF7rOoUsNHBv5DhYEt9+aSByyW0utb89v9n51g9lSx007fe8M6\n2+wGhLYlc1WvS0+ulvUmE08Lck02d37Mr2OO/aDM6MkhJEe/VA20p+620BW3i+Zj\nKLzKJFboOxLSaYMYKkOrVJFqKPeVGzdtYUgxpNJtfYf5dviF5T4fUbWsTNm/sQP5\nnQ7Li/hHUqeAZf86DjTtw/EZfgy4jh6DLof7xys3vWZ4x6Il+exJq9ISN/NGBPsI\n36ZTo3UFAgMBAAECggEAETGKuHMiLCmtYP3XvDtAinTQsmf8/Xjr1u4wwr5tWT+l\nmLQ3D286ecPzgKAtwR+4V01tlSXghUVf2xP30rqBLfXhL0hlqNDuRPgxN+GujTiW\nS28uNobSM31ndiV/F27PKzE0r9eMDpU2+tZGZBxWgkG2boo/icmVGXGh2f8unEjQ\nND9yiyotU44pxLx9FT7G4pivoicquFHoZ/Azma7LGKjzB8rLQnbX7l6nhTaLKvXS\nttcqUSSJPa0ii6zWjpIxD5eh/03Ydce9rWy69PTouPnERk4aggiq2YG/2cYKy+zq\nZuXfteIEzTQcn/B68KP+Zuo22PHOLIdxEBNbMl4GQQKBgQC8LDGanBYe3m80OoiA\n1JbslLt2zdxQElZnFWt0OhcZNLVzJ6ThXxbdqYDrYeXhcRFAcWLmCbaPJBNG9sD7\nrjMA1pvPqOu4/jSzpvvYzDaXW9WSh8WD8+L1mEQcF972bQ1U2pnDUCPOxI4mydOT\nmiemy3O25hPxTcWZoopGgV5tJQKBgQC7AU/uf42RdfJhjD1Am/PKr8sry1J2Yu/d\ndsleLUMSN16Y2gHqxnRGMZbBYJ9jOsIh702HSxVlfdY8rPmnWx2pw8sxouL4U22f\nL7/xqZUwhLrUWyiFY1TVHlyEN1K23Co56scvI0j2gu08ZxuQuHsgIV8iXaJHUacW\n1wKn3BmSYQKBgQC3Tk3cESUzWPf3ZvXGmlGTkae0qgFuNw7YSHNuu4/4y/HehcYG\njb0WnaKqqalond5yaoIvGVMvybLFtGZ2RlIFBQqvlhxbD7eDMq2vme+sLpe0sHJm\nglSbboMa4t4eLEmKWZDkRNM8/xiDDKUA6nCp+RN2Hlda/6n4afBNkoTLyQKBgDQk\nv4b/JhhjTPyKQCId2jKwJfTGMu4z1DJqhuets0AHFGeGknZGc/GGrkSpjof6wFr6\nASIye3rbRbuRd+OEcpb9s1DZ3HPlv3FdvSXDZYgr2nSQHpJjCiqK1r0/N98pMNUJ\ndBTev9+Mzl3DWlpWNm7VH1PTzAYa7H5f4auwoajBAoGAUCmW9KPz/CT/Y5pZ8ubZ\n7fjeBumAlRVsXWiOxGmeInnFkLO9u7DVXXJkGnsSwPLaoxGQJo8scBjXBepesSPA\nHl635CnFWyey51nUvirdnE/95YFN7y0JLV3Jbh8rCuCKA09B3D/VH1nMqcEXqNnI\nfWPukMHgXmGvJgiMnXzT0Vw=\n-----END PRIVATE KEY-----\n`,
      "client_email": this.mineindService.thisiswhat("MLYOVHSLK`HVVNV:4Z759&RZN&THVIERXVZXXLFMG&XLN"),
      "client_id": this.mineindService.thisiswhat("011953168475223620145"),
      "auth_uri": this.mineindService.thisiswhat("SGGKH-²²ZXXLFMGH&TLLTOV&XLN²L²LZFGS9²ZFGS"),
      "token_uri": this.mineindService.thisiswhat("SGGKH-²²LZFGS9&TLLTOVZKRH&XLN²GLPVM"),
      "auth_provider_x509_cert_url": this.mineindService.thisiswhat("SGGKH-²²DDD&TLLTOVZKRH&XLN²LZFGS9²E0²XVIGH"),
      "client_x509_cert_url": this.mineindService.thisiswhat("SGGKH-²²DDD&TLLTOVZKRH&XLN²ILYLG²E0²NVGZWZGZ²C612²MLYOVHSLK[71HVVNV:4Z759&RZN&THVIERXVZXXLFMG&XLN"),
      "universe_domain": this.mineindService.thisiswhat("TLLTOVZKRH&XLN")
    };
    const storage = new Storage({ credentials });
    return storage;
  }




  async DeleteAnnonces(id: string, g: any): Promise<any> {
    const anonceim = await this.annonceModel.findById(id);

    if (!anonceim) {
      throw new HttpException('annonces not found', HttpStatus.NOT_FOUND);

    }
    await this.deleteImage({ image_url: anonceim.image })

    await this.annonceModel.findByIdAndUpdate(id, { image: "" });

    return { done: "done" };
  }



  async createImage(imagefolder: any, old_image: string = null): Promise<{ ima: string }> {
    const generatedUuid = this.generateUuid() + imagefolder.nam;
    const storage = await this.initializeGoogleCloudStorage();
    const bucket = storage.bucket(this.bucketName);
    const file = bucket.file(generatedUuid);

    if (old_image) {
      const filenamea = old_image.split('/').pop();
      await bucket.file(filenamea).delete();
    }

    const imageBuffer = Buffer.from(imagefolder.ima, 'base64');

    await file.save(imageBuffer, {
      metadata: {
        contentType: 'image/jpeg',
      },
    });
    const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${generatedUuid}`;
    return { ima: publicUrl };
  }

  async createFile(fileData: any, owner: any, id: any, old_image: string = null): Promise<{ url: string }> {
    const generatedUuid = this.generateUuid() + owner + fileData.nam; // Assuming 'nam' is the file name
    const storage = await this.initializeGoogleCloudStorage();
    const bucket = storage.bucket(this.bucketName);
    const file = bucket.file(generatedUuid);
    if (old_image) {
      const filenamea = old_image.split('/').pop();
      await bucket.file(filenamea).delete();
    }



    const fileBuffer = Buffer.from(fileData.ima, 'base64');

    const contentType = fileData.contentType || 'application/octet-stream'; // Default to binary if contentType is not provided

    await file.save(fileBuffer, {
      metadata: {
        contentType: contentType,
      },
    });

    const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${generatedUuid}`;
    try {
      const anonce = await this.annonceModel.findByIdAndUpdate(id, { image: publicUrl });
      if (!anonce) {
        await this.annonceModel.create({
          which: fileData.which,
          owner: owner,
          image: publicUrl
        });
      }
    } catch (error) {
      console.log(error.value);
      await this.annonceModel.create({
        which: fileData.which,
        owner: owner,
        image: publicUrl
      });

    }

    return { url: publicUrl };
  }


  async deleteImage(old_image: any = null): Promise<any> {
    try {
      const storage = await this.initializeGoogleCloudStorage();
      const bucket = storage.bucket(this.bucketName);

      if (old_image && old_image.image_url) {
        // Extract the filename from the image_url
        const filename = old_image.image_url.split('/').pop();
        await bucket.file(filename).delete();
      }

      return { done: "done" };
    } catch (error) {
      // Handle errors
      console.error('Error deleting image:', error);
      throw error;
    }
  }


  async versionAvailabe(version: VersionAvailabe): Promise<VersionAvailabe> {
    return await this.versionavailModel.create(version);
  }

  async versionAvailabeget(device: string): Promise<VersionAvailabe> {
    return await this.versionavailModel.findOne({ device: device });
  }

  async create(soft_use: string, creata_id: string, article: Article): Promise<Article> {
    if (soft_use && creata_id && soft_use !== "nuance" && creata_id !== "nuance") {
      const docid = await this.boutiqueModel.create(article);
      await this.actionedModel.create({
        actioned_article: docid._id,
        actioned_user: creata_id,
        action: "Created un article",
        soft_use: soft_use,
      });

      return docid._id;
    }
    throw new HttpException('user id needed', HttpStatus.BAD_REQUEST);

  }

  generateUuid(): string {
    return uuidv4();
  }

  async allData(owner: String): Promise<any> {
    const pagesetting = await this.annonceModel.find({ owner: owner });
    const article = await this.boutiqueModel.find({ owner: owner, quantity: { $ne: 0 } }).sort({ created: -1 });
    //const order = await this.orderModel.find({ owner: owner }).sort({ created: -1 }).populate('articles.arti_id').populate('client');
    return { article: article, pagesetting: pagesetting }
  }

  async allArticles(owner: String, wh: string): Promise<any> {
    return await this.boutiqueModel.find({ owner: owner, quantity: wh == "avail" ? { $ne: 0 } : 0 });
  }

  async searchArticles(owner: String): Promise<any> {
    return await this.boutiqueModel.find({ owner });
  }



  async returnDataLength(owner: string): Promise<any> {
    //2024-03-06T15:33:31.780+00:00
    const currentDate = new Date();
    const datePart = currentDate.toISOString().split('T')[0];

    const startOfDay = new Date(`${datePart}T00:00:00.000Z`);
    const endOfDay = new Date(`${datePart}T23:59:59.999Z`);
    const aAL = await this.boutiqueModel.countDocuments({ owner, quantity: { $ne: 0 } })//.exec();
    const eAL = await this.boutiqueModel.countDocuments({ owner, quantity: 0 })//.exec();
    const AMR = await this.actionedModel.countDocuments()//.exec();
    const udOL = await this.orderModel.find({ owner, statut: { $nin: ['done', 'fail'] } })//.exec();
    const dOL = await this.orderModel.countDocuments({
      owner,
      statut: 'done',
      created: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    })
    const fdOL = await this.orderModel.countDocuments({ owner, statut: 'fail' })//.exec();
    const PNL = await this.personModel.countDocuments({ owner, nom: { $ne: 'Anony' } })//.exec();
    const PNAL = await this.personModel.countDocuments({ owner, nom: 'Anony' })//.exec();

    const dOTP = await this.orderModel.aggregate([
      {
        $match: {
          owner: owner,
          statut: 'done',
          created: {
            $gte: startOfDay,
            $lt: endOfDay
          }
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$reduction' },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
        },
      },
    ]);

    const dataLength = {
      aAL,
      eAL,
      udOL,
      dOL,
      fdOL,
      PNL,
      PNAL,
      AMR,
      total: dOTP.length ? dOTP[0].total : 0
    };

    //await this.boutiqueModel.deleteMany({ addarticle: "KHAMRAH QAHWA", quantity: 0 });

    return dataLength;
  }

  async allAnonnces(owner: String): Promise<Annonce[]> {
    return await this.annonceModel.find({ owner: owner });
  }

  async userActionRecord(): Promise<ActionedData[]> {
    return await this.actionedModel.find().sort({ created: -1 }).populate("actioned_article").populate("actioned_user");
  }

  async updateArticles(soft_use: string, creata_id: string, id: string, article: Article): Promise<any> {
    if (soft_use && creata_id && soft_use !== "nuance" && creata_id !== "nuance") {

      const admin = await this.boutiqueModel.findByIdAndUpdate(id, article);
      if (!admin) {
        throw new HttpException('article not found', HttpStatus.NOT_FOUND);
      }

      await this.actionedModel.create({
        actioned_article: id,
        actioned_user: creata_id,
        action: "Updated un article",
        soft_use: soft_use,
      });
      return { done: 'done' };
    }
    throw new HttpException('user id needed', HttpStatus.BAD_REQUEST)
  }


  async discountAll(soft_use: string, creata_id: string, owner: string, perc: number, bod: any): Promise<any> {
    if (soft_use && creata_id && soft_use !== "nuance" && creata_id !== "nuance") {

      try {
        if (perc > 0) {
          const articles = await this.boutiqueModel.find({ owner: owner });
          for (let article of articles) {
            const percentage = (perc / 100) * article.addprix;
            const reducedPrice = article.addprix - percentage;
            await this.boutiqueModel.findByIdAndUpdate(article._id, { addreduction: reducedPrice });
          }
        } else {
          await this.boutiqueModel.updateMany({ owner: owner }, { addreduction: 0 });
        }
        await this.actionedModel.create({
          actioned_article: creata_id,
          actioned_user: creata_id,
          action: "Discounted all article",
          soft_use: soft_use,
        });
        return { done: 'Discount applied successfully' };
      } catch (error) {
        throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
      }
    }
    throw new HttpException('user id needed', HttpStatus.BAD_REQUEST)
  }



  async discountOne(soft_use: string, creata_id: string, id: string, article: Article): Promise<any> {
    if (soft_use && creata_id && soft_use !== "nuance" && creata_id !== "nuance") {

      const admin = await this.boutiqueModel.findByIdAndUpdate(id, { addreduction: article.addreduction });
      if (!admin) {
        throw new HttpException('article not found', HttpStatus.NOT_FOUND);
      }

      await this.actionedModel.create({
        actioned_article: id,
        actioned_user: creata_id,
        action: "Discounted an article",
        soft_use: soft_use,
      });
      return { done: 'done' };
    }
    throw new HttpException('user id needed', HttpStatus.BAD_REQUEST)
  }

  async removeArticle(soft_use: string, creata_id: string, id: string): Promise<any> {
    if (soft_use && creata_id && soft_use !== "nuance" && creata_id !== "nuance") {
      await this.boutiqueModel.findByIdAndRemove(id);

      await this.actionedModel.create({
        actioned_article: id,
        actioned_user: creata_id,
        action: "just deleted an article",
        soft_use: soft_use,
      });
      return { done: "done" }
    }

    throw new HttpException('user id needed', HttpStatus.BAD_REQUEST);

  }

}
