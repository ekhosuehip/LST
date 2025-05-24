import { Types } from 'mongoose';

export interface IAccount {
    user: Types.ObjectId,
    accNumber: string,
    cardNumber: string,
    cvv: string,
    expiryDate: string
}

export interface PopulatedAccount {
    accNumber: string;
    cardNumber: string;
    cvv: string;
    expiryDate: string;
    user: {
        firstName: string;
        surname: string;
        phoneNumber: string;
        dateOfBirth: string 
    };
}
