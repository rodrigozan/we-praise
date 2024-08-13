import { Types } from "mongoose";

import { IScale } from "../interfaces/global.interface";

import { ScaleModel } from "../models/ScaleModel";
import { UserModel } from "../models/UserModel";

export class ScaleService {
    static async create(schema: IScale): Promise<IScale> {
        try {
            const newSchema = new ScaleModel(schema)
            await newSchema.save()
            return newSchema
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async find(): Promise<IScale[]> {
        try {
            const results = await ScaleModel.find()
                .populate({
                    path: 'author',
                    model: UserModel,
                    select: 'name role'
                })
                .populate({
                    path: 'songs',
                    select: 'title'
                })
                .populate({
                    path: 'members.minister members.minister_two members.back_one members.back_two members.back_three members.keyboard members.acoustic_guitar members.guitar members.bass members.drums members.audio_tech',
                    model: UserModel,
                    select: 'name instruments'
                })
                .exec();
            return results as IScale[]
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async findById(id: Types.ObjectId): Promise<IScale[]> {
        try {
            const results = await ScaleModel.find(id)
                .populate({
                    path: 'author',
                    model: UserModel,
                    select: 'name role'
                })
                .populate({
                    path: 'songs',
                    select: 'title'
                })
                .populate({
                    path: 'members.minister members.minister_two members.back_one members.back_two members.back_three members.keyboard members.acoustic_guitar members.guitar members.bass members.drums members.audio_tech',
                    model: UserModel,
                    select: 'name instruments'
                })
                .exec();
            console.log(results as IScale[])
            return results as IScale[]
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async update(id: Types.ObjectId, data: IScale) {
        try {
            return await ScaleModel.findByIdAndUpdate(id, data, { new: true })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async delete(id: Types.ObjectId) {
        try {
            return await ScaleModel.findByIdAndDelete(id,)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}