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
        <OrdersTable />
      </div>
    </div>
  );
};

const css: styleMap = {
  page: {
    backgroundColor: "white",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
  centerPage: { width: "90%", height: "100%" },
  sidebar: {
    display: "flex",
    width: "10%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default HomePageProductor;
