import { Document, Types } from 'mongoose'

interface IUser {
    id: Types.ObjectId
    name: string
    email: string
    password: string
    celular: number
    instruments: string[]
    subteam: string[]
    active: boolean
    role: string
}

interface IChangePassword {
    userPassword: string
    newPassword: string
}

interface IPost extends Document {
    title: string
    description: string
    content: {}
    author: Types.ObjectId
    category: string
    tags: string[]
    createdAt: Date
    updateAt: [Date]
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

interface IScale extends Document {
    title: string
    author: Types.ObjectId
    date: Date
    createdAt: Date,
    updatedAt: [Date]
    members: {
        id: Types.ObjectId[],
        instrument: string[]
    }
    songs: Types.ObjectId[]
    comments: Types.ObjectId[]
}

interface ISong extends Document {
    title: string,
    songAuthor: string,
    version: {
        interpreter: string,
        link: string
    },
    observations: string
    author: Types.ObjectId
    createdAt: Date 
}

interface IMessage extends Document {
    title: string
    content: string
    author: Types.ObjectId
    sentAt: Date
    recipients: Types.ObjectId[]
    comments: Types.ObjectId[],
    createdAt: Date
}

interface IComment extends Document {
    content: string
    author: Types.ObjectId
    createdAt: Date
    updatedAt: Date
    parent: Types.ObjectId,
    role: string
}


export { IUser, IChangePassword, IPost, IPostFilter, IScale, ISong, IMessage, IComment }