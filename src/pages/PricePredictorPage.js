import React, { useState } from 'react';
import styled from 'styled-components';
import { predictPrice } from '../services/api';
import { searchAmazon } from '../services/amazonApi';
import { Link } from 'react-router-dom';
import AmazonResults from '../components/AmazonResults';
import ReviewForm from '../components/ReviewForm';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const Form = styled.form`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const FormSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ClearButton = styled(Button)`
  background-color: white;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  
  &:hover {
    background-color: #f8f9fa;
    color: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const ResultSection = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const PriceCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PriceLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 0.5rem;
`;

const PriceValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const ResultTitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 0.5rem;
`;

const ResultSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: 0;
  max-width: 600px;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 3px solid rgba(255,255,255,.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const SectionDivider = styled.hr`
  margin: 2rem 0;
  border: none;
  border-top: 1px solid #eee;
`;

const ReviewSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
`;

const ReviewSectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const ReviewSectionDescription = styled.p`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const FactorsList = styled.div`
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FactorItem = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }
`;

const FactorName = styled.div`
  font-weight: 600;
  flex: 1;
`;

const FactorImpact = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  background-color: ${({ positive }) => positive ? '#e6f7ed' : '#fbe9e7'};
  color: ${({ positive }) => positive ? '#1e8e5e' : '#d84315'};
  
  svg {
    margin-right: 0.3rem;
  }
`;

const ImpactBar = styled.div`
  height: 5px;
  width: 100px;
  background-color: #eee;
  border-radius: 3px;
  margin-right: 1rem;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    ${({ positive }) => positive ? 'left: 50%;' : 'right: 50%;'}
    width: ${({ value }) => `${Math.abs(value) * 100}%`};
    max-width: 50%;
    height: 100%;
    background-color: ${({ positive }) => positive ? '#1e8e5e' : '#d84315'};
  }
`;

const SimilarLaptopsList = styled.div`
  margin: 1.5rem 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const LaptopCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const LaptopTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.dark};
`;

const LaptopPrice = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 1.3rem;
  margin: 0.5rem 0;
`;

const SearchButton = styled(Button)`
  margin-top: auto;
  align-self: flex-start;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
`;

