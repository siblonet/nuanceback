import { Document } from 'mongoose';
import { Person } from 'src/people/entities/person.entity';

export interface Article extends Document {
  addarticle: string;
  quantity: number;
  quanvend: number;
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

export interface VersionAvailabe extends Document {
  version: string;
  owner: string;
  url: string;
  device: string;
  created?: Date;
};


export interface ActionedData extends Document {
  actioned_article: Article;
  actioned_user: Person;
  action: string;
  soft_use: string;
  actioned_dat: Date;
}