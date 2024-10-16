import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActionedData, Article } from 'src/home/entities/activity.entity';
import { PeopleService } from 'src/people/people.service';
import { Order } from './entities/order.entity';
import axios from 'axios';


@Injectable()
export class OrderService {

  constructor(
    @InjectModel('OrderDoud') private orderModel: Model<Order>,
    @InjectModel('NuanceDoud') private boutiqueModel: Model<Article>,
    @InjectModel('ActionedData') private actionedModel: Model<ActionedData>,
    private readonly peopleService: PeopleService) { }




  async create(soft_use: string, creata_id: string, acrticle: Order, owner: String) {
    console.log(soft_use, creata_id, owner);
    if (soft_use && creata_id && soft_use !== "nuance" && creata_id !== "nuance") {

      const articl = await this.orderModel.create({
        ...acrticle
      });
      await articl.save();
      await this.decreaseArticleQuantity(soft_use, creata_id, acrticle.articles);

      if (!acrticle.statut || acrticle.statut !== "done") {
        const dato = {
          "sound": "default",
          "title": `Une commands de ${acrticle.articles.length} articles`,
          "body": `${acrticle.articles[0].prix * acrticle.articles[0].quantcho} F`
        }
        await this.peopleService.sendExpoPushNotifications(dato, owner);


      } else {
        null
      }

      const order = await this.orderModel.findById(articl._id).populate('articles.arti_id').populate('client');
      return { created_order: order };
    }
    throw new HttpException('user id needed create', HttpStatus.BAD_REQUEST)
  }


  async createOnlinePayment(soft_use: string, creata_id: string, acrticle: Order, customer: string, owner: string) {
    //console.log(soft_use, creata_id, customer, owner);
    if (soft_use && creata_id && soft_use !== "nuance" && creata_id !== "nuance") {

      try {
        const articl = await this.orderModel.create({ ...acrticle });
        await articl.save();
        await this.decreaseArticleQuantity(soft_use, creata_id, acrticle.articles);

        const dato = {
          sound: 'default',
          title: `Une commande de ${acrticle.articles.length} articles`,
          body: `${acrticle.articles[0].prix * acrticle.articles[0].quantcho} F`,
        };

        await this.peopleService.sendExpoPushNotifications(dato, owner);



        const postData = {
          apikey: 'ae236ee337b78dfc46a24e3a50e1a270fce8db37',
          service: '010324183052320001',
          amount: String(articl.reduction), // Convert to string
          custom_data: articl._id,
          extra: acrticle.transaction_id,
          provider: articl.payment_method,
          customer: customer,
        };

        const apiUrl = 'https://kaliapay.com/flash-light/';

        const response = await axios.post(
          apiUrl,
          new URLSearchParams(postData).toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        );

        return { orderid: response.data.url };
      } catch (error) {
        console.error('Error:', error);
        return { orderid: acrticle._id };
      }
    }
    throw new HttpException('user id needed createOnlinePayment', HttpStatus.BAD_REQUEST)

  }








  async syncro(acrticle: Order, owner: String) {
    const articl = await this.orderModel.create({
      ...acrticle
    });
    await articl.save();
    return { done: articl._id };
  }


  async decreaseArticleQuantity(soft_use: string, creata_id: string, articles: any[]) {
    //console.log(soft_use, creata_id);

    if (soft_use && creata_id && soft_use !== "nuance" && creata_id !== "nuance") {

      try {
        for (const article of articles) {
          await this.boutiqueModel.findByIdAndUpdate(
            article.arti_id,
            { $inc: { quantity: -article.quantcho, quanvend: +article.quantcho } },
            { new: true }
          );
          await this.actionedModel.create({
            actioned_article: article.arti_id,
            actioned_user: creata_id,
            action: "Decreasing article quantity for order",
            soft_use: soft_use,
          });
        }

      } catch (error) {
        throw new Error(`Failed to decrease article quantities: ${error.message}`);
      }
    } else {
      throw new HttpException('user id needed decreaseArticleQuantity', HttpStatus.BAD_REQUEST)
    }
  }



  async increaseArticleQuantity(soft_use: string, creata_id: string, id: string, quan: Number): Promise<any> {
    if (soft_use && creata_id && soft_use !== "nuance" && creata_id !== "nuance") {

      try {
        const result = await this.boutiqueModel.findByIdAndUpdate(
          id,
          { $inc: { quantity: +quan, quanvend: -quan } },
          { new: true } // to get the updated document
        );

        await this.actionedModel.create({
          actioned_article: id,
          actioned_user: creata_id,
          action: "increasing article quantity for cancel order",
          soft_use: soft_use,
        });
        return result;
      } catch (error) {
        throw new Error(`Failed to decrease article quantity: ${error.message}`);
      }
    }
    throw new HttpException('user id needed increaseArticleQuantity', HttpStatus.BAD_REQUEST)
  }


  async allArticles(owner: String): Promise<Order[]> {
    return await this.orderModel.find({ owner: owner }).sort({ created: -1 }).populate('articles.arti_id').populate('client');
  }

