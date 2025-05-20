import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import laptops from '../data/laptopData';
import { FaStar, FaRegStar, FaStarHalfAlt, FaShoppingCart, FaArrowLeft, FaHeart, FaShare, FaTruck, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
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
  const [activeTab, setActiveTab] = useState('specs');
  const [product, setProduct] = useState(null);
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [similarLaptops, setSimilarLaptops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiConnected, setApiConnected] = useState(false);

  useEffect(() => {
    // Test API connection on component mount
    const checkApiConnection = async () => {
      const isConnected = await testApi();
      setApiConnected(isConnected);
    };
    checkApiConnection();
  }, []);

  useEffect(() => {
    const foundProduct = laptops.find(laptop => laptop.id === parseInt(id));
    setProduct(foundProduct);
    
    if (foundProduct && apiConnected) {
      predictProductPrice(foundProduct);
    }
  }, [id, apiConnected]);

  const predictProductPrice = async (laptop) => {
    setLoading(true);
    setError(null);
    try {
      // Convert laptop data to match backend expected format
      const laptopSpecs = {
        'Pantalla_Tamaño de la pantalla': parseFloat(laptop.specs.display.size),
        'Procesador_Procesador': laptop.specs.processor.model,
        'RAM_Memoria RAM': parseInt(laptop.specs.memory.size),
        'Disco duro_Capacidad de memoria SSD': parseInt(laptop.specs.storage.primary.capacity),
        'Gráfica_Tarjeta gráfica': laptop.specs.graphics.model,
        'Alimentación_Batería': parseInt(laptop.specs.battery.capacity)
      };

      const prediction = await predictPrice(laptopSpecs);
      setPredictedPrice(prediction.predicted_price);
      setSimilarLaptops(prediction.nearest_recommendations || []);
    } catch (err) {
      setError('Failed to predict price. Please try again later.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="container">
        <h2>Product not found</h2>
        <Link to="/">Return to homepage</Link>
      </div>
    );
  }
  
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
        <BreadcrumbLink to={`/category/${product.brand.toLowerCase()}`}>{product.brand}</BreadcrumbLink> / 
        <span>{product.title}</span>
      </Breadcrumb>
      
      <ProductGrid>
        <ImageSection>
          <ProductImage src={product.image} alt={product.title} />
        </ImageSection>
        
        <ProductInfo>
          <Brand>{product.brand}</Brand>
          <Title>{product.title}</Title>
          
          <StarsContainer>
            {renderStars(product.rating)}
            <Rating>{product.rating} stars - {product.sellerRating} seller rating</Rating>
          </StarsContainer>
          
          <Price>${product.price.toFixed(2)}</Price>
          
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
            <FaTruck /> {product.shipping}
          </ShippingInfo>
          <ShippingInfo>
            <FaShieldAlt /> {product.warranty}
          </ShippingInfo>
          <ShippingInfo>
            <FaCheckCircle /> {product.condition}
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
                <SpecRow>
                  <SpecLabel>Brand</SpecLabel>
                  <SpecValue>{product.specs.processor.brand}</SpecValue>
                </SpecRow>
                <SpecRow>
                  <SpecLabel>Model</SpecLabel>
                  <SpecValue>{product.specs.processor.model}</SpecValue>
                </SpecRow>
                <SpecRow>
                  <SpecLabel>Cores</SpecLabel>
                  <SpecValue>{product.specs.processor.cores}</SpecValue>
                </SpecRow>
                <SpecRow>
                  <SpecLabel>Base Clock Speed</SpecLabel>
                  <SpecValue>{product.specs.processor.baseClockSpeed}</SpecValue>
                </SpecRow>
                <SpecRow>
                  <SpecLabel>Turbo Boost Speed</SpecLabel>
                  <SpecValue>{product.specs.processor.turboBoostSpeed}</SpecValue>
                </SpecRow>
                <SpecRow>
                  <SpecLabel>Cache</SpecLabel>
                  <SpecValue>{product.specs.processor.cache}</SpecValue>
                </SpecRow>
              </SpecCategory>
              
              <SpecCategory>
                <SpecCategoryTitle>Memory</SpecCategoryTitle>
                <SpecRow>
                  <SpecLabel>Type</SpecLabel>
                  <SpecValue>{product.specs.memory.type}</SpecValue>
                </SpecRow>
                <SpecRow>
                  <SpecLabel>Size</SpecLabel>
                  <SpecValue>{product.specs.memory.size}</SpecValue>
                </SpecRow>
                <SpecRow>
                  <SpecLabel>Speed</SpecLabel>
                  <SpecValue>{product.specs.memory.speed}</SpecValue>
                </SpecRow>
                <SpecRow>
                  <SpecLabel>Slots</SpecLabel>
                  <SpecValue>{product.specs.memory.slots}</SpecValue>
                </SpecRow>
                <SpecRow>
                  <SpecLabel>Expandable To</SpecLabel>
                  <SpecValue>{product.specs.memory.expandableTo}</SpecValue>
                </SpecRow>
              </SpecCategory>
              
              <SpecCategory>
                <SpecCategoryTitle>Storage</SpecCategoryTitle>
                <SpecRow>
                  <SpecLabel>Type</SpecLabel>
                  <SpecValue>{product.specs.storage.primary.type}</SpecValue>
                </SpecRow>
                <SpecRow>
                  <SpecLabel>Interface</SpecLabel>
                  <SpecValue>{product.specs.storage.primary.interface}</SpecValue>
                </SpecRow>
                <SpecRow>
                  <SpecLabel>Capacity</SpecLabel>
                  <SpecValue>{product.specs.storage.primary.capacity}</SpecValue>
                </SpecRow>
              </SpecCategory>
            </div>
            
            <div>
              <SpecCategory>
                <SpecCategoryTitle>Graphics</SpecCategoryTitle>
                <SpecRow>
                  <SpecLabel>Brand</SpecLabel>
                  <SpecValue>{product.specs.graphics.brand}</SpecValue>
                </SpecRow>
                <SpecRow>
                  <SpecLabel>Model</SpecLabel>
                  <SpecValue>{product.specs.graphics.model}</SpecValue>
                </SpecRow>
                <SpecRow>
                  <SpecLabel>Memory</SpecLabel>
                  <SpecValue>{product.specs.graphics.memory}</SpecValue>
                </SpecRow>
              </SpecCategory>
              
              <SpecCategory>
                <SpecCategoryTitle>Display</SpecCategoryTitle>
                <SpecRow>
                  <SpecLabel>Size</SpecLabel>
                  <SpecValue>{product.specs.display.size}</SpecValue>
                </SpecRow>
                <SpecRow>
                  <SpecLabel>Resolution</SpecLabel>
                  <SpecValue>{product.specs.display.resolution}</SpecValue>
                </SpecRow>
                <SpecRow>
                  <SpecLabel>Type</SpecLabel>
                  <SpecValue>{product.specs.display.type}</SpecValue>
                </SpecRow>
                <SpecRow>
                  <SpecLabel>Refresh Rate</SpecLabel>
                  <SpecValue>{product.specs.display.refreshRate}</SpecValue>
                </SpecRow>
                <SpecRow>
                  <SpecLabel>Brightness</SpecLabel>
                  <SpecValue>{product.specs.display.brightness}</SpecValue>
                </SpecRow>
                <SpecRow>
                  <SpecLabel>Touchscreen</SpecLabel>
                  <SpecValue>{product.specs.display.touchscreen ? 'Yes' : 'No'}</SpecValue>
                </SpecRow>
              </SpecCategory>
              
              <SpecCategory>
                <SpecCategoryTitle>Battery</SpecCategoryTitle>
                <SpecRow>
                  <SpecLabel>Capacity</SpecLabel>
                  <SpecValue>{product.specs.battery.capacity}</SpecValue>
                </SpecRow>
                <SpecRow>
                  <SpecLabel>Battery Life</SpecLabel>
                  <SpecValue>{product.specs.battery.batteryLife}</SpecValue>
                </SpecRow>
                <SpecRow>
                  <SpecLabel>Fast Charging</SpecLabel>
                  <SpecValue>{product.specs.battery.fastCharging ? 'Yes' : 'No'}</SpecValue>
                </SpecRow>
              </SpecCategory>
              
              <SpecCategory>
                <SpecCategoryTitle>Ports</SpecCategoryTitle>
                {product.specs.ports.map((port, index) => (
                  <SpecRow key={index}>
                    <SpecValue>{port}</SpecValue>
                  </SpecRow>
                ))}
              </SpecCategory>
            </div>
          </SpecsTable>
        )}
        
        {activeTab === 'description' && (
          <ProductDescription>
            <p>{product.description}</p>
            
            <h3>Key Features</h3>
            <p>Experience the ultimate performance with the {product.title}, featuring the powerful {product.specs.processor.brand} {product.specs.processor.model} processor, {product.specs.memory.size} {product.specs.memory.type} RAM, and {product.specs.storage.primary.capacity} {product.specs.storage.primary.type} storage.</p>
            
            <h3>Display</h3>
            <p>Enjoy crystal-clear visuals on the {product.specs.display.size} {product.specs.display.type} display with {product.specs.display.resolution} resolution and {product.specs.display.refreshRate} refresh rate.</p>
            
            <h3>Graphics</h3>
            <p>Powered by {product.specs.graphics.brand} {product.specs.graphics.model} with {product.specs.graphics.memory} memory, this laptop delivers exceptional graphics performance for all your needs.</p>
            
            <h3>Battery Life</h3>
            <p>With a {product.specs.battery.capacity} battery, enjoy {product.specs.battery.batteryLife} of usage on a single charge. {product.specs.battery.fastCharging ? 'Fast charging technology gets you back to work quickly.' : ''}</p>
          </ProductDescription>
        )}
        
        {activeTab === 'reviews' && (
          <div>
            <p>Reviews will be implemented in a future update.</p>
          </div>
        )}
      </TabsSection>
      
      <PricePrediction>
        <h2>AI Price Prediction</h2>
        {loading ? (
          <p>Calculating price prediction...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : predictedPrice ? (
          <>
            <p>Predicted Market Price: ${predictedPrice.toFixed(2)}</p>
            <p>Current Price: ${product.price}</p>
            <p>Price Difference: ${(product.price - predictedPrice).toFixed(2)}</p>
          </>
        ) : null}
      </PricePrediction>

      {similarLaptops.length > 0 && (
        <SimilarLaptops>
          <h2>Similar Laptops</h2>
          {similarLaptops.map((laptop, index) => (
            <SimilarLaptopCard key={index}>
              <h3>{laptop.Título}</h3>
              <p>Price Range: {laptop.Precio_Rango}</p>
            </SimilarLaptopCard>
          ))}
        </SimilarLaptops>
      )}
    </div>
  );
};

export default ProductPage; 