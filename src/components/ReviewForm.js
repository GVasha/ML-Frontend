import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { addReview, checkLocalStorageAvailability } from '../utils/storage';

const ReviewFormContainer = styled.div`
  margin-top: 2rem;
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #eee;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.2rem;
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

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StarContainer = styled.div`
  display: flex;
  margin-left: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Star = styled.span`
  color: ${({ active }) => active ? '#FFB400' : '#ccc'};
  margin-right: 0.2rem;
  transition: transform 0.1s;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: flex-start;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
`;

const ReviewForm = ({ predictionData, onReviewSubmitted }) => {
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    title: '',
    comment: '',
  });
  
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };
  
  const handleMouseEnter = (rating) => {
    setHoveredRating(rating);
  };
  
  const handleMouseLeave = () => {
    setHoveredRating(0);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Check localStorage availability first
      if (!checkLocalStorageAvailability()) {
        setError('LocalStorage is not available in your browser. Reviews cannot be saved.');
        return;
      }
      
      // Format prediction data correctly
      const formattedPredictionData = {
        specifications: predictionData?.specifications || {},
        predictedPrice: typeof predictionData?.predictedPrice === 'number' ? predictionData.predictedPrice : null,
        actualPrice: typeof predictionData?.actualPrice === 'number' ? predictionData.actualPrice : null
      };
      
      // Create review object with prediction data
      const reviewData = {
        ...formData,
        predictionData: formattedPredictionData
      };
      
      console.log('Submitting review data:', reviewData);
      
      // Save to local storage
      const newReview = addReview(reviewData);
      
      if (newReview) {
        console.log('Review successfully saved:', newReview);
        setSubmitted(true);
        setFormData({
          name: '',
          rating: 0,
          title: '',
          comment: '',
        });
        
        // Call callback if provided
        if (onReviewSubmitted) {
          onReviewSubmitted(newReview);
        }
      } else {
        setError('Failed to save review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setError(`Error submitting review: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderStars = () => {
    const stars = [];
    const activeRating = hoveredRating || formData.rating;
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          active={i <= activeRating}
          onClick={() => handleRatingClick(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
        >
          {i <= activeRating ? <FaStar /> : <FaRegStar />}
        </Star>
      );
    }
    
    return stars;
  };
  
  if (submitted) {
    return (
      <ReviewFormContainer>
        <SuccessMessage>
          <h3>Thank you for your review!</h3>
          <p>Your feedback helps us improve our price prediction model.</p>
          <p><small>Your review has been saved to your browser's local storage.</small></p>
          <SubmitButton 
            onClick={() => setSubmitted(false)}
            style={{ marginTop: '1rem' }}
          >
            Write Another Review
          </SubmitButton>
        </SuccessMessage>
      </ReviewFormContainer>
    );
  }
  
  return (
    <ReviewFormContainer>
      <Title>Review this price prediction</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Your Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Accuracy Rating</Label>
          <RatingContainer>
            <span>How accurate was our prediction?</span>
            <StarContainer>
              {renderStars()}
            </StarContainer>
          </RatingContainer>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="title">Review Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Summarize your experience"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="comment">Your Review</Label>
          <Textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Tell us about your experience with our price prediction"
            required
          />
        </FormGroup>
        
        <SubmitButton type="submit" disabled={isSubmitting || formData.rating === 0}>
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </SubmitButton>
      </Form>
    </ReviewFormContainer>
  );
};

export default ReviewForm; 