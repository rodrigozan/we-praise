import { Types } from "mongoose";

import { ISong } from "../interfaces/global.interface";

import { SongModel } from "../models/SongModel";

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
            return results as ISong[]
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async findById(id: Types.ObjectId): Promise<ISong[]> {
        try {
            const results = await SongModel.find(id)
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