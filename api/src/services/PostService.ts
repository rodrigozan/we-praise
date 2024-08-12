import { Types } from 'mongoose';

import { PostModel } from '../models/PostModel';
import { UserModel } from '../models/UserModel';

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
            .populate({
                path: 'author',
                model: UserModel,
                select: 'name role'
            })
            .exec()
            return results as IPost[];
        } catch (error) {
            return error.message
        }
    }

    static async findById(id: Types.ObjectId): Promise<IPost[]> {
        try {
            const results = await PostModel.find(id)
             .populate({
                path: 'author',
                model: UserModel,
                select: 'name role'
            })
            .exec()
            return results as IPost[]
        } catch (error) {
            console.error(error);
            throw error;
        }
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

