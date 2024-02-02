import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { PRODUCTS } from "../products";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  
  if (PRODUCTS.length > 0) {
    for (let i = 0; i < PRODUCTS.length; i++) {
      cart[PRODUCTS[i].id] = 0;
    }
  }
  
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const getTotalCartAmount = () =>{
    let totalAmount = 0;
    for(const item in cartItems){
      if(cartItems[item] > 0){
        let itemInfo = PRODUCTS.find((product)=>product.id ===Number(item))
        totalAmount += cartItems[item] * itemInfo.price
      }
    }
    return totalAmount
  }

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      // Check if the item exists in cartItems
      // eslint-disable-next-line no-prototype-builtins
      if (prev.hasOwnProperty(itemId)) {
        return { ...prev, [itemId]: prev[itemId] + 1 };
      } else {
        // If the item doesn't exist, create a new entry
        return { ...prev, [itemId]: 1 };
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      // Check if the item exists in cartItems and its quantity is greater than 0
      // eslint-disable-next-line no-prototype-builtins
      if (prev.hasOwnProperty(itemId) && prev[itemId] > 0) {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      } else {
        // If the item doesn't exist or its quantity is 0, do nothing
        return prev;
      }
    });
  };
  const updateCartItemCount = (newAmount, itemId) =>{
    setCartItems((prev)=> ({...prev, [itemId]:newAmount}))
  }

  return (
    <ShopContext.Provider value={{ cartItems, addToCart, removeFromCart,updateCartItemCount, getTotalCartAmount }}>
      {props.children}
    </ShopContext.Provider>
  );
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};