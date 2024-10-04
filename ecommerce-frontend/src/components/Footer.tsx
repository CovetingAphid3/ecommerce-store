import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">ShopEase</h3>
            <p className="text-sm">Your one-stop shop for all things tech!</p>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-blue-400 transition duration-300">Home</Link>
            <Link to="/shop" className="hover:text-blue-400 transition duration-300">Shop</Link>
            <Link to="/about" className="hover:text-blue-400 transition duration-300">About</Link>
            <Link to="/contact" className="hover:text-blue-400 transition duration-300">Contact</Link>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm">© {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

