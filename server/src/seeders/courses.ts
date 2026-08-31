import Course from '../models/Course.js';
import Sprint from '../models/Sprint.js';
import logger from '../utils/logger.js';

const seedCourses = async () => {
  try {
    // Clear existing
    await Course.deleteMany({});
    await Sprint.deleteMany({});

    // Create sprints for Tier 1: Digital Literacy
    const tier1Sprints = await Sprint.create([
      {
        title: 'Introduction to the Internet',
        description: 'Learn how the internet works and how websites are created.',
        tier: 1,
        order: 1,
        content: '# Introduction to the Internet\n\n...',
        starterCode: '<html>\n  <body>\n    <h1>Hello, World!</h1>\n  </body>\n</html>',
        estimatedTime: 45,
      },
      {
        title: 'Build Your First Webpage',
        description: 'Create a simple webpage with HTML.',
        tier: 1,
        order: 2,
        content: '# Building Your First Webpage\n\n...',
        starterCode: '<html>\n  <body>\n    <h1>Welcome to My Website</h1>\n    <p>This is my first webpage!</p>\n  </body>\n</html>',
        estimatedTime: 60,
      },
      {
        title: 'Create a Personal Portfolio',
        description: 'Build a portfolio page to showcase your work.',
        tier: 1,
        order: 3,
        content: '# Personal Portfolio\n\n...',
        starterCode: '<html>\n  <head>\n    <title>My Portfolio</title>\n  </head>\n  <body>\n    <h1>My Portfolio</h1>\n  </body>\n</html>',
        estimatedTime: 90,
      },
    ]);

    // Create Tier 1 Course
    await Course.create({
      title: 'Digital Literacy',
      description: 'Learn the basics of the web and how technology works.',
      tier: 1,
      icon: '🌐',
      color: 'blue',
      sprints: tier1Sprints.map((s) => s._id),
      estimatedHours: 3,
      prerequisites: [],
      learningObjectives: [
        'Understand how the internet works',
        'Build basic webpages with HTML',
        'Create a personal portfolio',
      ],
      isActive: true,
    });

    // Create Tier 2: Python Basics
    const tier2Sprints = await Sprint.create([
      {
        title: 'Hello World & Variables',
        description: 'Write your first Python program and learn about variables.',
        tier: 2,
        order: 1,
        content: '# Hello World in Python\n\n...',
        starterCode: 'print("Hello, World!")',
        estimatedTime: 45,
      },
      {
        title: 'Functions & Conditionals',
        description: 'Learn how to write functions and use conditionals.',
        tier: 2,
        order: 2,
        content: '# Functions and Conditionals\n\n...',
        starterCode: 'def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Student"))',
        estimatedTime: 60,
      },
      {
        title: 'Build a Calculator App',
        description: 'Create a simple calculator using Python functions.',
        tier: 2,
        order: 3,
        content: '# Calculator App\n\n...',
        starterCode: 'def add(a, b):\n    return a + b\n\nprint(add(5, 3))',
        estimatedTime: 60,
      },
      {
        title: 'Create a Number Guessing Game',
        description: 'Build an interactive game using loops and conditionals.',
        tier: 2,
        order: 4,
        content: '# Number Guessing Game\n\n...',
        starterCode: 'import random\n\nnumber = random.randint(1, 100)\nprint("Guess the number!")',
        estimatedTime: 75,
      },
    ]);

    await Course.create({
      title: 'Python Basics',
      description: 'Start your coding journey with Python programming.',
      tier: 2,
      icon: '🐍',
      color: 'green',
      sprints: tier2Sprints.map((s) => s._id),
      estimatedHours: 4,
      prerequisites: ['Digital Literacy'],
      learningObjectives: [
        'Write Python programs from scratch',
        'Understand functions and conditionals',
        'Build interactive applications',
      ],
      isActive: true,
    });

    logger.info('✅ Courses seeded successfully');
  } catch (error) {
    logger.error('❌ Error seeding courses:', error);
  }
};

export default seedCourses;