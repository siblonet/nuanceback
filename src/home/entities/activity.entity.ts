import { Document } from 'mongoose';

export interface Article extends Document {
  addarticle: string;
  quantity: number;
  addgenre: string;
  addtransage: string;
  addprix: number;
  addreduction: number;
  addoccasion: string;
  addfour: string;
  adddispo: string;
  addnouveaute: string;
  addcoul: string;
  addtail: string;
  addmateri: string;
  addmarque: string;
  addtype: string;
  addtypepro: string;
  addphone: string;
  addexpe: string;
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

