import { Controller, Post, Body, Param, Delete, Get, Put } from '@nestjs/common';
import { AccountData, PersonWallet, PLogWallet, WalletListType, WalletType } from './entities/person.entity';
import { PeopleBefreeWalletService } from './people.service';

@Controller('BefreeWalletpeople')
export class PeopleBefreeWalletController {
  constructor(private readonly peopleService: PeopleBefreeWalletService) { }

  @Post()
  create(@Body() allinone: any) {
    return this.peopleService.create(allinone);
  }


  @Post('login')
  async login(@Body() pLog: PLogWallet) {
    return await this.peopleService.login(pLog);
  }

  @Put('pushtoken/:id')
  Pushtoken(@Param('id') id: string, @Body() pushtoken: any) {
    return this.peopleService.Pushtoken(id, pushtoken);
  }


  @Get("mybalance/:id")
  async getmyBalance(@Param('id') id: string): Promise<Object> {
    return await this.peopleService.getmyBalance(id);
  }


  @Get("mydata/:id")
  async getmyData(@Param('id') id: string): Promise<any> {
    return await this.peopleService.getmyData(id);
  }


  @Get("myProfile/:id")
  async getmyProfile(@Param('id') id: string): Promise<PersonWallet> {
    return await this.peopleService.getmyProfile(id);
  }

  @Put('bounceWallet/:id')
  bounceWallet(@Param('id') id: string, @Body() wallet: WalletType) {
    return this.peopleService.bounceWallet(id, wallet);
  }

  @Get("walletslist")
  async walletsList(): Promise<WalletListType[]> {
    return await this.peopleService.walletsList();
  }

  @Post("walletpost")
  async walletPost(@Body() walletListType: WalletListType): Promise<WalletListType> {
    return await this.peopleService.walletPost(walletListType);
  }


  @Post("walletPut/:walletid")
  async walletPut(@Param('walletid') walletid: string, @Body() walletListType: WalletListType): Promise<WalletListType> {
    return await this.peopleService.walletPut(walletid, walletListType);
  }

  @Put('personupdate/:id')
  PersonUpte(@Param('id') id: string, @Body() persona: PersonWallet): Promise<Object> {
    return this.peopleService.PersonUpte(id, persona);
  }

  /*
 
  
    @Put('status/:id')
    PersonStatus(@Param('id') id: string, @Body() status: any) {
      return this.peopleService.PersonStatus(id, status);
    }
  
    @Put('passwordupdate/:id')
    Passwordupdate(@Param('id') id: string, @Body() passwor: any) {
      return this.peopleService.Passwordupdate(id, passwor);
    }
  
    @Put('pushtoken/:id')
    Pushtoken(@Param('id') id: string, @Body() pushtoken: any) {
      return this.peopleService.Pushtoken(id, pushtoken);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.peopleService.remove(id);
    }
  
    @Get("nonadmin/:owner")
    async allNonadmin(@Param('owner') owner: string): Promise<PersonWallet[]> {
      return await this.peopleService.allNonadmin(owner);
    }
  
    @Get("persons/:owner")
    async allPersons(@Param('owner') owner: string): Promise<PersonWallet[]> {
      return await this.peopleService.allPerson(owner);
    }
  
    // Update the existing DELETE route to handle article removal
    @Post('sendexpopushtoken/:owner')
    async sendExpopushnotification(@Param('owner') owner: string, @Body() notificaton: any): Promise<void> {
      return this.peopleService.sendExpoPushNotifications(notificaton, owner);
    }*/


}
