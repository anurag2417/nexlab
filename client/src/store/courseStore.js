import { create } from 'zustand';

// Full course data with rich content
const fullCourses = [
  {
    id: '1',
    title: 'Digital Literacy',
    description: 'Learn the basics of the web and how technology works.',
    tier: 1,
    icon: '🌐',
    color: 'moss',
    estimatedHours: 3,
    prerequisites: ['None'],
    learningObjectives: [
      'Understand how the internet works',
      'Build basic webpages with HTML',
      'Create a personal portfolio',
    ],
    sprints: [
      { 
        id: 's1', 
        title: 'Introduction to the Internet',
        description: 'Learn how the internet works and how websites are created.',
        content: `
          <h2>What is the Internet?</h2>
          <p>The internet is a global network of computers connected together using standardized protocols. It allows devices worldwide to communicate and share information instantly.</p>
          
          <h3>How Does the Internet Work?</h3>
          <p>When you visit a website, your browser sends a request to a server. The server responds with the website data, which your browser displays.</p>
          
          <div class="bg-[#DAD7CD]/20 p-4 rounded-lg my-4">
            <h4 class="font-semibold text-[#3A5A40]">Key Terms:</h4>
            <ul class="list-disc pl-5">
              <li><strong>Server:</strong> A computer that stores website files</li>
              <li><strong>Client:</strong> Your device (phone, laptop) that requests websites</li>
              <li><strong>Protocol:</strong> Rules for communication (like HTTP/HTTPS)</li>
              <li><strong>IP Address:</strong> Unique identifier for each device on the internet</li>
            </ul>
          </div>
          
          <h3>Your First Website</h3>
          <p>Websites are built using HTML (HyperText Markup Language). HTML provides the structure and content of a webpage.</p>
        `,
        starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>My First Webpage</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first webpage.</p>
</body>
</html>`,
        estimatedTime: 45,
        learningObjectives: [
          'Understand what the internet is',
          'Learn basic HTML structure',
          'Create your first webpage',
        ],
      },
      { 
        id: 's2', 
        title: 'Build your first webpage',
        description: 'Create a simple webpage with HTML.',
        content: `
          <h2>HTML Basics</h2>
          <p>HTML stands for HyperText Markup Language. It's the standard language for creating webpages.</p>
          
          <h3>HTML Structure</h3>
          <pre class="bg-[#344E41] text-[#DAD7CD] p-4 rounded-lg">
          <!DOCTYPE html>
          <html>
            <head>
              <title>Page Title</title>
            </head>
            <body>
              <h1>Main Heading</h1>
              <p>This is a paragraph.</p>
            </body>
          </html>
          </pre>
          
          <div class="bg-[#DAD7CD]/20 p-4 rounded-lg my-4">
            <h4 class="font-semibold text-[#3A5A40]">HTML Tags You'll Use:</h4>
            <ul class="list-disc pl-5">
              <li><strong>&lt;html&gt;</strong> - The root element</li>
              <li><strong>&lt;head&gt;</strong> - Contains meta information</li>
              <li><strong>&lt;title&gt;</strong> - Sets the page title in the browser tab</li>
              <li><strong>&lt;body&gt;</strong> - Contains the visible content</li>
              <li><strong>&lt;h1&gt;</strong> - Main heading</li>
              <li><strong>&lt;p&gt;</strong> - Paragraph</li>
            </ul>
          </div>
        `,
        starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>My Webpage</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p>This is my first webpage!</p>
</body>
</html>`,
        estimatedTime: 60,
        learningObjectives: [
          'Understand HTML structure',
          'Use common HTML tags',
          'Create a complete webpage',
        ],
      },
      { 
        id: 's3', 
        title: 'Create a personal portfolio',
        description: 'Build a portfolio page to showcase your work.',
        content: `
          <h2>Creating a Portfolio</h2>
          <p>A portfolio website showcases your work, skills, and projects. It's essential for students and professionals.</p>
          
          <h3>Portfolio Structure</h3>
          <ul class="list-disc pl-5">
            <li><strong>Header:</strong> Your name and navigation</li>
            <li><strong>Hero Section:</strong> Introduction and tagline</li>
            <li><strong>About Section:</strong> Your story and skills</li>
            <li><strong>Projects Section:</strong> Showcase your work</li>
            <li><strong>Contact Section:</strong> How to reach you</li>
          </ul>
          
          <div class="bg-[#DAD7CD]/20 p-4 rounded-lg my-4">
            <h4 class="font-semibold text-[#3A5A40]">💡 Pro Tip</h4>
            <p>A good portfolio should be clean, professional, and easy to navigate. Focus on showcasing your best work!</p>
          </div>
        `,
        starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>My Portfolio</title>
    <style>
        body { 
            font-family: 'Inter', sans-serif; 
            margin: 0; 
            padding: 20px;
            background: #f5f5f5;
        }
        h1 { 
            color: #3A5A40; 
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>My Portfolio</h1>
        <p>Welcome to my portfolio! I'm a student passionate about technology and AI.</p>
        <h2>My Skills</h2>
        <ul>
            <li>HTML & CSS</li>
            <li>Python</li>
            <li>Web Development</li>
        </ul>
        <h2>My Projects</h2>
        <ul>
            <li>Project 1: Coming soon</li>
            <li>Project 2: Coming soon</li>
        </ul>
    </div>
</body>
</html>`,
        estimatedTime: 90,
        learningObjectives: [
          'Build a complete portfolio page',
          'Use CSS for styling',
          'Structure content effectively',
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Python Basics',
    description: 'Start your coding journey with Python programming.',
    tier: 2,
    icon: '🐍',
    color: 'sage',
    estimatedHours: 4,
    prerequisites: ['Digital Literacy'],
    learningObjectives: [
      'Write Python programs from scratch',
      'Understand functions and conditionals',
      'Build interactive applications',
    ],
    sprints: [
      { 
        id: 's4', 
        title: 'Hello World & Variables',
        description: 'Write your first Python program and learn about variables.',
        content: `
          <h2>Your First Python Program</h2>
          <p>Python is a powerful, easy-to-learn programming language used for web development, AI, data science, and more.</p>
          
          <h3>Hello World</h3>
          <p>Every programmer's first program:</p>
          <pre class="bg-[#344E41] text-[#DAD7CD] p-4 rounded-lg">
          print("Hello, World!")
          </pre>
          
          <h3>Variables</h3>
          <p>Variables store data in your program:</p>
          <pre class="bg-[#344E41] text-[#DAD7CD] p-4 rounded-lg">
          # String (text)
          name = "Student"
          
          # Integer (whole number)
          age = 15
          
          # Float (decimal number)
          height = 5.8
          
          # Boolean (True/False)
          is_student = True
          
          print(f"My name is {name} and I am {age} years old.")
          </pre>
          
          <div class="bg-[#DAD7CD]/20 p-4 rounded-lg my-4">
            <h4 class="font-semibold text-[#3A5A40]">💡 Variable Naming Rules</h4>
            <ul class="list-disc pl-5">
              <li>Must start with a letter or underscore</li>
              <li>Can contain letters, numbers, and underscores</li>
              <li>Case-sensitive (name and Name are different)</li>
              <li>Use descriptive names</li>
            </ul>
          </div>
        `,
        starterCode: `# Hello World in Python
print("Hello, World!")

# Variables
name = "Student"
age = 15
is_student = True

print(f"My name is {name} and I am {age} years old.")
print(f"Student: {is_student}")`,
        estimatedTime: 45,
        learningObjectives: [
          'Write your first Python program',
          'Understand and use variables',
          'Use f-strings for formatting',
        ],
      },
      { 
        id: 's5', 
        title: 'Functions & Conditionals',
        description: 'Learn how to write functions and use conditionals.',
        content: `
          <h2>Functions in Python</h2>
          <p>Functions are reusable blocks of code. They help you organize your code and avoid repetition.</p>
          
          <h3>Defining a Function</h3>
          <pre class="bg-[#344E41] text-[#DAD7CD] p-4 rounded-lg">
          def greet(name):
              return f"Hello, {name}!"
          
          # Calling the function
          print(greet("Student"))
          </pre>
          
          <h3>Conditionals (if/else)</h3>
          <p>Conditionals let your program make decisions:</p>
          <pre class="bg-[#344E41] text-[#DAD7CD] p-4 rounded-lg">
          age = 16
          
          if age >= 18:
              print("You are an adult")
          elif age >= 13:
              print("You are a teenager")
          else:
              print("You are a child")
          </pre>
          
          <div class="bg-[#DAD7CD]/20 p-4 rounded-lg my-4">
            <h4 class="font-semibold text-[#3A5A40]">🎯 Challenge</h4>
            <p>Write a function that checks if a number is even or odd!</p>
          </div>
        `,
        starterCode: `# Functions
def greet(name):
    return f"Hello, {name}!"

def is_even(number):
    return number % 2 == 0

print(greet("Student"))

# Conditionals
age = 16
if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")

# Check if a number is even
number = 42
if is_even(number):
    print(f"{number} is even")
else:
    print(f"{number} is odd")`,
        estimatedTime: 60,
        learningObjectives: [
          'Define and call functions',
          'Use if/else statements',
          'Write reusable code',
        ],
      },
      { 
        id: 's6', 
        title: 'Build a Calculator App',
        description: 'Create a simple calculator using Python functions.',
        content: `
          <h2>Building a Calculator</h2>
          <p>Let's build a calculator that can add, subtract, multiply, and divide numbers.</p>
          
          <h3>Planning the Calculator</h3>
          <p>We'll create a function for each operation:</p>
          <ul class="list-disc pl-5">
            <li><strong>add(a, b)</strong> - Returns a + b</li>
            <li><strong>subtract(a, b)</strong> - Returns a - b</li>
            <li><strong>multiply(a, b)</strong> - Returns a * b</li>
            <li><strong>divide(a, b)</strong> - Returns a / b</li>
          </ul>
          
          <h3>Complete Calculator</h3>
          <pre class="bg-[#344E41] text-[#DAD7CD] p-4 rounded-lg">
          def add(a, b):
              return a + b
          
          def subtract(a, b):
              return a - b
          
          def multiply(a, b):
              return a * b
          
          def divide(a, b):
              if b == 0:
                  return "Error: Cannot divide by zero"
              return a / b
          
          # Use the calculator
          print(add(5, 3))       # 8
          print(subtract(10, 4)) # 6
          print(multiply(6, 7))  # 42
          print(divide(15, 3))   # 5.0
          print(divide(10, 0))   # Error message
          </pre>
        `,
        starterCode: `# Calculator
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "Error: Division by zero"
    return a / b

# Test the calculator
print("Addition:", add(5, 3))
print("Subtraction:", subtract(10, 4))
print("Multiplication:", multiply(6, 7))
print("Division:", divide(15, 3))
print("Division by zero:", divide(10, 0))`,
        estimatedTime: 60,
        learningObjectives: [
          'Create functions for each operation',
          'Handle edge cases (division by zero)',
          'Build a complete application',
        ],
      },
      { 
        id: 's7', 
        title: 'Create a Number Guessing Game',
        description: 'Build an interactive game using loops and conditionals.',
        content: `
          <h2>Number Guessing Game</h2>
          <p>Let's build a fun game where the computer picks a random number and the player tries to guess it.</p>
          
          <h3>How the Game Works</h3>
          <ol class="list-decimal pl-5">
            <li>Computer picks a random number between 1 and 100</li>
            <li>Player enters a guess</li>
            <li>Computer gives hints: "Too high" or "Too low"</li>
            <li>Player keeps guessing until they find the number</li>
            <li>Game shows how many attempts it took</li>
          </ol>
          
          <h3>Key Concepts Used</h3>
          <ul class="list-disc pl-5">
            <li><strong>random module</strong> - For generating random numbers</li>
            <li><strong>while loop</strong> - For repeated guessing</li>
            <li><strong>conditionals</strong> - For giving hints</li>
            <li><strong>input()</strong> - For getting player guesses</li>
          </ul>
          
          <div class="bg-[#DAD7CD]/20 p-4 rounded-lg my-4">
            <h4 class="font-semibold text-[#3A5A40]">🎮 Try It Yourself</h4>
            <p>Run the code and play the game! Can you guess the number in under 7 attempts?</p>
          </div>
        `,
        starterCode: `# Number Guessing Game
import random

def play_game():
    # Generate random number between 1 and 100
    number = random.randint(1, 100)
    attempts = 0
    print("I'm thinking of a number between 1 and 100...")
    print("Can you guess it?")
    
    while True:
        try:
            guess = int(input("Enter your guess: "))
            attempts += 1
            
            if guess < number:
                print("Too low! Try again.")
            elif guess > number:
                print("Too high! Try again.")
            else:
                print(f"🎉 Congratulations! You guessed it in {attempts} attempts!")
                break
        except ValueError:
            print("Please enter a valid number!")

# Start the game
play_game()`,
        estimatedTime: 75,
        learningObjectives: [
          'Use the random module',
          'Implement a while loop',
          'Handle user input',
          'Build an interactive game',
        ],
      },
    ],
  },
];

export const useCourseStore = create((set, get) => ({
  courses: [],
  currentCourse: null,
  currentSprint: null,
  progress: null,
  isLoading: false,
  error: null,

  fetchCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ 
        courses: fullCourses, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch courses',
        isLoading: false 
      });
    }
  },

  fetchCourse: async (tier) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const course = fullCourses.find(c => c.tier === tier) || null;
      set({ currentCourse: course, isLoading: false });
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch course',
        isLoading: false 
      });
    }
  },

  fetchSprint: async (sprintId) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      let sprint = null;
      for (const course of fullCourses) {
        const found = course.sprints.find(s => s.id === sprintId);
        if (found) {
          sprint = found;
          break;
        }
      }
      set({ currentSprint: sprint, isLoading: false });
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch sprint',
        isLoading: false 
      });
    }
  },

  fetchProgress: async () => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const savedProgress = localStorage.getItem('nexlab_progress');
      const progress = savedProgress ? JSON.parse(savedProgress) : {
        currentTier: 1,
        completedSprints: [],
        totalSprintsCompleted: 0,
        lastActive: new Date(),
      };
      set({ progress, isLoading: false });
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch progress',
        isLoading: false 
      });
    }
  },

  markSprintComplete: async (sprintId) => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const currentProgress = get().progress;
      if (currentProgress) {
        const updatedProgress = {
          ...currentProgress,
          completedSprints: [...currentProgress.completedSprints, sprintId],
          totalSprintsCompleted: currentProgress.totalSprintsCompleted + 1,
          lastActive: new Date(),
        };
        localStorage.setItem('nexlab_progress', JSON.stringify(updatedProgress));
        set({ progress: updatedProgress, isLoading: false });
        
        // Update user XP in auth store
        try {
          const { useAuthStore } = await import('./authStore');
          const authStore = useAuthStore.getState();
          if (authStore.user) {
            const xpReward = 50; // XP per sprint
            const updatedUser = {
              ...authStore.user,
              gamification: {
                ...authStore.user.gamification,
                xp: (authStore.user.gamification?.xp || 0) + xpReward,
                level: Math.floor(((authStore.user.gamification?.xp || 0) + xpReward) / 100) + 1,
              }
            };
            authStore.updateUser(updatedUser);
          }
        } catch (e) {
          console.log('XP update failed:', e);
        }
      }
    } catch (error) {
      set({ 
        error: error.message || 'Failed to mark sprint complete',
        isLoading: false 
      });
    }
  },

  clearError: () => set({ error: null }),
}));