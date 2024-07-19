import { Document, Types } from 'mongoose';

interface IUser {
    name: string;
    email: string;
    password: string;
    celular: number;
    instruments: string[];
    role: string;
}

interface IPost extends Document {
    title: string;
    description: string;
    content: string;
    author: Types.ObjectId;
    category: string;
    tags: string[];
    createdAt: Date;
    type: string;
    visibility: string;
    files: string[];
}

interface ISchedule extends Document {
    title: string;
    date: Date;
    service: string;
    members: Types.ObjectId[];
    songs: Types.ObjectId[];
}

interface IMessage extends Document {
    title: string;
    content: string;
    author: Types.ObjectId;
    sentAt: Date;
    recipients: Types.ObjectId[];
}

interface IComment extends Document {
    content: string;
    author: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }
  

export { IUser, IPost, ISchedule, IMessage, IComment }