import { Document } from 'mongoose';
import { PersonWallet } from 'src/befree_wallet/people/entities/person.entity';

export interface Transaction extends Document {
    amount: string;
    operator: PersonWallet;
    receiva: PersonWallet;
    status: string;
    fee: string
    transfatype: string;
    operatortype: string;
    webhooks: string;
    created_at?: Date;
}
