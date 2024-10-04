// src/components/ProductCard.tsx
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 p-4">
      <img
        src={`/api/placeholder/${Math.floor(Math.random() * 1000)}`}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded-lg"
      />
      <h3 className="text-lg font-semibold mb-2 truncate">{product.name}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</p>
        <button
          onClick={() => onAddToCart(product)}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

