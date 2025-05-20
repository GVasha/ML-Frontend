import axios from 'axios';

// Test the API connection
const testApi = async () => {
  try {
    const testSpecs = {
      'Pantalla_Tamaño de la pantalla': 15.6,
      'Procesador_Procesador': 'Intel Core i7',
      'RAM_Memoria RAM': 16,
      'Disco duro_Capacidad de memoria SSD': 512,
      'Gráfica_Tarjeta gráfica': 'NVIDIA RTX 3060',
      'Alimentación_Batería': 'lithium',
      'is_laptop': 1
    };

    const response = await axios.post('/api/predict-price/', testSpecs);
    console.log('API Test Result:', response.data);
    return true;
  } catch (error) {
    console.error('API Test Failed:', error);
    return false;
  }
};

export default testApi; 