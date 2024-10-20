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
  account: AccountData;
}

export interface AccountData {
  _id?: string;
  type: string;
  operator: string;
  phone: string;
  limit: number;
  balance: number;
  bounced_account?: []
}


export interface WalletType {
  _id?: string;
  type: string;
  operator: string;
  phone_id: string;
  limit: number;
  balance: number;
}