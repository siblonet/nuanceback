import * as mongoose from 'mongoose';

export const MembersSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  email: String,
  user_name: String,
  pink_phone: String,
  phone: String,
  allow: {
    type: Boolean,
    default: false,
  },
  created: { type: Date, default: Date.now },
});

export const OtpCodeSchema = new mongoose.Schema({
  otp_code: String,
  user_id: String
});

