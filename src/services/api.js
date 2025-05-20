import axios from 'axios';

// Use relative URL paths that will be proxied to the backend
// This helps avoid CORS issues
export const predictPrice = async (laptopSpecs) => {
  try {
    const response = await axios.post('/api/predict', laptopSpecs);
    return response.data;
  } catch (error) {
    console.error('Error predicting price:', error);
    throw error;
  }
};


export const getSimilarLaptops = async (laptopSpecs) => {
  try {
    const response = await axios.post('/api/predict', laptopSpecs);
    return response.data.nearest_recommendations;
  } catch (error) {
    console.error('Error getting similar laptops:', error);
    throw error;
  }
}; 