import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  articles: [{
    arti_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Matasa', // Corrected reference to 'Article' model
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
    ref: 'PeopleMatasa',
  },

  reduction: Number,
  payment_method: String,
  payment_status: {
    type: String,
    default: 'nopay'
  },
  transaction_id: String,
  created: { type: Date, default: Date.now }
});
