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
    prof: string;
    sex: string;
    pushtoken: string;
    image: [{ ima: string, vue: string }];
    allow: boolean;
    availability: boolean;

    situation: string;
    age: string;
    wapp: string;
    natinalite: string;
    religion: string;
    etudient: string;
}

export interface CopineLoginEntity extends Document {
    phone: string;
    password: string;
}

export interface CopineCommentEntity extends Document {
    _id?: string;
    commenta: CopineUserEntity;
    recepto: CopineUserEntity;
    message: string;
    reply: number;
    comented_at?: Date;

}


export interface CopineReplyEntity extends Document {
    _id?: string;
    commenta: CopineUserEntity;
    recepto: CopineCommentEntity;
    message: string;
    comented_at?: Date;
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
    prof: String,
    sex: String,
    pushtoken: String,
    image: [{ ima: { type: String, vue: String } }],  // Corrected the type for 'ima'
    allow: Boolean,
    availability: Boolean,

    situation: String,
    age: String,
    wapp: String,
    natinalite: String,
    religion: String,
    etudient: String,
});


export const CopineCommentUserSchema = new Schema({
    commenta: {
        type: Schema.Types.ObjectId,
        ref: 'CopineUser',
    },
    recepto: {
        type: Schema.Types.ObjectId,
        ref: 'CopineUser',
    },
    message: String,
    reply: Number,
    comented_at: { type: Date, default: Date.now },
});

export const CopineReplyUserSchema = new Schema({
    commenta: {
        type: Schema.Types.ObjectId,
        ref: 'CopineUser',
    },
    recepto: {
        type: Schema.Types.ObjectId,
        ref: 'CopineComment',
    },
    message: String,
    comented_at: { type: Date, default: Date.now },
});
