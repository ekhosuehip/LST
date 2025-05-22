import { Types, Schema, model} from 'mongoose';
import { IAccount } from '../interfaces/account';

const accountSchema = new Schema({
    user: {type: Types.ObjectId, ref:'User', required: true},
    accNumber: {type: String, unique: true, required: true},
    cardNumber: {type: String, unique: true, required: true},
    cvv: {type: String, required: true},
    expiryDate: {type: String, required: true},
}, {timestamps: true, versionKey: false})

const Accounts = model<IAccount>('Accounts', accountSchema);

export default Accounts