import { Types } from "mongoose";

import { IComment } from "../interfaces/global.interface";

import { CommentModel } from "../models/CommentModel";

export class CommentService {
    static async create(message: IComment): Promise<IComment> {
        try {
            const newMessage = new CommentModel(message)
            await newMessage.save()
            return newMessage
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // static async find(postTypeId: Types.ObjectId): Promise<IComment[]> {
    //     try {
    //         const results = await CommentModel.aggregate([
    //             { $match: { postTypeId: new Types.ObjectId(postTypeId) } },
    //             {
    //                 $lookup: {
    //                     from: 'comments', // Coleção dos comentários
    //                     localField: '_id',
    //                     foreignField: 'parent',
    //                     as: 'children'
    //                 }
    //             },
    //             {
    //                 $addFields: {
    //                     hasChildren: { $gt: [{ $size: '$children' }, 0] }
    //                 }
    //             },
    //             {
    //                 $match: {
    //                     hasChildren: true
    //                 }
    //             },
    //             {
    //                 $group: {
    //                     _id: '$_id',
    //                     content: { $first: '$content' },
    //                     author: { $first: '$author' },
    //                     role: { $first: '$role' },
    //                     postTypeId: { $first: '$postTypeId' },
    //                     createdAt: { $first: '$createdAt' },
    //                     updatedAt: { $first: '$updatedAt' },
    //                     __v: { $first: '$__v' },
    //                     children: { $first: '$children' }
    //                 }
    //             },
    //             {
    //                 $project: {
    //                     hasChildren: 0
    //                 }
    //             }
    //         ]);

    //         console.log('Results', results);
    //         return results as IComment[];
    //     } catch (error) {
    //         console.error(error);
    //         throw error;
    //     }
    // }
    static async find(postTypeId: Types.ObjectId): Promise<IComment[]> {
        try {
            const results = await CommentModel.aggregate([
                { $match: { postTypeId: new Types.ObjectId(postTypeId), parent: { $exists: false } } },
                {
                    $lookup: {
                        from: 'comments',
                        let: { parentId: '$_id' },
                        pipeline: [
                            { $match: { $expr: { $eq: ['$parent', '$$parentId'] } } },
                            {
                                $lookup: {
                                    from: 'comments',
                                    let: { parentId: '$_id' },
                                    pipeline: [
                                        { $match: { $expr: { $eq: ['$parent', '$$parentId'] } } },
                                        {
                                            $project: {
                                                content: 1,
                                                author: 1,
                                                parent: 1,
                                                role: 1,
                                                postTypeId: 1,
                                                createdAt: 1,
                                                updatedAt: 1,
                                                __v: 1
                                            }
                                        }
                                    ],
                                    as: 'children'
                                }
                            },
                            {
                                $project: {
                                    content: 1,
                                    author: 1,
                                    parent: 1,
                                    role: 1,
                                    postTypeId: 1,
                                    createdAt: 1,
                                    updatedAt: 1,
                                    __v: 1,
                                    children: 1
                                }
                            }
                        ],
                        as: 'children'
                    }
                },
                {
                    $project: {
                        content: 1,
                        author: 1,
                        parent: 1,
                        role: 1,
                        postTypeId: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        __v: 1,
                        children: 1
                    }
                }
            ]);
            return results as IComment[];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async search(filter: { id?: Types.ObjectId, username?: string, email?: string }, postTypeId: Types.ObjectId): Promise<IComment[]> {

        try {
            const matchStage: any = { $match: { postTypeId: new Types.ObjectId(postTypeId) } };

            if (filter.id) {
                matchStage.$match._id = new Types.ObjectId(filter.id);
            } else if (filter.username) {
                matchStage.$match.author = filter.username;
            } else if (filter.email) {
                matchStage.$match.authorEmail = filter.email;
            } else {
                throw new Error('No valid filters provided');
            }

            const results = await CommentModel.aggregate([
                matchStage,
                {
                    $lookup: {
                        from: 'comments',
                        let: { parentId: '$_id' },
                        pipeline: [
                            { $match: { $expr: { $eq: ['$parent', '$$parentId'] } } },
                            {
                                $lookup: {
                                    from: 'comments',
                                    let: { parentId: '$_id' },
                                    pipeline: [
                                        { $match: { $expr: { $eq: ['$parent', '$$parentId'] } } },
                                        {
                                            $project: {
                                                content: 1,
                                                author: 1,
                                                parent: 1,
                                                role: 1,
                                                postTypeId: 1,
                                                createdAt: 1,
                                                updatedAt: 1,
                                                __v: 1
                                            }
                                        }
                                    ],
                                    as: 'children'
                                }
                            },
                            {
                                $project: {
                                    content: 1,
                                    author: 1,
                                    parent: 1,
                                    role: 1,
                                    postTypeId: 1,
                                    createdAt: 1,
                                    updatedAt: 1,
                                    __v: 1,
                                    children: 1
                                }
                            }
                        ],
                        as: 'children'
                    }
                },
                {
                    $project: {
                        content: 1,
                        author: 1,
                        parent: 1,
                        role: 1,
                        postTypeId: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        __v: 1,
                        children: 1
                    }
                }
            ]);
            return results as IComment[];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    static async update(id: Types.ObjectId, data: IComment) {
        try {
            return await CommentModel.findByIdAndUpdate(id, data, { new: true })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async delete(id: Types.ObjectId) {
        try {
            return await CommentModel.findByIdAndDelete(id,)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}