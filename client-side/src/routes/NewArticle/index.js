import React, { useState } from "react";
import Style from "./NewArticle.module.css";
import { isAuthenticated } from "../helper/apicalls";
import { newArticle } from "./helper/apicall";
import { Redirect } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const NewArticle = () => {
  const [post, setPost] = useState({
    image: "",
    title: "",
    description: "",
    markdown: "",
    user: "",
    redirect: false,
  });
  const {
    user: { _id },
    token,
  } = isAuthenticated();

  const { image, title, description, markdown, user, redirect } = post;
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setError("");
    setPost({
      ...post,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    newArticle(_id, token, { image, title, description, markdown, user: _id })
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setPost({
            image: "",
            title: "",
            description: "",
            markdown: "",
            redirect: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };
  const performRedirect = () => {
    if (redirect) {
      if (isAuthenticated()) {
        return <Redirect to="/"></Redirect>;
      }
    }
  };

  return (
    <form className={Style.form}>
      <FloatingLabel
        controlId="floatingInput"
        label="Url image layout"
        className="mb-3"
      >
        <Form.Control
          type="text"
          required
          placeholder=""
          name="image"
          value={post.image}
          onChange={handleChange}
        />
      </FloatingLabel>
      {/*  */}
      <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
        <Form.Control
          type="text"
          required
          placeholder="Title"
          value={post.title}
          name="title"
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Description"
        className="mb-3"
      >
        <Form.Control
          type="text"
          required
          placeholder="Description"
          value={post.description}
          name="description"
          onChange={handleChange}
        />
      </FloatingLabel>

      <textarea
        required
        value={post.markdown}
        name="markdown"
        placeholder="mark down...."
        onChange={handleChange}
      />

      <div>
        <Button
          variant="primary"
          onClick={onSubmit}
          type="submit"
          style={{ marginTop: "1rem" }}
        >
          {" "}
          create
        </Button>
      </div>
      {performRedirect()}
    </form>
  );
};

export default NewArticle;
