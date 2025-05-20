import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStar, FaTruck, FaCheckCircle, FaAmazon, FaChevronRight, FaLaptop } from 'react-icons/fa';

// Add fallback image URL directly in the component
const FALLBACK_IMAGE_URL = 'https://placehold.co/400x300/e0e0e0/5d5d5d?text=Laptop+Image';

const ResultsContainer = styled.div`
  margin-top: 1.5rem;
  font-family: Arial, sans-serif;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #DDD;
`;

const ResultsTitle = styled.h3`
  font-size: 1.3rem;
  margin: 0;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: #FF9900;
  }
`;

const SearchInfo = styled.span`
  font-size: 0.9rem;
  color: #565959;
`;

const ResultsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ResultCard = styled.div`
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  padding: 1rem;
  background-color: white;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const PrimeBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #232F3E;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  z-index: 1;
  
  svg {
    margin-right: 0.2rem;
    font-size: 0.8rem;
  }
`;

const ResultImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: contain;
  margin-bottom: 1rem;
  background-color: white;
`;

const FallbackImage = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  margin-bottom: 1rem;
  color: #565959;
  
  svg {
    font-size: 3rem;
  }
`;

const ResultTitle = styled.h4`
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  color: #0066C0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 3rem;
  
  &:hover {
    color: #C45500;
    text-decoration: underline;
  }
`;

const ResultPrice = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: #B12704;
  margin: 0.5rem 0;
  
  span {
    font-size: 0.9rem;
    text-decoration: line-through;
    color: #565959;
    margin-left: 0.5rem;
  }
`;

const ResultMeta = styled.div`
  display: flex;
  align-items: center;
  margin: 0.3rem 0;
  font-size: 0.85rem;
  color: #565959;
  
  svg {
    margin-right: 0.4rem;
    color: ${({ prime }) => prime ? '#FF9900' : '#565959'};
  }
`;

const ResultSeller = styled.div`
  font-size: 0.85rem;
  color: #565959;
`;

const ResultRating = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  
  svg {
    color: #FF9900;
    margin-right: 0.2rem;
  }
  
  span {
    font-size: 0.85rem;
    color: #0066C0;
    margin-left: 0.3rem;
    
    &:hover {
      color: #C45500;
      text-decoration: underline;
    }
  }
`;

const StockStatus = styled.div`
  color: ${({ inStock }) => inStock ? '#007600' : '#B12704'};
  font-size: 0.85rem;
  margin: 0.3rem 0;
  
  svg {
    margin-right: 0.2rem;
  }
`;

const ViewButton = styled.a`
  display: block;
  text-align: center;
  background-color: #FFD814;
  border-color: #FCD200;
  color: #111;
  padding: 0.7rem 0;
  border-radius: 8px;
  margin-top: auto;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s, transform 0.1s;
  font-size: 0.9rem;
  
  &:hover {
    background-color: #F7CA00;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const BuyNowButton = styled.a`
  display: block;
  text-align: center;
  background-color: #FFA41C;
  border-color: #FF8F00;
  color: #111;
  padding: 0.7rem 0;
  border-radius: 8px;
  margin-top: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s, transform 0.1s;
  font-size: 0.9rem;
  
  &:hover {
    background-color: #FA8900;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #565959;
  
  svg {
    animation: spin 2s linear infinite;
    font-size: 2rem;
    color: #FF9900;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorContainer = styled.div`
  padding: 1rem;
  background-color: #FFF4F4;
  color: #B12704;
  border-radius: 4px;
  border: 1px solid #FFD6D6;
`;

const AmazonResults = ({ results, loading, error, searchTerms }) => {
  // Create state to track image loading errors
  const [imgErrors, setImgErrors] = useState({});
  
  // Function to handle image loading errors
  const handleImageError = (id) => {
    setImgErrors(prev => ({
      ...prev,
      [id]: true
    }));
  };
  
  // Fallback images for different brands
  const getFallbackImage = (brand) => {
    return (
      <FallbackImage>
        <FaLaptop />
      </FallbackImage>
    );
  };
  
  if (loading) {
    return (
      <LoadingContainer>
        <div>
          <FaAmazon />
          <div>Searching Amazon...</div>
        </div>
      </LoadingContainer>
    );
  }
  
  if (error) {
    return (
      <ErrorContainer>
        <h3>Error searching Amazon</h3>
        <p>{error}</p>
      </ErrorContainer>
    );
  }
  
  if (!results || results.length === 0) {
    return null;
  }
  
  return (
    <ResultsContainer>
      <ResultsHeader>
        <ResultsTitle>
          <FaAmazon /> Amazon Results
        </ResultsTitle>
        <SearchInfo>Found {results.length} items for "{searchTerms}"</SearchInfo>
      </ResultsHeader>
      
      <ResultsList>
        {results.map(item => (
          <ResultCard key={item.id}>
            {item.prime && (
              <PrimeBadge>
                <FaCheckCircle /> PRIME
              </PrimeBadge>
            )}
            
            {/* Show fallback image if loading failed */}
            {imgErrors[item.id] ? (
              getFallbackImage(item.title)
            ) : (
              <ResultImage 
                src={item.image || FALLBACK_IMAGE_URL} 
                alt={item.title} 
                onError={() => handleImageError(item.id)}
              />
            )}
            
            <ResultTitle>{item.title}</ResultTitle>
            <ResultRating>
              <FaStar />
              {item.rating}
              <span>({item.reviews.toLocaleString()} reviews)</span>
            </ResultRating>
            
            <ResultPrice>
              ${item.price}
              {item.originalPrice && <span>${item.originalPrice}</span>}
            </ResultPrice>
            
            <ResultSeller>
              Sold by: {item.seller}
            </ResultSeller>
            
            <ResultMeta prime={item.prime}>
              <FaTruck /> {item.delivery}
            </ResultMeta>
            
            <StockStatus inStock={item.inStock}>
              {item.inStock ? (
                <><FaCheckCircle /> In Stock</>
              ) : (
                'Out of Stock'
              )}
            </StockStatus>
            
            <div style={{ flex: 1 }}></div>
            
            <ViewButton href="#" onClick={(e) => e.preventDefault()}>
              Add to Cart <FaChevronRight size={10} />
            </ViewButton>
            
            <BuyNowButton href="#" onClick={(e) => e.preventDefault()}>
              Buy Now
            </BuyNowButton>
          </ResultCard>
        ))}
      </ResultsList>
    </ResultsContainer>
  );
};

export default AmazonResults; 