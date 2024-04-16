import { Document } from 'mongoose';

export interface IntaPlog {
  phone: string;
  motdepass: string;
}

export interface Insapay {
  _id?: string;
  prenom: string;
  nom: string;
  phone: string;
  motdepass: string;
  owner: string;
  allow: boolean
}

export interface Invitaion extends Document {
  _id?: string;
  name: string;
  phone: string;
  password: string;
  detail: string
}

export interface Invited {
  invita: Invitaion;
  phone: string;
}