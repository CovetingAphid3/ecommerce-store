import { ShopContext } from "../../context/shop-context";
import PropTypes from "prop-types";
import { useContext } from "react";

export const CartItem = (props) => {
  const { id, price, title, image } = props.data;
const {cartItems, addToCart, removeFromCart,updateCartItemCount} = useContext(ShopContext)

  return (
    <div className="cartItem">
      <img src={image} alt={title} />
      <div className="description">
        <p>
          <b>{title}</b>
        </p>
        <p>${price}</p>
        <div className="countHandler">
            <button onClick={()=>removeFromCart(id)}>-</button>
            <input value={cartItems[id]} onChange={(e)=>updateCartItemCount(Number(e.target.value),id)}/>
            <button onClick={()=>addToCart(id)}>+</button>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
