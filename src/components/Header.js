import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaCalculator, FaStar } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  
  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const SearchBar = styled.div`
  flex-grow: 1;
  max-width: 600px;
  margin: 0 2rem;
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 0 1rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.6rem 1rem;
  padding-right: 2.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  color: ${({ theme }) => theme.colors.dark};
  font-size: 1.1rem;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }
`;

const NavItem = styled(Link)`
  margin-left: 1.5rem;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  svg {
    font-size: 1.2rem;
    margin-bottom: 0.2rem;
  }
`;

const CartIndicator = styled.span`
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -5px;
  right: -8px;
`;

const CartIcon = styled.div`
  position: relative;
`;

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <HeaderContainer>
      <div className="container">
        <Nav>
          <Logo to="/">
            Laptop<span>Marketplace</span>
          </Logo>
          
          <SearchBar>
            <form onSubmit={handleSearch}>
              <SearchInput 
                type="text" 
                placeholder="Search for laptops..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchButton type="submit">
                <FaSearch />
              </SearchButton>
            </form>
          </SearchBar>
          
          <NavLinks>
            <NavItem to="/price-predictor">
              <FaCalculator />
              Price Predictor
            </NavItem>
            <NavItem to="/reviews">
              <FaStar />
              Reviews
            </NavItem>
            <NavItem to="/category/gaming">Gaming</NavItem>
            <NavItem to="/category/business">Business</NavItem>
            <NavItem to="/account">
              <FaUser />
              Account
            </NavItem>
            <NavItem to="/cart">
              <CartIcon>
                <FaShoppingCart />
                <CartIndicator>3</CartIndicator>
              </CartIcon>
              Cart
            </NavItem>
          </NavLinks>
          
          <MobileMenu>
            <FaBars size={24} />
          </MobileMenu>
        </Nav>
      </div>
    </HeaderContainer>
  );
};

export default Header; 