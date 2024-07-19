import { Schema, model } from 'mongoose';

import { ISchedule } from 'interfaces/global.interface';

const scheduleSchema = new Schema<ISchedule>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  service: { type: String, enum: ['morning', 'afternoon', 'night'] },
  members: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  songs: [{ type: Schema.Types.ObjectId, ref: 'posts' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }]
});

export const SchemaModel = model('schedules', scheduleSchema);
