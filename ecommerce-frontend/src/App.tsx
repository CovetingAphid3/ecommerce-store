import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import Loading from './components/Loading';
import Error from './components/Error';
import Cart from './components/Cart';
import { Product, CartItem } from './types';

const App: React.FC = () => {
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
                const response = await axios.get('http://localhost:8000/products', { withCredentials: true });
                if (response.data && Array.isArray(response.data.products)) {
                    const productsData = response.data.products as Product[];
                    setProducts(productsData);
                } else {
                    setError('No products found.');
                }
            } catch (err) {
                setError('Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

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
                return prevCart.map(item => (item.ID === product.ID ? { ...item, quantity: item.quantity + 1 } : item));
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

    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Navbar cartItemsCount={totalItems} onCartClick={() => setIsCartOpen(true)} />
                <div className="container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/shop" element={
                            <>
                                {loading ? <Loading /> : error ? <Error message={error} /> : (
                                    <div>
                                        <div className="mb-8 flex flex-col sm:flex-row gap-4">
                                            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                                            <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} />
                                        </div>
                                        <ProductList products={filteredProducts} onAddToCart={addToCart} />
                                    </div>
                                )}
                            </>
                        } />
                        <Route path="/about" element={<AboutPage />} />  {/* New route */}
                        <Route path="/contact" element={<ContactPage />} />  {/* New route */}
                        <Route path="/login" element={<LoginPage />} />  {/* New route */}
                    </Routes>
                </div>

                {/* Filler Content */}
                <div className="bg-gray-200 py-8">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold text-center mb-4">Adiitional Information</h2>
                        <p className="text-center">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo, impedit, dolores dicta magnam, enim ipsam nulla aperiam similique repellat ipsa inventore necessitatibus sed temporibus reiciendis ducimus qui iste labore porro!
                        </p>
                    </div>
                </div>

                {isCartOpen && (
                    <Cart
                        cart={cart}
                        totalItems={totalItems}
                        totalPrice={totalPrice}
                        onRemove={removeFromCart}
                        onClose={() => setIsCartOpen(false)}
                    />
                )}
                <Footer />
            </div>
        </Router>
    );
};

export default App;

