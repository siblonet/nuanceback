import * as mongoose from 'mongoose';

export const TriumphUserSchema = new mongoose.Schema({
  nomcomplet: String,
  phone: String,
  email: String,
  motdepass: String,
  service: {
    type: String,
    default: "client",
  },
  admin: {
    type: String,
    default: "false",
  },
  profile: String,
  pushtoken: String,
  phone2: String,
  wapphone: String,
  address: String,
  created: { type: Date, default: Date.now },
});
