import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  articles: [{
    arti_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NuanceDoud', // Corrected reference to 'Article' model
    },
    quantcho: Number,
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
    default: 'review'
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'People',
  },
  staff: {
    type: String,
    default: 'Online'
  },
  reduction: Number,
  payment_method: String,
  payment_status: {
    type: String,
    default: 'waiting'
  },
  transaction_id: String,
  created: { type: Date, default: Date.now }
});
