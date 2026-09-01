import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';
import logger from '../utils/logger.js';

class PythonExecutor {
  constructor() {
    this.tempDir = path.join(os.tmpdir(), 'nexlab-sandbox');
    this.maxExecutionTime = parseInt(process.env.EXECUTION_TIMEOUT || '10000');
    this.maxOutputSize = 5 * 1024 * 1024; // 5MB
  }

  async execute(code, timeout) {
    const scriptId = uuidv4();
    const scriptFile = `script_${scriptId}.py`;
    const scriptPath = path.join(this.tempDir, scriptFile);

    try {
      await this.ensureTempDir();
      const sanitizedCode = this.sanitizeCode(code);
      await fs.writeFile(scriptPath, sanitizedCode, 'utf-8');

      const startTime = Date.now();
      const result = await this.runPythonScript(
        scriptPath,
        timeout || this.maxExecutionTime
      );
      const executionTime = Date.now() - startTime;

      await this.cleanup(scriptPath);

      return {
        success: result.success,
        output: result.output,
        error: result.error,
        executionTime,
        exitCode: result.exitCode,
      };
    } catch (error) {
      await this.cleanup(scriptPath).catch(() => {});
      return {
        success: false,
        output: '',
        error: error.message || 'Execution failed',
        executionTime: 0,
        exitCode: 1,
      };
    }
  }

  runPythonScript(scriptPath, timeout) {
    return new Promise((resolve) => {
      const pythonPath = process.env.PYTHON_PATH || 'python3';
      const command = `${pythonPath} ${scriptPath}`;

      const childProcess = exec(
        command,
        {
          timeout,
          maxBuffer: this.maxOutputSize,
          env: {
            ...process.env,
            PYTHONUNBUFFERED: '1',
          },
        },
        (error, stdout, stderr) => {
          if (error && error.killed && error.signal === 'SIGTERM') {
            return resolve({
              success: false,
              output: '',
              error: 'Execution timed out',
              exitCode: 1,
            });
          }

          if (!error) {
            return resolve({
              success: true,
              output: stdout.trim() || '✅ Code executed successfully!',
              error: null,
              exitCode: 0,
            });
          }

          return resolve({
            success: false,
            output: stdout || '',
            error: stderr || error.message,
            exitCode: error.code || 1,
          });
        }
      );

      logger.debug(`Python process started: PID ${childProcess.pid}`);
    });
  }

  sanitizeCode(code) {
    const dangerousPatterns = [
      /import\s+os\b/g,
      /import\s+subprocess\b/g,
      /import\s+sys\b/g,
      /import\s+shutil\b/g,
      /__import__\s*\(/g,
      /eval\s*\(/g,
      /exec\s*\(/g,
      /compile\s*\(/g,
      /open\s*\(/g,
      /file\s*\(/g,
      /socket\s*\(/g,
      /requests\.get/g,
      /urllib/g,
      /environ/g,
      /getenv/g,
      /__class__/g,
      /__base__/g,
      /__subclasses__/g,
      /system\s*\(/g,
      /popen\s*\(/g,
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(code)) {
        throw new Error('Security violation: Dangerous pattern detected');
      }
    }

    const maxSize = parseInt(process.env.MAX_CODE_SIZE || '100000');
    if (code.length > maxSize) {
      throw new Error('Code exceeds maximum allowed size');
    }

    return code;
  }

  async ensureTempDir() {
    try {
      await fs.access(this.tempDir);
    } catch {
      await fs.mkdir(this.tempDir, { recursive: true, mode: 0o700 });
    }
  }

  async cleanup(filePath) {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        logger.warn(`Failed to delete temp file: ${filePath}`, error);
      }
    }
  }
}

export default new PythonExecutor();