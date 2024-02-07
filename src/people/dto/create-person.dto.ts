import * as mongoose from 'mongoose';

export const PersonSchema = new mongoose.Schema({
  prenom: String,
  nom: String,
  phone: String,
  email: String,
  motdepass: String,
  owner: String,
  staff: {
    type: String,
    default: "false",
  },
  admin: {
    type: String,
    default: "false",
  },
  pushtoken: String,
  commade: String,
  created: { type: Date, default: Date.now },
});
