// Mock Amazon API service (since we can't use the real Amazon API without credentials)
// This simulates searching for laptops on Amazon

// Generates a random price within a range
const getRandomPrice = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(2);
};

// Generates a random rating between 3.5 and 5.0
const getRandomRating = () => {
  return (Math.random() * 1.5 + 3.5).toFixed(1);
};

// Generates a random number of reviews between 100 and 5000
const getRandomReviews = () => {
  return Math.floor(Math.random() * 4900 + 100);
};

// Predetermined laptop images by brand - using reliable URLs
const laptopImages = {
  'Lenovo': [
    'https://www.notebookcheck.net/uploads/tx_nbc2/LenovoYogaSlim7_14IAH7__1_.jpg',
    'https://www.notebookcheck.net/uploads/tx_nbc2/LenovoThinkPadX1Titanium-1.jpg',
    'https://www.notebookcheck.net/uploads/tx_nbc2/LenovoIdeaPadPro5-15_3.jpg'
  ],
  'ASUS': [
    'https://www.notebookcheck.net/uploads/tx_nbc2/ZenBook_14_OLED__UX3402_.JPG',
    'https://www.notebookcheck.net/uploads/tx_nbc2/ROG_Strix_G17__3_.JPG',
    'https://www.notebookcheck.net/uploads/tx_nbc2/VivoBook_S15__1_.JPG'
  ],
  'HP': [
    'https://www.notebookcheck.net/uploads/tx_nbc2/HPEliteBook840G9-1.jpg',
    'https://www.notebookcheck.net/uploads/tx_nbc2/HPEnvyx36015-1.jpg',
    'https://www.notebookcheck.net/uploads/tx_nbc2/HPPavilion15-1.jpg'
  ],
  'Dell': [
    'https://www.notebookcheck.net/uploads/tx_nbc2/xps13_9320__2_.jpg',
    'https://www.notebookcheck.net/uploads/tx_nbc2/alienware_x14_R1__3_.JPG',
    'https://www.notebookcheck.net/uploads/tx_nbc2/OptiPlex_7400_AIO__2_.JPG'
  ],
  'Acer': [
    'https://www.notebookcheck.net/uploads/tx_nbc2/AcerAspire5-1.jpg',
    'https://www.notebookcheck.net/uploads/tx_nbc2/Swift_Go_14__3_.JPG',
    'https://www.notebookcheck.net/uploads/tx_nbc2/AcerNitro5-1.jpg'
  ],
  'MSI': [
    'https://www.notebookcheck.net/uploads/tx_nbc2/MSI_GE76_Raider__1_.jpg',
    'https://www.notebookcheck.net/uploads/tx_nbc2/MSI_Creator_Z16_HX_Studio__3_.JPG',
    'https://www.notebookcheck.net/uploads/tx_nbc2/GL66__1__01.jpg'
  ],
  'Apple': [
    'https://www.notebookcheck.net/uploads/tx_nbc2/AIR_M1__2_.jpg',
    'https://www.notebookcheck.net/uploads/tx_nbc2/mbp14-1.jpg',
    'https://www.notebookcheck.net/uploads/tx_nbc2/MBP16_M1__1_.JPG'
  ],
  'Microsoft': [
    'https://www.notebookcheck.net/uploads/tx_nbc2/Surface_Pro_9__2_.JPG',
    'https://www.notebookcheck.net/uploads/tx_nbc2/Microsoft_Surface_Laptop_5_15__3_.JPG',
    'https://www.notebookcheck.net/uploads/tx_nbc2/SurfaceStudio-1.jpg'
  ],
  'Vibox': [
    'https://i.pcmag.com/imagery/roundups/01l2xXJgHCrGMlIbHy4D4Wq-21.fit_lim.size_768x432.jpg',
    'https://i.pcmag.com/imagery/roundups/01l2xXJgHCrGMlIbHy4D4Wq-26.fit_lim.size_768x432.jpg',
    'https://i.pcmag.com/imagery/roundups/01l2xXJgHCrGMlIbHy4D4Wq-28.fit_lim.size_768x432.jpg'
  ],
  'Default': [
    'https://i.pcmag.com/imagery/reviews/07GmIupznWhAzDQ3Z7li93X-1.fit_lim.size_1200x630.jpg',
    'https://i.pcmag.com/imagery/reviews/05CHR8RpPXnQNcXbT8WHXb3-14.fit_lim.size_1050x591.jpg',
    'https://i.pcmag.com/imagery/reviews/04lz03p8hFxaDJobcNu3dUX-11.fit_lim.size_1050x591.jpg'
  ]
};

