import * as mongoose from 'mongoose';

export const CarsSchema = new mongoose.Schema({
  image: [{ ima: { type: String } }],  // Corrected the type for 'ima'
  phone: String,
  created: { type: Date, default: Date.now },
});
