import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../helper/apicalls";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Style from "./Login.module.css";
import Button from "react-bootstrap/Button";

const Login = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
    redirect: false,
  });

  const { email, password, error, redirect } = value;

  const handleChange = (name) => (e) => {
    setValue({ ...value, error: false, [name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setValue({ ...value, error: false });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValue({ ...value, error: data.error });
      } else {
        authenticate(data, () => {
          setValue({ ...value, redirect: true });
        });
      }
    });
  };

  const errorMessage = () => {
    return (
      <div
        style={{
          display: error ? "" : "none",
          width: "100%",
          height: "50px",
          color: "#000",
          textAlign: "center",
          backgroundColor: "red",
        }}
      >
        {error}
      </div>
    );
  };

  const performRedirect = () => {
    if (redirect) {
      if (isAuthenticated()) {
        return <Redirect to="/"></Redirect>;
      }
    }
  };
  return (
    <div className={Style.login}>
      <form>
        <h2>Login</h2>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            onChange={handleChange("email")}
            name="email"
            required
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          type="password"
          onChange={handleChange("password")}
          required
          name="password"
        >
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>
        <Button variant="primary" onClick={onSubmit} type="submit">
          Login
        </Button>
      </form>
      {performRedirect()}
    </div>
  );
};

export default Login;
