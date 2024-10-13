import React from 'react';
import { ArrowRight, ShoppingBag, Truck, HeadphonesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen  from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <section className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-800">
            Welcome to <span className="text-blue-600">ShopEase</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices, all from the comfort of your home.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center text-white px-8 py-4 rounded-full text-lg font-semibold bg-red-700 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Shop Now
            <ArrowRight size={24} className="ml-2" />
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {[
            { icon: ShoppingBag, title: 'Wide Selection', description: 'Browse through our vast catalog of products from various categories.' },
            { icon: Truck, title: 'Fast Shipping', description: 'Enjoy quick and reliable shipping on all your orders.' },
            { icon: HeadphonesIcon, title: '24/7 Support', description: 'Our customer support team is always ready to assist you.' },
          ].map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <Icon size={48} className="text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </section>

        <section className="text-center">
          <h2 className="text-4xl font-bold mb-10 text-gray-800">Featured Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Electronics', 'Clothing', 'Home & Garden', 'Sports & Outdoors'].map((category) => (
              <a
                key={category}
                href={`/shop?category=${category}`}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">{getCategoryEmoji(category)}</span>
                </div>
                <span className="text-lg font-semibold text-gray-800">{category}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const getCategoryEmoji = (category: string) => {
  switch (category) {
    case 'Electronics': return '📱';
    case 'Clothing': return '👕';
    case 'Home & Garden': return '🏡';
    case 'Sports & Outdoors': return '⚽';
    default: return '🛍️';
  }
};

export default HomePage;