// Alternative image sources for each brand (using publicly available images)
const alternativeImages = {
  'Lenovo': 'https://upload.wikimedia.org/wikipedia/commons/1/13/Lenovo_Yoga_3_Pro.png',
  'ASUS': 'https://dlcdnwebimgs.asus.com/gain/143a6c17-e7b4-4cc3-882f-8adbb4eee4bd/',
  'HP': 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c07974642.png',
  'Dell': 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/black/notebook-xps-15-9530-t-black-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&wid=4000&hei=2819&qlt=100',
  'Acer': 'https://static.acer.com/up/Resource/Acer/Laptops/Swift_3/Image/20220525/Acer-Swift-3-SF314-512-FpBl-Backlit-Wallpaper_modelizeIT.png',
  'MSI': 'https://asset.msi.com/resize/image/global/product/product_1650592433af762ab0e927d5d95e3ca86e03cebe60.png',
  'Apple': 'https://www.apple.com/v/macbook-pro-14-and-16/e/images/overview/hero/hero_intro_endframe__e0t4wzd68oeq_large.jpg',
  'Microsoft': 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4LsNS?ver=ffb9',
  'Vibox': 'https://www.vibox.com/website/css/images/products/element-range.png',
  'Default': 'https://img.freepik.com/free-vector/realistic-laptop-mockup-advertisement_52683-30720.jpg'
};

// Get a laptop image with fallback
const getLaptopImage = (brand) => {
  try {
    const brandImages = laptopImages[brand] || laptopImages['Default'];
    // Use a random image from the brand's collection
    return brandImages[Math.floor(Math.random() * brandImages.length)];
  } catch (error) {
    // If Amazon images fail, use the alternative source
    return alternativeImages[brand] || alternativeImages['Default'];
  }
};

// Maps brands to typical model categories and price ranges
const brandModelPriceMap = {
  'Lenovo': {
    models: ['Yoga', 'ThinkPad', 'IdeaPad', 'Legion', 'Flex'],
    priceRange: [800, 2200]
  },
  'ASUS': {
    models: ['ZenBook', 'VivoBook', 'TUF', 'ROG', 'ProArt', 'ExpertBook'],
    priceRange: [700, 2500]
  },
  'HP': {
    models: ['Pavilion', 'Spectre', 'Envy', 'Omen', 'EliteBook'],
    priceRange: [600, 2000]
  },
  'Dell': {
    models: ['XPS', 'Inspiron', 'Latitude', 'G Series', 'Precision'],
    priceRange: [700, 2500]
  },
  'Acer': {
    models: ['Aspire', 'Swift', 'Predator', 'Nitro', 'ConceptD'],
    priceRange: [500, 1800]
  },
  'MSI': {
    models: ['GF Series', 'GL Series', 'GP Series', 'GS Series', 'Prestige'],
    priceRange: [900, 2800]
  },
  'Apple': {
    models: ['MacBook Air', 'MacBook Pro', 'iMac', 'Mac Mini', 'Mac Studio'],
    priceRange: [999, 3500]
  },
  'Microsoft': {
    models: ['Surface Laptop', 'Surface Pro', 'Surface Book', 'Surface Studio'],
    priceRange: [900, 2500]
  },
  'Vibox': {
    models: ['Gaming PC', 'Element', 'Submission', 'Warrior'],
    priceRange: [800, 2000]
  }
};

// Amazon Prime badge probability
const hasPrime = () => Math.random() > 0.2;

