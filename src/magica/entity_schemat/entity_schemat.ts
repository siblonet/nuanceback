import { Document, Schema } from 'mongoose';

export interface MagicaUserEntity extends Document {
    _id?: string;
    name: string;
    phone: string;
    password: string;
    role: string;
    pushtoken: string;
    allow: boolean
}

export interface MagicaLoginEntity extends Document {
    phone: string;
    password: string;
}

export interface MagicaServiceEntity extends Document {
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

export interface MagicaAppointmentPartner extends Document {
    services: {
        servicetype: string;
        service: string;
        availability: boolean;
        price: number;
    };
    message: string;
    statut: string;
    client: MagicaUserEntity;
    worker: MagicaUserEntity;
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


export const MagicaUserSchema = new Schema({
    name: String,
    phone: String,
    password: String,
    role: String,
    address: String,
    email: String,
    pushtoken: String,
    allow: Boolean,
});

export const MagicaServiceSchema = new Schema({
    services: [{
        service: String,
        availability: Boolean,
        price: Number,
    }],
    servicetype: String,
    availability: Boolean,
});

export const MagicaAppointmentSchema = new Schema({
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
        ref: 'MagicaUser',
    },
    worker: {
        type: Schema.Types.ObjectId,
        ref: 'MagicaUser',
    },
    price: Number,
    payment_method: String,
    payment_status: String,
    transaction_id: String,
    dete: String,
    heure: String,
    created: { type: Date, default: Date.now },
});
