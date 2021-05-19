import React from "react";
import Style from "./Footer.module.css";

const Footer = () => (
  <footer className={Style.footer}>
    <ul>
      <li>
        <a
          href="https://www.instagram.com/ayush.sri/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/thecodemancer"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      </li>
      <li>
        <a
          href="https://github.com/ayush015"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </li>
      <li>
        <a
          href="https://ayush015.github.io/Ayush-Srivastava/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Website
        </a>
      </li>
    </ul>
    <p>Created by Ayush Srivastava</p>
  </footer>
);

export default Footer;
