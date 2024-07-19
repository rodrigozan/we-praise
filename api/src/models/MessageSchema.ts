import { Schema, model } from 'mongoose';

import { IMessage } from 'interfaces/global.interface';

const messageSchema = new Schema<IMessage>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sentAt: { type: Date, default: Date.now },
  recipients: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }]
});

export const MessageModel = model('messages', messageSchema);
