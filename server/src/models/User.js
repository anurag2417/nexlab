import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['student', 'mentor', 'admin'],
      default: 'student',
    },
    school: { type: String, trim: true },
    grade: { type: String },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    gamification: {
      xp: { type: Number, default: 0 },
      level: { type: Number, default: 1 },
      streak: { type: Number, default: 0 },
      lastActive: { type: Date, default: Date.now },
      badges: [],
    },
    progress: {
      coursesCompleted: [],
      currentCourse: { type: Schema.Types.ObjectId, ref: 'Course' },
      currentSprint: { type: Schema.Types.ObjectId, ref: 'Sprint' },
      completedSprints: [],
    },
    projects: [],
    isActive: { type: Boolean, default: true },
    lastLogin: Date,
  },
  { timestamps: true }
);

// Hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT
userSchema.methods.getSignedJwtToken = function () {
  const payload = { 
    id: this._id, 
    email: this.email, 
    role: this.role 
  };
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRE || '30d';
  return jwt.sign(payload, secret, { expiresIn });
};

export default mongoose.model('User', userSchema);