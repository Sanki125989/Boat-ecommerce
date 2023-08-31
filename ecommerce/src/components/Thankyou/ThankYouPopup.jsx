import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ThankYouPopup.scss";
import { Context } from "../../utils/context";

const ThankYouPopup = ({ setShowFooter }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { cartItems, handleRemoveFromCart } = useContext(Context);
  // eslint-disable-next-line
  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    setShowFooter(false);
    handleRemoveFromCart(cartItems);
  });
  return (
    <div>
      {isOpen && (
        <div className="popup-container">
          <div className="popup-content">
            <h1>Thank You!</h1>
            <p>
              Thank you for your purchase. Your order has been successfully
              placed.
            </p>
            <Link to="/">Go to Home Page</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThankYouPopup;
