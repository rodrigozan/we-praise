import { Types } from "mongoose";

import { IScale } from "../interfaces/global.interface";

import { ScaleModel } from "../models/ScaleModel";

export class ScaleService {
    static async create(schema: IScale): Promise<IScale>{
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
            return results as IScale[]
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async findById(id: Types.ObjectId): Promise<IScale[]> {
        try {
            const results = await ScaleModel.find(id)
            return results as IScale[]
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async update(id: Types.ObjectId, data: IScale){
        try {
           return await ScaleModel.findByIdAndUpdate(id, data, { new: true })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async delete(id: Types.ObjectId){
        try {
           return await ScaleModel.findByIdAndDelete(id,)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}