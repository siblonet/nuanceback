import { Document, Schema } from 'mongoose';

export interface CopineUserEntity extends Document {
    _id?: string;
    name: string;
    phone: string;
    password: string;
    ville: string;
    role: string;
    address: string;
    email: string;
    bio: string;
    sex: string;
    pushtoken: string;
    image: [{ ima: string }];
    allow: boolean;
    availability: boolean;
}

export interface CopineLoginEntity extends Document {
    phone: string;
    password: string;
}



/** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Schemat start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Schemat start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Schemat start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Schemat start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Schemat start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/** @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Schemat start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */


export const CopineUserSchema = new Schema({
    name: String,
    phone: String,
    password: String,
    ville: String,
    role: String,
    address: String,
    email: String,
    bio: String,
    sex: String,
    pushtoken: String,
    image: [{ ima: { type: String } }],  // Corrected the type for 'ima'
    allow: Boolean,
    availability: Boolean,
});
