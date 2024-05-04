import React from "react";
import OrdersTable from "./components/OrdersTable";
import { styleMap } from "src/App";
import NavbarProductor from "./components/NavbarProductor";
import { useLoaderData } from "react-router-dom";

const HomePageProductor = () => {
  const dati: any = useLoaderData();

  if (!dati) return <p>CARICAMENTO</p>;

  return (
    <div className="page" style={css.page}>
      <div style={css.sidebar}>
        <NavbarProductor page="productorHome" />
      </div>
      <div style={css.centerPage}>
        <div style={css.containerList}>
          <p style={css.titolo}>Da fare</p>
          <OrdersTable colore="#d24a3c" ordini={dati} stato="attivo" />
        </div>
        <div style={css.containerList}>
          <p style={css.titolo}>In corso</p>
          <OrdersTable colore="#e39320" ordini={dati} stato="in corso" />
        </div>
        <div style={css.containerList}>
          <p style={css.titolo}>Ordine</p>
        </div>
      </div>
    </div>
  );
};

const css: styleMap = {
  page: {
    backgroundColor: "#dfd9c9",
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
    height: "84svh",
    margin: "0% 2%",
    position: "relative",
    top: "-2svh ",
  },
};

export default HomePageProductor;
