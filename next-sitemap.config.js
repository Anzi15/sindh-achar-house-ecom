// next-sitemap.config.js

const { collection, getDocs, query } = require('firebase/firestore');
const { db } = require('./app/lib/firebase/firebase-node');

// Function to fetch dynamic products
const fetchProducts = async () => {
  try {
    const productsQuery = query(collection(db, 'Products'));
    const docs = await getDocs(productsQuery);
    const products = [];

    docs.forEach((doc) => {
      products.push({ id: doc.id });
    });

    return products.map((product) => ({
      loc: `/product/${product.id}`,
      changefreq: 'weekly',
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Function to fetch dynamic collections
const fetchCollections = async () => {
  try {
    const collectionsQuery = query(collection(db, 'Collections'));
    const docs = await getDocs(collectionsQuery);
    const collections = [];

    docs.forEach((doc) => {
      collections.push({ name: doc.id });
    });

    return collections.map((collection) => ({
      loc: `/collection/${collection.name}`,
      changefreq: 'daily',
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
};

// Export sitemap configuration
module.exports = {
  siteUrl: 'https://sindhacharhouse.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/admin', '/login'], // Exclude specific pages

  // Include dynamic paths for products and collections
  additionalPaths: async (config) => {
    const products = await fetchProducts();   // Fetch dynamic product routes
    const collections = await fetchCollections(); // Fetch dynamic collection routes

    // Add hardcoded paths
    const staticPages = [
      {
        loc: '/',            // Homepage
        changefreq: 'daily',
        priority: 1.0,
      },
      {
        loc: '/about',
        changefreq: 'monthly',
        priority: 0.8,
      },
      {
        loc: '/contact',
        changefreq: 'monthly',
        priority: 0.7,
      },
      {
        loc: '/faq',
        changefreq: 'monthly',
        priority: 0.6,
      },
    ];

    return [...staticPages, ...products, ...collections]; // Combine static and dynamic routes
  },
};
