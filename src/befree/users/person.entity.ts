export interface AccessRequest {
  access: string;
}


export interface BefreeUser {
  _id?: string;
  name: string;
  access: string;
  created?: Date;
}
