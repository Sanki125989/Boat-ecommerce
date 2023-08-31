import { useEffect } from "react";
import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "../utils/api";
export const Context = createContext();

const AppContext = ({ children }) => {
  const [categories, setCategories] = useState();
  const [separateRating, setSeparateRating] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [products, setProducts] = useState();
  const [averageRating, setAverageRating] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserPanel, setShowUserPanel] = useState(false);
  const [showfooter, setShowFooter] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [IsAuthorised, setIsAuthorised] = useState(false);
  const [changeColor, setChangeColor] = useState(false);
  const [outerProductImg, setOuterProductImg] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [showLogin, setLogin] = useState(false);
  const [formattedDeliveryDate, setformattedDeliveryDate] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("Free Delivery");
  const location = useLocation();
  const [storeFetchData, setStoreFetchData] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const storgeItem = JSON.parse(localStorage.getItem("cartItemsstorage"));

  useEffect(() => {
    let count = 0;
    let count1 = 0;

    cartItems?.map((item) => (count += item.attributes.quantity));
    setCartCount(count);
    if (storgeItem) {
      storgeItem?.map((item) => (count1 += item.attributes.quantity));
      setCartCount(count1);
    }

    let subTotal = 0;
    cartItems.map(
      (item) => (subTotal += item.attributes.price * item.attributes.quantity)
    );

    setCartSubTotal(subTotal);
  }, [cartItems, storgeItem]);

  const handleAddToCart = (product, quantity) => {
    let items = [...cartItems];

    if (storgeItem) {
      items = [...cartItems];
    }

    let index = items?.findIndex((p) => p.id === product?.id);
    if (index !== -1) {
      items[index].attributes.quantity += quantity;
    } else {
      product.attributes.quantity = quantity;
      items = [...items, product];
    }
    setCartItems(items);
    localStorage.setItem("cartItemsstorage", JSON.stringify(items));
  };

  const handleRemoveFromCart = (product) => {
    let items = [...cartItems];
    if (storgeItem) {
      items = [...cartItems, ...storgeItem];
    }
    items = items?.filter((p) => p.id !== product?.id);
    setCartItems(items);
    localStorage.removeItem("cartItemsstorage", JSON.stringify(items));
  };

  const handleCartProductQuantity = (type, product) => {
    let items = [...cartItems];
    if (storgeItem) {
      items = [...cartItems];
    }
    let index = items?.findIndex((p) => p.id === product?.id);
    if (type === "inc") {
      items[index].attributes.quantity += 1;
    } else if (type === "dec") {
      if (items[index].attributes.quantity === 1) return;
      items[index].attributes.quantity -= 1;
    }
    setCartItems(items);
    localStorage.setItem("cartItemsstorage", JSON.stringify(items));
  };

  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );
  const handlePayment = async () => {
    if (IsAuthorised) {
      setShowUserPanel(false);
      try {
        console.log("this is calling from context");

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
  };
  return (
    <Context.Provider
      value={{
        products,
        setProducts,
        categories,
        averageRating,
        setAverageRating,
        setCategories,
        storeFetchData,
        totalCount,
        setTotalCount,
        setStoreFetchData,
        separateRating,
        setSeparateRating,
        cartItems,
        searchModal,
        setSearchModal,
        showfooter,
        setShowFooter,
        showUserPanel,
        setShowUserPanel,
        setCartItems,
        handlePayment,
        cartCount,
        setCartCount,
        showCart,
        setShowCart,
        cartSubTotal,
        setCartSubTotal,
        changeColor,
        outerProductImg,
        setOuterProductImg,
        formattedDeliveryDate,
        setformattedDeliveryDate,
        setChangeColor,
        IsAuthorised,
        deliveryMessage,
        setDeliveryMessage,
        showLogin,
        setLogin,
        scrolled,
        setScrolled,
        setIsAuthorised,
        handleAddToCart,
        handleRemoveFromCart,
        handleCartProductQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
