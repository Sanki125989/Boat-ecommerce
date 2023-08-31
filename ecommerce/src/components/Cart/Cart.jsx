import React, { useContext, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem/CartItem";
import "./Cart.scss";
import { Context } from "../../utils/context";

import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "../../utils/api";
import ShoGSTLogo from "../Footer/Newsletter/ShoGSTLogo";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Cart = ({ setShowCart }) => {
  const {
    cartItems,
    setShowUserPanel,
    setCartItems,
    cartSubTotal,
    IsAuthorised,
    setLogin,
  } = useContext(Context);
  const navigate = useNavigate();
  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  useEffect(() => {
    const cartInStorage = JSON.parse(localStorage.getItem("cartItemsstorage"));
    if (cartInStorage && cartInStorage.length > 0) {
      setCartItems(cartInStorage);
      const timeoutId = setTimeout(handlePayment, 1000);

      // Cleanup the timeout to prevent memory leaks when the component unmounts
      return () => clearTimeout(timeoutId);
    }

    // eslint-disable-next-line
  }, []);

  const handlePayment = async () => {
    if (IsAuthorised) {
      setShowUserPanel(false);
      try {
        const stripe = await stripePromise;
        const res = await makePaymentRequest.post("/api/orders", {
          products: cartItems,
        });
        await stripe.redirectToCheckout({
          sessionId: res.data.stripeSession.id,
        });
      } catch (err) {
        console.log(err);
      }
    }

    if (!IsAuthorised) {
      toast.error("Login first to checkout");
      setLogin(true);
    }
    setShowUserPanel(false);
  };

  return (
    <div className="cart-panel">
      <div className="opac-layer"></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose className="close-btn" />
            <span className="text">close</span>
          </span>
        </div>
        {cartItems?.length === 0 && (
          <div className="empty-cart">
            <BsCartX />
            <span>No Products in cart.</span>
            <button
              className="return-cta"
              onClick={() => {
                navigate("/");
                setShowCart(false);
              }}
            >
              RETURN TO SHOP
            </button>
          </div>
        )}

        {cartItems?.length > 0 && (
          <>
            <ShoGSTLogo />

            <CartItem />
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Total Amount:</span>
                <span className="text total">&#8377;{cartSubTotal}</span>
              </div>
              <div className="button">
                <button className="checkout-cta" onClick={handlePayment}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
