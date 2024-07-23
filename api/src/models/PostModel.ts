import { Schema, model } from 'mongoose';

import { IPost } from 'interfaces/global.interface'

const contentSchema = new Schema({
    title: {type: String},
    content: {type: String}
})

const postSchema = new Schema<IPost>({
    title: { type: String, required: true },
    description: { type: String },
    content: { type: [contentSchema], required: true },
    author: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    category: { type: String },
    tags: { type: [String] },
    createdAt: { type: Date, default: Date.now },
    updateAt: [{ type: Date, default: Date.now }],
    type: { type: String, enum: ['article', 'video', 'lesson', 'message'] },
    visibility: { type: String, enum: ['public', 'private', 'restricted'] },
    files: [{ type: String }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})

postSchema.index({ title: 1, createdAt: -1 });
postSchema.index({ author: 'text' });
postSchema.index({ category: 'text' });
postSchema.index({ tags: 'text' });

export const PostModel = model('posts', postSchema);
