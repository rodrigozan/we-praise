import { Types } from 'mongoose';

import { PostModel } from '../models/PostModel';
import { UserModel } from '../models/UserModel';

import { IPost, IPostFilter, IFilterQuery } from 'interfaces/global.interface';

import ValidationHelper from '../helpers/ValidationHelper';

const validate = ValidationHelper.validatePostAuthor

export class PostService {
    static async create(post: IPost, userId: Types.ObjectId): Promise<IPost> {

        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                throw new Error('Usuário não encontrado.');
            }

            validate(user);

            const newPost = new PostModel(post);
            await newPost.save();
            return newPost;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async find(filters?: IPostFilter): Promise<IPost[]> {

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

    static async getOne(id: string): Promise<IPost | null> {
        return await PostModel.findById(id);
    }

    static async update(id: string, data: Partial<IPost>): Promise<IPost | null> {
        return await PostModel.findByIdAndUpdate(id, data, { new: true }); 
    }

    static async delete(id: string): Promise<void> {
        await PostModel.findByIdAndDelete(id);
    }
}

