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
  country_name: string;
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
  bounced_account?: [{
    type: string;//MOBILE MONEY, BANC CART...
    operator: string;//MTN,WAVE...
    phone_id: string;
    currency: string;
    country_name: string;
    country_abre: string;
    country_code: string;
    limit: number;
    balance: number;
  }]
}


export interface WalletType {
  type: string;//MOBILE MONEY, BANC CART...
  operator: string;//MTN,WAVE...
  phone_id: string;
  currency: string;
  country_name: string;
  country_abre: string;
  country_code: string;
  limit: number;
  balance: number;
}

export interface WalletListType {
  _id?: string;
  type: string;//MOBILE MONEY, BANC CART...
  operator: string;//MTN,WAVE...
  currency: string;
  country_name: string;
  country_abre: string;
  country_code: string;
  service_name: string;
  availability: boolean
}