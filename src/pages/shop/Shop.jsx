import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Product } from "./product";
import "./shop.css";
import { PRODUCTS, fetchProducts } from "../../products";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

export const Shop = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        PRODUCTS.push(...data); // Update the PRODUCTS list
      } catch (error) {
        // Handle the error if needed
      }
    };

    fetchData();
  }, []); // Dependency array is empty since we don't have any dependencies

  if (PRODUCTS.length === 0) {
    return (
      <SkeletonTheme >
        <div>
        <div className="shop">
      <div className="shopTitle">
        <h1>Shopping Cart</h1>
        </div>
      </div>
          
          {props.body || <Skeleton height={30} count={10} />}
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Shopping Cart</h1>
      </div>
      <div className="products">
        {products.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

Shop.propTypes = {
  title: PropTypes.node,
  body: PropTypes.node,
};
