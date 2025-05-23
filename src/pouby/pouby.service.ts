import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MineindService } from 'src/mineind/mineind.service';
import { Members, MembLogin, OtpCode } from './entities/person.entity';
import * as nodemailer from 'nodemailer';

@Injectable()
export class PoubyService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel('PoubyShareholder') private memberModel: Model<Members>,
    @InjectModel('OtpCode') private otpcodeModel: Model<OtpCode>,
    private readonly mineindService: MineindService
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.mineindService.whatisthis("HNGKKIL&ALSL&XLN"),
      port: parseInt(this.mineindService.whatisthis("756")),
      secure: true,
      auth: {
        user: this.mineindService.whatisthis("NZMZTVI`KLFYB&XLN"),
        pass: this.mineindService.whatisthis(".dqEA7G[àPd.6Du"),
      },
      ssl: {
        rejectUnauthorized: true,
      },
      requireSSL: true,
    });
  }

  // ───── MEMBER MANAGEMENT ─────

  async registerMember(member: Members) {
    const { email, pink_phone, phone, user_name } = member;
    const existingUser = await this.memberModel.findOne({ email, pink_phone, phone, user_name });

    if (existingUser) return { ee: 'phoneused' };

    const newMember: Members = {
      ...member,
      password: this.encrypt(member.password),
      allow: false,
    };

    const savedMember = await this.memberModel.create(newMember);
    await savedMember.save();
    await this.generateOtp(savedMember._id);
    await this.newAccountCreated({ user_id: savedMember._id });
    return this.generateToken(savedMember);
  }

  async getAllMembers(): Promise<Members[]> {
    return this.memberModel.find();
  }

  async getMemberById(user_id: string) {
    const member = await this.memberModel.findById(user_id);
    if (!member) return { ee: 'Invalid' };
    return this.generateToken(member);
  }

  async deleteMember(id: string) {
    return this.memberModel.findByIdAndRemove(id);
  }

  // ───── AUTH & RECOVERY ─────

  async loginMember(credentials: MembLogin) {
    const { user_name, password } = credentials;
    const user = await this.memberModel.findOne({ user_name });

    //console.log((user && this.decrypt(password, user.password)), user, credentials)
    if (user && this.decrypt(password, user.password) && user.allow === false) {
      await this.generateOtp(user.email);
      return this.generateToken(user);
    }else if(user && this.decrypt(password, user.password)){
      return this.generateToken(user);
    }
    return { ee: 'Invalid' };
  }



  async recoverAccount({ user_id }: { user_id: string }) {
    const user = await this.memberModel.findOne({
      $or: [
        { user_name: user_id },
        { phone: user_id },
        { pink_phone: user_id },
        { email: user_id },
      ],
    });

    if (!user) return { ee: 'Invalid' };

    await this.generateOtp(user._id);
    return { code: 'sent' };
  }

  // ───── OTP HANDLING ─────

  async generateOtp(user_id: string) {
    const code = await this.generateVerificationCode();

    const existing = await this.otpcodeModel.findOne({ otp_code: code });
    if (existing) return { ee: 'Invalid' };

    const newOtp = await this.otpcodeModel.create({ otp_code: code, user_id });
    await newOtp.save();
    await this.sendOtpEmail(newOtp);
    return newOtp;
  }

  async validateOtp(input: OtpCode) {
    const record = await this.otpcodeModel.findOne({ otp_code: input.otp_code });
    if (!record) return { ee: 'Invalid' };

    await this.deleteOtp(record._id);
    const doneid = await this.memberModel.findByIdAndUpdate(record.user_id, { allow: true });
    return this.getMemberById(doneid._id);
  }


  async validatePassw(input: OtpCode) {
    const record = await this.otpcodeModel.findOne({ otp_code: input.otp_code });
    if (!record) return { ee: 'Invalid' };

    await this.deleteOtp(record._id);
    const doneid = await this.memberModel.findByIdAndUpdate(record.user_id, { allow: true });
    return { id: doneid._id };
  }

  async getAllOtps(): Promise<OtpCode[]> {
    return this.otpcodeModel.find();
  }

  async deleteOtp(id: any) {
    return this.otpcodeModel.findByIdAndRemove(id);
  }

  async updatePassword(id: any, updatepass: any) {
    const updatedid = await this.memberModel.findByIdAndUpdate(id, { password: this.encrypt(updatepass.password) });
    const updatedUser = await this.memberModel.findById(updatedid._id);
    return this.generateToken(updatedUser);
  }

  // ───── UTILITY METHODS ─────

  private encrypt(input: any): string {
    const result = this.mineindService.whatisthis(input);
    return result.replaceAll('undefined', '');
  }

  private decrypt(input: any, compareTo: any): boolean {
    const result = this.mineindService.thisiswhat(input);
    return result.replaceAll('undefined', '') === compareTo;
  }

  private generateToken(member: Members): object {
    const data = [
      member._id,
      member.firstName,
      member.middleName,
      member.lastName,
      member.email,
      member.pink_phone,
      member.phone,
      member.user_name,
      member.allow,
    ].join('°');

    const token = this.mineindService.whatisthis(data).replaceAll('undefined', '');
    return { token };
  }

  private async generateVerificationCode(): Promise<number> {
    const digits = new Set<number>();
    while (digits.size < 5) digits.add(Math.floor(Math.random() * 10));
    return parseInt([...digits].join(''), 10);
  }

  private async sendOtpEmail(otpData: any) {
    const user = await this.memberModel.findById(otpData.user_id);

    const mailOptions = {
      from: '"Pouby Team noreply" <donotreply@pouby.com>',
      to: user.email,
      subject: 'Verification Code',
      html: `
        <table style="width:100%;font-family:sans-serif;">
          <tr>
            <td style="padding:20px;background-color:#f5f5f5;">
              <h2 style="color:#105d6a;">Pouby Verification Code</h2>
              <p>Hello ${user.firstName || 'there'},</p>
              <p>Thanks for joining Pouby! Please confirm your account using this code:</p>
              <div style="padding:10px;margin:20px 0;font-size:24px;font-weight:bold;color:#fff;background-color:#105d6a;border-radius:5px;text-align:center;">
                ${otpData.otp_code}
              </div>
              <p>If you didn’t sign up, you can ignore this email.</p>
              <p style="margin-top:30px;">— The Pouby Team <i style="color: red">Do not reply to this mail</i></p>
            </td>
          </tr>
        </table>

      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  private async newAccountCreated(otpData: any) {
    const user = await this.memberModel.findById(otpData.user_id);

    const mailOptions = {
      from: '"Pouby Team noreply" <donotreply@pouby.com>',
      to: "johnpdkokar@gmail.com",
      subject: 'New Account Created',
      html: `
        <table style="width:100%;font-family:sans-serif;">
          <tr>
            <td style="padding:20px;background-color:#f5f5f5; border-radio: 10px">
              <h2 style="color:#105d6a;">New account for ${user.firstName}</h2>
              <p>Hello CEO, user details</p>
              <div style="padding:10px;font-size:24px;font-weight:bold;color:#fff;background-color:#105d6a;border-radius:5px;text-align:center;">
                
              <p>Name: ${user.firstName} ${user.middleName} ${user.lastName}</p>
              <p>eMail: ${user.email}</p>
              </div>
            </td>
          </tr>
        </table>

      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
