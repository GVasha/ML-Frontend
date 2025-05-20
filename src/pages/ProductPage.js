import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaStar, FaRegStar, FaStarHalfAlt, FaShoppingCart, FaArrowLeft, FaHeart, FaShare, FaTruck, FaShieldAlt, FaCheckCircle, FaLaptop, FaDesktop, FaMicrochip, FaMemory, FaHdd } from 'react-icons/fa';
import { predictPrice } from '../services/api';
import testApi from '../services/testApi';

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const BreadcrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
`;

const ProductInfo = styled.div`
  padding: 1rem 0;
`;

const Brand = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
`;

const StarsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  color: #ffc107;
  font-size: 1.1rem;
`;

const Rating = styled.span`
  margin-left: 0.5rem;
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 1.5rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const AddToCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

const WishlistButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: ${({ theme }) => theme.colors.dark};
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  font-size: 1rem;
  border: 1px solid #ddd;
  transition: all 0.3s ease;
  
  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ShareButton = styled(WishlistButton)``;

const ShippingInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  
  svg {
    color: ${({ theme }) => theme.colors.success};
    margin-right: 0.5rem;
  }
`;

const TabsSection = styled.div`
  margin-top: 3rem;
`;

const TabsNavigation = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.dark};
  border-bottom: ${props => props.active ? `3px solid ${props.theme.colors.primary}` : '3px solid transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SpecsTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const SpecCategory = styled.div`
  margin-bottom: 2rem;
`;

const SpecCategoryTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const SpecRow = styled.div`
  display: flex;
  margin-bottom: 0.8rem;
`;

const SpecLabel = styled.div`
  flex: 0 0 40%;
  font-weight: 600;
  color: #666;
`;

const SpecValue = styled.div`
  flex: 0 0 60%;
`;

const ProductDescription = styled.div`
  line-height: 1.7;
  color: #444;
  
  p {
    margin-bottom: 1rem;
  }
  
  h3 {
    margin: 1.5rem 0 1rem;
    font-size: 1.2rem;
  }
`;

const PricePrediction = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
`;

const SimilarLaptops = styled.div`
  margin-top: 20px;
`;

const SimilarLaptopCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SpecsList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 1rem;
`;

const DeviceIcon = styled.div`
  font-size: 8rem;
  margin-bottom: 1rem;
