import React from "react";
import OrdersTable from "./components/OrdersTable";
import { styleMap } from "src/App";
import NavbarProductor from "./components/NavbarProductor";

const HomePageProductor = () => {
  return (
    <div className="page" style={css.page}>
      <div style={css.sidebar}>
        <NavbarProductor page="productorHome" />
      </div>
      <div style={css.centerPage}>
        <div style={css.containerList}>
          <p style={css.titolo}>Da fare</p>
          <OrdersTable colore="#ec3837" />
        </div>
        <div style={css.containerList}>
          <p style={css.titolo}>In corso</p>
          <OrdersTable colore="#f3d657" />
        </div>
        <div style={css.containerList}>
          <p style={css.titolo}>Completate</p>
          <OrdersTable colore="#90a272" />
        </div>
      </div>
    </div>
  );
};

const css: styleMap = {
  page: {
    backgroundColor: "#fee8d8",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
  centerPage: {
    width: "90%",
    height: "100%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  sidebar: {
    display: "flex",
    width: "10%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "2%",
  },
  titolo: { fontSize: "130%", color: "black" },
  containerList: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "80svh",
    margin: "0% 2%",
    overflow: "auto",
  },
};

export default HomePageProductor;
