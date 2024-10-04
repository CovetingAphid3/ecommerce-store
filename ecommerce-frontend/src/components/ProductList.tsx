// src/components/ProductList.tsx
import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">No products available.</p>
      ) : (
        products.map((product) => (
          <ProductCard key={product.ID} product={product} onAddToCart={onAddToCart} />
        ))
      )}
    </div>
  );
};

export default ProductList;

