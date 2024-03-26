import * as mongoose from 'mongoose';

export const InstapaySchema = new mongoose.Schema({
  prenom: String,
  nom: String,
  phone: String,
  motdepass: String,
  owner: String,
  allow: {
    type: Boolean,
    default: true,
  },
  created: { type: Date, default: Date.now },
});
