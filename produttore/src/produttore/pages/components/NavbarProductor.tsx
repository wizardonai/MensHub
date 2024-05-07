import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styleMap } from "../../../App";
import { hostnameProductor } from "../../../App";
import { useTheme } from "next-themes";

const NavbarProductor = ({ page }: { page: string }) => {
  const [isHoveredHome, setIsHoveredHome] = React.useState(false);
  const [isHoveredMenu, setIsHoveredMenu] = React.useState(false);
  const [isHoveredBalance, setIsHoveredBalance] = React.useState(false);
  const [isHoveredProfile, setIsHoveredProfile] = React.useState(false);
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  function navigateProductorHome() {
    navigate("/productorHome");
  }
  function navigateProductorMenu() {
    navigate("/productorMenu");
  }
  function navigateBalance() {
    navigate("/balance");
  }
  function navigateProductorProfile() {
    navigate("/productorProfile");
  }

  //
  //
  //stili
  //
  const css: styleMap = {
    navbar: {
      height: "80svh",
      width: "80%",
      backgroundColor: "#503431",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
      verticalAlign: "middle",
      borderRadius: "25px",
      boxShadow:
        resolvedTheme === "dark"
          ? "3px 3px 17px -3px rgba(255, 255, 255, 0.1)"
          : "3px 3px 17px -3px rgba(0, 0, 0, 0.30)",
    },
    navbarDiv: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      margin: "6svh 0px",
    },
    navbarDivImg: {
      width: "40px",
      height: "40px",
      cursor: "default",
      backgroundColor: "transparent",
      filter:
        "invert(96%) sepia(6%) saturate(1440%) hue-rotate(314deg) brightness(106%) contrast(75%)",

      userSelect: "none",
    },
    navbarDivImgHover: {
      width: "55px",
      height: "55px",
      cursor: "pointer",
      margin: "-7.5px 0px",
      borderRadius: "5px",
      filter:
        "invert(96%) sepia(6%) saturate(1440%) hue-rotate(314deg) brightness(106%) contrast(75%)",
      // transition: "width 0.3s ease, height 0.3s ease",

      userSelect: "none",
    },
  };

  return (
    <div style={css.navbar} className="navbar">
      <div
        id="navbarProductorHome"
        onClick={navigateProductorHome}
        style={css.navbarDiv}
      >
        <img
          src={hostnameProductor + "productorHome.png"}
          alt=""
          style={isHoveredHome ? css.navbarDivImgHover : css.navbarDivImg}
          onMouseEnter={() => setIsHoveredHome(true)}
          onMouseLeave={() => setIsHoveredHome(false)}
        />
      </div>
      <div
        id="navbarProductorMenu"
        onClick={navigateProductorMenu}
        style={css.navbarDiv}
      >
        <img
          src={hostnameProductor + "productorMenu.png"}
          alt=""
          style={isHoveredMenu ? css.navbarDivImgHover : css.navbarDivImg}
          onMouseEnter={() => setIsHoveredMenu(true)}
          onMouseLeave={() => setIsHoveredMenu(false)}
        />
      </div>

      <div
        id="navbarProductorProfile"
        onClick={navigateProductorProfile}
        style={{ ...css.navbarDiv }}
      >
        <img
          src={hostnameProductor + "productorProfile.png"}
          alt=""
          style={isHoveredProfile ? css.navbarDivImgHover : css.navbarDivImg}
          onMouseEnter={() => setIsHoveredProfile(true)}
          onMouseLeave={() => setIsHoveredProfile(false)}
        />
      </div>
    </div>
  );
};

export default NavbarProductor;
