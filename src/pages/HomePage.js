import React, { useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import laptops from '../data/laptopData';
import { FaLaptop, FaGamepad, FaBriefcase, FaFilter, FaSortAmountDown } from 'react-icons/fa';

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

const ProductsSection = styled.div`
  margin: 3rem 0;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  color: ${({ theme }) => theme.colors.dark};
  border: none;
  border-radius: 4px;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    background-color: #e5e5e5;
  }
`;

const SortSelect = styled.select`
  padding: 0.6rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: white;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  
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
            <HeroTitle>Find Your Perfect Laptop</HeroTitle>
            <HeroSubtitle>
              Compare specs and prices across thousands of models to find the right laptop for your needs.
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
                <CategoryTitle>Gaming Laptops</CategoryTitle>
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
                <CategoryTitle>Business Laptops</CategoryTitle>
                <CategoryDescription>
                  Reliable, secure laptops with long battery life and professional features.
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
        
        <ProductsSection>
          <SectionTitle>Featured Laptops</SectionTitle>
          
          <FilterSection>
            <FilterButton>
              <FaFilter /> Filter
            </FilterButton>
            
            <div>
              <FaSortAmountDown style={{ marginRight: '5px' }} />
              <SortSelect 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </SortSelect>
            </div>
          </FilterSection>
          
          <ProductGrid>
            {laptops.map(laptop => (
              <ProductCard key={laptop.id} product={laptop} />
            ))}
          </ProductGrid>
        </ProductsSection>
      </div>
    </div>
  );
};

export default HomePage; 