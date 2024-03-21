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
  service: {
    type: String,
    default: "false",
  },
  admin: {
    type: String,
    default: "false",
  },
  pushtoken: String,
  commade: String,
  userdelete: { type: Boolean, default: false },
  userinfo: { type: Boolean, default: false },
  userstatus: { type: Boolean, default: false },
  orderback: { type: Boolean, default: false },
  orderchange: { type: Boolean, default: false },
  orderdone: { type: Boolean, default: false },
  orderwof: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
});
