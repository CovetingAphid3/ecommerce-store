import  { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import ProductList from '../components/ProductList'

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);

  const categories = ['All', 'Electronics', 'Audio', 'Accessories', 'Office'];

  const handleAddToCart = (product :any) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">TechShop</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="py-2 px-4 pr-10 rounded-full text-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 text-gray-500" size={20} />
            </div>
            <button className="flex items-center space-x-2 bg-white text-blue-600 py-2 px-4 rounded-full">
              <ShoppingCart size={20} />
              <span>{cartItems.length}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="flex space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product List */}
        <ProductList 
          searchTerm={searchTerm} 
          category={selectedCategory} 
          onAddToCart={handleAddToCart}
        />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 TechShop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductsPage;