`;

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }
  
  return stars;
};

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('specs');
  const [product, setProduct] = useState(null);
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [similarLaptops, setSimilarLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiConnected, setApiConnected] = useState(false);
  const [allLaptops, setAllLaptops] = useState([]);

  useEffect(() => {
    // Test API connection on component mount
    const checkApiConnection = async () => {
      const isConnected = await testApi();
      setApiConnected(isConnected);
    };
    checkApiConnection();
    
    // Load all laptops from JSON
    const loadLaptops = async () => {
      try {
        setLoading(true);
        const response = await fetch('/csvjson.json');
        if (!response.ok) {
          throw new Error('Failed to load laptop data');
        }
        
        const data = await response.json();
        setAllLaptops(data);
        
        // Find the specific laptop by index
        const productIndex = parseInt(id);
        if (isNaN(productIndex) || productIndex < 0 || productIndex >= data.length) {
          throw new Error('Product not found');
        }
        
        setProduct(data[productIndex]);
      } catch (err) {
        console.error('Error loading laptop data:', err);
        setError('Failed to load laptop data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadLaptops();
  }, [id]);

  useEffect(() => {
    if (product && apiConnected) {
      predictProductPrice(product);
    }
  }, [product, apiConnected]);

  const predictProductPrice = async (laptop) => {
    try {
      // Convert laptop data to match backend expected format
      const laptopSpecs = {
        'Pantalla_Tamaño de la pantalla': laptop['Pantalla_Tamaño de la pantalla'],
        'Procesador_Procesador': laptop['Procesador_Procesador'],
        'RAM_Memoria RAM': laptop['RAM_Memoria RAM'],
        'Disco duro_Capacidad de memoria SSD': laptop['Disco duro_Capacidad de memoria SSD'],
        'Gráfica_Tarjeta gráfica': laptop['Gráfica_Tarjeta gráfica'],
        'Alimentación_Batería': laptop['Alimentación_Batería'],
        'is_laptop': laptop['is_laptop'] || 1
      };

      const prediction = await predictPrice(laptopSpecs);
      setPredictedPrice(prediction.predicted_price);
      setSimilarLaptops(prediction.nearest_recommendations || []);
    } catch (err) {
      console.error('Prediction error:', err);
    }
  };
  
  // Find similar laptops in the same cluster
  const findSimilarLaptops = () => {
    if (!product || !allLaptops.length) return [];
    
    return allLaptops
      .filter(laptop => 
        laptop.cluster === product.cluster && 
        laptop.Título !== product.Título
      )
      .slice(0, 4);  // Just get the top 4 similar laptops
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading product details...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container">
        <h2>Product not found</h2>
        <Link to="/">Return to homepage</Link>
      </div>
    );
  }
  
  const similar = findSimilarLaptops();
  
  return (
    <div className="container">
      {!apiConnected && (
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#fff3cd', 
          color: '#856404', 
          marginBottom: '20px',
          borderRadius: '4px'
        }}>
          Warning: Backend API is not connected. Price predictions will not be available.
        </div>
      )}
      
      <Breadcrumb>
        <Link to="/">
          <FaArrowLeft style={{ marginRight: '5px' }} />
        </Link>
        <BreadcrumbLink to="/">Home</BreadcrumbLink> / 
        <span>Cluster {product.cluster}</span> / 
        <span>{product.Título}</span>
      </Breadcrumb>
      
      <ProductGrid>
        <ImageSection>
          <DeviceIcon style={{ fontSize: '8rem' }}>
            {product.is_laptop === 1 ? <FaLaptop /> : <FaDesktop />}
          </DeviceIcon>
        </ImageSection>
        
        <ProductInfo>
          <Brand>{product.marca || 'Unknown Brand'}</Brand>
          <Title>{product.Título}</Title>
          
          <StarsContainer>
            {renderStars(4)}
            <Rating>4.0 stars</Rating>
          </StarsContainer>
          
          <Price>${product.Precio_Rango ? product.Precio_Rango.toFixed(2) : 'N/A'}</Price>
          
          <ActionButtons>
            <AddToCartButton>
              <FaShoppingCart /> Add to Cart
            </AddToCartButton>
            <WishlistButton>
              <FaHeart /> Wishlist
            </WishlistButton>
            <ShareButton>
              <FaShare /> Share
            </ShareButton>
          </ActionButtons>
          
          <ShippingInfo>
            <FaTruck /> Free shipping
          </ShippingInfo>
          <ShippingInfo>
            <FaShieldAlt /> 1 Year Warranty
          </ShippingInfo>
          <ShippingInfo>
            <FaCheckCircle /> New
          </ShippingInfo>
        </ProductInfo>
      </ProductGrid>
      
      <TabsSection>
        <TabsNavigation>
          <Tab 
            active={activeTab === 'specs'} 
            onClick={() => setActiveTab('specs')}
          >
            Specifications
          </Tab>
          <Tab 
            active={activeTab === 'description'} 
            onClick={() => setActiveTab('description')}
          >
            Description
          </Tab>
          <Tab 
            active={activeTab === 'reviews'} 
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </Tab>
        </TabsNavigation>
        
        {activeTab === 'specs' && (
          <SpecsTable>
            <div>
              <SpecCategory>
                <SpecCategoryTitle>Processor</SpecCategoryTitle>
                {product['Procesador_Procesador'] && (
                  <SpecRow>
                    <SpecLabel>Model</SpecLabel>
                    <SpecValue>{product['Procesador_Procesador']}</SpecValue>
                  </SpecRow>
                )}
                {product['Procesador_Número de núcleos del procesador'] && (
                  <SpecRow>
                    <SpecLabel>Cores</SpecLabel>
                    <SpecValue>{product['Procesador_Número de núcleos del procesador']}</SpecValue>
                  </SpecRow>
                )}
                {product['Procesador_Frecuencia turbo máx.'] && (
                  <SpecRow>
                    <SpecLabel>Turbo Frequency</SpecLabel>
                    <SpecValue>{product['Procesador_Frecuencia turbo máx.']} GHz</SpecValue>
                  </SpecRow>
                )}
                {product['Procesador_Caché'] && (
                  <SpecRow>
                    <SpecLabel>Cache</SpecLabel>
                    <SpecValue>{product['Procesador_Caché']} MB</SpecValue>
                  </SpecRow>
                )}
              </SpecCategory>
              
              <SpecCategory>
                <SpecCategoryTitle>Memory</SpecCategoryTitle>
                {product['RAM_Memoria RAM'] && (
                  <SpecRow>
                    <SpecLabel>Size</SpecLabel>
                    <SpecValue>{product['RAM_Memoria RAM']} GB</SpecValue>
                  </SpecRow>
                )}
                {product['RAM_Tipo de RAM'] && (
                  <SpecRow>
                    <SpecLabel>Type</SpecLabel>
                    <SpecValue>{product['RAM_Tipo de RAM']}</SpecValue>
                  </SpecRow>
                )}
              </SpecCategory>
              
              <SpecCategory>
                <SpecCategoryTitle>Storage</SpecCategoryTitle>
                {product['Disco duro_Tipo de disco duro'] && (
                  <SpecRow>
                    <SpecLabel>Type</SpecLabel>
                    <SpecValue>{product['Disco duro_Tipo de disco duro']}</SpecValue>
                  </SpecRow>
                )}
                {product['Disco duro_Capacidad de memoria SSD'] && (
                  <SpecRow>
                    <SpecLabel>SSD Capacity</SpecLabel>
                    <SpecValue>{product['Disco duro_Capacidad de memoria SSD']} GB</SpecValue>
                  </SpecRow>
                )}
              </SpecCategory>
            </div>
            
            <div>
              <SpecCategory>
                <SpecCategoryTitle>Graphics</SpecCategoryTitle>
                {product['Gráfica_Tarjeta gráfica'] && (
                  <SpecRow>
                    <SpecLabel>Model</SpecLabel>
                    <SpecValue>{product['Gráfica_Tarjeta gráfica']}</SpecValue>
                  </SpecRow>
                )}
                {product['Gráfica_Memoria gráfica'] && (
                  <SpecRow>
                    <SpecLabel>Memory</SpecLabel>
                    <SpecValue>{product['Gráfica_Memoria gráfica']} GB</SpecValue>
                  </SpecRow>
                )}
                {product['Gráfica_Tipo de memoria gráfica'] && (
                  <SpecRow>
                    <SpecLabel>Memory Type</SpecLabel>
                    <SpecValue>{product['Gráfica_Tipo de memoria gráfica']}</SpecValue>
                  </SpecRow>
                )}
              </SpecCategory>
              
              <SpecCategory>
                <SpecCategoryTitle>Display</SpecCategoryTitle>
                {product['Pantalla_Tamaño de la pantalla'] && (
                  <SpecRow>
                    <SpecLabel>Size</SpecLabel>
                    <SpecValue>{product['Pantalla_Tamaño de la pantalla']} inches</SpecValue>
                  </SpecRow>
                )}
                {product['Pantalla_Tecnología de la pantalla'] && (
                  <SpecRow>
                    <SpecLabel>Technology</SpecLabel>
                    <SpecValue>{product['Pantalla_Tecnología de la pantalla']}</SpecValue>
                  </SpecRow>
                )}
              </SpecCategory>
              
              {product.is_laptop === 1 && (
                <SpecCategory>
                  <SpecCategoryTitle>Battery</SpecCategoryTitle>
                  {product['Alimentación_Vatios-hora'] && (
                    <SpecRow>
                      <SpecLabel>Capacity</SpecLabel>
                      <SpecValue>{product['Alimentación_Vatios-hora']} Wh</SpecValue>
                    </SpecRow>
                  )}
                  {product['Alimentación_Autonomía de la batería'] && (
                    <SpecRow>
                      <SpecLabel>Battery Life</SpecLabel>
                      <SpecValue>{product['Alimentación_Autonomía de la batería']} hours</SpecValue>
                    </SpecRow>
                  )}
                </SpecCategory>
              )}
              
              <SpecCategory>
                <SpecCategoryTitle>Physical</SpecCategoryTitle>
                {product['Medidas y peso_Peso'] && (
                  <SpecRow>
                    <SpecLabel>Weight</SpecLabel>
                    <SpecValue>{product['Medidas y peso_Peso']} kg</SpecValue>
                  </SpecRow>
                )}
              </SpecCategory>
            </div>
          </SpecsTable>
        )}
        
        {activeTab === 'description' && (
          <ProductDescription>
            <h3>Product Description</h3>
            <p>Experience exceptional performance with this {product.is_laptop === 1 ? 'laptop' : 'desktop'} featuring the powerful {product['Procesador_Procesador'] || 'processor'} and {product['RAM_Memoria RAM'] || ''} GB of RAM. Perfect for {product['product_type_group']?.includes('Gaming') ? 'gaming and content creation' : 'productivity and everyday computing'}.</p>
            
            <h3>Key Features</h3>
            <ul>
              {product['Procesador_Procesador'] && (
                <li>Powerful {product['Procesador_Procesador']} processor</li>
              )}
              {product['RAM_Memoria RAM'] && (
                <li>{product['RAM_Memoria RAM']} GB {product['RAM_Tipo de RAM'] || 'RAM'}</li>
              )}
              {product['Disco duro_Capacidad de memoria SSD'] && (
                <li>Fast {product['Disco duro_Capacidad de memoria SSD']} GB {product['Disco duro_Tipo de disco duro'] || 'SSD'} storage</li>
              )}
              {product['Gráfica_Tarjeta gráfica'] && (
                <li>{product['Gráfica_Tarjeta gráfica']} graphics</li>
              )}
              {product['Pantalla_Tamaño de la pantalla'] && product.is_laptop === 1 && (
                <li>{product['Pantalla_Tamaño de la pantalla']}" {product['Pantalla_Tecnología de la pantalla'] || ''} display</li>
              )}
              {product['Sistema operativo_Sistema operativo'] && (
                <li>{product['Sistema operativo_Sistema operativo']} operating system</li>
              )}
            </ul>
          </ProductDescription>
        )}
        
        {activeTab === 'reviews' && (
          <div>
            <p>Reviews will be implemented in a future update.</p>
          </div>
        )}
      </TabsSection>
      
      {predictedPrice && (
        <PricePrediction>
          <h2>AI Price Prediction</h2>
          <p>Our AI model predicts this {product.is_laptop === 1 ? 'laptop' : 'desktop'} should cost approximately:</p>
          <Price style={{ fontSize: '1.8rem' }}>${predictedPrice.toFixed(2)}</Price>
          <p>Current price: ${product.Precio_Rango.toFixed(2)}</p>
          <p style={{ 
            color: product.Precio_Rango > predictedPrice ? 'green' : 'red',
            fontWeight: 'bold'
          }}>
            This product is {product.Precio_Rango > predictedPrice ? 'above' : 'below'} the AI predicted market price
            by ${Math.abs(product.Precio_Rango - predictedPrice).toFixed(2)}
          </p>
        </PricePrediction>
      )}

      {similar.length > 0 && (
        <SimilarLaptops>
          <h2>Similar Computers in Cluster {product.cluster}</h2>
          {similar.map((laptop, index) => (
            <SimilarLaptopCard key={index} onClick={() => navigate(`/product/${allLaptops.indexOf(laptop)}`)}>
              <h3>{laptop.Título}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SpecsList style={{ flex: 1 }}>
                  {laptop['Procesador_Procesador'] && (
                    <li>
                      <FaMicrochip />
                      {laptop['Procesador_Procesador']}
                    </li>
                  )}
                  {laptop['RAM_Memoria RAM'] && (
                    <li>
                      <FaMemory />
                      {laptop['RAM_Memoria RAM']} GB RAM
                    </li>
                  )}
                </SpecsList>
                <div>
                  <strong>${laptop.Precio_Rango.toFixed(2)}</strong>
                </div>
              </div>
            </SimilarLaptopCard>
          ))}
        </SimilarLaptops>
      )}
    </div>
  );
};

export default ProductPage; 