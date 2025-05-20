import React, { useState } from 'react';
import styled from 'styled-components';
import ClusterLaptops from '../components/ClusterLaptops';
import { FaLaptop, FaGamepad, FaBriefcase } from 'react-icons/fa';

const Hero = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.secondary} 0%, ${({ theme }) => theme.colors.primary} 100%);
  color: white;
  padding: 4rem 0;
  margin-bottom: 2rem;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const SearchForm = styled.form`
  display: flex;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px 0 0 4px;
`;

const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  padding: 0 1.5rem;
  font-weight: 600;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #e08000;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.5rem;
    height: 3px;
    width: 60px;
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

const CategorySection = styled.div`
  margin: 3rem 0;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const CategoryContent = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const CategoryIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const CategoryTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const CategoryDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };
  
  return (
    <div>
      <Hero>
        <div className="container">
          <HeroContent>
            <HeroTitle>Find Your Perfect Computer</HeroTitle>
            <HeroSubtitle>
              Compare specs and prices across thousands of models to find the right laptop or desktop for your needs.
            </HeroSubtitle>
            <SearchForm onSubmit={handleSearch}>
              <SearchInput 
                type="text" 
                placeholder="Search by brand, model, specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchButton type="submit">Search</SearchButton>
            </SearchForm>
          </HeroContent>
        </div>
      </Hero>
      
      <div className="container">
        <CategorySection>
          <SectionTitle>Shop By Category</SectionTitle>
          <CategoryGrid>
            <CategoryCard>
              <CategoryContent>
                <CategoryIcon>
                  <FaGamepad />
                </CategoryIcon>
                <CategoryTitle>Gaming Computers</CategoryTitle>
                <CategoryDescription>
                  High-performance machines with dedicated graphics cards for the ultimate gaming experience.
                </CategoryDescription>
              </CategoryContent>
            </CategoryCard>
            
            <CategoryCard>
              <CategoryContent>
                <CategoryIcon>
                  <FaBriefcase />
                </CategoryIcon>
                <CategoryTitle>Business Computers</CategoryTitle>
                <CategoryDescription>
                  Reliable, secure laptops and desktops with professional features for productivity.
                </CategoryDescription>
              </CategoryContent>
            </CategoryCard>
            
            <CategoryCard>
              <CategoryContent>
                <CategoryIcon>
                  <FaLaptop />
                </CategoryIcon>
                <CategoryTitle>Ultrabooks</CategoryTitle>
                <CategoryDescription>
                  Slim, lightweight laptops with premium design and impressive battery life.
                </CategoryDescription>
              </CategoryContent>
            </CategoryCard>
          </CategoryGrid>
        </CategorySection>
        
        <ClusterLaptops />
      </div>
    </div>
  );
};

export default HomePage; 