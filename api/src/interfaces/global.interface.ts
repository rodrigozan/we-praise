import { Document, Types } from 'mongoose'

interface IUser {
    name: string
    email: string
    password: string
    celular: number
    instruments: string[]
    role: string
}

interface IPost extends Document {
    title: string
    description: string
    content: string
    author: Types.ObjectId
    category: string
    tags: string[]
    createdAt: Date
    type: string
    visibility: string
    files: string[]
    comments: Types.ObjectId[]
}

interface IPostFilter {
    title?: string;
    author?: string;
    category?: string;
    tags?: string[];
}

interface IFilterQuery<IPost> {
    title?: string | { $eq?: string } | { $regex?: RegExp }
    author?: Types.ObjectId | { $eq?: Types.ObjectId } | { $in?: Types.ObjectId[] }
    category?: string | { $eq?: string } | { $regex?: RegExp } | { $in?: string[] }
    tags?: string[] | { $in?: string[] } | { $all?: string[] }
    createdAt?: Date | { $eq?: Date } | { $gt?: Date } | { $gte?: Date } | { $lt?: Date } | { $lte?: Date }
    type?: string | { $eq?: string } | { $in?: string[] }
    visibility?: string | { $eq?: string } | { $in?: string[] }
    files?: string[] | { $in?: string[] } | { $all?: string[] }
    comments?: Types.ObjectId[] | { $in?: Types.ObjectId[] }

    $and?: IFilterQuery<IPost>[]
    $or?: IFilterQuery<IPost>[]
    $not?: IFilterQuery<IPost>

    $exists?: { [field: string]: boolean }
    $type?: string

    $text?: {
        $search: string;
        $language?: string;
        $caseSensitive?: boolean;
        $diacriticSensitive?: boolean;
    };

}


interface ISchedule extends Document {
    title: string
    date: Date
    service: string
    members: Types.ObjectId[]
    songs: Types.ObjectId[]
    comments: Types.ObjectId[]
}

interface IMessage extends Document {
    title: string
    content: string
    author: Types.ObjectId
    sentAt: Date
    recipients: Types.ObjectId[]
    comments: Types.ObjectId[]
}

interface IComment extends Document {
    content: string
    author: Types.ObjectId
    createdAt: Date
    updatedAt: Date
    parent: Types.ObjectId
}


export { IUser, IPost, IPostFilter, IFilterQuery, ISchedule, IMessage, IComment }