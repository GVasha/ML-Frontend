const laptops = [
  {
    id: 1,
    title: "Dell XPS 15",
    brand: "Dell",
    price: 1899.99,
    rating: 4.7,
    image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9520/media-gallery/black/laptop-xps-15-9520-t-black-gallery-4.psd?fmt=png-alpha&pscan=auto&scl=1&wid=4000&hei=2800&qlt=100,0&resMode=sharp2&size=4000,2800",
    specs: {
      processor: {
        brand: "Intel",
        model: "Core i7-12700H",
        cores: 14,
        baseClockSpeed: "2.3 GHz",
        turboBoostSpeed: "4.7 GHz",
        cache: "24 MB"
      },
      memory: {
        type: "DDR5",
        size: "32 GB",
        speed: "4800 MHz",
        slots: 2,
        expandableTo: "64 GB"
      },
      storage: {
        primary: {
          type: "SSD",
          interface: "NVMe PCIe",
          capacity: "1 TB"
        }
      },
      graphics: {
        brand: "NVIDIA",
        model: "GeForce RTX 3050 Ti",
        memory: "4 GB GDDR6"
      },
      display: {
        size: "15.6 inches",
        resolution: "3840 x 2400",
        type: "OLED",
        refreshRate: "60 Hz",
        brightness: "400 nits",
        touchscreen: true
      },
      ports: [
        "2 x Thunderbolt 4",
        "1 x USB-C 3.2",
        "1 x SD card reader",
        "1 x 3.5mm audio jack"
      ],
      battery: {
        capacity: "86 Wh",
        batteryLife: "Up to 13 hours",
        fastCharging: true
      },
      dimensions: {
        height: "0.71 inches",
        width: "13.57 inches",
        depth: "9.06 inches",
        weight: "4.22 lbs"
      },
      operatingSystem: "Windows 11 Home",
      connectivity: {
        wifi: "Wi-Fi 6 (802.11ax)",
        bluetooth: "Bluetooth 5.2"
      },
      camera: "720p HD with IR for Windows Hello",
      audio: "Quad speakers with Waves MaxxAudio Pro",
      backlit: true,
      fingerprint: true,
      color: "Platinum Silver"
    },
    condition: "New",
    warranty: "1 Year Premium Support",
    shipping: "Free",
    sellerRating: 4.9,
    description: "The Dell XPS 15 combines stunning design with powerful performance, featuring a gorgeous 4K OLED display and the latest Intel Core i7 processor. Perfect for creative professionals and power users."
  },
  {
    id: 2,
    title: "MacBook Pro 16",
    brand: "Apple",
    price: 2499.99,
    rating: 4.8,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-select-202110?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1632788574000",
    specs: {
      processor: {
        brand: "Apple",
        model: "M1 Pro",
        cores: 10,
        baseClockSpeed: "3.2 GHz",
        turboBoostSpeed: "N/A",
        cache: "N/A"
      },
      memory: {
        type: "Unified Memory",
        size: "32 GB",
        speed: "N/A",
        slots: 0,
        expandableTo: "N/A"
      },
      storage: {
        primary: {
          type: "SSD",
          interface: "Custom Apple",
          capacity: "1 TB"
        }
      },
      graphics: {
        brand: "Apple",
        model: "16-core GPU",
        memory: "Shared with system memory"
      },
      display: {
        size: "16.2 inches",
        resolution: "3456 x 2234",
        type: "Liquid Retina XDR",
        refreshRate: "120 Hz ProMotion",
        brightness: "1600 nits peak",
        touchscreen: false
      },
      ports: [
        "3 x Thunderbolt 4",
        "1 x HDMI",
        "1 x SDXC card slot",
        "1 x MagSafe 3",
        "1 x 3.5mm audio jack"
      ],
      battery: {
        capacity: "100 Wh",
        batteryLife: "Up to 21 hours",
        fastCharging: true
      },
      dimensions: {
        height: "0.66 inches",
        width: "14.01 inches",
        depth: "9.77 inches",
        weight: "4.7 lbs"
      },
      operatingSystem: "macOS Monterey",
      connectivity: {
        wifi: "Wi-Fi 6 (802.11ax)",
        bluetooth: "Bluetooth 5.0"
      },
      camera: "1080p FaceTime HD camera",
      audio: "Six-speaker sound system with force-cancelling woofers",
      backlit: true,
      fingerprint: false,
      color: "Space Gray"
    },
    condition: "New",
    warranty: "1 Year AppleCare",
    shipping: "Free",
    sellerRating: 4.9,
    description: "The MacBook Pro 16-inch with the powerful M1 Pro chip delivers groundbreaking performance and amazing battery life. With a stunning Liquid Retina XDR display and a robust set of ports, it's the ultimate tool for professionals."
  },
  {
    id: 3,
    title: "Lenovo ThinkPad X1 Carbon",
    brand: "Lenovo",
    price: 1599.99,
    rating: 4.6,
    image: "https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MjM1NTI0fGltYWdlL3BuZ3xoNDcvaDgwLzEyNzEzNjU1MjQwNzM0LnBuZ3wwMGVlY2JkNDcyY2JhNzQ2MzZiM2Y0YWY3M2JmZjgxYjBhOGI1ZTBjNTYzNmY5MGU5OTVjOTMxMDhiNTc4NDli/lenovo-laptop-thinkpad-x1-carbon-gen9-subseries-hero.png",
    specs: {
      processor: {
        brand: "Intel",
        model: "Core i7-1165G7",
        cores: 4,
        baseClockSpeed: "2.8 GHz",
        turboBoostSpeed: "4.7 GHz",
        cache: "12 MB"
      },
      memory: {
        type: "LPDDR4X",
        size: "16 GB",
        speed: "4266 MHz",
        slots: 0,
        expandableTo: "16 GB"
      },
      storage: {
        primary: {
          type: "SSD",
          interface: "NVMe PCIe",
          capacity: "512 GB"
        }
      },
      graphics: {
        brand: "Intel",
        model: "Iris Xe Graphics",
        memory: "Shared"
      },
      display: {
        size: "14 inches",
        resolution: "1920 x 1200",
        type: "IPS",
        refreshRate: "60 Hz",
        brightness: "400 nits",
        touchscreen: false
      },
      ports: [
        "2 x Thunderbolt 4",
        "2 x USB-A 3.2",
        "1 x HDMI 2.0",
        "1 x 3.5mm audio jack"
      ],
      battery: {
        capacity: "57 Wh",
        batteryLife: "Up to 16 hours",
        fastCharging: true
      },
      dimensions: {
        height: "0.59 inches",
        width: "12.38 inches",
        depth: "8.72 inches",
        weight: "2.49 lbs"
      },
      operatingSystem: "Windows 11 Pro",
      connectivity: {
        wifi: "Wi-Fi 6 (802.11ax)",
        bluetooth: "Bluetooth 5.2"
      },
      camera: "720p HD with ThinkShutter privacy cover",
      audio: "Dolby Atmos speaker system",
      backlit: true,
      fingerprint: true,
      color: "Black"
    },
    condition: "New",
    warranty: "3 Year Lenovo Premier Support",
    shipping: "Free",
    sellerRating: 4.7,
    description: "The ThinkPad X1 Carbon is a premium business laptop that combines lightweight portability with durability and performance. With military-grade testing and enterprise-level security features, it's built for professionals on the go."
  },
  {
    id: 4,
    title: "ASUS ROG Zephyrus G15",
    brand: "ASUS",
    price: 1799.99,
    rating: 4.7,
    image: "https://dlcdnwebimgs.asus.com/gain/f8c56350-8c32-422a-8ed5-1651be8483ad/",
    specs: {
      processor: {
        brand: "AMD",
        model: "Ryzen 9 5900HS",
        cores: 8,
        baseClockSpeed: "3.0 GHz",
        turboBoostSpeed: "4.6 GHz",
        cache: "16 MB"
      },
      memory: {
        type: "DDR4",
        size: "16 GB",
        speed: "3200 MHz",
        slots: 1,
        expandableTo: "40 GB"
      },
      storage: {
        primary: {
          type: "SSD",
          interface: "NVMe PCIe",
          capacity: "1 TB"
        }
      },
      graphics: {
        brand: "NVIDIA",
        model: "GeForce RTX 3070",
        memory: "8 GB GDDR6"
      },
      display: {
        size: "15.6 inches",
        resolution: "2560 x 1440",
        type: "IPS",
        refreshRate: "165 Hz",
        brightness: "350 nits",
        touchscreen: false
      },
      ports: [
        "1 x USB-C 3.2 Gen 2 with DisplayPort and Power Delivery",
        "1 x USB 3.2 Gen 2 Type-C",
        "2 x USB 3.2 Gen 1 Type-A",
        "1 x HDMI 2.0b",
        "1 x 3.5mm audio jack",
        "1 x microSD card reader"
      ],
      battery: {
        capacity: "90 Wh",
        batteryLife: "Up to 8 hours",
        fastCharging: true
      },
      dimensions: {
        height: "0.78 inches",
        width: "13.97 inches",
        depth: "9.59 inches",
        weight: "4.19 lbs"
      },
      operatingSystem: "Windows 10 Home",
      connectivity: {
        wifi: "Wi-Fi 6 (802.11ax)",
        bluetooth: "Bluetooth 5.1"
      },
      camera: "None (external webcam recommended)",
      audio: "6-speaker system with Smart Amp Technology",
      backlit: true,
      fingerprint: true,
      color: "Moonlight White"
    },
    condition: "New",
    warranty: "1 Year ASUS Global Warranty",
    shipping: "Free",
    sellerRating: 4.6,
    description: "The ASUS ROG Zephyrus G15 is a powerful gaming laptop with a sleek design. It features a stunning QHD display with 165Hz refresh rate and top-tier components for an exceptional gaming experience without compromising on portability."
  },
  {
    id: 5,
    title: "HP Spectre x360 14",
    brand: "HP",
    price: 1499.99,
    rating: 4.5,
    image: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c07971618.png",
    specs: {
      processor: {
        brand: "Intel",
        model: "Core i7-1165G7",
        cores: 4,
        baseClockSpeed: "2.8 GHz",
        turboBoostSpeed: "4.7 GHz",
        cache: "12 MB"
      },
      memory: {
        type: "LPDDR4X",
        size: "16 GB",
        speed: "4266 MHz",
        slots: 0,
        expandableTo: "16 GB"
      },
      storage: {
        primary: {
          type: "SSD",
          interface: "NVMe PCIe",
          capacity: "1 TB"
        }
      },
      graphics: {
        brand: "Intel",
        model: "Iris Xe Graphics",
        memory: "Shared"
      },
      display: {
        size: "13.5 inches",
        resolution: "3000 x 2000",
        type: "OLED",
        refreshRate: "60 Hz",
        brightness: "400 nits",
        touchscreen: true
      },
      ports: [
        "2 x Thunderbolt 4",
        "1 x USB-A 3.2",
        "1 x 3.5mm audio jack",
        "1 x microSD card reader"
      ],
      battery: {
        capacity: "66 Wh",
        batteryLife: "Up to 15 hours",
        fastCharging: true
      },
      dimensions: {
        height: "0.67 inches",
        width: "11.75 inches",
        depth: "8.67 inches",
        weight: "2.95 lbs"
      },
      operatingSystem: "Windows 11 Home",
      connectivity: {
        wifi: "Wi-Fi 6 (802.11ax)",
        bluetooth: "Bluetooth 5.0"
      },
      camera: "720p HD with IR for Windows Hello",
      audio: "Bang & Olufsen quad speakers",
      backlit: true,
      fingerprint: true,
      color: "Nightfall Black"
    },
    condition: "New",
    warranty: "1 Year HP Warranty",
    shipping: "Free",
    sellerRating: 4.5,
    description: "The HP Spectre x360 14 is a premium 2-in-1 convertible laptop featuring a stunning 3:2 OLED display and versatile 360-degree hinge design. Perfect for creative professionals who need both performance and flexibility."
  },
  {
    id: 6,
    title: "Razer Blade 15 Advanced",
    brand: "Razer",
    price: 2299.99,
    rating: 4.6,
    image: "https://assets3.razerzone.com/3JJxCsf2th7K_-UzHvgWAFhe_5I=/1500x1000/https%3A%2F%2Fhybrismediaprod.blob.core.windows.net%2Fsys-master-phoenix-images-container%2Fh78%2Fh18%2F9250062155806%2Fblade15-fhd-1500x1000-1.jpg",
    specs: {
      processor: {
        brand: "Intel",
        model: "Core i9-12900H",
        cores: 14,
        baseClockSpeed: "2.5 GHz",
        turboBoostSpeed: "5.0 GHz",
        cache: "24 MB"
      },
      memory: {
        type: "DDR5",
        size: "32 GB",
        speed: "4800 MHz",
        slots: 2,
        expandableTo: "64 GB"
      },
      storage: {
        primary: {
          type: "SSD",
          interface: "NVMe PCIe",
          capacity: "1 TB"
        }
      },
      graphics: {
        brand: "NVIDIA",
        model: "GeForce RTX 3080 Ti",
        memory: "16 GB GDDR6"
      },
      display: {
        size: "15.6 inches",
        resolution: "2560 x 1440",
        type: "IPS",
        refreshRate: "240 Hz",
        brightness: "300 nits",
        touchscreen: false
      },
      ports: [
        "2 x Thunderbolt 4",
        "3 x USB-A 3.2",
        "1 x HDMI 2.1",
        "1 x SD card reader",
        "1 x 3.5mm audio jack"
      ],
      battery: {
        capacity: "80 Wh",
        batteryLife: "Up to 6 hours",
        fastCharging: true
      },
      dimensions: {
        height: "0.67 inches",
        width: "13.98 inches",
        depth: "9.25 inches",
        weight: "4.40 lbs"
      },
      operatingSystem: "Windows 11 Home",
      connectivity: {
        wifi: "Wi-Fi 6E (802.11ax)",
        bluetooth: "Bluetooth 5.2"
      },
      camera: "1080p HD",
      audio: "Stereo speakers with THX Spatial Audio",
      backlit: true,
      fingerprint: false,
      color: "Black"
    },
    condition: "New",
    warranty: "1 Year Razer Warranty",
    shipping: "Free",
    sellerRating: 4.7,
    description: "The Razer Blade 15 Advanced is the ultimate gaming laptop, combining powerful performance with a premium, compact design. With the latest RTX graphics and a 240Hz QHD display, it delivers incredible gaming experiences."
  }
];

export default laptops; 