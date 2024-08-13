import bcrypt from 'bcryptjs'
import { Types } from 'mongoose';

import { UserModel } from '../models/UserModel'

export class UserService {

    static async create(data: any) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 8)
            const user = new UserModel({
                ...data,
                password: hashedPassword,
            })
            return await user.save()
        }
        catch (error){
            return error.message
        }
   
    }

    static async find() {
        try {
            return await UserModel.find()
        } catch (error){
            return error.message
        }
        
    }

    static async findUserById(id: Types.ObjectId, data: string) {
        try {
            return await UserModel.findById(id, data)
        } catch (error){
            return error.message
        }        
    }

    static async findOne(email: string) {
        try {
            return await UserModel.findOne({email: email}, `email`)
        } catch (error){
            return error.message
        }        
    }

    static async update(id: Types.ObjectId, data: any) {
        try {
            return await UserModel.findByIdAndUpdate(id, data, { new: true })
        } catch (error){
            return error.message
        }        
    }

    static async delete(id: Types.ObjectId) {
        try {
            return await UserModel.findByIdAndDelete(id)
        } catch (error){
            return error.message
        }
    }
    
}

