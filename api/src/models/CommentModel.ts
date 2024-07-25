import { Schema, model } from 'mongoose';

import { IComment } from 'interfaces/global.interface';

// const parentSchema = new Schema<IComment>({
//     id: { type: Schema.Types.ObjectId, ref: 'comments' },
//     content: { type: String, required: true },
//     author: { type: Schema.Types.ObjectId, ref: 'users', required: true },
//     createdAt: { type: Date, default: Date.now },
// });

const commentSchema = new Schema<IComment>({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    parent: { type: Schema.Types.ObjectId, ref: 'comments' },
    role: { type: String, enum: ['posts', 'scales','messages'], required: true },
    postTypeId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const CommentModel = model('comments', commentSchema);
