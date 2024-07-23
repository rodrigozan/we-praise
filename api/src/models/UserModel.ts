import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

import { IUser } from 'interfaces/global.interface';

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    celular: { type: Number, required: true },
    instruments: { type: [String], required: true },
    subteam: { type: [String], enum: ['band', 'vocals', 'audio_tech', 'editor'] },
    active: { type: Boolean, required: true, default: false},
    role: { type: String, enum: ['member', 'minister','admin', 'moderator', 'editor'], default: 'member' }
});

userSchema.methods.checkPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};


export const UserModel = model('User', userSchema);
