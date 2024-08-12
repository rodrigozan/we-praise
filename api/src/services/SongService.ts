import { Types } from "mongoose";

import { ISong } from "../interfaces/global.interface";

import { SongModel } from "../models/SongModel";
import { UserModel } from '../models/UserModel';

export class SongService {
    static async create(song: ISong): Promise<ISong>{
        try {
           const newSong = new SongModel(song) 
           await newSong.save()
           return newSong
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async find(): Promise<ISong[]> {
        try {
            const results = await SongModel.find()
             .populate({
                path: 'author',
                model: UserModel,
                select: 'name role'
            })
            .exec()
            return results as ISong[]
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async findById(id: Types.ObjectId): Promise<ISong[]> {
        try {
            const results = await SongModel.find(id)
             .populate({
                path: 'author',
                model: UserModel,
                select: 'name role'
            })
            .exec()
            return results as ISong[]
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async update(id: Types.ObjectId, data:  Partial<ISong>): Promise<ISong | null>{
        try {
           return await SongModel.findByIdAndUpdate(id, data, { new: true })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async delete(id: Types.ObjectId){
        try {
           return await SongModel.findByIdAndDelete(id,)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}