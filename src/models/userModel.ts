import { Schema, model} from 'mongoose';
import { IUser } from '../interfaces/user';

const userSchema = new Schema<IUser>({
    firstName: {type: String, required: true, trim: true},
    surname: {type: String, required: true, trim: true},
    email: {type: String, unique: true, required: true, trim: true, index: true},
    phoneNumber: {type: String, unique: true, required: true, trim: true, index: true},
    dateOfBirth: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
}, {timestamps: true, versionKey: false});

const User = model<IUser>('User', userSchema);

export default User