import { Button, Card, Form, Input, Typography } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function CreateAccount({ setShowFooter }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setShowFooter(false);
  });

  const signUp = async () => {
    try {
      const url = `http://localhost:1337/api/auth/local/register`;
      console.log("url", url);
      if (username && email && password) {
        console.log("comin if block");
        const res = await axios.post(url, {
          username,
          password,
          email,
        });
        console.log("res", res);
        if (res) {
          toast.success(
            "Confirmation mail send successfully please varify to login"
          );
        }
      }
    } catch (error) {
      toast.error("Email is already ragistered try with new mailId");
    }
  };

  return (
    <Fragment>
      <Card title="SIGN UP" style={styles.card}>
        <Form name="basic" layout="vertical" autoComplete="off">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, type: "username" }]}
          >
            <Input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your valid email"
              required
            />
          </Form.Item>
          <Form.Item
            label="password"
            name="password"
            rules={[{ required: true, type: "password" }]}
          >
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </Form.Item>
          <Button
            style={styles.button}
            htmlType="submit"
            type="primary"
            onClick={signUp}
          >
            Sign up
          </Button>
        </Form>
        <Typography.Paragraph style={styles.helpText}>
          Already have an account? <Link to="/">Login</Link>
        </Typography.Paragraph>
      </Card>
    </Fragment>
  );
}
const styles = {
  card: {
    width: "400px",
    margin: "42px auto",
  },
  button: {
    width: "100%",
  },
  helpText: {
    textAlign: "center",
  },
};
export default CreateAccount;
