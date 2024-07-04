import * as mongoose from 'mongoose';


export const BefreeUserSchema = new mongoose.Schema({
  name: String,
  access: String,
  created: { type: Date, default: Date.now },
})
