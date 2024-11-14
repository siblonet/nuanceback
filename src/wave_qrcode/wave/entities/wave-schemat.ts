import { Document } from 'mongoose';

export interface Wave extends Document {
    url: string;
    operator: string;
    created_at?: Date;
}
