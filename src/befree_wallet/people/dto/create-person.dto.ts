import * as mongoose from 'mongoose';

export const PersonWalletSchema = new mongoose.Schema({
  photo: String,
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
  currency: String,
  country_name: String,
  country_abre: String,
  country_code: String,
  status: {
    type: String,
    default: "active",
  },
  document: String,
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
    currency: { type: String },
    country_name: { type: String },
    country_abre: { type: String },
    country_code: { type: String },
    limit: { type: Number },
    balance: { type: Number },
    connectedwallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WalletList', // Corrected reference to 'Article' model
    }

  }]
});


export const WalletListTypeSchema = new mongoose.Schema({
  type: String,//MOBILE MONEY, BANC CART...
  operator: String,//MTN WAVE...
  currency: String,
  country_name: String,
  country_abre: String,
  country_code: String,
  service_name: String,
  availability: Boolean
});
