import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
  amount: String,
  operator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PeopleBefreeWallet',
  },
  receiva: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PeopleBefreeWallet',
  },
  status: String,
  fee: String,
  transation_id: String,
  transfatype: String,
  operatortype: String,
  created_at: { type: Date, default: Date.now }
});
