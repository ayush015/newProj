import React from "react";
import Style from "./Footer.module.css";
import { Link, withRouter } from "react-router-dom";
const Footer = () => (
  <footer className={Style.footer}>
    <ul>
      <li>
        <a
          href="https://instagram.com/with__aniket?igshid=YmMyMTA2M2Y="
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/aniket-anand-274a4b1b9"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </li>
      <li>
        <a
          href="https://github.com/aniket-002"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </li>
      <li>
        <Link to="/contactus">Contact us</Link>
      </li>
    </ul>
    <p>Created by Aniket Anand</p>
  </footer>
);

export default withRouter(Footer);
