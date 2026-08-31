import mongoose, { Schema } from 'mongoose';

const projectSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a project title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a project description'],
      minlength: [20, 'Description must be at least 20 characters'],
      maxlength: [2000, 'Description cannot be more than 2000 characters'],
    },
    tier: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    techStack: [{ type: String, trim: true }],
    githubRepo: {
      type: String,
      trim: true,
      match: [
        /^https?:\/\/(www\.)?github\.com\/.+\/.+$/,
        'Please provide a valid GitHub repository URL',
      ],
    },
    liveDemoUrl: {
      type: String,
      trim: true,
    },
    modelUrl: { type: String, trim: true },
    files: [
      {
        filename: String,
        path: String,
        size: Number,
        mimetype: String,
      },
    ],
    screenshots: [String],
    status: {
      type: String,
      enum: ['draft', 'submitted', 'reviewed', 'approved', 'rejected'],
      default: 'draft',
    },
    feedback: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        comment: { type: String, maxlength: [500, 'Feedback cannot be more than 500 characters'] },
        rating: { type: Number, min: 1, max: 5 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    isPublic: { type: Boolean, default: false },
    submittedAt: Date,
    reviewedAt: Date,
    instructorFeedback: { type: String, maxlength: [1000, 'Feedback cannot be more than 1000 characters'] },
  },
  { timestamps: true }
);

// Indexes for faster queries
projectSchema.index({ user: 1, createdAt: -1 });
projectSchema.index({ tier: 1, isPublic: 1, status: 1 });
projectSchema.index({ isPublic: 1, likes: -1 });
projectSchema.index({ title: 'text', description: 'text' });

export default mongoose.model('Project', projectSchema);