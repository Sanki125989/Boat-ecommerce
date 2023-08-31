import React from "react";
import "./Footer.scss";
import Payment from "../../assets/payments.png";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="col">
          <div className="title">Shop</div>
          <div className="text">
            <span className="text">True Wireless Earbuds </span>
            <span className="text">Wireless Headphones </span>
            <span className="text">Wired Headphones</span>
            <span className="text">Wireless Speakers</span>
            <span className="text">Home Audio</span>
            <span className="text">Mobile Accessories</span>
            <span className="text">Smart Watches</span>
          </div>
        </div>
        <div className="col">
          <div className="title">Help</div>
          <div className="c-item">
            <div className="text">
              <span className="text">Warranty & Support</span>
              <span className="text">Service Centers</span>
              <span className="text">Track Your Order</span>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="title">Categories</div>
          <span className="text">Headphones</span>
          <span className="text">Smart Watches</span>
          <span className="text">Bluetooth Speakers</span>
          <span className="text">Wireless Earbuds</span>
          <span className="text">Home Theatre</span>
          <span className="text">Projectors</span>
        </div>
        <div className="col">
          <div className="title">Pages</div>
          <span className="text">Home</span>
          <span className="text">About</span>
          <span className="text">Privacy Policy</span>
          <span className="text">Returns</span>
          <span className="text">Terms & Conditions</span>
          <span className="text">Contact Us</span>
        </div>
      </div>
      <div className="bottom-bar">
        <div className="bottom-bar-content">
          <span className="text">
            For queries contact us: Manager, Imagine Marketing Limited Unit no.
            204 & 205, 2nd floor, D-wing & E-wing, Corporate Avenue, Andheri
            Ghatkopar Link Road, Mumbai, Maharashtra-400093, India{" "}
          </span>
          <img src={Payment} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
