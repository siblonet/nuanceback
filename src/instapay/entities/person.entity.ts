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
