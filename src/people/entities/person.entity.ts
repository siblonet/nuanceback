export interface PLog {
  phone: string;
  motdepass: string;
}

export interface Person {
  _id?: string;
  prenom: string;
  nom: string;
  phone: string;
  owner: string;
  email: string;
  motdepass: string;
  service?: string;
  staff?: string;
  admin?: string;
  pushtoken?: string;
  commade?: string;
  userdelete?: boolean;
  userinfo?: boolean;
  userstatus?: boolean;
  orderback?: boolean;
  orderchange?: boolean;
  orderdone?: boolean;
  orderwof?: boolean;
}
