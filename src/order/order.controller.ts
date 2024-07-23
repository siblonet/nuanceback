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
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) { }

  @Post("/:soft_use/:creata_id/:owner")
  //@UseGuards(AuthGuard('jwt'), AdminGuard)
  create(@Param('soft_use') soft_use: string, @Param('creata_id') creata_id: string, @Param('owner') owner: String, @Body() article: Order) {
    return this.orderService.create(soft_use, creata_id, article, owner);
  }

  @Post("/:soft_use/:creata_id/:customer/:owner")
  //@UseGuards(AuthGuard('jwt'), AdminGuard)
  createOnlinePayment(@Param('soft_use') soft_use: string, @Param('creata_id') creata_id: string, @Param('customer') customer: string, @Param('owner') owner: string, @Body() article: Order) {
    return this.orderService.createOnlinePayment(soft_use, creata_id, article, customer, owner);
  }


  @Post("syncro/local/toline/:owner")
  //@UseGuards(AuthGuard('jwt'), AdminGuard)
  syncro(@Param('owner') owner: String, @Body() article: Order) {
    return this.orderService.syncro(article, owner);
  }

  @Get("/:owner")
  async allArticles(@Param('owner') owner: string): Promise<Order[]> {
    return await this.orderService.allArticles(owner);
  }

  @Get("allUntraitedOrder/:owner")
  async allUntraitedOrder(@Param('owner') owner: string): Promise<Order[]> {
    return await this.orderService.allUntraitedOrder(owner);
  }


  @Get("traitedAllOrder/:owner/:skipNum/:limitNum")
  async alltraitedOrder(@Param('owner') owner: string, @Param('skipNum') skipNum: number, @Param('limitNum') limitNum: number): Promise<{ lengf: number, orders: Order[] }> {
    return await this.orderService.alltraitedOrder(owner, skipNum, limitNum);
  }

  @Get("myorder/:id")
  async getmyOrders(@Param('id') id: string): Promise<Order[]> {
    return await this.orderService.getmyOrders(id);
  }


  @Put('/:id/:od')
  updateOrder(@Param('id') id: string, @Param('od') od: string, @Body() activle: Order) {
    //console.log(id, od, activle);
    return this.orderService.updateOrder(id, od, activle);
  }



  @Put('echange/order/:orderid/:orderarticleid/:articleid')
  OrderEchange(@Param('orderid') orderid: string, @Param('orderarticleid') orderarticleid: string, @Param('articleid') articleid: string, @Body() echangedata: any) {
    //console.log(id, od, activle);
    return this.orderService.OrderEchange(orderid, orderarticleid, articleid, echangedata);
  }


  @Put('change/order/statuts/:id')
  updateOrderStatus(@Param('id') id: string, @Body() statuts: any) {
    //console.log(id, statuts);
    return this.orderService.updateOrderStatus(id, statuts);
  }

  /*
    @Post("/change/order/payment/statuts/transationid")
    async paymentStatus(@Body() payment_status_data: any): Promise<any> {
      console.log(payment_status_data);
      return await this.orderService.paymentStatus(payment_status_data);
    }*/



  @Post('/change/order/payment/statuts/transationid')
  async paymentStatus(@Body() payment_status_data: any): Promise<any> {
    //console.log(payment_status_data);

    // You may need to parse the nested form data manually
    const parsedData = this.parseFormData(payment_status_data);

    return await this.orderService.paymentStatus(parsedData);
  }

  private parseFormData(data: any): any {
    const parsedData = {};

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        parsedData[key] = Array.isArray(value) ? value[0] : value;
      }
    }

    return parsedData;
  }



  @Delete('cancele/:soft_use/:creata_id/:id')
  canceleOrders(@Param('soft_use') soft_use: string, @Param('creata_id') creata_id: string, @Param('id') id: string) {
    return this.orderService.canceleOrders(soft_use, creata_id, id);
  }

  @Delete('/:soft_use/:creata_id/:id/:artid/:quant')
  removeOrders(@Param('soft_use') soft_use: string, @Param('creata_id') creata_id: string, @Param('id') id: string, @Param('artid') artid: string, @Param('quant') quant: Number) {
    return this.orderService.removeOrders(soft_use, creata_id, id, artid, quant);
  }

  @Delete('already/article/deleted/:id')
  articleAreadyremoved(@Param('id') id: string) {
    return this.orderService.articleAreadyremoved(id);
  }


  @Delete('oarderar/:soft_use/:creata_id/:id/:ad/:artid/:quant')
  removeOrdersArticl(@Param('soft_use') soft_use: string, @Param('creata_id') creata_id: string, @Param('id') id: string, @Param('ad') ad: string, @Param('artid') artid: string, @Param('quant') quant: Number) {
    return this.orderService.removeOrdersArticl(soft_use, creata_id, id, ad, artid, quant);
  }

}
