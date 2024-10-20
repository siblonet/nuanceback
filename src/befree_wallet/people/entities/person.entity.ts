export interface PLogWallet {
  phone: string;
  motdepass: string;
}

export interface PersonWallet {
  _id?: string;
  prenom: string;
  nom: string;
  phone: string;
  email: string;
  motdepass: string;
  admin?: string;
  pushtoken?: string;
  currency: string;
  money_operator: string;
  country_abre: string;
  country_code: string;
  account: AccountData;
}

export interface AccountData {
  _id?: string;
  type: string;//Personnel, Business ...
  operator: string;
  phone: string;
  limit: number;
  balance: number;
  bounced_account?: []
}


export interface WalletType {
  _id?: string;
  type: string;//MTN,WAVE...
  operator: string;//MTN,WAVE...
  phone_id: string;
  limit: number;
  balance: number;
}

export interface WalletListType {
  _id?: string;
  type: string;//MTN,WAVE...
  operator: string;//MTN,WAVE...
  operator_country: string;
  service_name: string;
  availability: boolean
}