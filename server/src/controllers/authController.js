import User from '../models/User.js';
import logger from '../utils/logger.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, school, grade, city, state } = req.body;

    console.log('📝 Register attempt:', { name, email });

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password',
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      school,
      grade,
      city,
      state,
    });

    console.log('✅ User created:', user.email);

    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          gamification: user.gamification || { xp: 0, level: 1, streak: 0 },
        },
      },
    });
  } catch (error) {
    console.error('❌ Register error:', error);
    logger.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration',
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔑 Login attempt:', { email });

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = user.getSignedJwtToken();

    console.log('✅ User logged in:', user.email);

    res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          gamification: user.gamification || { xp: 0, level: 1, streak: 0 },
        },
      },
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during login',
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        gamification: user.gamification || { xp: 0, level: 1, streak: 0 },
        profile: user.profile || {},
        progress: user.progress || {},
      },
    });
  } catch (error) {
    console.error('❌ Get me error:', error);
    logger.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

export const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};