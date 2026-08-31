import apiClient from './client';

export interface CodeExecutionRequest {
  code: string;
  sprintId?: string;
  input?: string;
}

export interface CodeExecutionResponse {
  success: boolean;
  data: {
    output: string;
    executionTime: number;
    error?: string;
  };
}

export const sandboxAPI = {
  executeCode: async (data: CodeExecutionRequest): Promise<CodeExecutionResponse> => {
    const response = await apiClient.post<CodeExecutionResponse>('/sandbox/run', data);
    return response.data;
  },

  validateCode: async (data: CodeExecutionRequest): Promise<CodeExecutionResponse> => {
    const response = await apiClient.post<CodeExecutionResponse>('/sandbox/validate', data);
    return response.data;
  },

  getHistory: async (): Promise<any[]> => {
    const response = await apiClient.get('/sandbox/history');
    return response.data.data;
  },
};