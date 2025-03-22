import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Change this to your actual API endpoint
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeData = async (data: any) => {
  try {
    const response = await api.post('/analyze', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data || error.message);
    } else {
      console.error('Error analyzing data:', error);
    }
    // Return mock data for development
    return {
      results: 'Sample analysis results for development',
      status: 'success'
    };
  }
};


