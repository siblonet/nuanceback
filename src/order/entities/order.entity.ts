import { Document } from 'mongoose';
import { Article } from 'src/home/entities/activity.entity';
import { Person } from 'src/people/entities/person.entity';

export interface Order extends Document {
    articles: [
        {
            arti_id: Article
            quantcho: number;
            prix: number
        }
    ];
    ville: string;
    commune: string;
    lieu: string;
    phone: string;
    note: string;
    owner: string;
    statut: string;
    client: Person;
    staff: string;

    reduction: number;
    payment_method: string;
    payment_status: string;
    transaction_id: string;

    created?: Date;
}
