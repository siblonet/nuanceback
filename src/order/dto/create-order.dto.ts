import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  articles: [{
    arti_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NobleCoil', // Corrected reference to 'Article' model
    },
    quantcho: Number,
    image: String,
    color: String,
    size: String,
    statut: {
      type: String,
      default: 'review'
    },
    prix: Number
  }],
  ville: String,
  commune: String,
  lieu: String,
  phone: String,
  note: String,
  owner: String,
  statut: {
    type: String,
    default: 'uncomplete'
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'People',
  },
  created: { type: Date, default: Date.now }
});
