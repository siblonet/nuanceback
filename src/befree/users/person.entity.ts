export interface AccessRequest {
  access: string;
}

export interface BefreeLogin {
  phone: string;
  motdepass: string;
}


export interface AccessUser {
  _id?: string;
  name: string;
  access: string;
  created?: Date;
}

export interface BefreeUser {
  _id?: string;
  nomcomplet: string;
  phone: string;
  email?: string,
  motdepass: string;
  admin?: string;
  profile?: string;
  address?: String;
  pushtoken?: string;
}