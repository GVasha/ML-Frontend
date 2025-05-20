// Local storage helper functions for reviews

// Debugging function to check if localStorage is available and working
export const checkLocalStorageAvailability = () => {
  try {
    const testKey = '__test_storage__';
    localStorage.setItem(testKey, testKey);
    const result = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    return result === testKey;
  } catch (e) {
    return false;
  }
};

// Get all reviews from local storage
export const getReviews = () => {
  try {
    if (!checkLocalStorageAvailability()) {
      console.error('localStorage is not available in this browser!');
      return [];
    }
    
    const reviews = localStorage.getItem('laptop-marketplace-reviews');
    return reviews ? JSON.parse(reviews) : [];
  } catch (error) {
    console.error('Error retrieving reviews from local storage:', error);
    return [];
  }
};

// Add a new review to local storage
export const addReview = (review) => {
  try {
    if (!checkLocalStorageAvailability()) {
      console.error('localStorage is not available in this browser!');
      return null;
    }
    
    const reviews = getReviews();
    const newReview = {
      ...review,
      id: Date.now(), // Simple unique ID using timestamp
      date: new Date().toISOString()
    };
    
    const updatedReviews = [newReview, ...reviews];
    localStorage.setItem('laptop-marketplace-reviews', JSON.stringify(updatedReviews));
    console.log('Review successfully added to localStorage', newReview);
    
    // Double check that it was actually saved
    const checkReviews = getReviews();
    console.log('Current reviews in localStorage:', checkReviews);
    
    return newReview;
  } catch (error) {
    console.error('Error saving review to local storage:', error);
    return null;
  }
};

// Delete a review from local storage
export const deleteReview = (reviewId) => {
  try {
    const reviews = getReviews();
    const updatedReviews = reviews.filter(review => review.id !== reviewId);
    localStorage.setItem('laptop-marketplace-reviews', JSON.stringify(updatedReviews));
    return true;
  } catch (error) {
    console.error('Error deleting review from local storage:', error);
    return false;
  }
};

// Edit a review in local storage
export const editReview = (reviewId, updatedData) => {
  try {
    const reviews = getReviews();
    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        return { 
          ...review, 
          ...updatedData,
          lastEdited: new Date().toISOString()
        };
      }
      return review;
    });
    
    localStorage.setItem('laptop-marketplace-reviews', JSON.stringify(updatedReviews));
    return true;
  } catch (error) {
    console.error('Error editing review in local storage:', error);
    return false;
  }
};

// Debug function to manually log localStorage contents
export const debugLocalStorage = () => {
  try {
    if (!checkLocalStorageAvailability()) {
      return { error: 'localStorage is not available in this browser' };
    }
    
    const storageItems = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      storageItems[key] = value;
    }
    return storageItems;
  } catch (error) {
    return { error: error.message };
  }
}; 