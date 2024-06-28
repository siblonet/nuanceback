import { Document } from 'mongoose';

export interface CarsEntity extends Document {
  _id?: string;
  image: [{ ima: string }];
  phone: string
  created?: Date;
};
