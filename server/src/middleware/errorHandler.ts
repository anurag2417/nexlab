import { Response } from 'express';
import logger from '../utils/logger.js';

export interface AppError extends Error {
  statusCode?: number;
  code?: number;
  keyPattern?: Record<string, any>;
  errors?: Record<string, any>;
}

const errorHandler = (err: AppError,  res: Response) => {
  let error = { ...err };
  error.message = err.message;

  logger.error(`${err.name}: ${err.message}`, { stack: err.stack });

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0];
    const message = `${field} already exists`;
    error = { message, statusCode: 400 } as AppError;
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors || {}).map((val: any) => val.message).join(', ');
    error = { message, statusCode: 400 } as AppError;
  }

  if (err.name === 'JsonWebTokenError') {
    error = { message: 'Invalid token', statusCode: 401 } as AppError;
  }

  if (err.name === 'TokenExpiredError') {
    error = { message: 'Token expired', statusCode: 401 } as AppError;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;