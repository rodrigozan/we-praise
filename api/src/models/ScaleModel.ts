import { Schema, model } from 'mongoose';

import { IScale } from '../interfaces/global.interface';

const membersSchema = new Schema({
  minister: { type: Schema.Types.ObjectId, ref: 'users' },
  minister_two: { type: Schema.Types.ObjectId, ref: 'users' },
  back_one: { type: Schema.Types.ObjectId, ref: 'users' },
  back_two: { type: Schema.Types.ObjectId, ref: 'users' },
  back_three: { type: Schema.Types.ObjectId, ref: 'users' },
  keyboard: { type: Schema.Types.ObjectId, ref: 'users' },
  acoustic_guitar: { type: Schema.Types.ObjectId, ref: 'users' },
  guitar: { type: Schema.Types.ObjectId, ref: 'users' },
  bass: { type: Schema.Types.ObjectId, ref: 'users' },
  drums: { type: Schema.Types.ObjectId, ref: 'users' },
  audio_tech: { type: Schema.Types.ObjectId, ref: 'users' },
})

const scaleSchema = new Schema<IScale>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  members: membersSchema,
  author: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: 'songs' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }]
});

export const ScaleModel = model('scales', scaleSchema);
