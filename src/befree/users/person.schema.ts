import * as mongoose from 'mongoose';

export const BefreeAccessSchema = new mongoose.Schema({
  name: String,
  access: String,
  created: { type: Date, default: Date.now },
})


export const BefreeUserSchema = new mongoose.Schema({
  nomcomplet: String,
  phone: String,
  email: String,
  motdepass: String,
  admin: {
    type: String,
    default: "false",
  },
  profile: String,
  pushtoken: String,
  address: String,
  created: { type: Date, default: Date.now },
})
