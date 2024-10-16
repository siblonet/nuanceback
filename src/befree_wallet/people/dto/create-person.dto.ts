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
  type: String,
  operator: String,
  phone: String,
  limit: Number,
  balance: Number
});
