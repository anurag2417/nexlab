import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['student', 'mentor', 'admin'],
      default: 'student',
    },
    school: { type: String, trim: true },
    grade: { type: String, enum: ['8', '9', '10', '11', '12'] },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    profile: {
      avatar: { type: String, default: 'default-avatar.png' },
      bio: { type: String, maxlength: [200, 'Bio cannot be more than 200 characters'] },
      socialLinks: {
        github: String,
        linkedin: String,
        portfolio: String,
      },
    },
    gamification: {
      xp: { type: Number, default: 0 },
      level: { type: Number, default: 1 },
      streak: { type: Number, default: 0 },
      lastActive: { type: Date, default: Date.now },
      badges: [
        {
          badgeId: { type: Schema.Types.ObjectId, ref: 'Badge' },
          earnedAt: { type: Date, default: Date.now },
        },
      ],
    },
    progress: {
      coursesCompleted: [
        {
          courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
          completedAt: Date,
          certificateUrl: String,
        },
      ],
      currentCourse: { type: Schema.Types.ObjectId, ref: 'Course' },
      currentSprint: { type: Schema.Types.ObjectId, ref: 'Sprint' },
      completedSprints: [{ type: Schema.Types.ObjectId, ref: 'Sprint' }],
    },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    isActive: { type: Boolean, default: true },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    lastLogin: Date,
  },
  { timestamps: true }
);

// Hash password before saving - using bcryptjs
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method - using bcryptjs
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

// Calculate level from XP
userSchema.methods.calculateLevel = function () {
  return Math.floor(this.gamification.xp / 100) + 1;
};

export default mongoose.model('User', userSchema);