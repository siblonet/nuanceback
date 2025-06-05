import { Document, Types } from 'mongoose';

export interface RockspaUserEntity extends Document {
  _id?: Types.ObjectId;
  name: string;
  phone: string;
  password: string;
  role: 'admin' | 'worker' | 'client';
  pushtoken: string;
  allow: boolean;
}

export interface RockspaLoginEntity {
  phone: string;
  password: string;
}

export interface RockspaServiceEntity extends Document {
  _id?: Types.ObjectId;
  serviceName: string;
  serviceDuretion: string;
  serviceGender: 'male' | 'female' | 'unisex';
  serviceImage: string;
  serviceDescription: string;
  serviceAvailability: boolean;
  servicePrice: number;
}

export interface RockspaAppointmentPartner extends Document {
  service: Types.ObjectId | RockspaServiceEntity;
  message: string;
  statut: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  client: Types.ObjectId | RockspaUserEntity;
  worker: Types.ObjectId | RockspaUserEntity;
  price: number;
  payment_method: 'cash' | 'mobile_money' | 'card';
  payment_status: 'paid' | 'pending' | 'failed';
  transaction_id: string;
  dete: string;
  heure: string;
  created?: Date;
}


/** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Schemat start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Schemat start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Schemat start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Schemat start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Schemat start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Schemat start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */


import { Schema } from 'mongoose';

export const RockspaUserSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'worker', 'client'], default: 'client' },
  address: String,
  email: String,
  pushtoken: String,
  allow: { type: Boolean, default: true },
}, { timestamps: true });

export const RockspaServiceSchema = new Schema({
  serviceName: { type: String, required: true },
  serviceDuretion: String,
  serviceGender: { type: String, enum: ['male', 'female', 'unisex'], default: 'unisex' },
  serviceImage: String,
  serviceDescription: String,
  serviceAvailability: { type: Boolean, default: true },
  servicePrice: { type: Number, required: true },
}, { timestamps: true });

export const RockspaAppointmentSchema = new Schema({
  service: {
    type: Schema.Types.ObjectId,
    ref: 'RockspaService',
    required: true,
  },
  message: String,
  statut: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'RockspaUser',
    required: true,
  },
  worker: {
    type: Schema.Types.ObjectId,
    ref: 'RockspaUser',
    required: true,
  },
  price: Number,
  payment_method: { type: String, enum: ['cash', 'mobile_money', 'card'] },
  payment_status: { type: String, enum: ['paid', 'pending', 'failed'], default: 'pending' },
  transaction_id: String,
  dete: String,
  heure: String,
}, { timestamps: true });

