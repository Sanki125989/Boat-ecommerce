import { TbSearch } from "react-icons/tb";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../Header/Search/Search";
import { Button } from "@mui/material";
import Login from "./Login";
import { CgShoppingCart } from "react-icons/cg";
import "./Header.scss";
import Cart from "../Cart/Cart";
import { Context } from "../../utils/context";
import ShowProfile from "./ShowProfile";

const Header = () => {
  const navigate = useNavigate();
  const { cartCount, setIsAuthorised, searchModal, setSearchModal } =
    useContext(Context);
  const {
    IsAuthorised,
    showLogin,
    setLogin,
    scrolled,
    setScrolled,
    showCart,
    setShowCart,
  } = useContext(Context);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    // Check local storage for user data
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    console.log("showCart", showCart);

    if (localStorageData) {
      setIsAuthorised(true);
    }
    window.addEventListener("scroll", handleScroll);
  });

  return (
    <>
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <img
            src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/boAt_logo_small.svg?v=1682421543"
            alt="Logo"
            onClick={() => navigate("/")}
          />
          <div className="right">
            <TbSearch onClick={() => setSearchModal(true)} />
            {IsAuthorised ? (
              <div>
                <ShowProfile />
              </div>
            ) : (
              <Button className="primary " onClick={() => setLogin(true)}>
                Login
              </Button>
            )}
            <span className="cart-icon">
              <CgShoppingCart
                onClick={() => {
                  setShowCart(true);
                }}
              />
              {!!cartCount && <span>{cartCount}</span>}
            </span>
          </div>
        </div>
      </header>
      {showCart && <Cart setShowCart={setShowCart} />}
      {showLogin && <Login setLogin={setLogin} />}
      {searchModal && <Search setSearchModal={setSearchModal} />}{" "}
    </>
  );
};

export default Header;
