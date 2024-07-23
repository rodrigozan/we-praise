import { Types } from 'mongoose';

import { PostModel } from '../models/PostModel';

import { IPost, IPostFilter, IFilterQuery } from 'interfaces/global.interface';

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

    static async findFilter(filters?: IPostFilter): Promise<IPost[]> {

        let query: IFilterQuery<IPost> = {};

        if (filters?.title) {
            query.title = filters.title;
        }

        if (filters?.author) {
            query.$text = { $search: filters.author };
        }

        if (filters?.category) {
            query.$text = { $search: filters.category };
        }

        if (filters?.tags) {
            query.tags = { $in: filters.tags };
        }

        if (Object.keys(query).some(key => key === 'title' || key === '$text' || key === 'tags')) {
            query = { $and: [query] };
        }

        return await PostModel.find(query, { score: { $meta: "textScore" } }).sort({ createdAt: -1 });

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

