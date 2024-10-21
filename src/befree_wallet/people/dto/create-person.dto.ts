import * as mongoose from 'mongoose';

export const PersonWalletSchema = new mongoose.Schema({
  prenom: String,
  nom: String,
  phone: String,
  email: String,
  motdepass: String,
  admin: {
    type: String,
    default: "false",
  },
  pushtoken: String,
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccountData', // Corrected reference to 'Article' model
  },
  created_at: { type: Date, default: Date.now },
});


export const AccountDataSchema = new mongoose.Schema({
  type: String,//Personel, bussiness...
  operator: String,//MTN,WAVE...
  phone: String,
  limit: Number,
  balance: Number,
  bounced_account: [{
    type: { type: String },//MOBILE MONEY, BANC CART...
    operator: { type: String },//MTN,WAVE...
    phone_id: { type: String },
    limit: { type: Number },
    balance: { type: Number },
  }]
});


export const WalletListTypeSchema = new mongoose.Schema({
  type: String,//MOBILE MONEY, BANC CART...
  operator: String,//MTN WAVE...
  operator_country: String,
  service_name: String,
  availability: Boolean
});
