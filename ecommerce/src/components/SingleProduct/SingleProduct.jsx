import React, { useContext, useState, useRef } from "react";
import { Context } from "../../utils/context";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import RelatedProducts from "./RelatedProducts/RelatedProducts.jsx";
import Ratings from "./form/Ratings";
import loadingImg from "../SingleProduct/loading.gif";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
  FaStar,
} from "react-icons/fa";
import "./SingleProduct.scss";

const SingleProduct = () => {
  const currentDate = new Date();
  const [deliveryDays, setDeliveryDays] = useState("");
  const { id } = useParams();
  const {
    handleAddToCart,
    formattedDeliveryDate,
    setformattedDeliveryDate,
    deliveryMessage,
    setDeliveryMessage,
    averageRating,
    totalCount,
  } = useContext(Context);
  const { changeColor, setChangeColor, outerProductImg, setOuterProductImg } =
    useContext(Context);
  const { data } = useFetch(`/api/products?populate=*&[filters][id]=${id}`);
  const [selectedImg, setSelectedImg] = useState(0);
  const [pincode, setPinCode] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [errormessage, setErrorMessage] = useState(false);
  const [loadingImg1, setLoadingImg] = useState(false);
  const [selectedImg1, setSelectedImg1] = useState(5);
  const [checkPincode, setCheckPincode] = useState();
  const currentHour = String(currentDate.getHours()).padStart(2, "0");
  const currentMinute = String(currentDate.getMinutes()).padStart(2, "0");
  const currentSecond = String(currentDate.getSeconds()).padStart(2, "0");

  const formattedTime = `${currentHour}:${currentMinute}:${currentSecond}`;

  const decrement = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });
  };
  const increment = () => {
    setQuantity((prevState) => prevState + 1);
  };
  const ratingRef = useRef(null);

  if (!data) return null;

  const product = data?.data?.[0]?.attributes;
  const buttonStyle = {
    backgroundColor: product.change,
    // Set the background color dynamically
  };
  const buttonStyle2 = {
    backgroundColor: product.change2,
    // Set the background color dynamically
  };
  const handlePinisValid = async (e) => {
    const apiEndpoint = `https://api.postalpincode.in/pincode/${pincode}`;

    try {
      setLoadingImg(true);
      setErrorMessage(false);

      if (pincode.length <= 6) {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          setErrorMessage(true);
          setLoadingImg(false);
          return;
        }

        const data = await response.json();
        if (data && data.length > 0 && data != null) {
          const firstRecord = data[0];
          const filteredPincode = firstRecord.PostOffice;
          if (filteredPincode === null) {
            setErrorMessage(true);
            setCheckPincode(false);
          } else {
            if (filteredPincode?.[0]?.State === "Maharashtra") {
              const deliveryDate = new Date(currentDate);
              const deliveryTime = "16:00:00";
              const convertToTimeObject = (timeString) => {
                const [hours, minutes, seconds] = timeString.split(":");
                return {
                  hours: parseInt(hours),
                  minutes: parseInt(minutes),
                  seconds: parseInt(seconds),
                };
              };
              const formattedTimeObj = convertToTimeObject(formattedTime);
              const deliveryTimeObj = convertToTimeObject(deliveryTime);
              console.log(" formattedDateTime", formattedTimeObj);
              console.log(" deliveryDateTime", deliveryTimeObj);
              if (formattedTimeObj.hours < deliveryTimeObj.hours) {
                console.log(
                  "formattedDateTime is less than deliveryDateTime :93 line"
                );
                deliveryDate.setDate(currentDate.getDate() + 1);
              } else {
                deliveryDate.setDate(currentDate.getDate() + 2);
              }
              console.log("deliveryDate:", deliveryDate.toDateString());
              // Format the delivery date as "Day, DD MMM" (e.g., "Sunday, 30 Jul")
              const convertDate = deliveryDate.toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "short",
              });

              setformattedDeliveryDate(convertDate);
              setDeliveryDays("Tommorow");
              setCheckPincode(true);
              setDeliveryMessage("Free Delivery");
              setErrorMessage(false);
            } else if (filteredPincode?.[0].State === "Karnataka") {
              // Add 2 days to the current date

              const deliveryDate = new Date(currentDate);
              const deliveryTime = "16:00:00";
              const convertToTimeObject = (timeString) => {
                const [hours, minutes, seconds] = timeString.split(":");
                return {
                  hours: parseInt(hours),
                  minutes: parseInt(minutes),
                  seconds: parseInt(seconds),
                };
              };
              const formattedTimeObj = convertToTimeObject(formattedTime);
              const deliveryTimeObj = convertToTimeObject(deliveryTime);
              console.log(" formattedDateTime", formattedTimeObj);
              console.log(" deliveryDateTime", deliveryTimeObj);
              if (formattedTimeObj.hours < deliveryTimeObj.hours) {
                console.log(
                  "formattedDateTime is less than deliveryDateTime :93 line"
                );
                deliveryDate.setDate(currentDate.getDate() + 2);
              } else {
                deliveryDate.setDate(currentDate.getDate() + 3);
              }
              console.log("deliveryDate:", deliveryDate.toDateString());
              const convertDate = deliveryDate.toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "short",
              });
              setformattedDeliveryDate(convertDate);
              setCheckPincode(true);
              setDeliveryDays("in 3 days");
              setDeliveryMessage("50₹ delivery charge");
              setErrorMessage(false);
            } else if (
              filteredPincode?.[0].State === "Delhi" ||
              filteredPincode?.[0].State === "Punjab"
            ) {
              // Add 2 days to the current date
              if (filteredPincode?.[0].State === "Punjab") {
                console.log("coming");
                setDeliveryMessage("150₹ delivery charge");
              } else {
                setDeliveryMessage("200₹ delivery charge");
              }
              const deliveryDate = new Date(currentDate);
              const deliveryTime = "16:00:00";
              const convertToTimeObject = (timeString) => {
                const [hours, minutes, seconds] = timeString.split(":");
                return {
                  hours: parseInt(hours),
                  minutes: parseInt(minutes),
                  seconds: parseInt(seconds),
                };
              };
              const formattedTimeObj = convertToTimeObject(formattedTime);
              const deliveryTimeObj = convertToTimeObject(deliveryTime);
              console.log(" formattedDateTime", formattedTimeObj);
              console.log(" deliveryDateTime", deliveryTimeObj);
              if (formattedTimeObj.hours < deliveryTimeObj.hours) {
                console.log(
                  "formattedDateTime is less than deliveryDateTime :93 line"
                );
                deliveryDate.setDate(currentDate.getDate() + 4);
              } else {
                deliveryDate.setDate(currentDate.getDate() + 5);
              }
              console.log("deliveryDate:", deliveryDate.toDateString());
              const convertDate = deliveryDate.toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "short",
              });
              setformattedDeliveryDate(convertDate);
              setCheckPincode(true);
              setDeliveryDays("in 5 days");
              setErrorMessage(false);
            } else {
              const deliveryDate = new Date(currentDate);
              const deliveryTime = "16:00:00";
              const convertToTimeObject = (timeString) => {
                const [hours, minutes, seconds] = timeString.split(":");
                return {
                  hours: parseInt(hours),
                  minutes: parseInt(minutes),
                  seconds: parseInt(seconds),
                };
              };
              const formattedTimeObj = convertToTimeObject(formattedTime);
              const deliveryTimeObj = convertToTimeObject(deliveryTime);
              console.log(" formattedDateTime", formattedTimeObj);
              console.log(" deliveryDateTime", deliveryTimeObj);
              if (formattedTimeObj.hours < deliveryTimeObj.hours) {
                console.log(
                  "formattedDateTime is less than deliveryDateTime :93 line"
                );
                deliveryDate.setDate(currentDate.getDate() + 6);
              } else {
                deliveryDate.setDate(currentDate.getDate() + 7);
              }
              console.log("deliveryDate:", deliveryDate.toDateString()); // Format the delivery date as "Day, DD MMM" (e.g., "Sunday, 30 Jul")
              const convertDate = deliveryDate.toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "short",
              });
              setformattedDeliveryDate(convertDate);
              setCheckPincode(true);
              setDeliveryDays("in 7 days");
              setDeliveryMessage("250₹ delivery charge");
              setErrorMessage(false);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error occurred during API call:", error);
      setErrorMessage(true);
    } finally {
      setLoadingImg(false);
    }
  };

  const scrollToRating = () => {
    if (ratingRef.current) {
      const yOffset = 3300; // Adjust the offset value to control the scrolling distance
      const element = ratingRef.current;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  const handleKeyPress = (e) => {
    // Allow only numeric characters (0-9)
    const regex = /^[0-9]+$/;
    const inputValue = e.key;
    if (e != null) {
      setCheckPincode(false);
    }
    if (!regex.test(inputValue)) {
      e.preventDefault();
    }
  };

  if (!product) return null;

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            {outerProductImg && (
              <div className="images">
                <img
                  src={
                    process.env.REACT_APP_STRIPE_APP_DEV_URL +
                      product?.img?.data[0]?.attributes?.url || ""
                  }
                  alt=""
                  onMouseOver={() => setSelectedImg(0)}
                />
                <img
                  src={
                    process.env.REACT_APP_STRIPE_APP_DEV_URL +
                      product?.img?.data[1]?.attributes?.url || ""
                  }
                  alt=""
                  onMouseOver={() => setSelectedImg(1)}
                />
                <img
                  src={
                    process.env.REACT_APP_STRIPE_APP_DEV_URL +
                      product?.img?.data[2]?.attributes?.url || ""
                  }
                  alt=""
                  onMouseOver={() => setSelectedImg(2)}
                />
                <img
                  src={
                    process.env.REACT_APP_STRIPE_APP_DEV_URL +
                      product?.img?.data[3]?.attributes?.url || ""
                  }
                  alt=""
                  onMouseOver={() => setSelectedImg(3)}
                />
              </div>
            )}
            {outerProductImg && (
              <div className="mainImg">
                <img
                  src={
                    process.env.REACT_APP_STRIPE_APP_DEV_URL +
                      product?.img?.data[selectedImg]?.attributes?.url || ""
                  }
                  alt=""
                />
              </div>
            )}
            {changeColor && (
              <div className="images">
                <img
                  src={
                    process.env.REACT_APP_STRIPE_APP_DEV_URL +
                      product?.img?.data[5]?.attributes?.url || ""
                  }
                  alt=""
                  onMouseOver={() => setSelectedImg1(5)}
                />
                <img
                  src={
                    process.env.REACT_APP_STRIPE_APP_DEV_URL +
                      product?.img?.data[6]?.attributes?.url || ""
                  }
                  alt=""
                  onMouseOver={() => setSelectedImg1(6)}
                />
                <img
                  src={
                    process.env.REACT_APP_STRIPE_APP_DEV_URL +
                      product?.img?.data[7]?.attributes?.url || ""
                  }
                  alt=""
                  onMouseOver={() => setSelectedImg1(7)}
                />
                <img
                  src={
                    process.env.REACT_APP_STRIPE_APP_DEV_URL +
                      product?.img?.data[8]?.attributes?.url || ""
                  }
                  alt=""
                  onMouseOver={() => setSelectedImg1(8)}
                />
              </div>
            )}
            {changeColor && (
              <div className="mainImg">
                <img
                  src={
                    process.env.REACT_APP_STRIPE_APP_DEV_URL +
                      product?.img?.data[selectedImg1]?.attributes?.url || ""
                  }
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="right" onClick={scrollToRating}>
            <p>
              {" "}
              <FaStar
                className="star-icon"
                style={{ color: "gold", fontSize: "17px" }}
              />{" "}
              <span>{averageRating}</span>
            </p>

            <span
              className="desc"
              style={{ marginTop: "-41px", marginLeft: "48px" }}
              ref={ratingRef}
            >
              {totalCount} reviews{" "}
              <img
                src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Mask_group-10.png?v=1677571152"
                alt=""
                style={{ width: "15px" }}
              />
            </span>
            <span className="name">{product?.title}</span>
            <span className="desc">{product?.desc}</span>
            <span className="price">&#8377;{product?.price?.toFixed(2)}</span>
            <span className="o_price">
              &#8377;{product?.o_price?.toFixed(2)}
            </span>
            <span className="discount">{product?.percent_off}% off</span>
            <br />

            <div>
              <span className="bold-color">Choose your colour:</span>{" "}
              {outerProductImg && <span>{product?.change}</span>}
              {changeColor && <span>{product?.change2}</span>}
            </div>
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
                setOuterProductImg(false);
                setChangeColor(true);
              }}
            >
              {}
            </button>
            <span className="divider" />
            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span onClick={decrement}>-</span>
                <span>{quantity}</span>
                <span onClick={increment}>+</span>
              </div>
              <button
                className="add-to-cart-button"
                onClick={() => {
                  handleAddToCart(data?.data?.[0], quantity);
                  setQuantity(1);
                }}
              >
                <FaCartPlus size={20} />
                ADD TO CART
              </button>
            </div>
            <span className="divider" />
            <div className="info-item">
              <span className="text-bold">
                Category:{" "}
                <span>{product?.categories?.data[0]?.attributes?.title}</span>
              </span>
              <span className="text-bold">
                Share:
                <span className="social-icons">
                  <a href="https://www.facebook.com">
                    <FaFacebookF size={16} />
                  </a>
                  <a href="https://www.twitter.com">
                    <FaTwitter size={16} />
                  </a>
                  <a href="https://www.instagram.com">
                    <FaInstagram size={16} />
                  </a>
                  <a href="https://www.linkedin.com">
                    <FaLinkedinIn size={16} />
                  </a>
                  <a href="https://www.pinterest.com">
                    <FaPinterest size={16} />
                  </a>
                </span>
              </span>
            </div>
            <div style={{ marginTop: "27px" }}>
              <span className="bold-color">Check Delivery</span>
              <br />
              <br />
              <div class="pincode-checker">
                <input
                  class="pincode-checker-input"
                  type="text"
                  maxlength="6"
                  value={pincode}
                  onKeyPress={handleKeyPress}
                  onKeyUp={handlePinisValid}
                  required
                  onChange={(e) => setPinCode(e.target.value)}
                  placeholder="Enter PIN Code"
                />
                <button
                  type="button"
                  class="pincode-checker-btn"
                  pincodeadded="true"
                  onClick={handlePinisValid}
                >
                  Change
                </button>
              </div>

              {checkPincode && pincode.length === 6 && (
                <div class="pincode-details">
                  <h6>
                    {deliveryMessage} and delivered by{" "}
                    <strong> {formattedDeliveryDate}</strong>
                  </h6>
                  <p>Order will be delivered by {deliveryDays}</p>
                </div>
              )}
              {loadingImg1 && (
                <img alt="" src={loadingImg} style={{ width: "8%" }} />
              )}
              {errormessage && (
                <div class="pincode-er">
                  Pincode not valid. Try another one.
                </div>
              )}
            </div>
          </div>
        </div>
        {product?.productdescimg?.data ? (
          <img
            src={
              process.env.REACT_APP_STRIPE_APP_DEV_URL +
                product?.productdescimg?.data[2]?.attributes?.url || ""
            }
            alt=""
            style={{ width: "100%" }}
          />
        ) : null}
        <div
          style={{
            backgroundImage:
              "url('https://cdn.shopify.com/s/files/1/0057/8938/4802/files/bg3_a423da99-1623-4563-b4bd-9632c1a9b46c.jpg?v=1641318514')",
          }}
        >
          <div className="content-heading">
            <h2>{product?.productname}</h2>
            <p style={{ fontWeight: 400 }}>{product?.productdesc}</p>
          </div>
        </div>
        <div
          style={{
            backgroundImage:
              "url('https://cdn.shopify.com/s/files/1/0057/8938/4802/files/bg3_a423da99-1623-4563-b4bd-9632c1a9b46c.jpg?v=1641318514')",
          }}
        >
          <div className="container-fluid">
            <div className="row">
              <div>
                {product?.productdescimg?.data ? (
                  <img
                    alt="boAt Airdopes 131 | Wireless Earbuds with upto 60 Hours Playback, 13mm Drivers, IWP Technology, 650mAh Charging Case - boAt Lifestyle"
                    loading="lazy"
                    src={
                      process.env.REACT_APP_STRIPE_APP_DEV_URL +
                        product?.productdescimg?.data[0]?.attributes?.url || ""
                    }
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              backgroundImage:
                "url('https://cdn.shopify.com/s/files/1/0057/8938/4802/files/bg3_a423da99-1623-4563-b4bd-9632c1a9b46c.jpg?v=1641318514')",
            }}
          >
            <h2 style={{ color: "#000000", fontWeight: 700 }}>
              {product?.product_specs}{" "}
            </h2>
            <p style={{ color: "#000000" }}>{product?.specs_desc}</p>
            <p>
              <span>&nbsp;</span>
            </p>
          </div>
          {product?.productdescimg?.data ? (
            <div>
              <img
                alt="boAt Airdopes 131 | Wireless Earbuds with upto 60 Hours Playback, 13mm Drivers, IWP Technology, 650mAh Charging Case - boAt Lifestyle"
                loading="lazy"
                className="custom_lazyload"
                src={
                  process.env.REACT_APP_STRIPE_APP_DEV_URL +
                    product?.productdescimg?.data[1]?.attributes?.url || ""
                }
              />
            </div>
          ) : null}
        </div>
        <RelatedProducts
          productId={id}
          categoryId={product.categories?.data[0]?.id}
        />
        <Ratings data={data} />
      </div>
    </div>
  );
};

export default SingleProduct;
