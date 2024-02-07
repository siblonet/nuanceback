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

  @Post("/:owner")
  //@UseGuards(AuthGuard('jwt'), AdminGuard)
  create(@Param('owner') owner: String, @Body() article: Order) {
    return this.orderService.create(article, owner);
  }

  @Get("/:owner")
  async allArticles(@Param('owner') owner: string): Promise<Order[]> {
    return await this.orderService.allArticles(owner);
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

  @Put('statoo/:id/:od')
  updateOrderStatus(@Param('id') id: string, @Param('od') od: string, @Body() activle: Order) {
    //console.log(id, od, activle);
    return this.orderService.updateOrderStatus(id, od, activle);
  }

  @Delete('/:id/:artid/:quant')
  removeOrders(@Param('id') id: string, @Param('artid') artid: string, @Param('quant') quant: Number) {
    return this.orderService.removeOrders(id, artid, quant);
  }

  @Delete('oarderar/:id/:ad/:artid/:quant')
  removeOrdersArticl(@Param('id') id: string, @Param('ad') ad: string, @Param('artid') artid: string, @Param('quant') quant: Number) {
    return this.orderService.removeOrdersArticl(id, ad, artid, quant);
  }

}
