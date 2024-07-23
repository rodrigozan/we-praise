import { Schema, model } from 'mongoose';

import { IScale } from '../interfaces/global.interface';

const membersSchema = new Schema({
  id: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  instrument: { type: [String], required: true },
})

const scaleSchema = new Schema<IScale>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  members: [membersSchema],
  songs: [{ type: Schema.Types.ObjectId, ref: 'songs' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }]
});

export const ScaleModel = model('scales', scaleSchema);
