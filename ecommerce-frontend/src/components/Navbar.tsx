import React from 'react';
import { ShoppingCart, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
    cartItemsCount: number;
    onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartItemsCount, onCartClick }) => {
    return (
        <nav className="bg-gray-800 shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <a href="/" className="text-2xl font-bold text-white hover:text-blue-700 transition duration-300">
                            ShopEase
                        </a>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-8">
                        <Link to="/" className="text-white hover:text-red-600 transition duration-300">Home</Link>
                        <Link to="/shop" className="text-white hover:text-red-600 transition duration-300">Shop</Link>
                        <Link to="/contact" className="text-white hover:text-red-600 transition duration-300">Contact</Link>
                        <Link to="/login" className="text-white hover:text-red-600 transition duration-300">Login</Link>
                    </div>

                    {/* User and Cart Buttons */}
                    <div className="flex items-center space-x-4">
                        <button className="text-white hover:text-blue-600 transition duration-300" aria-label="User Profile">
                            <User size={24} />
                        </button>
                        <button
                            className="relative text-white hover:text-blue-600 transition duration-300"
                            onClick={onCartClick}
                            aria-label="Shopping Cart"
                        >
                            <ShoppingCart size={24} />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {cartItemsCount}
                                </span>
                            )}
                        </button>
                        <button className="md:hidden text-white hover:text-blue-600 transition duration-300" aria-label="Menu">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

