import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './entities/transaction.entity';
import { PeopleBefreeWalletService } from '../people/people.service';
import { AccountData, PersonWallet } from '../people/entities/person.entity';
import axios from 'axios';
import { MineindService } from 'src/mineind/mineind.service';


@Injectable()
export class TransactionBefreeWalletService {

  constructor(
    @InjectModel('TransactionBefreeWallet') private transactionModel: Model<Transaction>,
    @InjectModel('PeopleBefreeWallet') private personModel: Model<PersonWallet>,
    @InjectModel('AccountData') private accountDataModel: Model<AccountData>,
    private readonly peopleService: PeopleBefreeWalletService,
    private readonly mineindService: MineindService) { }


  async create(transaction: any) {
    const sender = await this.personModel.findOne({ phone: transaction.operator });
    const receivo = await this.personModel.findOne({ phone: transaction.receiva });
    const limitsender = await this.accountDataModel.findById(sender.account);
    const limitreceiver = await this.accountDataModel.findById(receivo.account);

    if (limitsender.limit > parseInt(transaction.amount) && limitreceiver.limit > parseInt(transaction.amount)) {
      const reconstration = {
        amount: transaction.amount,
        operator: sender._id,
        receiva: receivo._id,
        status: transaction.status,
        fee: transaction.fee,
        transfatype: transaction.transfatype,
        operatortype: transaction.operatortype,
      }

      const transact = await this.transactionModel.create({
        ...reconstration
      });

      await transact.save();

      try {
        const updatedSender = await this.accountDataModel.findByIdAndUpdate(
          sender.account,
          {
            $inc: { balance: -transaction.amount, limit: -transaction.amount }
          },
          { new: true }
        );

        if (!updatedSender) {
          throw new Error('Sender account not found');
        }

        const updatedReceiver = await this.accountDataModel.findByIdAndUpdate(
          receivo.account,
          {
            $inc: { balance: transaction.amount, limit: -transaction.amount }
          },
          { new: true }
        );

        if (!updatedReceiver) {
          throw new Error('Receiver account not found');
        }
      } catch (error) {
        console.error(error);
        throw new Error('Transaction failed');
      }

      const dato = {
        "sound": "default",
        "title": `${transaction.transfatype} par ${sender.nom + sender.prenom} - ${sender.phone}`,
        "body": `${transaction.amount} F ${transaction.transfatype}`,
      }
      await this.peopleService.sendExpoPushNotifications(dato, receivo.pushtoken);

      return { done: transact };
    } else {
      throw new Error('Transaction failed limited account');

    }
  }





  async walletRechargin(accounid: string, rechage: {
    transaction: {
      amount: string;
      status: string;
      fee: string;
      transfatype: string;
      operatortype: string;
    };
    rechagedata: {
      amount: string;
      currency: string;
      network: string;
      country: string;
      email: string;
      phone_number: string;
      fullname: string;
    };
  }): Promise<any> {
    try {
      const limitsender = await this.accountDataModel.findById(accounid);
      const sender = await this.personModel.findOne({ account: accounid });

      if (!limitsender || !sender) {
        throw new Error('Sender or account not found');
      }

      if (limitsender.limit > parseInt(rechage.transaction.amount)) {
        // Create transaction data
        const transactionData = {
          amount: rechage.transaction.amount,
          operator: sender._id,
          receiva: sender._id,
          status: rechage.transaction.status,
          fee: rechage.transaction.fee,
          transfatype: rechage.transaction.transfatype,
          operatortype: rechage.transaction.operatortype,
        };

        // Create and save the transaction
        const transact = await this.transactionModel.create(transactionData);
        await transact.save();

        // Prepare recharge data for the API call
        const api_key = this.generatApi('uodhvxp:6W1V8195073540U5U9Z3X4Y23X50WU51:029Z404W897EG:c');
        const rechageData = {
          tx_ref: transact._id.toString().toUpperCase(), // Convert transaction ID to uppercase
          amount: rechage.rechagedata.amount + parseFloat(rechage.transaction.fee),
          currency: rechage.rechagedata.currency,
          network: rechage.rechagedata.network,
          country: rechage.rechagedata.country,
          email: rechage.rechagedata.email,
          phone_number: rechage.rechagedata.phone_number,
          fullname: rechage.rechagedata.fullname,
        };

        // Make API call
        const apiUrl = "https://api.flutterwave.com/v3/charges?type=mobile_money_franco";
        const header = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${api_key}`,//Bearer
          },
        };

        const resp = await axios.post(apiUrl, rechageData, header);

        // Send notification to the user
        const notificationData = {
          sound: 'default',
          title: 'Rechargement en cours',
          body: `Rechargement de ${rechage.transaction.amount} F via ${rechage.transaction.transfatype}`,
        };
        await this.peopleService.sendExpoPushNotifications(notificationData, sender.pushtoken);

        return { recharge_response: resp.data.meta };
      } else {
        throw new Error('Recharge failed: insufficient limit in account');
      }
    } catch (error) {
      console.error('Recharge error:', error);
      throw new Error('Recharge failed due to an unexpected error');
    }
  }


  generatApi(nez: string): string {
    const dae = this.mineindService.thisiswhat(nez)
    return dae.replaceAll("undefined", "");
  }


  async rechargeStatus(Transaction: any) {
    const rechageHistory = await this.transactionModel.findOneAndUpdate({ webhooks: Transaction.data.id }, { status: Transaction.data.status });
    if (Transaction.data.status === "successful" || Transaction.data.status === "success") {

      const reachager = await this.personModel.findById(rechageHistory.operator);

      // Update account balance and limit after successful transaction
      await this.accountDataModel.findByIdAndUpdate(
        reachager.account,
        { $inc: { balance: rechageHistory.amount, limit: -rechageHistory.amount } },
        { new: true }
      );

      // Send notification to the user
      const notificationData = {
        sound: 'default',
        title: 'Rechargement éffectuée',
        body: `Rechargement de ${rechageHistory.amount} F via ${rechageHistory.transfatype} éffectué`,
      };
      await this.peopleService.sendExpoPushNotifications(notificationData, reachager.pushtoken);

    }else{
      const reachager = await this.personModel.findById(rechageHistory.operator);

      // Send notification to the user
      const notificationData = {
        sound: 'default',
        title: 'Rechargement échouée',
        body: `Rechargement de ${rechageHistory.amount} F via ${rechageHistory.transfatype} échouée`,
      };
      await this.peopleService.sendExpoPushNotifications(notificationData, reachager.pushtoken); 
    }

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
