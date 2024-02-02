import { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import PropTypes from "prop-types";

export const Product = (props) => {
  const { id, price, title, image } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  // Check for undefined or null cartItemAmount, default to 0
  const cartItemAmount = cartItems[id] || 0;

  return (
    <div className="product">
      <img src={image} alt={title} />
      <div className="description">
        <p>
          <b>{title}</b>
        </p>
        <p>${price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemAmount > 0 && `(${cartItemAmount})`}
      </button>
    </div>
  );
  
};

Product.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
