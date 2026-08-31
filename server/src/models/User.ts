import mongoose, { Document, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'mentor' | 'admin';
  school?: string;
  grade?: string;
  city?: string;
  state?: string;
  profile: {
    avatar: string;
    bio: string;
    socialLinks: {
      github?: string;
      linkedin?: string;
      portfolio?: string;
    };
  };
  gamification: {
    xp: number;
    level: number;
    streak: number;
    lastActive: Date;
    badges: Array<{
      badgeId: Types.ObjectId;
      earnedAt: Date;
    }>;
  };
  progress: {
    coursesCompleted: Array<{
      courseId: Types.ObjectId;
      completedAt: Date;
      certificateUrl: string;
    }>;
    currentCourse?: Types.ObjectId;
    currentSprint?: Types.ObjectId;
    completedSprints: Types.ObjectId[];
  };
  projects: Types.ObjectId[];
  isActive: boolean;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  lastLogin?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
  calculateLevel(): number;
}

const userSchema = new Schema<IUser>(
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// FIX: Correct JWT sign with proper typing
userSchema.methods.getSignedJwtToken = function (): string {
  const payload = { 
    id: this._id, 
    email: this.email, 
    role: this.role 
  };
  
  const secret = process.env.JWT_SECRET as string;
  const expiresIn = process.env.JWT_EXPIRE || '30d';
  
  // FIX: Use type assertion for expiresIn
  return jwt.sign(
    payload, 
    secret, 
    { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] }
  );
};

userSchema.methods.calculateLevel = function (): number {
  return Math.floor(this.gamification.xp / 100) + 1;
};

export default mongoose.model<IUser>('User', userSchema);