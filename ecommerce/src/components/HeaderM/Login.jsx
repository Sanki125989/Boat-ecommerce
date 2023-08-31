import { Button, Form, Input, Typography } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import "./Login.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { storeUser } from "./helpers";
import { useContext } from "react";
import { Context } from "../../utils/context.js";

const initialUser = { password: "", identifier: "" };

const Login = ({ setLogin }) => {
  const { setIsAuthorised, setShowCart } = useContext(Context);
  const [user, setUser] = useState(initialUser);
  // const navigate = useNavigate();

  useEffect(() => {});
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };
  const handleLogin = async () => {
    const url = `http://localhost:1337/api/auth/local`;
    try {
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);
        if (data.jwt) {
          storeUser(data);
          console.log("stored User", data);

          toast.success("Logged in successfully!");
          setUser(initialUser);
          setLogin(false);
          setIsAuthorised(true);
          const button = document.getElementById("checkout-cta");
          console.log("redirecting to checkout", button.click());
          setShowCart(false);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="cart-panel">
      <div className="opac-layer"></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading-login">Login Page</span>
          <span className="close-btn" onClick={() => setLogin(false)}>
            <MdClose className="close-btn" />
            <span className="text">close</span>
          </span>
        </div>
        <Form
          name="basic"
          layout="vertical"
          onChange={handleChange}
          autoComplete="off"
          className="Login-form"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, type: "username" }]}
          >
            <Input
              name="identifier"
              placeholder="Email address"
              value={user.identifier}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, type: "password" }]}
          >
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login_submit_btn"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Typography.Paragraph style={{ textAlign: "center" }}>
            New to boAt?{" "}
            <Link to="/createAccount" onClick={() => setLogin(false)}>
              Create an account
            </Link>
          </Typography.Paragraph>
          <Typography.Paragraph style={{ textAlign: "center" }}>
            Forgot password{" "}
            <Link to="/forgetPassword" onClick={() => setLogin(false)}>
              Click here
            </Link>
          </Typography.Paragraph>
        </Form>
      </div>
    </div>
  );
};

export default Login;
