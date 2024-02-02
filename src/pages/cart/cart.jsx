import { PRODUCTS } from "../../products";
import { ShopContext } from "../../context/shop-context";
import { useContext } from "react";
import { CartItem } from "./cart-item";
import "./cart.css";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();

  // Check if PRODUCTS is not empty before using it
  if (PRODUCTS.length === 0) {
    // You can render a loading state or handle the case when PRODUCTS is empty
    return <div>Empty Cart...</div>;
  }

  return (
    <div className="cart">
      <div>
        <h1>Cart Items:</h1>
      </div>
      <div className="cartItems">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] > 0) {
            return <CartItem key={product.id} data={product} />;
          } else {
            return null; // Return null for products with cartItems[product.id] === 0
          }
        })}
      </div>
      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Subtotal: ${totalAmount}</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button>Checkout</button>
        </div>
      ) : (
        <h1>Your Cart is Empty</h1>
      )}
    </div>
  );
};
