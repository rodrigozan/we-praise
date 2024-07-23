//import { Types } from "mongoose";

import { ISchedule } from "interfaces/global.interface";

import { SchemaModel } from "models/SchemaModel";

export class SchemaService {
    static async create(schema: ISchedule): Promise<ISchedule>{
        try {
           const newSchema = new SchemaModel(schema) 
           await newSchema.save()
           return newSchema
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async find(): Promise<ISchedule[]> {
        try {
            const results = await SchemaModel.find()
            return results as ISchedule[]
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}