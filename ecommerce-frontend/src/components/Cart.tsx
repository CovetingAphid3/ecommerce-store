// src/components/Cart.tsx
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  onRemove: (productId: number) => void;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, totalItems, totalPrice, onRemove, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
    <div className="bg-white w-full max-w-md h-full overflow-y-auto p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
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
                onClick={() => onRemove(item.ID)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-6 pt-4 border-t">
            <p className="font-bold text-lg">Total Items: {totalItems}</p>
            <p className="font-bold text-xl text-blue-600">Total Price: ${totalPrice.toFixed(2)}</p>
            <button className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default Cart;

