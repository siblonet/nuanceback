import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './entities/transaction.entity';
import { PeopleBefreeWalletService } from '../people/people.service';
import { AccountData, PersonWallet } from '../people/entities/person.entity';


@Injectable()
export class TransactionBefreeWalletService {

  constructor(
    @InjectModel('TransactionBefreeWallet') private transactionModel: Model<Transaction>,
    @InjectModel('PeopleBefreeWallet') private personModel: Model<PersonWallet>,
    @InjectModel('AccountData') private accountDataModel: Model<AccountData>,
    private readonly peopleService: PeopleBefreeWalletService) { }




  async create(transaction: any) {

    const sender = await this.personModel.findOne({ phone: transaction.operator });
    const receivo = await this.personModel.findOne({ phone: transaction.receiva });

    const reconstration = {
      amount: transaction.amount,
      operator: sender._id,
      receiva: receivo._id,
      status: transaction.status,
      fee: transaction.fee,
      transation_id: transaction.transation_id,
      transfatype: transaction.transfatype,
      operatortype: transaction.operatortype,
    }

    const transact = await this.transactionModel.create({
      ...reconstration
    });

    await transact.save();

    await this.accountDataModel.findByIdAndUpdate(sender.account,
      { $inc: { balance: - transaction.amount, limit: - transaction.amount } },
      { new: true }
    );

    await this.accountDataModel.findByIdAndUpdate(receivo.account,
      { $inc: { balance: + transaction.amount, limit: - transaction.amount } },
      { new: true }
    );
    //await this.decreaseArticleQuantity("account limit reduice");

    const dato = {
      "sound": "default",
      "title": `${transaction.transfatype} par ${sender.nom + sender.prenom} - ${sender.phone}`,
      "body": `${transaction.amount} F ${transaction.transfatype}`,
    }
    await this.peopleService.sendExpoPushNotifications(dato, receivo.pushtoken);

    return { done: transact };
  }


  async allArticles(): Promise<Transaction[]> {
    return await this.transactionModel.find().sort({ created_at: -1 }).populate('articles.arti_id').populate('client');
  }


  async getmyTransaction(id: string): Promise<Transaction[]> {
    return await this.transactionModel.find({
      $or: [
        { operator: id },
        { receiva: id },
      ]
    }).populate('operator').populate('receiva');
  }



  async updateOrderStatus(id: string, statuts: any): Promise<any> {
    //console.log(id, statuts);

    const admin = await this.transactionModel.findByIdAndUpdate(id, statuts);

    if (!admin) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return "done";
  }


  async paymentStatus(Transactionid: any): Promise<any> {
    //console.log(id, statuts);

    const admin = await this.transactionModel.findOneAndUpdate({ transaction_id: Transactionid }, { payment_status: "paid" });

    if (!admin) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return "done";
  }

  /*
    async canceleOrders(id: string) {
      try {
        const order = await this.transactionModel.findById(id);
  
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
  
        await this.transactionModel.findByIdAndRemove(id);
        return 'done';
      } catch (error) {
        console.error('Error cancelling orders:', error.message);
        throw error; // Rethrow the error for further handling or logging
      }
    };
  
  
    async removeOrders(id: string, artid: string, quan: Number) {
      await this.transactionModel.findByIdAndRemove(id);
      this.increaseArticleQuantity(artid, quan);
      return 'done';
    };
  
    async removeOrdersArticl(id: string, ad: string, artid: string, quan: Number) {
      await this.transactionModel.findByIdAndUpdate(id,
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
      return "done";
  
    }*/
}
