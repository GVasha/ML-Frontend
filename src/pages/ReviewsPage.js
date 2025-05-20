import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaTrash, FaLaptop, FaTags, FaDollarSign } from 'react-icons/fa';
import { getReviews, deleteReview, debugLocalStorage, checkLocalStorageAvailability } from '../utils/storage';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  
  h3 {
    margin-bottom: 1rem;
  }
  
  svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: 1.5rem;
  }
`;

const ReviewList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
`;

const ReviewCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ReviewHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReviewTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const ReviewBody = styled.div`
  padding: 1.5rem;
`;

const ReviewMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ReviewAuthor = styled.div`
  font-weight: 600;
`;

const ReviewDate = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.9rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  svg {
    color: #FFB400;
    margin-right: 0.2rem;
  }
`;

const Comment = styled.p`
  margin-top: 1rem;
  line-height: 1.6;
`;

const PredictionData = styled.div`
  background-color: #f8f9fa;
  border-radius: 6px;
  padding: 1rem;
  margin-top: 1.5rem;
  border: 1px solid #e9ecef;
`;

const PredictionTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const PredictionDetail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  
  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SpecsList = styled.ul`
  padding-left: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  
  li {
    margin-bottom: 0.3rem;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: ${({ theme, type }) => type === 'delete' ? theme.colors.danger : theme.colors.primary};
  margin-left: 0.5rem;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const DebugButton = styled.button`
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  cursor: pointer;
  font-size: 0.9rem;
`;

const DebugContainer = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border: 1px solid #eee;
  border-radius: 4px;
  white-space: pre-wrap;
  font-family: monospace;
  font-size: 0.9rem;
`;

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const renderStars = (rating) => {
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i}>
        {i <= rating ? <FaStar /> : <FaRegStar />}
      </span>
    );
  }
  
  return stars;
};

const sanitizeReviews = (reviews) => {
  return reviews.map(review => {
    // Make sure predictionData has the right structure
    const predictionData = review.predictionData || {};
    return {
      ...review,
      predictionData: {
        specifications: predictionData.specifications || {},
        predictedPrice: typeof predictionData.predictedPrice === 'number' ? predictionData.predictedPrice : null,
        actualPrice: typeof predictionData.actualPrice === 'number' ? predictionData.actualPrice : null
      }
    };
  });
};

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState(null);
  
  useEffect(() => {
    // Test localStorage availability
    const isLocalStorageAvailable = checkLocalStorageAvailability();
    console.log('Is localStorage available:', isLocalStorageAvailable);
    
    // Load reviews from local storage
    const loadedReviews = getReviews();
    console.log('Loaded reviews:', loadedReviews);
    
    // Clean up any problematic reviews
    const sanitizedReviews = sanitizeReviews(loadedReviews);
    setReviews(sanitizedReviews);
    setLoading(false);
    
    // If we sanitized the reviews, update localStorage
    if (JSON.stringify(sanitizedReviews) !== JSON.stringify(loadedReviews)) {
      console.log('Updating reviews in localStorage with sanitized data');
      localStorage.setItem('laptop-marketplace-reviews', JSON.stringify(sanitizedReviews));
    }
  }, []);
  
  const handleDebugClick = () => {
    const storageInfo = debugLocalStorage();
    setDebugInfo(storageInfo);
  };
  
  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      const success = deleteReview(reviewId);
      
      if (success) {
        setReviews(reviews.filter(review => review.id !== reviewId));
      }
    }
  };
  
  const renderSpecifications = (specs) => {
    if (!specs) return null;
    
    // Extract just a few key specs to display
    const keySpecs = [];
    
    // CPU
    if (specs['Procesador_Procesador']) {
      keySpecs.push(`Processor: ${specs['Procesador_Procesador']}`);
    }
    
    // RAM
    if (specs['RAM_Memoria RAM']) {
      keySpecs.push(`RAM: ${specs['RAM_Memoria RAM']} GB`);
    }
    
    // Storage
    if (specs['Disco duro_Capacidad de memoria SSD']) {
      keySpecs.push(`Storage: ${specs['Disco duro_Capacidad de memoria SSD']} GB SSD`);
    }
    
    // GPU
    if (specs['Gráfica_Tarjeta gráfica']) {
      keySpecs.push(`Graphics: ${specs['Gráfica_Tarjeta gráfica']}`);
    }
    
    // Screen size
    if (specs['Pantalla_Tamaño de la pantalla']) {
      keySpecs.push(`Screen: ${specs['Pantalla_Tamaño de la pantalla']} inches`);
    }
    
    return (
      <SpecsList>
        {keySpecs.map((spec, index) => (
          <li key={index}>{spec}</li>
        ))}
      </SpecsList>
    );
  };
  
  if (loading) {
    return (
      <Container>
        <Header>
          <Title>Loading reviews...</Title>
        </Header>
      </Container>
    );
  }
  
  return (
    <Container>
      <Header>
        <Title>User Reviews</Title>
        <Subtitle>See what others are saying about our price predictions</Subtitle>
        <DebugButton onClick={handleDebugClick}>
          Debug localStorage
        </DebugButton>
        {debugInfo && (
          <DebugContainer>
            <h4>localStorage Content:</h4>
            {JSON.stringify(debugInfo, null, 2)}
          </DebugContainer>
        )}
      </Header>
      
      {reviews.length === 0 ? (
        <EmptyState>
          <FaLaptop />
          <h3>No reviews yet</h3>
          <p>Be the first to review our price predictions!</p>
          <Link to="/price-predictor">
            <button className="btn btn-primary">Try the Price Predictor</button>
          </Link>
        </EmptyState>
      ) : (
        <ReviewList>
          {reviews.map(review => (
            <ReviewCard key={review.id}>
              <ReviewHeader>
                <ReviewTitle>{review.title}</ReviewTitle>
              </ReviewHeader>
              
              <ReviewBody>
                <ReviewMeta>
                  <ReviewAuthor>By: {review.name}</ReviewAuthor>
                  <ReviewDate>Posted on: {formatDate(review.date)}</ReviewDate>
                </ReviewMeta>
                
                <Rating>
                  {renderStars(review.rating)}
                  <span style={{ marginLeft: '0.5rem' }}>{review.rating} out of 5 stars</span>
                </Rating>
                
                <Comment>{review.comment}</Comment>
                
                {review.predictionData && (
                  <PredictionData>
                    <PredictionTitle>
                      <FaLaptop /> Prediction Details
                    </PredictionTitle>
                    
                    {review.predictionData.specifications && (
                      <div>
                        <PredictionDetail>
                          <FaTags /> Specifications:
                        </PredictionDetail>
                        {renderSpecifications(review.predictionData.specifications)}
                      </div>
                    )}
                    
                    <PredictionDetail>
                      <FaDollarSign /> Predicted Price: ${review.predictionData.predictedPrice?.toFixed(2) || 'N/A'}
                    </PredictionDetail>
                    
                    {review.predictionData.actualPrice && (
                      <PredictionDetail>
                        <FaDollarSign /> Actual Price: ${typeof review.predictionData.actualPrice === 'number' ? review.predictionData.actualPrice.toFixed(2) : 'N/A'}
                      </PredictionDetail>
                    )}
                  </PredictionData>
                )}
                
                <ActionsContainer>
                  <ActionButton
                    type="delete"
                    onClick={() => handleDeleteReview(review.id)}
                    title="Delete review"
                  >
                    <FaTrash />
                  </ActionButton>
                </ActionsContainer>
              </ReviewBody>
            </ReviewCard>
          ))}
        </ReviewList>
      )}
    </Container>
  );
};

export default ReviewsPage; 