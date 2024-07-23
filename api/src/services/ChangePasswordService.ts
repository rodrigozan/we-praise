import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';

import { IChangePassword } from 'interfaces/global.interface';

import { UserModel } from '../models/UserModel';

export class ChangePasswordService {

    static async changePassword(id: Types.ObjectId, password: string, newPassword: string) {
        try {

            const user = await UserModel.findOne({ _id: id }, 'password')

            if (!user) {
                throw new Error('User not found in ChangePasswordService');
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            this.comparePassword(user.password, password)

            user.password = hashedPassword;

            await user.save();

            return user

        } catch (error) {
            console.error('Error in service: ', {
                name: error.name,
                message: error.message
            });
            throw error;
        }
    }

    static async comparePassword(userPassword: string, newPassword: string): Promise<IChangePassword> {
        const pass = await UserModel.findOne({ password: userPassword }, 'password')

        if (!pass) {
            throw new Error('Passwords cannot be the same');
        }

        if (userPassword === newPassword) {
            throw new Error('User not found in ChangePasswordService');
        }


        return { userPassword, newPassword }
    }

}