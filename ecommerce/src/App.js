import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/HeaderM/Header";
import AppContext from "./utils/context";
import Footer from "./components/Footer/Footer";
import CreateAccount from "./components/HeaderM/CreateAccount";
import ForgetPassword from "./components/HeaderM/ForgetPassowrd";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import ThankYouPopup from "./components/Thankyou/ThankYouPopup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "../src/components/HeaderM/ResetPassword";
function App() {
  const [showfooter, setShowFooter] = useState(false);
  return (
    <BrowserRouter>
      <AppContext>
        <Header />
        <Routes>
          <Route path="/" element={<Home setShowFooter={setShowFooter} />} />
          <Route
            path="/createAccount"
            element={<CreateAccount setShowFooter={setShowFooter} />}
          />
          <Route
            path="/forgetPassword"
            element={<ForgetPassword setShowFooter={setShowFooter} />}
          />
          <Route
            path="/resetpassword"
            element={<ResetPassword setShowFooter={setShowFooter} />}
          />
          <Route path="/product/:id" element={<SingleProduct />} />

          <Route path="/category/:id" element={<Category />} />
          <Route
            exact
            path="/thank-you"
            element={<ThankYouPopup setShowFooter={setShowFooter} />}
          />
        </Routes>
      </AppContext>
      {showfooter && <Newsletter />}
      {showfooter && <Footer />}
      <ToastContainer
        position="top-center"
        autoClose={900}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
