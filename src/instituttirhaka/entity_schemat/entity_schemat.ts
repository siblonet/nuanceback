import { Document, Schema } from 'mongoose';

export interface TirhakaUserEntity extends Document {
    _id?: string;
    name: string;
    phone: string;
    password: string;
    role: string;
    address: string;
    email: string;
    pushtoken: string;
    allow: boolean
}

export interface TirhakaLoginEntity extends Document {
    phone: string;
    password: string;
}

export interface TirhakaServiceEntity extends Document {
    _id?: string;
    services: [{
        _id?: string;
        service: string;
        availability: boolean;
        price: number;
    }];
    servicetype: string;
    availability: boolean;
}

export interface TirhakaAppointmentPartner extends Document {
    services: {
        servicetype: string;
        service: string;
        availability: boolean;
        price: number;
    };
    message: string;
    statut: string;
    client: TirhakaUserEntity;
    worker: TirhakaUserEntity;
    price: number;
    payment_method: string;
    payment_status: string;
    transaction_id: string;
    dete: String;
    heure: String;
    created?: Date;
}


/** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Schemat start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Schemat start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Schemat start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Schemat start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Schemat start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Schemat start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */


export const TirhakaUserSchema = new Schema({
    name: String,
    phone: String,
    password: String,
    role: String,
    address: String,
    email: String,
    pushtoken: String,
    allow: Boolean,
});

export const TirhakaServiceSchema = new Schema({
    services: [{
        service: String,
        availability: Boolean,
        price: Number,
    }],
    servicetype: String,
    availability: Boolean,
});

export const TirhakaAppointmentSchema = new Schema({
    services: {
        servicetype: String,
        service: String,
        availability: Boolean,
        price: Number,
    },
    message: String,
    statut: String,
    client: {
        type: Schema.Types.ObjectId,
        ref: 'TirhakaUser',
    },
    worker: {
        type: Schema.Types.ObjectId,
        ref: 'TirhakaUser',
    },
    price: Number,
    payment_method: String,
    payment_status: String,
    transaction_id: String,
    dete: String,
    heure: String,
    created: { type: Date, default: Date.now },
});
