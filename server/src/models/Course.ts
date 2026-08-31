import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  tier: number;
  icon: string;
  color: string;
  sprints: Types.ObjectId[];
  estimatedHours: number;
  prerequisites: string[];
  learningObjectives: string[];
  isActive: boolean;
}

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    tier: { type: Number, required: true, min: 1, max: 5 },
    icon: { type: String, required: true },
    color: { type: String, required: true },
    sprints: [{ type: Schema.Types.ObjectId, ref: 'Sprint' }],
    estimatedHours: { type: Number, required: true },
    prerequisites: [{ type: String }],
    learningObjectives: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICourse>('Course', courseSchema);