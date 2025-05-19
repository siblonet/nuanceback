import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { Members, MembLogin, OtpCode } from './entities/person.entity';
import { PoubyService } from './pouby.service';

@Controller('pouby')
export class PoubyController {
  constructor(private readonly peopleService: PoubyService) { }

  @Post()
  async create(@Body() person: Members): Promise<any> {
    return this.peopleService.create(person);
  }

  @Post('otpcreation')
  async otpcreation(@Body('user_id') user_id: string): Promise<any> {
    return this.peopleService.otpcreation(user_id);
  }

  @Post('login')
  async login(@Body() memberLogin: MembLogin): Promise<any> {
    return this.peopleService.login(memberLogin);
  }

  @Post('otpvalidation')
  async otpvalidation(@Body() otpcode: OtpCode): Promise<any> {
    return this.peopleService.otpvalidation(otpcode);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.peopleService.remove(id);
  }

  @Get(':user_id')
  async getMydata(@Param('user_id') user_id: string): Promise<any> {
    return this.peopleService.getMydata(user_id);
  }

  @Get('allMembers')
  async allMembers(): Promise<Members[]> {
    return this.peopleService.allMembers();
  }

  @Post('recover')
  async accountRecovering(@Body('user_id') user_id: string): Promise<any> {
    return this.peopleService.accountRecovering(user_id);
  }
}
