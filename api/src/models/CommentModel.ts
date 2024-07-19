import { Schema, model } from 'mongoose';

import { IComment } from 'interfaces/global.interface';

const commentSchema = new Schema<IComment>({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    parent: { type: Schema.Types.ObjectId, ref: 'Comment' }
});

export const CommentModel = model('comments', commentSchema);
