import { Request, Response } from 'express';
import Project from '../models/Project.js';
import User from '../models/User.js';
import { addXP, XP_REWARDS } from '../services/gamification.js';
import logger from '../utils/logger.js';
import mongoose from 'mongoose';

// Create a new project
export const createProject = async (req: any, res: Response) => {
  try {
    const { title, description, tier, techStack, githubRepo, liveDemoUrl } = req.body;

    // Validate required fields
    if (!title || !description || !tier) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, and tier',
      });
    }

    // Create project
    const project = await Project.create({
      user: req.user.id,
      title,
      description,
      tier,
      techStack: techStack || [],
      githubRepo,
      liveDemoUrl,
      status: 'draft',
      isPublic: false,
    });

    // Add project to user's projects
    await User.findByIdAndUpdate(req.user.id, {
      $push: { projects: project._id },
    });

    // Add XP for project creation
    await addXP(req.user.id, XP_REWARDS.PROJECT_SUBMIT);

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    logger.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create project',
    });
  }
};

// Get all projects (admin/mentor)
export const getAllProjects = async (req: any, res: Response) => {
  try {
    const { status, tier, search } = req.query;
    
    const filter: any = {};
    if (status) filter.status = status;
    if (tier) filter.tier = parseInt(tier as string);
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const projects = await Project.find(filter)
      .populate('user', 'name email school grade city')
      .populate('feedback.user', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error: any) {
    logger.error('Get all projects error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch projects',
    });
  }
};

// Get user's own projects
export const getUserProjects = async (req: any, res: Response) => {
  try {
    const { status } = req.query;
    
    const filter: any = { user: req.user.id };
    if (status) filter.status = status;

    const projects = await Project.find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error: any) {
    logger.error('Get user projects error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch projects',
    });
  }
};

// Get public projects for showcase
export const getPublicProjects = async (req: any, res: Response) => {
  try {
    const { tier, sort = 'likes' } = req.query;
    
    const filter: any = { 
      isPublic: true, 
      status: 'approved' 
    };
    if (tier) filter.tier = parseInt(tier as string);

    const sortField: any = {};
    if (sort === 'likes') sortField.likes = -1;
    else if (sort === 'newest') sortField.createdAt = -1;
    else if (sort === 'popular') sortField.views = -1;
    else sortField.createdAt = -1;

    const projects = await Project.find(filter)
      .populate('user', 'name email school grade city')
      .populate('feedback.user', 'name')
      .sort(sortField)
      .limit(50);

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error: any) {
    logger.error('Get public projects error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch public projects',
    });
  }
};

// Get a single project by ID
export const getProjectById = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id)
      .populate('user', 'name email school grade city profile')
      .populate('feedback.user', 'name');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Check if user has access (owner, mentor, or admin)
    const isOwner = project.user._id.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin' || req.user.role === 'mentor';
    const isPublic = project.isPublic && project.status === 'approved';

    if (!isOwner && !isAdmin && !isPublic) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this project',
      });
    }

    // Increment view count
    if (isPublic || isAdmin) {
      await Project.findByIdAndUpdate(id, { $inc: { views: 1 } });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    logger.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch project',
    });
  }
};

// Update a project
export const updateProject = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Check ownership
    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update this project',
      });
    }

    // Don't allow updates if project is submitted or approved
    if (project.status === 'submitted' || project.status === 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update a project that has been submitted or approved',
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedProject,
    });
  } catch (error: any) {
    logger.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update project',
    });
  }
};

// Delete a project
export const deleteProject = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Check ownership or admin
    const isOwner = project.user.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this project',
      });
    }

    // Remove project from user's projects
    await User.findByIdAndUpdate(project.user, {
      $pull: { projects: project._id },
    });

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error: any) {
    logger.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete project',
    });
  }
};

// Upload files for a project
export const uploadProjectFiles = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded',
      });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Check ownership
    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to upload files for this project',
      });
    }

    // Process files
    const fileData = files.map((file: any) => ({
      filename: file.originalname,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
    }));

    project.files.push(...fileData);
    await project.save();

    res.status(200).json({
      success: true,
      data: project.files,
    });
  } catch (error: any) {
    logger.error('Upload files error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload files',
    });
  }
};

// Toggle project visibility
export const toggleProjectVisibility = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { isPublic } = req.body;

    if (typeof isPublic !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Please provide isPublic boolean',
      });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Check ownership
    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to change visibility',
      });
    }

    // Only approved projects can be made public
    if (isPublic && project.status !== 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Only approved projects can be made public',
      });
    }

    project.isPublic = isPublic;
    await project.save();

    res.status(200).json({
      success: true,
      data: { isPublic: project.isPublic },
    });
  } catch (error: any) {
    logger.error('Toggle visibility error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to toggle visibility',
    });
  }
};

// Submit project for review
export const submitForReview = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Check ownership
    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to submit this project',
      });
    }

    // Validate project is complete
    if (!project.githubRepo) {
      return res.status(400).json({
        success: false,
        message: 'Please add a GitHub repository URL before submitting',
      });
    }

    if (!project.description || project.description.length < 20) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a detailed description (minimum 20 characters)',
      });
    }

    project.status = 'submitted';
    project.submittedAt = new Date();
    await project.save();

    // Notify mentors/admins (implement email service later)
    logger.info(`Project ${project.title} submitted for review by user ${req.user.id}`);

    res.status(200).json({
      success: true,
      message: 'Project submitted for review successfully',
    });
  } catch (error: any) {
    logger.error('Submit project error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit project',
    });
  }
};

// Get project feedback
export const getProjectFeedback = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id)
      .populate('feedback.user', 'name email');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Check access
    const isOwner = project.user.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin' || req.user.role === 'mentor';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this feedback',
      });
    }

    res.status(200).json({
      success: true,
      data: project.feedback,
    });
  } catch (error: any) {
    logger.error('Get feedback error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch feedback',
    });
  }
};