import { Controller, Post, Body, Param, Delete, Get, Put } from '@nestjs/common';
import { Members, MembLogin, OtpCode } from './entities/person.entity';
import { PoubyService } from './pouby.service';

@Controller('pouby')
export class PoubyController {
  constructor(private readonly peopleService: PoubyService) { }

  // ───── MEMBER ROUTES ─────

  @Post('members')
  async registerMember(@Body() member: Members): Promise<any> {
    return this.peopleService.registerMember(member);
  }

  @Get('members')
  async getAllMembers(): Promise<Members[]> {
    return this.peopleService.getAllMembers();
  }

  @Get('members/:user_id')
  async getMemberById(@Param('user_id') user_id: string): Promise<any> {
    return this.peopleService.getMemberById(user_id);
  }

  @Delete('members/:id')
  async deleteMember(@Param('id') id: string): Promise<any> {
    return this.peopleService.deleteMember(id);
  }

  // ───── OTP ROUTES ─────

  @Post('otp/create')
  async createOtp(@Body('user_id') user_id: string): Promise<any> {
    return this.peopleService.generateOtp(user_id);
  }

  @Post('otp/validate')
  async validateOtp(@Body() otpcode: OtpCode): Promise<any> {
    return this.peopleService.validateOtp(otpcode);
  }

  @Post('validatePassw/validate')
  async validatePassw(@Body() otpcode: OtpCode): Promise<any> {
    return this.peopleService.validatePassw(otpcode);
  }

  @Get('otp/all')
  async getAllOtps(): Promise<OtpCode[]> {
    return this.peopleService.getAllOtps();
  }

  @Delete('otp/:id')
  async deleteOtp(@Param('id') id: string): Promise<any> {
    return this.peopleService.deleteOtp(id);
  }

  // ───── AUTH ROUTES ─────

  @Post('auth/login')
  async loginMember(@Body() memberLogin: MembLogin): Promise<any> {
    return this.peopleService.loginMember(memberLogin);
  }

  @Post('auth/recover')
  async recoverAccount(@Body() user_id: { user_id: string }): Promise<any> {
    return this.peopleService.recoverAccount(user_id);
  }


  @Put('members/updatepassword/:id')
  async updatePassword(@Param('id') id: string, @Body() idupdatepass: { password: string }): Promise<any> {
    return this.peopleService.updatePassword(id, idupdatepass);
  }
}
