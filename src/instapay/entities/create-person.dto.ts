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

export const InvitaionSchema = new mongoose.Schema({
  name: String,
  phone: String,
  password: String,
  detail: String
});

export const InvitedSchema = new mongoose.Schema({
  invita: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invitaion', // Corrected reference to 'Article' model
  },
  phone: String
});
