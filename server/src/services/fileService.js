import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../../uploads');

export const ensureUploadDir = async () => {
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
};

export const deleteFile = async (filePath) => {
  try {
    const fullPath = path.join(uploadDir, filePath);
    await fs.unlink(fullPath);
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

export const getFileInfo = async (filePath) => {
  try {
    const fullPath = path.join(uploadDir, filePath);
    const stats = await fs.stat(fullPath);
    return {
      filename: path.basename(fullPath),
      size: stats.size,
      createdAt: stats.birthtime,
      modifiedAt: stats.mtime,
    };
  } catch (error) {
    console.error('Error getting file info:', error);
    return null;
  }
};

export const listFiles = async (subDir = '') => {
  try {
    const targetDir = path.join(uploadDir, subDir);
    const files = await fs.readdir(targetDir);
    return files;
  } catch (error) {
    console.error('Error listing files:', error);
    return [];
  }
};