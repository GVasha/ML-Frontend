import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: 3rem 0 1.5rem;
  margin-top: 3rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -0.5rem;
      height: 2px;
      width: 50px;
      background-color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const FooterLink = styled(Link)`
  display: block;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    transform: translateX(5px);
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  svg {
    margin-right: 0.8rem;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const SocialIcons = styled.div`
  display: flex;
  margin-top: 1.5rem;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  margin-right: 0.8rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-3px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div className="container">
        <FooterGrid>
          <FooterSection>
            <h3>About Us</h3>
            <FooterLink to="/about">Our Story</FooterLink>
            <FooterLink to="/careers">Careers</FooterLink>
            <FooterLink to="/news">News & Blog</FooterLink>
            <FooterLink to="/press">Press Center</FooterLink>
            <FooterLink to="/corporate">Corporate Info</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <h3>Customer Service</h3>
            <FooterLink to="/help">Help Center</FooterLink>
            <FooterLink to="/returns">Returns & Replacements</FooterLink>
            <FooterLink to="/shipping">Shipping & Delivery</FooterLink>
            <FooterLink to="/warranty">Warranty Information</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <h3>Popular Categories</h3>
            <FooterLink to="/category/gaming">Gaming Laptops</FooterLink>
            <FooterLink to="/category/business">Business Laptops</FooterLink>
            <FooterLink to="/category/ultrabooks">Ultrabooks</FooterLink>
            <FooterLink to="/category/2-in-1">2-in-1 Laptops</FooterLink>
            <FooterLink to="/category/budget">Budget Laptops</FooterLink>
          </FooterSection>
          
          <FooterSection>
            <h3>Contact Information</h3>
            <ContactItem>
              <FaMapMarkerAlt /> 
              <span>123 Tech Street, San Francisco, CA 94107</span>
            </ContactItem>
            <ContactItem>
              <FaPhone /> 
              <span>+1 (800) 123-4567</span>
            </ContactItem>
            <ContactItem>
              <FaEnvelope /> 
              <span>support@laptopmarketplace.com</span>
            </ContactItem>
            
            <SocialIcons>
              <SocialIcon href="https://facebook.com" target="_blank">
                <FaFacebook />
              </SocialIcon>
              <SocialIcon href="https://twitter.com" target="_blank">
                <FaTwitter />
              </SocialIcon>
              <SocialIcon href="https://instagram.com" target="_blank">
                <FaInstagram />
              </SocialIcon>
              <SocialIcon href="https://youtube.com" target="_blank">
                <FaYoutube />
              </SocialIcon>
            </SocialIcons>
          </FooterSection>
        </FooterGrid>
        
        <Copyright>
          &copy; {new Date().getFullYear()} LaptopMarketplace. All rights reserved.
        </Copyright>
      </div>
    </FooterContainer>
  );
};

export default Footer; 