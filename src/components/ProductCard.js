import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaStar, FaRegStar, FaStarHalfAlt, FaShoppingCart } from 'react-icons/fa';

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  height: 200px;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  transition: transform 0.5s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  z-index: 1;
`;

const CardContent = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Brand = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  margin-bottom: 0.3rem;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
`;

const Price = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.dark};
`;

const StarsContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  color: #ffc107;
  font-size: 0.9rem;
`;

const Specs = styled.div`
  margin-top: 0.5rem;
`;

const SpecItem = styled.div`
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.dark};
  
  span {
    font-weight: 600;
  }
`;

const AddToCartButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
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

const ProductCard = ({ product }) => {
  const { id, title, brand, price, rating, image, specs } = product;
  
  return (
    <Card>
      <Link to={`/product/${id}`}>
        <ImageContainer>
          {product.condition === "New" && <Badge>New</Badge>}
          <Image src={image} alt={title} />
        </ImageContainer>
      </Link>
      
      <CardContent>
        <Brand>{brand}</Brand>
        <Link to={`/product/${id}`}>
          <Title>{title}</Title>
        </Link>
        
        <StarsContainer>
          {renderStars(rating)}
          <span style={{ marginLeft: '5px', color: '#666', fontSize: '0.8rem' }}>
            ({rating})
          </span>
        </StarsContainer>
        
        <Specs>
          <SpecItem>
            <span>Processor:</span> {specs.processor.brand} {specs.processor.model}
          </SpecItem>
          <SpecItem>
            <span>Memory:</span> {specs.memory.size} {specs.memory.type}
          </SpecItem>
          <SpecItem>
            <span>Storage:</span> {specs.storage.primary.capacity} {specs.storage.primary.type}
          </SpecItem>
          <SpecItem>
            <span>Display:</span> {specs.display.size} {specs.display.type}
          </SpecItem>
        </Specs>
        
        <PriceRow>
          <Price>${price.toFixed(2)}</Price>
          <AddToCartButton>
            <FaShoppingCart /> Add to Cart
          </AddToCartButton>
        </PriceRow>
      </CardContent>
    </Card>
  );
};

export default ProductCard; 