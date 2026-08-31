import jwt, { SignOptions } from 'jsonwebtoken';
import { Types } from 'mongoose';

export const generateToken = (userId: Types.ObjectId): string => {
  const secret = process.env.JWT_SECRET as string;
  const expiresIn = (process.env.JWT_EXPIRE || '30d') as SignOptions['expiresIn'];
  
  const payload = { id: userId };
  const options: SignOptions = { expiresIn };
  
  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string): any => {
  const secret = process.env.JWT_SECRET as string;
  return jwt.verify(token, secret);
};