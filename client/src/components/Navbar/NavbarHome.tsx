import React from "react";
import {  Link } from "react-router-dom";

import styles from "./NavbarHome.module.scss";

const NavbarHome = () => {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.navbar}>
        <div className={styles.logo}>Logo</div>

        <div className={styles.navItems}>
          <Link
            to={"/search-nationalid-details"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <li>National ID </li>
          </Link>

          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            <li> Login </li>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarHome;
