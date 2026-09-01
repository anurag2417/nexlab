import User from '../models/User.js';
import logger from '../utils/logger.js';

export const createAdmin = async () => {
  try {
    // Check if admin exists
    const adminExists = await User.findOne({ isAdmin: true });
    
    if (adminExists) {
      logger.info('👑 Admin already exists:', adminExists.email);
      return;
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@nexlab.com',
      password: 'admin123',
      role: 'admin',
      isAdmin: true,
      school: 'NexLab HQ',
      city: 'Delhi',
    });

    logger.info('👑 Admin created successfully:', admin.email);
    logger.info('🔑 Password: admin123');
  } catch (error) {
    logger.error('❌ Failed to create admin:', error);
  }
};

export default createAdmin;