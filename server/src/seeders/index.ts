import dotenv from 'dotenv';
//import connectDB from '../config/database.js';
import connectToDb from '../config/database';
import seedCourses from './courses.js';
import logger from '../utils/logger.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectToDb();
    await seedCourses();
    logger.info('✅ Database seeded successfully');
    process.exit(0);
  } catch (error) {
    logger.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();