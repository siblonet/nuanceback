import { Document } from 'mongoose';

export interface MembLogin {
  user_name: string;
  password: string;
}

export interface Members {
  _id?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  pink_phone: string;
  phone: string;
  user_name: string;
  password: string;
  allow: boolean
}

export interface OtpCode {
  otp_code: string;
  user_id: string
}