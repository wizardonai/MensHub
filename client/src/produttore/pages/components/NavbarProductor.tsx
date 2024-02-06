import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styleMap } from "../../../App";
import { hostnameProductor } from "../../../App";
import { useTheme } from "next-themes";

const NavbarProductor = ({ page }: { page: string }) => {
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
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
      verticalAlign: "middle",
      borderRadius: "25px",
      boxShadow:
        resolvedTheme === "dark"
          ? "3px 3px 17px -3px rgba(0, 0, 0, 0.30)"
          : "3px 3px 17px -3px rgba(255, 255, 255, 0.1)",
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
          style={css.navbarDivImg}
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
          style={css.navbarDivImg}
        />
      </div>
      <div id="navbarBalance" onClick={navigateBalance} style={css.navbarDiv}>
        <img
          src={hostnameProductor + "balance.png"}
          alt=""
          style={css.navbarDivImg}
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
          style={css.navbarDivImg}
        />
      </div>
    </div>
  );
};

export default NavbarProductor;
