import { Document } from 'mongoose';

export interface Article extends Document {
  addarticle: string;
  quantity: number;
  addgenre: string;
  addprix: number;
  addreduction: number;
  addoccasion: string;
  addcoul: string;
  addmarque: string;
  barcode: string;
  notes: string;
  owner: string;
  image: [{ ima: string }];
  created?: Date;
};

export interface Annonce extends Document {
  which: string;
  owner: string;
  image: string;
  created?: Date;
};

