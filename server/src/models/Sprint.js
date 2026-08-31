import mongoose, { Schema } from 'mongoose';

const sprintSchema = new Schema(
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

export default mongoose.model('Sprint', sprintSchema);