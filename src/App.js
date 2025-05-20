import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './components/styles/GlobalStyle';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import PricePredictorPage from './pages/PricePredictorPage';
import ReviewsPage from './pages/ReviewsPage';

const theme = {
  colors: {
    primary: '#0066c0',
    secondary: '#232f3e',
    accent: '#ff9900',
    background: '#f5f5f5',
    light: '#ffffff',
    dark: '#333333',
    gray: '#e1e1e1',
    success: '#28a745',
    warning: '#ffc107',
    danger: '#dc3545'
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '992px',
    wide: '1200px'
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/price-predictor" element={<PricePredictorPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
