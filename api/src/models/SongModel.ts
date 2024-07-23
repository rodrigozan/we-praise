import { Schema, model } from 'mongoose';

import { ISong } from '../interfaces/global.interface';

const versionSchema = new Schema({
  interpreter: { type: [String] },
  link: { type: [String] },
})

const scaleSchema = new Schema<ISong>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  version: [versionSchema],
});

export const ScaleModel = model('scales', scaleSchema);
