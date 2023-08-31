import { React, useState } from "react";
import "./Product.scss";
import HomeCart from "./HomeCart";
import { FaStar } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
const Product = ({ data, id }) => {
  console.log("data for home", data);
  const averageRatings = data?.reviews?.data?.map((data, index) => {
    return data?.attributes?.averageRating;
  });
  console.log("average ", averageRatings);
  const [addToCart, dieseableAddToCart] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="product-card">
      <div className="thumbnail" onClick={() => navigate("/product/" + id)}>
        {data &&
          data.img &&
          data.img.data &&
          Array.isArray(data?.img?.data) &&
          data?.img?.data.length > 0 && (
            <img
              src={
                process.env.REACT_APP_STRIPE_APP_DEV_URL +
                data?.img?.data[0]?.attributes?.url
              }
              alt=""
            />
          )}
      </div>
      <div className="prod-details" onClick={() => navigate("/product/" + id)}>
        <FaStar
          className="star-icon"
          style={{ color: "gold", fontSize: "17px" }}
        />
        <span>{averageRatings[0]}</span>
        <span className="name">{data?.title}</span>
        <span className="specs_css">{data?.homespecs}</span>
        <div>
          <span className="specs_css">{data?.homespecs2}</span>
        </div>
        <span className="price">&#8377;{data?.price}</span>
        <span className="o_price">&#8377;{data?.o_price?.toFixed(2)}</span>
        <span className="discount">{data?.percent_off}% off</span>
      </div>
      <button
        className="loader-button__text"
        onClick={() => dieseableAddToCart(true)}
      >
        Add To Cart
      </button>
      <div>
        {addToCart && (
          <HomeCart
            data={data}
            id={id}
            dieseableAddToCart={dieseableAddToCart}
          />
        )}
      </div>
    </div>
  );
};

export default Product;
