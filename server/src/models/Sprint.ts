import mongoose, { Document, Schema } from 'mongoose';

export interface ISprint extends Document {
  title: string;
  description: string;
  tier: number;
  order: number;
  content: string;
  starterCode: string;
  solutionCode?: string;
  testCases?: Array<{
    input: string;
    expectedOutput: string;
  }>;
  resources?: Array<{
    title: string;
    url: string;
  }>;
  estimatedTime: number;
  isActive: boolean;
}

const sprintSchema = new Schema<ISprint>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tier: { type: Number, required: true, min: 1, max: 5 },
    order: { type: Number, required: true },
    content: { type: String, required: true },
    starterCode: { type: String, default: '' },
    solutionCode: { type: String, default: '' },
    testCases: [
      {
        input: String,
        expectedOutput: String,
      },
    ],
    resources: [
      {
        title: String,
        url: String,
      },
    ],
    estimatedTime: { type: Number, default: 45 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<ISprint>('Sprint', sprintSchema);