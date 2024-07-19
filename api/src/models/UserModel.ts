import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

import { IUser } from 'interfaces/global.interface';

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    celular: { type: Number, required: true },
    instruments: { type: [String], required: true },
    role: { type: String, enum: ['user', 'admin', 'moderator', 'editor'], default: 'user' }
});

userSchema.methods.checkPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};


export const UserModel = model('User', userSchema);
