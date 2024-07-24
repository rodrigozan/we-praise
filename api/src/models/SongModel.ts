import { Schema, model } from 'mongoose';

import { ISong } from '../interfaces/global.interface';

const versionSchema = new Schema({
  interpreter: { type: [String] },
  link: { type: [String] },
})

const songSchema = new Schema<ISong>({
  title: { type: String, required: true },
  songAuthor: { type: String },
  version: [versionSchema],
  observations: { type: String },
  author: { type: Schema.Types.ObjectId, required: true}
});

export const SongModel = model('songs', songSchema);
