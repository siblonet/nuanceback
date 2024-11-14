import * as mongoose from 'mongoose';

export const WaveSchema = new mongoose.Schema({
  url: String,
  operator: {
    type: String,
    default: "0554468221"
  },
  created_at: { type: Date, default: Date.now }
});
