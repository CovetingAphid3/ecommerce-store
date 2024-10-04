import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Search, Filter } from 'lucide-react';

interface Product {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  name: string;
  description: string;
  category: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

const EcommercePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/products', {
          withCredentials: true,
        });
        
        if (response.data && Array.isArray(response.data.products)) {
          const productsData = response.data.products as Product[];
          if (!productsData.every(isValidProduct)) {
            throw new Error('Some products have invalid structure');
          }
          setProducts(productsData);
        } else {
          throw new Error('Unexpected API response structure');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        if (axios.isAxiosError(err)) {
          setError(`Failed to fetch products: ${err.message}. Status: ${err.response?.status}`);
        } else {
          setError(`An unexpected error occurred: ${(err as Error).message}`);
        }
      } finally {
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
      typeof product.name === 'string' &&
      typeof product.description === 'string' &&
      typeof product.category === 'string' &&
      typeof product.price === 'number'
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(products.map(product => product.category))];

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.ID === product.ID);
      if (existingItem) {
        return prevCart.map(item =>
          item.ID === product.ID ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.ID !== productId));
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">ShopEase</h1>
        <button 
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="relative p-2 text-gray-400 hover:text-gray-500"
        >
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {totalItems}
            </span>
          )}
        </button>
      </header>
      
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-48 p-2 pl-10 pr-4 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No products available.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.ID} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <img src={`/api/placeholder/${Math.floor(Math.random() * 1000)}`} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 truncate">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            {cart.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
              <div>
                {cart.map(item => (
                  <div key={item.ID} className="flex justify-between items-center mb-4 pb-4 border-b">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.ID)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="mt-6 pt-4 border-t">
                  <p className="font-bold text-lg">Total Items: {totalItems}</p>
                  <p className="font-bold text-xl text-blue-600">Total Price: ${totalPrice.toFixed(2)}</p>
                  <button className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EcommercePage;
