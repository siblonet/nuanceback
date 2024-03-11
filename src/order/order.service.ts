import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from 'src/home/entities/activity.entity';
import { PeopleService } from 'src/people/people.service';
import { Order } from './entities/order.entity';
import axios from 'axios';


@Injectable()
export class OrderService {

  constructor(
    @InjectModel('OrderDoud') private orderModel: Model<Order>,
    @InjectModel('NuanceDoud') private boutiqueModel: Model<Article>,
    private readonly peopleService: PeopleService) { }




  async create(acrticle: Order, owner: String) {
    const articl = await this.orderModel.create({
      ...acrticle
    });
    await articl.save();
    await this.decreaseArticleQuantity(acrticle.articles);

    if (!acrticle.statut || acrticle.statut !== "done") {
      const dato = {
        "sound": "default",
        "title": `Une commands de ${acrticle.articles.length} articles`,
        "body": `${acrticle.articles[0].prix * acrticle.articles[0].quantcho} F`
      }
      await this.peopleService.sendExpoPushNotifications(dato, owner);

      const urlo = `http://localhost:3000/live/${owner}`;
      const urpu = `https://liveshopping.adaptable.app/live/${owner}`;

      axios.post(urpu, dato).then().catch(err => {
        console.error(err);
      });

    } else {
      null
    }

    return { orderid: articl };
  }


  async createOnlinePayment(acrticle: Order, customer: string, owner: string) {
    try {
      const articl = await this.orderModel.create({ ...acrticle });
      await articl.save();
      await this.decreaseArticleQuantity(acrticle.articles);

      const dato = {
        sound: 'default',
        title: `Une commande de ${acrticle.articles.length} articles`,
        body: `${acrticle.articles[0].prix * acrticle.articles[0].quantcho} F`,
      };

      await this.peopleService.sendExpoPushNotifications(dato, owner);

      const urpu = `https://liveshopping.adaptable.app/live/${owner}`;
      await axios.post(urpu, dato);

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








  async syncro(acrticle: Order, owner: String) {
    const articl = await this.orderModel.create({
      ...acrticle
    });
    await articl.save();
    return { done: articl._id };
  }


  async decreaseArticleQuantity(articles: any[]) {
    try {
      for (const article of articles) {
        await this.boutiqueModel.findByIdAndUpdate(
          article.arti_id,
          { $inc: { quantity: -article.quantcho, quanvend: +article.quantcho } },
          { new: true }
        );
      }
    } catch (error) {
      throw new Error(`Failed to decrease article quantities: ${error.message}`);
    }
  }

  async increaseArticleQuantity(id: string, quan: Number): Promise<any> {
    try {
      const result = await this.orderModel.findByIdAndUpdate(
        id,
        { $inc: { quantity: +quan, quanvend: -quan } },
        { new: true } // to get the updated document
      );
      return result;
    } catch (error) {
      throw new Error(`Failed to decrease article quantity: ${error.message}`);
    }
  }


  async allArticles(owner: String): Promise<Order[]> {
    return await this.orderModel.find({ owner: owner }).sort({ created: -1 }).populate('articles.arti_id').populate('client');
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

  async updateOrderStatus(id: string, statuts: any): Promise<any> {
    //console.log(id, statuts);

    const admin = await this.orderModel.findByIdAndUpdate(id, statuts);

    if (!admin) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return { done: "done" };
  }


  async paymentStatus(payment_status_data: any): Promise<any> {
    console.log(payment_status_data);
    const admin = await this.orderModel.findByIdAndUpdate(payment_status_data.custom_data, { payment_status: payment_status_data.txn_status == "failed" ? "nopay" : "paid", statut: payment_status_data.txn_status == "failed" ? "fail" : "onway" });
    if (!admin) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return { done: { done: "done" } }
  }


  async canceleOrders(id: string) {
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

        }
      }

      await this.orderModel.findByIdAndRemove(id);
      return { done: "done" };
    } catch (error) {
      console.error('Error cancelling orders:', error.message);
      throw error; // Rethrow the error for further handling or logging
    }
  };


  async removeOrders(id: string, artid: string, quan: Number) {
    await this.orderModel.findByIdAndRemove(id);
    this.increaseArticleQuantity(artid, quan);
    return { done: "done" };
  };

  async removeOrdersArticl(id: string, ad: string, artid: string, quan: Number) {
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

    this.increaseArticleQuantity(artid, quan);
    return { done: "done" };

  }
}