// Simulates fetching search results from Amazon
export const searchAmazon = async (query) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Extract key terms from the query
  const terms = query.toLowerCase().split(' ');
  
  // Find the brand in the query
  const brands = Object.keys(brandModelPriceMap);
  const foundBrand = brands.find(brand => 
    terms.includes(brand.toLowerCase())
  ) || 'Default';
  
  // Find model information
  let brandInfo = brandModelPriceMap[foundBrand] || {
    models: ['Laptop', 'Notebook', 'Computer'],
    priceRange: [500, 1500]
  };
  
  // Try to find a model term in the query
  let foundModel = '';
  for (const model of brandInfo.models) {
    if (query.toLowerCase().includes(model.toLowerCase())) {
      foundModel = model;
      break;
    }
  }
  
  // If no model found, pick a random one
  if (!foundModel) {
    foundModel = brandInfo.models[Math.floor(Math.random() * brandInfo.models.length)];
  }
  
  // Generate additional terms based on the query
  const additionalTerms = [];
  if (terms.includes('gaming')) additionalTerms.push('Gaming');
  if (terms.some(term => term.includes('2-in-1') || term.includes('convertible'))) {
    additionalTerms.push('2-in-1 Convertible');
  }
  if (terms.some(term => term.includes('pro') || term.includes('professional'))) {
    additionalTerms.push('Professional');
  }
  
  // Generate 3-6 results
  const numResults = Math.floor(Math.random() * 4) + 3;
  const results = [];
  
  // Base price derived from brand info
  const [minPrice, maxPrice] = brandInfo.priceRange;
  
  for (let i = 0; i < numResults; i++) {
    // Amazon specific - Prime, Seller, etc.
    const isPrime = hasPrime();
    const seller = Math.random() > 0.7 ? 
      ['TechDeals', 'LaptopOutlet', 'ComputerWarehouse', 'DigitalSolutions'][Math.floor(Math.random() * 4)] : 
      'Amazon.com';
    
    // Create a delivery estimate
    const deliveryDays = Math.floor(Math.random() * 4) + 1;
    
    // Create variations for tech specs
    const cpuVariations = ['i5', 'i7', 'i9', 'Ryzen 5', 'Ryzen 7', 'Ryzen 9', 'M1', 'M2'];
    const ramVariations = ['8GB', '16GB', '32GB', '64GB'];
    const storageVariations = ['256GB SSD', '512GB SSD', '1TB SSD', '2TB SSD'];
    const gpuVariations = ['Intel Iris', 'RTX 3050', 'RTX 3060', 'RTX 3070', 'RTX 4060', 'AMD Radeon'];
    
    // Randomly select specs
    const cpu = cpuVariations[Math.floor(Math.random() * cpuVariations.length)];
    const ram = ramVariations[Math.floor(Math.random() * ramVariations.length)];
    const storage = storageVariations[Math.floor(Math.random() * storageVariations.length)];
    const gpu = gpuVariations[Math.floor(Math.random() * gpuVariations.length)];
    
    // Adjust price based on specs
    let basePrice = minPrice + Math.random() * (maxPrice - minPrice);
    if (cpu.includes('i7') || cpu.includes('Ryzen 7')) basePrice += 200;
    if (cpu.includes('i9') || cpu.includes('Ryzen 9')) basePrice += 400;
    if (ram === '32GB') basePrice += 150;
    if (ram === '64GB') basePrice += 300;
    if (storage.includes('1TB')) basePrice += 100;
    if (storage.includes('2TB')) basePrice += 300;
    if (gpu.includes('RTX')) basePrice += 300;
    
    // Amazon-specific price formatting
    const price = basePrice;
    const originalPrice = Math.random() > 0.6 ? basePrice * 1.15 : null;
    
    // Create title variations - Amazon typically has more descriptive titles
    const titleVariations = [
      `${foundBrand} ${foundModel} ${cpu} ${ram} ${storage} ${gpu} Laptop ${additionalTerms.join(' ')} (Latest Model)`,
      `${foundBrand} ${foundModel} ${additionalTerms.join(' ')} Laptop Computer - ${cpu}, ${ram}, ${storage}, ${gpu}, Windows 11`,
      `${foundBrand} ${foundModel} Premium Laptop ${ram} ${storage} ${cpu} with ${gpu} Graphics, ${Math.floor(Math.random() * 5) + 13}" Display`,
      `${foundBrand} ${foundModel} ${additionalTerms.join(' ')} ${ram} ${cpu} - Latest Model with ${storage} and ${gpu}`,
    ];
    
    results.push({
      id: `amazon-${Date.now()}-${i}`,
      title: titleVariations[i % titleVariations.length],
      price: getRandomPrice(price, price * 1.05),
      originalPrice: originalPrice ? getRandomPrice(originalPrice, originalPrice * 1.05) : null,
      prime: isPrime,
      seller,
      delivery: `Delivery: ${isPrime ? 'Free & Fast' : '$9.99'} (${deliveryDays} business day${deliveryDays > 1 ? 's' : ''})`,
      rating: getRandomRating(),
      reviews: getRandomReviews(),
      inStock: Math.random() > 0.1,
      image: getLaptopImage(foundBrand)
    });
  }
  
  return {
    searchTerms: query,
    resultsCount: results.length,
    results
  };
}; 