import React, { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import "./HomeCart.scss";
import { Context } from "../../../utils/context";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

function HomeCart({ dieseableAddToCart, id, data }) {
  const { changeColor, setChangeColor, outerProductImg, setOuterProductImg } =
    useContext(Context);
  const [quantity, setQuantity] = useState(1);
  const { dataByid } = useFetch(`/api/products?populate=*&[filters][id]=${id}`);

  const navigate = useNavigate();
  console.log("id: of product", id);
  console.log("data product", dataByid);
  const decrement = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });
  };
  const buttonStyle = {
    backgroundColor: data.change,
  };
  const buttonStyle2 = {
    backgroundColor: data.change2,
  };
  const increment = () => {
    setQuantity((prevState) => prevState + 1);
  };
  return (
    <div className="home-panel">
      <div className="home-opac-layer"></div>
      <div className="home-content">
        <div className="home-header">
          <span className="home-close-btn">
            <MdClose
              className="home-close-btn"
              onClick={() => {
                dieseableAddToCart(false);
                setChangeColor(false);
                setOuterProductImg(true);
              }}
            />
            <span className="home-text">close</span>
          </span>
        </div>
        <div className="left">
          {changeColor && (
            <img
              src={
                process.env.REACT_APP_STRIPE_APP_DEV_URL +
                  data?.img?.data[5]?.attributes?.url || ""
              }
              alt=""
              style={{ width: "150px" }}
            />
          )}
          {outerProductImg && (
            <img
              src={
                process.env.REACT_APP_STRIPE_APP_DEV_URL +
                  data?.img?.data[0]?.attributes?.url || ""
              }
              alt=""
              style={{ width: "150px" }}
            />
          )}
        </div>
        <div className="right">
          <span>{data?.title}</span>
          <span className="price">&#8377;{data?.price}</span>
          <span className="o_price">&#8377;{data?.o_price}</span>
          <span className="discount">{data?.percent_off}% off</span>
        </div>
        <div className="cart-buttons">
          <div className="quantity-buttons">
            <span onClick={decrement}>-</span>
            <span>{quantity}</span>
            <span onClick={increment}>+</span>
          </div>
        </div>
        <span className="span-color">Choose your colour:</span>
        <div className="margin">
          <br />
          <button
            className="btn-small"
            style={buttonStyle}
            onClick={() => {
              setChangeColor(false);
              setOuterProductImg(true);
            }}
          ></button>
          <button
            className="btn-lg"
            style={buttonStyle2}
            onClick={() => {
              setChangeColor(true);
              setOuterProductImg(false);
            }}
          >
            {}
          </button>
        </div>

        <button
          className="button__text"
          onClick={() => navigate("/product/" + id)}
        >
          View product info
        </button>

        <button
          className="button_white"
          onClick={() => {
            dieseableAddToCart(false);
            setChangeColor(false);
            setOuterProductImg(true);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default HomeCart;
