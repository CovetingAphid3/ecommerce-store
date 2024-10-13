import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  onRemove: (productId: number) => void;
  onClose: () => void;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, totalItems, totalPrice, onRemove, onClose, onUpdateQuantity }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
    <div className="bg-white w-full max-w-md h-full flex flex-col">
      <div className="p-6 bg-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto p-6">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <ShoppingBag size={64} className="mb-4" />
            <p className="text-xl font-semibold">Your cart is empty</p>
            <p className="mt-2">Add some items to get started!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map(item => (
              <div key={item.ID} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-2xl">{getCategoryEmoji(item.category)}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpdateQuantity(item.ID, item.quantity - 1)}
                    className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={20} />
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.ID, item.quantity + 1)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <button
                  onClick={() => onRemove(item.ID)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-6 bg-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-gray-700">Total Items:</span>
          <span className="font-bold text-lg">{totalItems}</span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="font-semibold text-gray-700">Total Price:</span>
          <span className="font-bold text-2xl text-blue-600">${totalPrice.toFixed(2)}</span>
        </div>
        <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed" disabled={cart.length === 0}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
);

const getCategoryEmoji = (category: string) => {
  switch (category) {
    case 'Electronics': return '📱';
    case 'Clothing': return '👕';
    case 'Home & Garden': return '🏡';
    case 'Sports & Outdoors': return '⚽';
    default: return '🛍️';
  }
};

export default Cart;
