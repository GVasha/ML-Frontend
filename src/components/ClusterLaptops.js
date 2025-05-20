import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaLaptop, FaDesktop, FaMemory, FaMicrochip, FaHdd, FaServer } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.dark};
  text-align: center;
`;

const ClusterContainer = styled.div`
  margin-bottom: 3rem;
`;

const ClusterTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.secondary};
`;

const LaptopsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const LaptopCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  height: 180px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const DeviceIcon = styled.div`
  font-size: 4rem;
  color: ${({ theme }) => theme.colors.secondary};
  opacity: 0.7;
`;

const LaptopInfo = styled.div`
  padding: 1.2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const LaptopTitle = styled.h4`
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.dark};
  line-height: 1.4;
`;

const LaptopPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0.5rem 0;
`;

const SpecsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
  
  li {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #555;
    
    svg {
      margin-right: 0.5rem;
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const ViewButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  text-align: center;
  padding: 0.7rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  margin-top: auto;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  background-color: ${({ active, theme }) => active ? theme.colors.primary : '#f0f0f0'};
  color: ${({ active }) => active ? 'white' : '#333'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: ${({ active }) => active ? '600' : '400'};
  transition: all 0.2s;
  
  &:hover {
    background-color: ${({ active, theme }) => active ? theme.colors.primary : '#e0e0e0'};
  }
`;

const CategoryHeader = styled.h2`
  font-size: 1.8rem;
  margin: 3rem 0 1.5rem;
  color: ${({ theme }) => theme.colors.dark};
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

const ClusterIcon = styled.span`
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.colors.accent};
`;

// Define category mappings for clusters
const CLUSTER_CATEGORIES = {
  laptops: {
    title: "Laptop Computers",
    clusters: [1, 4, 6],
    descriptions: {
      1: "Cluster 1 – High-end Laptop",
      4: "Cluster 4 – Budget Laptop",
      6: "Cluster 6 – Balanced Laptop"
    }
  },
  desktops: {
    title: "Desktop Computers",
    clusters: [0, 2, 5],
    descriptions: {
      0: "Cluster 0 – Balanced Desktop",
      2: "Cluster 2 – Budget Desktop",
      5: "Cluster 5 – Mid-to-High Performance Desktop"
    }
  },
  supercomputers: {
    title: "Supercomputer Tier",
    clusters: [3],
    descriptions: {
      3: "Cluster 3 – High-end Premium Computer"
    }
  }
};

const ClusterLaptops = () => {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deviceType, setDeviceType] = useState('all'); // 'all', 'laptop', 'desktop'
  
  useEffect(() => {
    const loadLaptops = async () => {
      try {
        setLoading(true);
        const response = await fetch('/csvjson.json');
        if (!response.ok) {
          throw new Error('Failed to load laptop data');
        }
        
        const data = await response.json();
        
        // Filter out entries without necessary data
        const validLaptops = data.filter(laptop => 
          laptop.Título && 
          laptop.cluster !== undefined && 
          laptop.Precio_Rango
        );
        
        setLaptops(validLaptops);
      } catch (err) {
        console.error('Error loading laptop data:', err);
        setError('Failed to load laptop data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadLaptops();
  }, []);
  
  const getClusterLaptops = (clusterNumber) => {
    // Filter laptops by cluster only
    const filteredLaptops = laptops.filter(laptop => 
      laptop.cluster === clusterNumber
    );
    
    // Apply device type filter only if not 'all'
    let result = filteredLaptops;
    if (deviceType !== 'all') {
      result = filteredLaptops.filter(laptop => 
        (deviceType === 'laptop' && laptop.is_laptop === 1) ||
        (deviceType === 'desktop' && laptop.is_laptop === 0)
      );
    }
    
    // Always return exactly 9 or fewer items
    return result.slice(0, 9);
  };
  
  // Get the cluster description from our mappings
  const getClusterDescription = (clusterNumber) => {
    // Look through all categories
    for (const category of Object.values(CLUSTER_CATEGORIES)) {
      if (category.clusters.includes(clusterNumber)) {
        return category.descriptions[clusterNumber];
      }
    }
    return `Cluster ${clusterNumber}`;
  };
  
  // Get icon for the category
  const getCategoryIcon = (categoryKey) => {
    switch(categoryKey) {
      case 'laptops':
        return <FaLaptop />;
      case 'desktops':
        return <FaDesktop />;
      case 'supercomputers':
        return <FaServer />;
      default:
        return <FaLaptop />;
    }
  };
  
  if (loading) {
    return <div>Loading laptop data...</div>;
  }
  
  if (error) {
    return <div>{error}</div>;
  }
  
  if (laptops.length === 0) {
    return <div>No laptop data available</div>;
  }
  
  // Render each category section with its clusters
  return (
    <Container>
      <SectionTitle>Browse Computers by Category</SectionTitle>
      
      <FilterContainer>
        <FilterButton 
          active={deviceType === 'all'} 
          onClick={() => setDeviceType('all')}
        >
          All Devices
        </FilterButton>
        <FilterButton 
          active={deviceType === 'laptop'} 
          onClick={() => setDeviceType('laptop')}
        >
          Laptops Only
        </FilterButton>
        <FilterButton 
          active={deviceType === 'desktop'} 
          onClick={() => setDeviceType('desktop')}
        >
          Desktops Only
        </FilterButton>
      </FilterContainer>
      
      {/* Render each category section */}
      {Object.entries(CLUSTER_CATEGORIES).map(([categoryKey, category]) => {
        return (
          <div key={categoryKey}>
            <CategoryHeader>
              <ClusterIcon>{getCategoryIcon(categoryKey)}</ClusterIcon>
              {category.title}
            </CategoryHeader>
            
            {/* Always render all clusters in this category */}
            {category.clusters.map(cluster => {
              const clusterLaptops = getClusterLaptops(cluster);
              
              return (
                <ClusterContainer key={cluster}>
                  <ClusterTitle>{getClusterDescription(cluster)}</ClusterTitle>
                  
                  {clusterLaptops.length > 0 ? (
                    <LaptopsGrid>
                      {clusterLaptops.map((laptop, index) => (
                        <LaptopCard key={index}>
                          <ImageContainer>
                            <DeviceIcon>
                              {laptop.is_laptop === 1 ? <FaLaptop /> : <FaDesktop />}
                            </DeviceIcon>
                          </ImageContainer>
                          
                          <LaptopInfo>
                            <LaptopTitle>{laptop.Título}</LaptopTitle>
                            <LaptopPrice>${laptop.Precio_Rango.toFixed(2)}</LaptopPrice>
                            
                            <SpecsList>
                              {laptop["Procesador_Procesador"] && (
                                <li>
                                  <FaMicrochip />
                                  {laptop["Procesador_Procesador"]}
                                  {laptop["Procesador_Número de núcleos del procesador"] && 
                                    ` (${laptop["Procesador_Número de núcleos del procesador"]} cores)`}
                                </li>
                              )}
                              
                              {laptop["RAM_Memoria RAM"] && (
                                <li>
                                  <FaMemory />
                                  {laptop["RAM_Memoria RAM"]} GB RAM
                                </li>
                              )}
                              
                              {laptop["Disco duro_Capacidad de memoria SSD"] && (
                                <li>
                                  <FaHdd />
                                  {laptop["Disco duro_Capacidad de memoria SSD"]} GB SSD
                                </li>
                              )}
                            </SpecsList>
                            
                            <ViewButton to={`/product/${laptops.indexOf(laptop)}`}>
                              View Details
                            </ViewButton>
                          </LaptopInfo>
                        </LaptopCard>
                      ))}
                    </LaptopsGrid>
                  ) : (
                    <div style={{ padding: '1rem', textAlign: 'center', background: '#f8f8f8', borderRadius: '8px' }}>
                      No {deviceType === 'all' ? 'devices' : deviceType === 'laptop' ? 'laptops' : 'desktops'} found in this cluster.
                    </div>
                  )}
                </ClusterContainer>
              );
            })}
          </div>
        );
      })}
    </Container>
  );
};

export default ClusterLaptops; 