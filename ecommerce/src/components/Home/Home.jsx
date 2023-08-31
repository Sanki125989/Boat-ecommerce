import React, { useEffect, useContext } from "react";

import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";

const Home = ({ setShowFooter }) => {
  const {
    products,
    setProducts,
    categories,
    setCategories,
    setSearchModal,
    setLogin,
  } = useContext(Context);
  useEffect(() => {
    setShowFooter(true);
    fetchData();

    setLogin(false);
    // eslint-disable-next-line
  }, []);

  const fetchData = () => {
    Promise.all([getProducts(), getCategories()])
      .then(([productsResponse, categoriesResponse]) => {
        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getProducts = () => {
    return fetchDataFromApi("/api/products?populate=*");
  };

  const getCategories = () => {
    return fetchDataFromApi("/api/categories?populate=*");
  };

  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
          <Category
            headingText="Category"
            categories={categories}
            setSearchModal={setSearchModal}
          />
          <Products headingText="Popular Products" products={products} />
        </div>
      </div>
    </div>
  );
};

export default Home;
