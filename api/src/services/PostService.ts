import { Types } from 'mongoose';

import { PostModel } from '../models/PostModel';

import { IPost } from 'interfaces/global.interface';

export class PostService {
    static async create(post: IPost): Promise<IPost> {
        try {
            const newPost = new PostModel(post);
            await newPost.save();
            return newPost;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async find(): Promise<IPost[]> {
        try {
            const results = await PostModel.find()
            return results as IPost[];
        } catch (error) {
            console.log('Error in service: ', error.message)
            return error.message
        }
    }

    static async findbyId(id: string): Promise<IPost | null> {
        return await PostModel.findById(id);
    }

    static async update(id: Types.ObjectId, data: Partial<IPost>): Promise<IPost | null> {
        try {
            return await PostModel.findByIdAndUpdate(id, data, { new: true });
        } catch (error){
            console.log('Error in service: ',error.message)
            return null
        }
    }

    static async delete(id: Types.ObjectId): Promise<IPost | null> {
        try {
            return await PostModel.findByIdAndDelete(id);
        } catch (error){
            console.log('Error in service: ',error.message)
            return null
        }
    }
}

