import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TransactionBefreeWalletService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('BefreeWallettransactions')
export class TransactionBefreeWalletController {
  constructor(private transactionService: TransactionBefreeWalletService) { }

  @Post()
  //@UseGuards(AuthGuard('jwt'), AdminGuard)
  create(@Body() transaction: Transaction) {
    return this.transactionService.create(transaction);
  }


  @Get("")
  async allArticles(): Promise<Transaction[]> {
    return await this.transactionService.allArticles();
  }


  @Get("mytransaction/:id")
  async getmytransactions(@Param('id') id: string): Promise<Transaction[]> {
    return await this.transactionService.getmyTransaction(id);
  };


  @Post("rechargemyaccount/:accounid")
  async walletRechargin(@Param('accounid') accounid: string, @Body() Transaction: any) {
    return await this.transactionService.walletRechargin(accounid, Transaction);
  };


  @Post("myrechargestatus")
  async rechargeStatus(@Body() Transaction: any) {
    await this.transactionService.rechargeStatus(Transaction);
    throw new HttpException('Received', HttpStatus.OK);
  };



  
  /* @Put('/:id/:od')
   updatetransaction(@Param('id') id: string, @Param('od') od: string, @Body() activle: transaction) {
     //console.log(id, od, activle);
     return this.transactionService.updateOrderStatus(id, od, activle);
   }
 
   @Put('change/transaction/statuts/:id')
   updatetransactionStatus(@Param('id') id: string, @Body() statuts: any) {
     //console.log(id, statuts);
     return this.transactionService.updatetransactionStatus(id, statuts);
   }
 
 
   @Put("change/transaction/payment/statuts/:transationid")
   async paymentStatus(@Param('transationid') transationid: string): Promise<transaction[]> {
     return await this.transactionService.paymentStatus(transationid);
   }
 
   @Delete('cancele/:id')
   canceletransactions(@Param('id') id: string) {
     return this.transactionService.canceletransactions(id);
   }
 
   @Delete('/:id/:artid/:quant')
   removetransactions(@Param('id') id: string, @Param('artid') artid: string, @Param('quant') quant: Number) {
     return this.transactionService.removetransactions(id, artid, quant);
   }
 
   @Delete('oarderar/:id/:ad/:artid/:quant')
   removetransactionsArticl(@Param('id') id: string, @Param('ad') ad: string, @Param('artid') artid: string, @Param('quant') quant: Number) {
     return this.transactionService.removetransactionsArticl(id, ad, artid, quant);
   }*/

}
