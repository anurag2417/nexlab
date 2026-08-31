import pythonExecutor from '../services/pythonExecutor.js';
import logger from '../utils/logger.js';

export const runCode = async (req, res) => {
  try {
    const { code, sprintId } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Please provide code to execute',
      });
    }

    const result = await pythonExecutor.execute(code);

    logger.info(`Code execution by user ${req.user.id}: ${result.executionTime}ms`);

    res.status(200).json({
      success: true,
      data: {
        output: result.output,
        executionTime: result.executionTime,
        success: result.success,
        error: result.error,
      },
    });
  } catch (error) {
    logger.error('Code execution error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error executing code',
    });
  }
};

export const validateCode = async (req, res) => {
  try {
    const { code, testCases } = req.body;

    if (!code || !testCases) {
      return res.status(400).json({
        success: false,
        message: 'Please provide code and test cases',
      });
    }

    const results = [];
    for (const testCase of testCases) {
      const result = await pythonExecutor.execute(
        `${code}\n\nprint(${testCase.input})`
      );
      
      results.push({
        input: testCase.input,
        expected: testCase.expectedOutput,
        actual: result.output.trim(),
        passed: result.output.trim() === testCase.expectedOutput,
      });
    }

    const passedCount = results.filter((r) => r.passed).length;

    res.status(200).json({
      success: true,
      data: {
        results,
        passed: passedCount === results.length,
        passedCount,
        totalCount: results.length,
      },
    });
  } catch (error) {
    logger.error('Code validation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error validating code',
    });
  }
};