const PricePredictorPage = () => {
  const [formData, setFormData] = useState({
    "Pantalla_Tamaño de la pantalla": "",
    "Pantalla_Tecnología de la pantalla": "",
    "Procesador_Procesador": "",
    "Procesador_Número de núcleos del procesador": "",
    "Procesador_Frecuencia turbo máx.": "",
    "RAM_Memoria RAM": "",
    "RAM_Tipo de RAM": "",
    "Disco duro_Tipo de disco duro": "",
    "Disco duro_Capacidad de memoria SSD": "",
    "Gráfica_Tarjeta gráfica": "",
    "Gráfica_Memoria gráfica": "",
    "Gráfica_Tipo de memoria gráfica": "",
    "Sistema operativo_Sistema operativo": "",
    "Medidas y peso_Peso": "",
    "Alimentación_Batería": "",
    "Alimentación_Autonomía de la batería": "",
    "Alimentación_Vatios-hora": "",
    "marca": "",
    "product_type_group": "",
    "is_laptop": "1"
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [amazonResults, setAmazonResults] = useState(null);
  const [amazonLoading, setAmazonLoading] = useState(false);
  const [amazonError, setAmazonError] = useState(null);
  const [amazonSearchTerms, setAmazonSearchTerms] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleClear = () => {
    setFormData({
      "Pantalla_Tamaño de la pantalla": "",
      "Pantalla_Tecnología de la pantalla": "",
      "Procesador_Procesador": "",
      "Procesador_Número de núcleos del procesador": "",
      "Procesador_Frecuencia turbo máx.": "",
      "RAM_Memoria RAM": "",
      "RAM_Tipo de RAM": "",
      "Disco duro_Tipo de disco duro": "",
      "Disco duro_Capacidad de memoria SSD": "",
      "Gráfica_Tarjeta gráfica": "",
      "Gráfica_Memoria gráfica": "",
      "Gráfica_Tipo de memoria gráfica": "",
      "Sistema operativo_Sistema operativo": "",
      "Medidas y peso_Peso": "",
      "Alimentación_Batería": "",
      "Alimentación_Autonomía de la batería": "",
      "Alimentación_Vatios-hora": "",
      "marca": "",
      "product_type_group": "",
      "is_laptop": "1"
    });
    setResult(null);
    setError(null);
    setAmazonResults(null);
    setAmazonError(null);
  };
  
  const processInputValue = (name, value) => {
    // Convert string inputs to the appropriate type
    if (value === "" || value === null || value === undefined) {
      return null;
    }
    
    // Numerical fields
    const numericFields = [
      "Pantalla_Tamaño de la pantalla",
      "Procesador_Número de núcleos del procesador",
      "Procesador_Frecuencia turbo máx.",
      "RAM_Memoria RAM",
      "Disco duro_Capacidad de memoria SSD",
      "Gráfica_Memoria gráfica",
      "Medidas y peso_Peso",
      "Alimentación_Autonomía de la batería",
      "Alimentación_Vatios-hora",
      "is_laptop"
    ];
    
    if (numericFields.includes(name)) {
      return parseFloat(value);
    }
    
    return value;
  };
  
  const searchSimilarOnAmazon = async (laptop) => {
    if (!laptop || !laptop.Título) return;
    
    try {
      setAmazonLoading(true);
      setAmazonError(null);
      
      // Extract just the brand and model name, without serial numbers
      const title = laptop.Título;
      
      // Extract the brand name first
      const brands = ['Lenovo', 'ASUS', 'HP', 'Dell', 'Acer', 'MSI', 'Apple', 'Microsoft', 'Vibox'];
      let brandName = '';
      let modelName = '';
      
      // Find the brand in the title
      for (const brand of brands) {
        if (title.includes(brand)) {
          brandName = brand;
          
          // Extract model name - get text after brand until we hit a number or special character
          const afterBrand = title.substring(title.indexOf(brand) + brand.length).trim();
          
          // Get model name (words until we hit a colon, slash, or model number)
          // eslint-disable-next-line no-useless-escape
          const modelMatch = afterBrand.match(/^[^:\/0-9]+/);
          if (modelMatch) {
            modelName = modelMatch[0].trim();
          }
          
          break;
        }
      }
      
      // Create a clean search query with just brand and model
      const cleanSearchQuery = brandName + ' ' + modelName;
      setAmazonSearchTerms(cleanSearchQuery.trim());
      
      // Search Amazon with the clean query
      const results = await searchAmazon(cleanSearchQuery.trim());
      setAmazonResults(results.results);
    } catch (err) {
      console.error('Error searching Amazon:', err);
      setAmazonError('Failed to search Amazon. Please try again later.');
    } finally {
      setAmazonLoading(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAmazonResults(null);
    setAmazonError(null);
    
    try {
      const processedData = {};
      
      // Process each form field
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          processedData[key] = processInputValue(key, value);
        }
      });
      
      const response = await predictPrice(processedData);
      setResult(response);
      
      // If we have similar laptops, search the first one on Amazon
      if (response.nearest_recommendations && response.nearest_recommendations.length > 0) {
        await searchSimilarOnAmazon(response.nearest_recommendations[0]);
      }
    } catch (err) {
      console.error("Error predicting price:", err);
      setError("Failed to predict price. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container>
      <Title>Laptop Price Predictor</Title>
      <Subtitle>Enter the specifications of a laptop to get an estimated market price. You don't need to fill all fields.</Subtitle>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <Form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Display</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label htmlFor="Pantalla_Tamaño de la pantalla">Screen Size (inches)</Label>
              <Select
                id="Pantalla_Tamaño de la pantalla"
                name="Pantalla_Tamaño de la pantalla"
                value={formData["Pantalla_Tamaño de la pantalla"]}
                onChange={handleChange}
              >
                <option value="">Select Size</option>
                <option value="13.3">13.3"</option>
                <option value="14.0">14.0"</option>
                <option value="15.6">15.6"</option>
                <option value="16.0">16.0"</option>
                <option value="17.3">17.3"</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="Pantalla_Tecnología de la pantalla">Screen Technology</Label>
              <Select
                id="Pantalla_Tecnología de la pantalla"
                name="Pantalla_Tecnología de la pantalla"
                value={formData["Pantalla_Tecnología de la pantalla"]}
                onChange={handleChange}
              >
                <option value="">Select Technology</option>
                <option value="Full HD">Full HD</option>
                <option value="QHD">QHD</option>
                <option value="4K">4K</option>
                <option value="Retina">Retina</option>
              </Select>
            </FormGroup>
          </FormGrid>
        </FormSection>
        
        <FormSection>
          <SectionTitle>Processor</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label htmlFor="Procesador_Procesador">Processor Type</Label>
              <Select
                id="Procesador_Procesador"
                name="Procesador_Procesador"
                value={formData["Procesador_Procesador"]}
                onChange={handleChange}
              >
                <option value="">Select Processor</option>
                <option value="Intel Core i3">Intel Core i3</option>
                <option value="Intel Core i5">Intel Core i5</option>
                <option value="Intel Core i7">Intel Core i7</option>
                <option value="Intel Core i9">Intel Core i9</option>
                <option value="AMD Ryzen 5">AMD Ryzen 5</option>
                <option value="AMD Ryzen 7">AMD Ryzen 7</option>
                <option value="AMD Ryzen 9">AMD Ryzen 9</option>
                <option value="Apple M1 Family">Apple M1 Family</option>
                <option value="Apple M2 Family">Apple M2 Family</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="Procesador_Número de núcleos del procesador">Number of Cores</Label>
              <Select
                id="Procesador_Número de núcleos del procesador"
                name="Procesador_Número de núcleos del procesador"
                value={formData["Procesador_Número de núcleos del procesador"]}
                onChange={handleChange}
              >
                <option value="">Select Cores</option>
                <option value="4">4 cores</option>
                <option value="6">6 cores</option>
                <option value="8">8 cores</option>
                <option value="10">10 cores</option>
                <option value="12">12 cores</option>
                <option value="16">16 cores</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="Procesador_Frecuencia turbo máx.">Max Turbo Frequency (GHz)</Label>
              <Select
                id="Procesador_Frecuencia turbo máx."
                name="Procesador_Frecuencia turbo máx."
                value={formData["Procesador_Frecuencia turbo máx."]}
                onChange={handleChange}
              >
                <option value="">Select Frequency</option>
                <option value="3">3.0 GHz</option>
                <option value="4">4.0 GHz</option>
                <option value="5">5.0 GHz</option>
              </Select>
            </FormGroup>
          </FormGrid>
        </FormSection>
        
        <FormSection>
          <SectionTitle>Memory and Storage</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label htmlFor="RAM_Memoria RAM">RAM (GB)</Label>
              <Select
                id="RAM_Memoria RAM"
                name="RAM_Memoria RAM"
                value={formData["RAM_Memoria RAM"]}
                onChange={handleChange}
              >
                <option value="">Select RAM</option>
                <option value="4">4 GB</option>
                <option value="8">8 GB</option>
                <option value="16">16 GB</option>
                <option value="32">32 GB</option>
                <option value="64">64 GB</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="RAM_Tipo de RAM">RAM Type</Label>
              <Select
                id="RAM_Tipo de RAM"
                name="RAM_Tipo de RAM"
                value={formData["RAM_Tipo de RAM"]}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="ddr3">DDR3</option>
                <option value="ddr4">DDR4</option>
                <option value="ddr5">DDR5</option>
                <option value="lpddr">LPDDR</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="Disco duro_Tipo de disco duro">Storage Type</Label>
              <Select
                id="Disco duro_Tipo de disco duro"
                name="Disco duro_Tipo de disco duro"
                value={formData["Disco duro_Tipo de disco duro"]}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="SSD">SSD</option>
                <option value="HDD">HDD</option>
                <option value="Hybrid">Hybrid</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="Disco duro_Capacidad de memoria SSD">SSD Capacity (GB)</Label>
              <Select
                id="Disco duro_Capacidad de memoria SSD"
                name="Disco duro_Capacidad de memoria SSD"
                value={formData["Disco duro_Capacidad de memoria SSD"]}
                onChange={handleChange}
              >
                <option value="">Select Capacity</option>
                <option value="256">256 GB</option>
                <option value="512">512 GB</option>
                <option value="1000">1 TB</option>
                <option value="2000">2 TB</option>
              </Select>
            </FormGroup>
          </FormGrid>
        </FormSection>
        
        <FormSection>
          <SectionTitle>Graphics</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label htmlFor="Gráfica_Tarjeta gráfica">Graphics Card</Label>
              <Select
                id="Gráfica_Tarjeta gráfica"
                name="Gráfica_Tarjeta gráfica"
                value={formData["Gráfica_Tarjeta gráfica"]}
                onChange={handleChange}
              >
                <option value="">Select Graphics Card</option>
                <option value="Intel Iris">Intel Iris</option>
                <option value="Intel UHD">Intel UHD</option>
                <option value="NVIDIA GeForce MX Series">NVIDIA GeForce MX Series</option>
                <option value="NVIDIA GeForce RTX 3050 Series">NVIDIA GeForce RTX 3050 Series</option>
                <option value="NVIDIA GeForce RTX 3060 Series">NVIDIA GeForce RTX 3060 Series</option>
                <option value="NVIDIA GeForce RTX 3070 Series">NVIDIA GeForce RTX 3070 Series</option>
                <option value="AMD Radeon RX 6600 Series">AMD Radeon RX 6600 Series</option>
                <option value="Apple GPUs">Apple GPUs</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="Gráfica_Memoria gráfica">Graphics Memory (GB)</Label>
              <Select
                id="Gráfica_Memoria gráfica"
                name="Gráfica_Memoria gráfica"
                value={formData["Gráfica_Memoria gráfica"]}
                onChange={handleChange}
              >
                <option value="">Select Memory</option>
                <option value="2">2 GB</option>
                <option value="4">4 GB</option>
                <option value="6">6 GB</option>
                <option value="8">8 GB</option>
                <option value="12">12 GB</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="Gráfica_Tipo de memoria gráfica">Graphics Memory Type</Label>
              <Select
                id="Gráfica_Tipo de memoria gráfica"
                name="Gráfica_Tipo de memoria gráfica"
                value={formData["Gráfica_Tipo de memoria gráfica"]}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="Shared">Shared</option>
                <option value="GDDR5">GDDR5</option>
                <option value="GDDR6">GDDR6</option>
                <option value="Unified">Unified</option>
              </Select>
            </FormGroup>
          </FormGrid>
        </FormSection>
        
        <FormSection>
          <SectionTitle>System and Physical Specifications</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label htmlFor="Sistema operativo_Sistema operativo">Operating System</Label>
              <Select
                id="Sistema operativo_Sistema operativo"
                name="Sistema operativo_Sistema operativo"
                value={formData["Sistema operativo_Sistema operativo"]}
                onChange={handleChange}
              >
                <option value="">Select OS</option>
                <option value="windows 11 home">Windows 11 Home</option>
                <option value="windows 11 professional">Windows 11 Professional</option>
                <option value="windows 10 home">Windows 10 Home</option>
                <option value="windows 10 professional">Windows 10 Professional</option>
                <option value="macos">macOS</option>
                <option value="chrome_os">Chrome OS</option>
                <option value="no_os">No OS</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="Medidas y peso_Peso">Weight (kg)</Label>
              <Select
                id="Medidas y peso_Peso"
                name="Medidas y peso_Peso"
                value={formData["Medidas y peso_Peso"]}
                onChange={handleChange}
              >
                <option value="">Select Weight</option>
                <option value="1.0">1.0 kg</option>
                <option value="1.3">1.3 kg</option>
                <option value="1.5">1.5 kg</option>
                <option value="1.7">1.7 kg</option>
                <option value="2.0">2.0 kg</option>
                <option value="2.5">2.5 kg</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="marca">Brand</Label>
              <Select
                id="marca"
                name="marca"
                value={formData["marca"]}
                onChange={handleChange}
              >
                <option value="">Select Brand</option>
                <option value="Lenovo">Lenovo</option>
                <option value="Dell">Dell</option>
                <option value="HP">HP</option>
                <option value="ASUS">ASUS</option>
                <option value="Acer">Acer</option>
                <option value="Apple">Apple</option>
                <option value="MSI">MSI</option>
                <option value="Microsoft">Microsoft</option>
              </Select>
            </FormGroup>
          </FormGrid>
        </FormSection>
        
        <FormSection>
          <SectionTitle>Battery Information</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label htmlFor="Alimentación_Batería">Battery Type</Label>
              <Select
                id="Alimentación_Batería"
                name="Alimentación_Batería"
                value={formData["Alimentación_Batería"]}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="lithium">Lithium</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="Alimentación_Autonomía de la batería">Battery Autonomy (hours)</Label>
              <Select
                id="Alimentación_Autonomía de la batería"
                name="Alimentación_Autonomía de la batería"
                value={formData["Alimentación_Autonomía de la batería"]}
                onChange={handleChange}
              >
                <option value="">Select Hours</option>
                <option value="6">6 hours</option>
                <option value="8">8 hours</option>
                <option value="10">10 hours</option>
                <option value="12">12 hours</option>
                <option value="15">15 hours</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="Alimentación_Vatios-hora">Watt-hours</Label>
              <Select
                id="Alimentación_Vatios-hora"
                name="Alimentación_Vatios-hora"
                value={formData["Alimentación_Vatios-hora"]}
                onChange={handleChange}
              >
                <option value="">Select Watt-hours</option>
                <option value="45">45 Wh</option>
                <option value="55">55 Wh</option>
                <option value="65">65 Wh</option>
                <option value="80">80 Wh</option>
                <option value="100">100 Wh</option>
              </Select>
            </FormGroup>
          </FormGrid>
        </FormSection>
        
        <FormSection>
          <SectionTitle>Classification</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label htmlFor="product_type_group">Product Type</Label>
              <Select
                id="product_type_group"
                name="product_type_group"
                value={formData["product_type_group"]}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="Laptop – Standard">Standard Laptop</option>
                <option value="Laptop – Gaming">Gaming Laptop</option>
              </Select>
            </FormGroup>
            
            <FormGroup style={{ display: 'none' }}>
              <Label htmlFor="is_laptop">Is Laptop</Label>
              <Input
                type="hidden"
                id="is_laptop"
                name="is_laptop"
                value="1"
                readOnly
              />
            </FormGroup>
          </FormGrid>
        </FormSection>
        
        <ButtonContainer>
          <ClearButton type="button" onClick={handleClear}>
            Clear Form
          </ClearButton>
          <Button type="submit" disabled={loading}>
            {loading ? <><LoadingSpinner /> Calculating...</> : "Predict Price"}
          </Button>
        </ButtonContainer>
      </Form>
      
      {result && !error && (
        <ResultSection>
          <ResultHeader>
            <div>
              <ResultTitle>Price Prediction Results</ResultTitle>
              <ResultSubtitle>
                Based on the specifications you provided, our machine learning model has predicted the following price.
              </ResultSubtitle>
            </div>
            <PriceCard>
              <PriceLabel>Estimated Price</PriceLabel>
              <PriceValue>${result.predicted_price.toFixed(2)}</PriceValue>
            </PriceCard>
          </ResultHeader>
          
          <h3>Key Factors Influencing Price:</h3>
          <FactorsList>
            {result.feature_importance.map((feature, index) => {
              const isPositive = feature.contribution > 0;
              const contributionAbs = Math.abs(feature.contribution);
              const featureName = feature.feature.split('_').join(' ');
              
              return (
                <FactorItem key={index}>
                  <FactorName>{featureName}</FactorName>
                  <ImpactBar 
                    positive={isPositive} 
                    value={Math.min(contributionAbs, 0.5) / 0.5} 
                  />
                  <FactorImpact positive={isPositive}>
                    {isPositive ? <FaArrowUp /> : <FaArrowDown />}
                    {feature.contribution.toFixed(2)}
                  </FactorImpact>
                </FactorItem>
              );
            })}
          </FactorsList>
          
          {result.nearest_recommendations && result.nearest_recommendations.length > 0 && (
            <>
              <h3>Similar Laptops:</h3>
              <SimilarLaptopsList>
                {result.nearest_recommendations.map((laptop, index) => (
                  <LaptopCard key={index}>
                    <LaptopTitle>{laptop.Título}</LaptopTitle>
                    <LaptopPrice>{laptop.Precio_Rango}</LaptopPrice>
                    {index === 0 && (
                      <SearchButton 
                        onClick={() => searchSimilarOnAmazon(laptop)}
                        disabled={amazonLoading}
                      >
                        {amazonLoading ? 'Searching...' : 'Find on Amazon'}
                      </SearchButton>
                    )}
                  </LaptopCard>
                ))}
              </SimilarLaptopsList>
            </>
          )}
        </ResultSection>
      )}
      
      {(amazonResults || amazonLoading || amazonError) && (
        <>
          <SectionDivider />
          <AmazonResults 
            results={amazonResults} 
            loading={amazonLoading} 
            error={amazonError}
            searchTerms={amazonSearchTerms}
          />
        </>
      )}
      
      {result && !error && (
        <ReviewSection>
          <ReviewSectionTitle>Share Your Feedback</ReviewSectionTitle>
          <ReviewSectionDescription>
            How accurate was our price prediction? Let us know by leaving a review below.
          </ReviewSectionDescription>
          <ReviewForm 
            predictionData={{
              specifications: formData,
              predictedPrice: result.predicted_price,
              actualPrice: amazonResults && amazonResults.length > 0 && 
                typeof amazonResults[0].price === 'number' ? amazonResults[0].price : null
            }}
          />
        </ReviewSection>
      )}
      
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link to="/">Back to Home</Link>
      </div>
    </Container>
  );
};

export default PricePredictorPage; 