  async allUntraitedOrder(owner: String): Promise<Order[]> {
    return await this.orderModel.find({ owner, statut: { $ne: 'done' } }).sort({ created: -1 }).populate('articles.arti_id').populate('client');
  }

  async alltraitedOrder(owner: string, skipNum: number, limitNum: number): Promise<{ lengf: number, orders: Order[] }> {
    const lengf = await this.orderModel.countDocuments({ owner, statut: 'done' })//.exec();

    const orders = await this.orderModel.find({ owner, statut: 'done' })
      .skip(skipNum)
      .limit(limitNum)
      .sort({ created: -1 })
      .populate('articles.arti_id')
      .populate('client');
    // Return the length and the fetched orders
    return { lengf, orders };
  }



  async getmyOrders(id: string): Promise<Order[]> {
    return await this.orderModel.find({ client: id }).populate('articles.arti_id');
  }

  async updateOrder(id: string, od: string, updatedArticle: any): Promise<any> {
    const admin = await this.orderModel.findOneAndUpdate(
      { _id: id, 'articles._id': od },
      {
        $set: {
          'articles.$.quantcho': updatedArticle.quantcho,
          ville: updatedArticle.ville,
          commune: updatedArticle.commune,
          lieu: updatedArticle.lieu,
          phone: updatedArticle.phone,
        },
      },
      { new: true }
    );

    if (!admin) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return { done: "done" };
  }



  async OrderEchange(orderid: string, orderarticleid: any, articleid: any, echangedata: any): Promise<any> {
    //console.log(id, statuts);

    const order = await this.orderModel.findOneAndUpdate(
      { _id: orderid, 'articles._id': orderarticleid },
      {
        $set: {
          'articles.$.arti_id': articleid,
          'articles.$.quantcho': echangedata.quantcho,
          'articles.$.prix': echangedata.prix,
          reduction: echangedata.reduction,
        },
      },
      { new: true }
    );

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return { done: "done" };
  }

  async updateOrderStatus(id: string, statuts: any): Promise<any> {
    //console.log(id, statuts);

    const admin = await this.orderModel.findByIdAndUpdate(id, statuts);

    if (!admin) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return { done: "done" };
  }


  async paymentStatus(payment_status_data: any): Promise<any> {
    const admin = await this.orderModel.findByIdAndUpdate(payment_status_data.extra_data, { payment_status: payment_status_data.txn_status == "failed" ? "nopay" : "paid", statut: payment_status_data.txn_status == "failed" ? "fail" : "onway" });
    if (!admin) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return { done: "done" }
  }


  async canceleOrders(soft_use: string, creata_id: string, id: string) {
    if (soft_use && creata_id && soft_use !== "nuance" && creata_id !== "nuance") {

      try {
        const order = await this.orderModel.findById(id);

        if (!order) {
          throw new Error('Order not found');
        }

        for (const article of order.articles) {
          const { arti_id, quantcho } = article;
          const updatedBoutique = await this.boutiqueModel.findById(arti_id);

          if (updatedBoutique) {
            await this.boutiqueModel.findOneAndUpdate(
              { _id: arti_id },
              { $inc: { quantity: +quantcho, quanvend: -quantcho } },
              { new: true }
            );

            await this.actionedModel.create({
              actioned_article: arti_id,
              actioned_user: creata_id,
              action: "Decreasing articles for canceled order",
              soft_use: soft_use,
            });
          }
        }

        await this.orderModel.findByIdAndRemove(id);
        return { done: "done" };
      } catch (error) {
        console.error('Error cancelling orders:', error.message);
        throw error; // Rethrow the error for further handling or logging
      }
    }
    throw new HttpException('user id needed', HttpStatus.BAD_REQUEST)
  };


  async removeOrders(soft_use: string, creata_id: string, id: string, artid: string, quan: Number) {
    if (soft_use && creata_id && soft_use !== "nuance" && creata_id !== "nuance") {

      await this.orderModel.findByIdAndRemove(id);
      this.increaseArticleQuantity(soft_use, creata_id, artid, quan);
      return { done: "done" };
    }
    throw new HttpException('user id needed', HttpStatus.BAD_REQUEST)
  };

  async articleAreadyremoved(id: string) {
    await this.orderModel.findByIdAndRemove(id);
    return { done: "done" };
  };


  async removeOrdersArticl(soft_use: string, creata_id: string, id: string, ad: string, artid: string, quan: Number) {
    if (soft_use && creata_id && soft_use !== "nuance" && creata_id !== "nuance") {

      await this.orderModel.findByIdAndUpdate(id,
        {
          $pull:
          {
            articles: {
              _id: ad
            }
          }
        },
        { new: true }
      );

      this.increaseArticleQuantity(soft_use, creata_id, artid, quan);
      return { done: "done" };
    }
    throw new HttpException('user id needed', HttpStatus.BAD_REQUEST)
  }

}
