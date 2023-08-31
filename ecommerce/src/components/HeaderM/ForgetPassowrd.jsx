import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
function ForgotPassword({ setShowFooter }) {
  const [email, setEmail] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    setShowFooter(false);
  });

  const handleSubmit = async () => {
    console.log("email", email);
    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/forgot-password",
        { email }
      );
      toast.success("Reset password is send registered mail");
      console.log("response", response);
    } catch (error) {
      toast.error(error.response);
      console.log("An error occurred:", error.response);
    }
  };

  return (
    <Card title="Forgot Password" style={styles.card}>
      <Form
        name="basic"
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="Email address" onChange={handleEmailChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={styles.button}>
            Send Reset Password Link
          </Button>
        </Form.Item>
      </Form>
      <p style={styles.helpText}>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </Card>
  );
}

const styles = {
  card: {
    width: "400px",
    margin: "0 auto",
    marginTop: "100px",
  },
  button: {
    width: "100%",
  },
  helpText: {
    textAlign: "center",
  },
};

export default ForgotPassword;
