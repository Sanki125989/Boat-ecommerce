import { React, useState, useEffect, useContext } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Context } from "../../../utils/context";
import { useNavigate } from "react-router-dom";
const Banner = () => {
  const interval = 10000; // Interval between slides in milliseconds
  const { products } = useContext(Context);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      const nextSlide = (currentSlide + 1) % 3;
      setCurrentSlide(nextSlide);
    }, interval);
    return () => clearInterval(timer);
  }, [currentSlide, interval]);
  return (
    <Carousel
      showArrows={true}
      autoPlay={false}
      showThumbs={false}
      selectedItem={currentSlide}
    >
      <div
        onClick={() => {
          navigate(`/product/${products?.[7].id}`);
        }}
      >
        <img
          src="https://www.boat-lifestyle.com/cdn/shop/files/alpha_desktop_999_1400x.jpg?v=1688544511"
          alt="Slide 1"
        />
      </div>
      <div
        onClick={() => {
          navigate(`/product/${products?.[6].id}`);
        }}
      >
        <img
          src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/genesis_desktop_1799_900x.jpg?v=1685557646"
          alt="Slide 2"
        />
      </div>
      <div
        onClick={() => {
          navigate(`/product/${products?.[0].id}`);
        }}
      >
        <img
          src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/purple_desktop_900x.jpg?v=1685006383"
          alt="Slide 3"
        />
      </div>
    </Carousel>
  );
};

export default Banner;
