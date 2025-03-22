import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
});

export const analyzeData = async (data: any) => {
  try {
    const response = await api.post('/analyze', data);
    return response.data;
  } catch (error) {
    console.error('Error analyzing data:', error);
    throw error;
  }
};


