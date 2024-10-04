import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Welcome to ShopEase</h1>
        <p className="text-xl text-gray-500 mb-8">Discover amazing products at unbeatable prices</p>
        <Link
          to="/shop"
          className="inline-flex items-center bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Shop Now
          <ArrowRight size={20} className="ml-2" />
        </Link>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-gray-200 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Wide Selection</h2>
          <p className="text-gray-600">Browse through our vast catalog of products from various categories.</p>
        </div>
        <div className="bg-gray-200 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Fast Shipping</h2>
          <p className="text-gray-600">Enjoy quick and reliable shipping on all your orders.</p>
        </div>
        <div className="bg-gray-200 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">24/7 Support</h2>
          <p className="text-gray-600">Our customer support team is always ready to assist you.</p>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Electronics', 'Clothing', 'Home & Garden', 'Sports & Outdoors'].map((category) => (
            <a
              key={category}
              href={`/shop?category=${category}`}
              className="bg-gray-300 p-4 rounded-lg shadow-md hover:bg-gray-400 transition-colors"
            >
              <span className="text-gray-700">{category}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

