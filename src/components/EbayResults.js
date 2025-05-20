import React from 'react';
import styled from 'styled-components';
import { FaStar, FaShippingFast, FaGlobe } from 'react-icons/fa';

const ResultsContainer = styled.div`
  margin-top: 1.5rem;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ResultsTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

const SearchInfo = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const ResultsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ResultCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  background-color: white;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ResultImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: contain;
  border-radius: 4px;
  background-color: #f8f9fa;
  margin-bottom: 1rem;
`;

const ResultTitle = styled.h4`
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.colors.dark};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 3rem;
`;

const ResultPrice = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0.5rem 0;
`;

const ResultMeta = styled.div`
  display: flex;
  align-items: center;
  margin: 0.3rem 0;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.secondary};
  
  svg {
    margin-right: 0.4rem;
    color: ${({ theme, accent }) => accent ? theme.colors.accent : theme.colors.secondary};
  }
`;

const ResultShipping = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const ResultRating = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  
  svg {
    color: ${({ theme }) => theme.colors.accent};
    margin-right: 0.2rem;
  }
  
  span {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.secondary};
    margin-left: 0.3rem;
  }
`;

const ViewButton = styled.a`
  display: block;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.7rem 0;
  border-radius: 4px;
  margin-top: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const ErrorContainer = styled.div`
  padding: 1rem;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 4px;
`;

const EbayResults = ({ results, loading, error, searchTerms }) => {
  if (loading) {
    return (
      <LoadingContainer>
        <div>Searching eBay...</div>
      </LoadingContainer>
    );
  }
  
  if (error) {
    return (
      <ErrorContainer>
        <h3>Error searching eBay</h3>
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
        <ResultsTitle>eBay Results</ResultsTitle>
        <SearchInfo>Found {results.length} items for "{searchTerms}"</SearchInfo>
      </ResultsHeader>
      
      <ResultsList>
        {results.map(item => (
          <ResultCard key={item.id}>
            <ResultImage src={item.image} alt={item.title} />
            <ResultTitle>{item.title}</ResultTitle>
            <ResultPrice>${item.price}</ResultPrice>
            
            <ResultMeta>
              <FaGlobe /> Ships from {item.location}
            </ResultMeta>
            
            <ResultMeta accent={true}>
              <FaShippingFast /> {item.delivery}
            </ResultMeta>
            
            <ResultShipping>
              + ${item.shipping} shipping • {item.condition}
            </ResultShipping>
            
            <ResultRating>
              <FaStar />
              {item.rating}
              <span>({item.reviews} reviews)</span>
            </ResultRating>
            
            <ViewButton href="#" onClick={(e) => e.preventDefault()}>
              View on eBay
            </ViewButton>
          </ResultCard>
        ))}
      </ResultsList>
    </ResultsContainer>
  );
};

export default EbayResults; 