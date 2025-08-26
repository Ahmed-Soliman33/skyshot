// Gallery Items Data for Skyshot.sa
// This file contains all gallery items with bilingual support
// Easy to modify for API integration later

export const galleryItems = [
  {
    id: 1,
    type: 'image',
    title: {
      en: "Aerial View of Riyadh",
      ar: "منظر جوي للرياض"
    },
    description: {
      en: "Professional aerial shot of Riyadh showcasing modern architecture and urban development from a breathtaking perspective",
      ar: "صورة جوية احترافية لمدينة الرياض تُظهر جمال العمارة الحديثة والتطوير العمراني من منظور خلاب"
    },
    category: {
      en: "Cities",
      ar: "مدن"
    },
    location: {
      en: "Riyadh",
      ar: "الرياض"
    },
    src: "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765103/8_mgq1om.jpg",
    thumbnail: "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765103/8_mgq1om.jpg",
    resolution: "4K",
    price: 299,
    currency: "SAR",
    datePublished: "2024-01-15",
    tags: ["riyadh", "city", "architecture", "urban"],
    featured: true,
    premium: false,
    aspectRatio: "4/3"
  },
  {
    id: 2,
    type: 'video',
    title: {
      en: "Eastern Coast Aerial Video",
      ar: "فيديو جوي للساحل الشرقي"
    },
    description: {
      en: "Stunning aerial video of Saudi Arabia's Eastern Coast showcasing pristine beaches and crystal-clear waters",
      ar: "فيديو جوي مذهل للساحل الشرقي للمملكة العربية السعودية يُظهر الشواطئ البكر والمياه الصافية"
    },
    category: {
      en: "Nature",
      ar: "طبيعة"
    },
    location: {
      en: "Eastern Province",
      ar: "المنطقة الشرقية"
    },
    src: "https://res.cloudinary.com/dqlvs4ae5/video/upload/v1753766837/invideo-ai_zo6asy.mp4",
    thumbnail: "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765101/15_phjt9q.jpg",
    resolution: "4K",
    price: 499,
    currency: "SAR",
    datePublished: "2024-01-20",
    tags: ["coast", "nature", "beach", "eastern"],
    featured: true,
    premium: true,
    aspectRatio: "16/9"
  },
  {
    id: 3,
    type: 'image',
    title: {
      en: "Empty Quarter Desert",
      ar: "صحراء الربع الخالي"
    },
    description: {
      en: "Breathtaking aerial shot of the Empty Quarter desert showcasing endless golden dunes",
      ar: "لقطة جوية خلابة لصحراء الربع الخالي تُظهر الكثبان الذهبية اللامتناهية"
    },
    category: {
      en: "Desert",
      ar: "صحراء"
    },
    location: {
      en: "Empty Quarter",
      ar: "الربع الخالي"
    },
    src: "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765052/12_egzftz.webp",
    thumbnail: "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765052/12_egzftz.webp",
    resolution: "4K",
    price: 399,
    currency: "SAR",
    datePublished: "2024-01-10",
    tags: ["desert", "dunes", "nature", "landscape"],
    featured: false,
    premium: false
  },
  {
    id: 4,
    type: 'video',
    title: {
      en: "Historic Jeddah from Above",
      ar: "جدة التاريخية من الأعلى"
    },
    description: {
      en: "Aerial tour of Historic Jeddah showcasing ancient heritage and traditional architecture",
      ar: "جولة جوية في جدة التاريخية تُظهر التراث العريق والعمارة التقليدية"
    },
    category: {
      en: "Heritage",
      ar: "تراث"
    },
    location: {
      en: "Jeddah",
      ar: "جدة"
    },
    src: "https://res.cloudinary.com/dqlvs4ae5/video/upload/v1753766837/invideo-ai_zo6asy.mp4",
    thumbnail: "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765055/11_cc5i96.jpg",
    resolution: "4K",
    price: 599,
    currency: "SAR",
    datePublished: "2024-01-25",
    tags: ["jeddah", "heritage", "history", "architecture"],
    featured: true,
    premium: true
  },
  {
    id: 5,
    type: 'image',
    title: {
      en: "Green Mountains of Asir",
      ar: "جبال عسير الخضراء"
    },
    description: {
      en: "Stunning aerial views of Asir's green mountains showcasing natural beauty and lush landscapes",
      ar: "مناظر جوية خلابة لجبال عسير الخضراء تُظهر الجمال الطبيعي والمناظر الطبيعية الخصبة"
    },
    category: {
      en: "Mountains",
      ar: "جبال"
    },
    location: {
      en: "Asir",
      ar: "عسير"
    },
    src: "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765034/32_hdfhpo.jpg",
    thumbnail: "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765034/32_hdfhpo.jpg",
    resolution: "4K",
    price: 349,
    currency: "SAR",
    datePublished: "2024-02-01",
    tags: ["asir", "mountains", "green", "nature"],
    featured: false,
    premium: false
  },
  {
    id: 6,
    type: 'video',
    title: {
      en: "NEOM from the Sky",
      ar: "نيوم من السماء"
    },
    description: {
      en: "Exclusive aerial footage of the futuristic NEOM project showcasing innovation and development",
      ar: "لقطات جوية حصرية لمشروع نيوم المستقبلي تُظهر الابتكار والتطوير"
    },
    category: {
      en: "Future",
      ar: "مستقبل"
    },
    location: {
      en: "NEOM",
      ar: "نيوم"
    },
    src: "https://res.cloudinary.com/dqlvs4ae5/video/upload/v1753766837/invideo-ai_zo6asy.mp4",
    thumbnail: "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753764979/event-coverage_azwaxv.jpg",
    resolution: "4K",
    price: 799,
    currency: "SAR",
    datePublished: "2024-02-05",
    tags: ["neom", "future", "development", "innovation"],
    featured: true,
    premium: true
  },
  {
    id: 7,
    type: 'image',
    title: {
      en: "Al-Ula Rock Formations",
      ar: "تكوينات العلا الصخرية"
    },
    description: {
      en: "Magnificent aerial view of Al-Ula's ancient rock formations and archaeological wonders",
      ar: "منظر جوي رائع لتكوينات العلا الصخرية القديمة والعجائب الأثرية"
    },
    category: {
      en: "Heritage",
      ar: "تراث"
    },
    location: {
      en: "Al-Ula",
      ar: "العلا"
    },
    src: "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765103/8_mgq1om.jpg",
    thumbnail: "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765103/8_mgq1om.jpg",
    resolution: "4K",
    price: 449,
    currency: "SAR",
    datePublished: "2024-01-30",
    tags: ["alula", "heritage", "rocks", "archaeology"],
    featured: false,
    premium: false
  },
  {
    id: 8,
    type: 'image',
    title: {
      en: "Red Sea Coastline",
      ar: "ساحل البحر الأحمر"
    },
    description: {
      en: "Crystal clear waters and pristine beaches of the Red Sea captured from above",
      ar: "المياه الصافية والشواطئ البكر للبحر الأحمر مُلتقطة من الأعلى"
    },
    category: {
      en: "Nature",
      ar: "طبيعة"
    },
    location: {
      en: "Red Sea",
      ar: "البحر الأحمر"
    },
    src: "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765101/15_phjt9q.jpg",
    thumbnail: "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765101/15_phjt9q.jpg",
    resolution: "4K",
    price: 379,
    currency: "SAR",
    datePublished: "2024-02-10",
    tags: ["redsea", "coast", "beach", "nature"],
    featured: false,
    premium: false,
    aspectRatio: "16/9"
  },
  {
    id: 9,
    type: 'image',
    title: {
      en: "Makkah Holy Mosque",
      ar: "المسجد الحرام بمكة"
    },
    description: {
      en: "Breathtaking aerial view of the Holy Mosque in Makkah during Hajj season",
      ar: "منظر جوي خلاب للمسجد الحرام بمكة المكرمة خلال موسم الحج"
    },
    category: {
      en: "Religious",
      ar: "ديني"
    },
    location: {
      en: "Makkah",
      ar: "مكة المكرمة"
    },
    src: "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765034/32_hdfhpo.jpg",
    thumbnail: "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765034/32_hdfhpo.jpg",
    resolution: "4K",
    price: 899,
    currency: "SAR",
    datePublished: "2024-02-15",
    tags: ["makkah", "holy", "mosque", "hajj"],
    featured: true,
    premium: true,
    aspectRatio: "4/3"
  },
  {
    id: 10,
    type: 'video',
    title: {
      en: "Tabuk Mountains Sunset",
      ar: "غروب جبال تبوك"
    },
    description: {
      en: "Stunning sunset over the majestic mountains of Tabuk region captured in cinematic quality",
      ar: "غروب شمس مذهل فوق جبال تبوك الشامخة مُلتقط بجودة سينمائية"
    },
    category: {
      en: "Mountains",
      ar: "جبال"
    },
    location: {
      en: "Tabuk",
      ar: "تبوك"
    },
    src: "https://res.cloudinary.com/dqlvs4ae5/video/upload/v1753766837/invideo-ai_zo6asy.mp4",
    thumbnail: "https://res.cloudinary.com/dqlvs4ae5/image/upload/v1753765052/12_egzftz.webp",
    resolution: "4K",
    price: 649,
    currency: "SAR",
    datePublished: "2024-02-20",
    tags: ["tabuk", "mountains", "sunset", "cinematic"],
    featured: false,
    premium: true,
    aspectRatio: "16/9"
  }
];

