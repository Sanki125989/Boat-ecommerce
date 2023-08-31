import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ResetPassword({ setShowFooter }) {
  const [code, setCode] = useState(0);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setShowFooter(false);
  });
  const handleSubmit = async () => {
    console.log("code", code);
    console.log("passsowrd", password);
    console.log("passwordConfirmation", passwordConfirmation);

    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/reset-password",
        {
          code,
          password,
          passwordConfirmation,
        }
      );
      toast.success("Password is updated successfully");
      navigate("/");
      console.log("response", response);
    } catch (error) {
      toast.error(error.response);
      console.log("An error occurred:", error.response);
    }
  };

  return (
    <Card title="Reset Password" style={styles.card}>
      <Form
        name="basic"
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Code"
          name="code"
          rules={[{ required: true, type: "code" }]}
        >
          <Input
            name="code"
            placeholder="Enter Code"
            onChange={(e) => setCode(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, type: "password" }]}
        >
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="passwordConfirmation"
          rules={[{ required: true, type: "passwordConfirmation" }]}
        >
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Enter Confirm Password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={styles.button}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
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

export default ResetPassword;
