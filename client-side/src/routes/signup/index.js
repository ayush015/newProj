import React, { useState } from "react";
import { signup } from "../helper/apicalls";
import { Redirect } from "react-router-dom";
import Style from "./signup.module.css";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
const Signup = () => {
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { username, email, password, error, success } = value;

  const handleChange = (username) => (e) => {
    setValue({ ...value, error: false, [username]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValue({ ...value, error: false });
    signup({ username, email, password })
      .then((data) => {
        if (data.error) {
          setValue({ ...value, error: data.error, success: false });
        } else {
          setValue({
            ...value,
            username: "",
            email: "",
            password: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log("error in signup"));
  };
  const successMessage = () => {
    return (
      <div
        style={{
          display: success ? "block" : "none",
          width: "100%",
          height: "50px",
          color: "#fff",
          textAlign: "center",
          backgroundColor: "#000",
        }}
      >
        Account Created SuccessFully
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div
        style={{
          display: success ? "none" : "block ",
          width: "100%",
          height: "50px",
          color: "#fff",
          textAlign: "center",
          backgroundColor: "#000",
        }}
      >
        {error}
      </div>
    );
  };

  const redirect = () => {
    if (success) {
      return <Redirect to="/login"></Redirect>;
    }
  };

  return (
    <div className={Style.login}>
      <form>
        <h2>Signup</h2>
        {/* Username */}
        <FloatingLabel
          controlId="floatingInput"
          label="Username"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Jhon Doe"
            onChange={handleChange("username")}
            required
            name="username"
          />
        </FloatingLabel>
        {/* Email */}
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            placeholder="Email"
            type="email"
            onChange={handleChange("email")}
            required
            name="email"
          />
        </FloatingLabel>
        {/*  */}

        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handleChange("password")}
            required
            name="password"
          />
        </FloatingLabel>

        <Button varient="primary" onClick={onSubmit} type="submit">
          submit
        </Button>
      </form>
      {redirect()}
    </div>
  );
};

export default Signup;
