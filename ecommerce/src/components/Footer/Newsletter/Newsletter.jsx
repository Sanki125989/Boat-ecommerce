import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import "./Newsletter.scss";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  async function handleEmail(email) {
    const apiUrl =
      "http://localhost:1337//strapi-newsletter/newsletter/subscribe";

    try {
      const response = await fetch(apiUrl, { email });
      console.log("email response", response);
      if (!response.ok) {
        throw new Error("Failed to subscribe email. Please try again later.");
      }
      return "Email subscribed successfully!";
    } catch (error) {
      // Handle errors here, such as showing an error message to the user.
      console.error(error);
      return "Error subscribing email. Please try again later.";
    }
  }

  return (
    <div className="newsletter-section">
      <div className="newsletter-content">
        <img
          src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/boAt_logo_small.svg?v=1682421543"
          alt=""
        />
        <span className="big-text">Subscribe to our email alerts!</span>
        <div className="form">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8.27"
              height="14.473"
              viewBox="0 0 8.27 14.473"
              onClick={handleEmail}
            >
              <path
                id="Path_340747"
                data-name="Path 340747"
                d="M.28.277a.961.961,0,0,1,1.349,0L7.991,6.569a.936.936,0,0,1,0,1.334L1.628,14.2a.961.961,0,0,1-1.349,0,.935.935,0,0,1,0-1.334L5.966,7.237.28,1.611A.935.935,0,0,1,.28.277Z"
                fill="#868c91"
                fill-rule="evenodd"
              />
            </svg>
          </span>
        </div>
        <span className="text">Let's get social</span>
        <span className="social-icons">
          <div className="icon">
            <a href="https://www.facebook.com">
              <FaFacebookF size={16} />
            </a>
          </div>
          <div className="icon">
            <a href="https://www.twitter.com">
              <FaTwitter size={16} />
            </a>
          </div>
          <div className="icon">
            <a href="https://www.instagram.com">
              <FaInstagram size={16} />
            </a>
          </div>
          <div className="icon">
            <a href="https://www.linkedin.com">
              <FaLinkedinIn size={16} />
            </a>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Newsletter;