// Helper functions for filtering and sorting
export const getUniqueLocations = (lang = 'en') => {
  const locations = [...new Set(galleryItems.map(item => item.location[lang]))];
  return locations.sort();
};

export const getUniqueCategories = (lang = 'en') => {
  const categories = [...new Set(galleryItems.map(item => item.category[lang]))];
  return categories.sort();
};

export const filterItems = (items, filters) => {
  return items.filter(item => {
    // Type filter
    if (filters.type && filters.type !== 'all' && item.type !== filters.type) {
      return false;
    }
    
    // Location filter
    if (filters.location && filters.location !== 'all' && 
        item.location.en !== filters.location && item.location.ar !== filters.location) {
      return false;
    }
    
    // Category filter
    if (filters.category && filters.category !== 'all' && 
        item.category.en !== filters.category && item.category.ar !== filters.category) {
      return false;
    }
    
    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (item.price < min || item.price > max) {
        return false;
      }
    }
    
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchableText = `${item.title.en} ${item.title.ar} ${item.description.en} ${item.description.ar} ${item.tags.join(' ')}`.toLowerCase();
      if (!searchableText.includes(searchTerm)) {
        return false;
      }
    }
    
    return true;
  });
};

export const sortItems = (items, sortBy) => {
  const sortedItems = [...items];
  
  switch (sortBy) {
    case 'newest':
      return sortedItems.sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));
    case 'oldest':
      return sortedItems.sort((a, b) => new Date(a.datePublished) - new Date(b.datePublished));
    case 'price-low':
      return sortedItems.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sortedItems.sort((a, b) => b.price - a.price);
    case 'featured':
      return sortedItems.sort((a, b) => b.featured - a.featured);
    default:
      return sortedItems;
  }
};
