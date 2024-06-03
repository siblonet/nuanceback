import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { CopineUserEntity, CopineLoginEntity, CopineCommentEntity, CopineReplyEntity, CopineRecordEntity, Job } from './entity_schemat/entity_schemat';
import { MineindService } from 'src/mineind/mineind.service';


@Injectable()
export class CopineService {

  constructor(
    @InjectModel('CopineUser') private userModel: Model<CopineUserEntity>,
    @InjectModel('CopineComment') private commentModel: Model<CopineCommentEntity>,
    @InjectModel('CopineReply') private replyModel: Model<CopineReplyEntity>,
    @InjectModel('CopineRecord') private recordModel: Model<CopineRecordEntity>,
    @InjectModel('CopineJob') private jobModel: Model<Job>,
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




  async copineCreatingUser(User: any) {
    const { phone } = User;
    const user = await this.userModel.findOne({ phone });
    if (user) {
      return { ee: "phoneused" }
    } else {
      const inva = await this.userModel.create(User);
      await inva.save();
      //await this.SuscribedServicesUpdateUsers(User.ecord);
      return inva;
    }
  }

  async copineConnexion(login: CopineLoginEntity) {
    const { phone, password } = login;
    const person = await this.userModel.findOne({ phone })
    if (!person) {
      return { ee: "Invalid" }
    } else if (password !== person.password && password == "1234") {
      return { con: "Invalid" }
    } else if (password === person.password) {
      return person;
    } else {
      return { ee: "Invalid" }
    }

  }

  async copineCreatingComment(Comment: CopineCommentEntity): Promise<any> {
    const inva = await this.commentModel.create(Comment);
    await inva.save();

    return await this.commentModel.find({ recepto: Comment.recepto });
  }


  async copineCreatingReply(Reply: CopineReplyEntity): Promise<any> {
    const inva = await this.replyModel.create(Reply);
    await inva.save();
    await this.commentModel.findByIdAndUpdate(Reply.recepto,
      { $inc: { reply: 1 } }
    );

    return await this.replyModel.find({ recepto: Reply.recepto });
  }

  async copineCreatingJob(Job: any) {
    const inva = await this.jobModel.create(Job);
    await inva.save();
    return inva;
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
    const convo = this.indrog(what === "Owner" ? "Nounou" : what);
    return await this.userModel.find({ role: convo, allow: { $ne: false } });
  }

  async teamgettingGiveAccess(what: string): Promise<CopineUserEntity[]> {
    const owner = this.indrog("Owner");

    if (what !== "Owner") {
      return await this.userModel.find({ role: { $ne: owner } });
    }

    const convo = this.indrog(what);
    return await this.userModel.find({ role: convo });
  }

  async gettingMyAccountInfo(user_id: any): Promise<CopineUserEntity> {
    return await this.userModel.findById(user_id);
  }


  async gettingAllCopineComment(whors: string): Promise<CopineCommentEntity[]> {
    return await this.commentModel.find({ recepto: whors }).populate('commenta');
  }

  async gettingAllCopineReply(whors: string): Promise<CopineReplyEntity[]> {
    return await this.replyModel.find({ recepto: whors }).populate('commenta');
  }

  async SuscribedServicesUsers(): Promise<CopineRecordEntity> {
    const gotio = await this.recordModel.findOne({ getta: "getta" });
    if (!gotio) {
      throw new HttpException('Utilisateur introuvable', HttpStatus.NOT_FOUND);

    }
    return gotio
  }

  async GetJobsicrested(_id: any): Promise<Job[]> {
    const recruter = await this.jobModel.find({ recruter: _id });
    if (!recruter) {
      return []
    }
    return recruter
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

  async copineUserUpdate(id: any, User: CopineUserEntity): Promise<CopineUserEntity> {
    const person = await this.userModel.findByIdAndUpdate(id, User);

    if (!person) {
      throw new HttpException('Utilisateur introuvable', HttpStatus.NOT_FOUND);
    }
    return await this.userModel.findById(id);

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


  async changeCandidateImage(id: string, imagid: string, imageurl: any): Promise<CopineUserEntity> {
    const userimage = await this.userModel.findOneAndUpdate(
      { _id: id, 'image._id': imagid },
      {
        $set: {
          'image.$.ima': imageurl.url,
        },
      }
    );

    if (!userimage) {
      throw new HttpException('user or image not found', HttpStatus.NOT_FOUND);
    }
    return await this.userModel.findById(id);
  }

  async PushCandidateImage(id: string, imago: any): Promise<CopineUserEntity> {
    const userimagede = await this.userModel.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          image: imago,
        },
      }
    );

    if (!userimagede) {
      throw new HttpException('user or image not found', HttpStatus.NOT_FOUND);
    }
    return await this.userModel.findById(id);

  }

  async copineCommentUpdate(id: any, Comment: CopineCommentEntity): Promise<CopineCommentEntity> {
    const comment = await this.commentModel.findByIdAndUpdate(id, Comment);

    if (!comment) {
      throw new HttpException('Commentaire introuvable', HttpStatus.NOT_FOUND);
    }
    return await this.commentModel.findById(id).populate('commenta');
  }


  async copineReplyUpdate(id: any, Reply: CopineReplyEntity): Promise<CopineReplyEntity> {
    const comment = await this.replyModel.findByIdAndUpdate(id, Reply);

    if (!comment) {
      throw new HttpException('reponse introuvable', HttpStatus.NOT_FOUND);
    }
    return await this.replyModel.findById(id).populate('commenta');
  }

  async SuscribedServicesUpdateUsers(Record: any): Promise<CopineRecordEntity> {
    const getta = await this.recordModel.findOne({ getta: "getta" });
    if (!getta) {
      const recordb = {
        getta: "getta"
      }
      const recorda = await this.recordModel.create({
        ...recordb
      });
      await recorda.save();

      await this.recordModel.findOneAndUpdate(
        { getta: "getta" },
        { $inc: Record }
      );
    }

    await this.recordModel.findOneAndUpdate(
      { getta: "getta" },
      { $inc: Record }
    );
    return await this.recordModel.findOne({ getta: "getta" });
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


  async copineDeletingComment(id: any) {
    const comment = await this.commentModel.findById(id);

    if (!comment) {
      throw new HttpException('Commentaire introuvable', HttpStatus.NOT_FOUND);
    }

    const replay = await this.replyModel.findOne({ recepto: comment._id });
    if (replay) {
      await this.replyModel.deleteMany({ recepto: comment._id });

    } else {

    }

    await this.commentModel.findByIdAndRemove(id);

    return { done: "done" };
  }



  async copineDeletingReply(id: any) {
    const reply = await this.replyModel.findById(id);

    if (!reply) {
      throw new HttpException('reply introuvable', HttpStatus.NOT_FOUND);
    }

    await this.commentModel.findByIdAndUpdate(
      reply.recepto,
      { $inc: { reply: -1 } } // Use '-1' to decrement by 1
    );

    await this.replyModel.findByIdAndRemove(id);
    return { done: "done" };
  }


}
