import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  ID: number;
  Name: string;
  Description: string;
  Price: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
}

interface ProductListProps {
  searchTerm: string;
  category: string;
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ searchTerm, category, onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/products', {
          withCredentials: true,
        });

        console.log('API Response:', response.data); // Log the entire response

        let productsData: Product[];

        if (Array.isArray(response.data)) {
          productsData = response.data;
        } else if (typeof response.data === 'object' && response.data !== null) {
          const possibleArrays = Object.values(response.data).filter(Array.isArray);
          if (possibleArrays.length > 0) {
            productsData = possibleArrays[0] as Product[];
          } else {
            throw new Error('Unexpected API response structure');
          }
        } else {
          throw new Error('Unexpected API response type');
        }

        if (!productsData.every(isValidProduct)) {
          throw new Error('Some products have invalid structure');
        }

        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        if (axios.isAxiosError(err)) {
          setError(`Failed to fetch products: ${err.message}. Status: ${err.response?.status}`);
        } else {
          setError(`An unexpected error occurred: ${(err as Error).message}`);
        }
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const isValidProduct = (product: any): product is Product => {
    return (
      typeof product === 'object' &&
      product !== null &&
      typeof product.ID === 'number' &&
      typeof product.Name === 'string' &&
      typeof product.Description === 'string' &&
      typeof product.Price === 'number'
    );
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  // Filter products based on search term and selected category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.Name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || product.Description.toLowerCase().includes(category.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>
      {filteredProducts.length === 0 ? (
        <p className="text-center">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.ID} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">{product.Name}</h2>
              <p className="text-gray-600 mb-4">{product.Description}</p>
              <p className="text-lg font-bold text-green-600">${product.Price.toFixed(2)}</p>
              <button
                onClick={() => onAddToCart(product)}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;

