import { Types } from "mongoose";

import { IMessage } from "../interfaces/global.interface";

import { MessageModel } from "../models/MessageModel";
import { UserModel } from '../models/UserModel';

export class MessageService {
    static async create(message: IMessage): Promise<IMessage>{
        try {
           const newMessage = new MessageModel(message) 
           await newMessage.save()
           return newMessage
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async find(): Promise<IMessage[]> {
        try {
            const results = await MessageModel.find()
            .populate({
                path: 'author',
                model: UserModel,
                select: 'name role'
            })
            .populate({
                path: 'recipients',
                model: UserModel,
                select: 'name role'
            })
            .exec()
            
            return results as IMessage[]
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async findById(id: Types.ObjectId): Promise<IMessage[]> {
        try {
            const results = await MessageModel.find(id)
            .populate({
                path: 'author',
                model: UserModel,
                select: 'name role'
            })
            .populate({
                path: 'recipients',
                model: UserModel,
                select: 'name role'
            })
            .exec()
            return results as IMessage[]
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async update(id: Types.ObjectId, data: IMessage){
        try {
           return await MessageModel.findByIdAndUpdate(id, data, { new: true })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async delete(id: Types.ObjectId){
        try {
           return await MessageModel.findByIdAndDelete(id,)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}