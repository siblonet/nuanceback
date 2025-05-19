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
      host: 'smtppro.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: 'manager@pouby.com',
        pass: "&WJvz4t%$kW&5wF", // replace with real app-specific password
      },
      ssl: {
        rejectUnauthorized: false,
      },
      requireSSL: true,
    });
  }



  async create(member: Members) {
    const { email, pink_phone, phone } = member;
    const user = await this.memberModel.findOne({ email, pink_phone, phone });
    if (user) {
      return { ee: 'phoneused' };
    } else {
      const membersetting: Members = {
        firstName: member.firstName,
        middleName: member.middleName,
        lastName: member.lastName,
        email: member.email,
        pink_phone: member.pink_phone,
        phone: member.phone,
        user_name: member.user_name,
        password: this.indrog(member.password),
        allow: member.allow,
      };

      const person = await this.memberModel.create({ ...membersetting });
      await person.save();
      await this.otpcreation(person._id);
      return this.generatToken(person);
    }
  }

  async otpcreation(otprequesta: string) {
    const otp_code = await this.generateVerificationCode();
    const otpExists = await this.otpcodeModel.findOne({ otp_code });

    if (otpExists) {
      return { ee: 'Invalid' };
    } else {
      const createdCode = await this.otpcodeModel.create({
        otp_code,
        user_id: otprequesta,
      });
      await createdCode.save();
      await this.sendConfirmationEmail(createdCode);
      return createdCode;
    }
  }

  async login(membLogin: MembLogin) {
    const { user_name, password } = membLogin;
    const person = await this.memberModel.findOne({ user_name });

    if (!person) {
      return { ee: 'Invalid' };
    } else if (this.enderog(password, person.password)) {
      return this.generatToken(person);
    }

    return { ee: 'Invalid' };
  }

  async otpvalidation(otp_cod: OtpCode) {
    const { otp_code, user_id } = otp_cod;
    const otpcode = await this.otpcodeModel.findOne({ otp_code });

    if (!otpcode) {
      return { ee: 'Invalid' };
    } else {
      await this.memberModel.findByIdAndUpdate(user_id, { allow: true });
      return otpcode;
    }
  }

  remove(id: string) {
    return this.memberModel.findByIdAndRemove(id);
  }

  async accountRecovering(user_id: string) {
    const person = await this.memberModel.findOne({
      $or: [
        { user_name: user_id },
        { phone: user_id },
        { pink_phone: user_id },
        { email: user_id },
      ],
    });

    if (!person) {
      return { ee: 'Invalid' };
    } else {
      await this.otpcreation(person._id);
      return { code: 'sent' };
    }
  }

  async getMydata(user_id: string) {
    const person = await this.memberModel.findById(user_id);
    if (!person) {
      return { ee: 'Invalid' };
    } else {
      return this.generatToken(person);
    }
  }

  async allMembers(): Promise<Members[]> {
    return await this.memberModel.find();
  }

  enderog(nez: any, ood: any): boolean {
    const dae = this.mineindService.thisiswhat(nez);
    const adaa = dae.replaceAll('undefined', '');
    return adaa === ood;
  }

  generatToken(member: Members): object {
    const {
      _id,
      firstName,
      middleName,
      lastName,
      email,
      pink_phone,
      phone,
      user_name,
      allow,
    } = member;

    const perset = `${_id}°${firstName}°${middleName}°${lastName}°${email}°${pink_phone}°${phone}°${user_name}°${allow}`;
    const dae = this.mineindService.whatisthis(perset);
    const adaa = dae.replaceAll('undefined', '');
    return { token: adaa };
  }

  indrog(dd: any) {
    const dae = this.mineindService.whatisthis(dd);
    return dae.replaceAll('undefined', '');
  }

  /** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
  async generateVerificationCode(): Promise<number> {
    const digits = new Set<number>();

    while (digits.size < 5) {
      const digit = Math.floor(Math.random() * 10);
      digits.add(digit);
    }

    const code = Array.from(digits).join('');
    return parseInt(code, 10);
  }

  async sendConfirmationEmail(otp_data: any) {
    const user = await this.memberModel.findById(otp_data.user_id);

    const mailOptions = {
      from: '"Pouby Team" <manager@pouby.com>',
      to: user.email,
      subject: 'Verification Code',
      html: `
        <h3>Hi ${user.firstName},</h3>
        <p>Thank you for your interest in Pouby.</p>
        <p>Your confirmation code is:</p>
        <h2 style="padding:20px;background:#fff;color:#105d6a;border-radius:5px;">
          ${otp_data.otp_code}
        </h2>
        <p>If you did not request this code or create an account, you can safely ignore this email.</p>
        <br><p>— The Pouby Team</p>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
