import React, { useEffect, useState } from "react";
import OrdersTable from "./components/OrdersTable";
import { styleMap } from "src/App";
import NavbarProductor from "./components/NavbarProductor";
import { useLoaderData } from "react-router-dom";
import OrdineCliccato from "./components/OrdineCliccato";
import { getOrdini } from "src/login/scripts/fetch";

const HomePageProductor = ({
  ordini,
  setOrdini,
}: {
  ordini: any;
  setOrdini: Function;
}) => {
  const [ordineTrascinato, setOrdineTrascinato] = useState<any>(null);
  const [ordineCliccato, setOrdineCliccato] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [prodotti, setProdotti] = useState<any>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      getOrdini(
        JSON.parse(localStorage.getItem("token") || '{"token":"asd"}')
      ).then((data) => {
        setOrdini(data);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page" style={css.page}>
      <div style={css.sidebar}>
        <NavbarProductor page="productorHome" />
      </div>
      <div style={css.centerPage}>
        <div style={css.containerList}>
          <p style={css.titolo}>Da fare</p>
          <OrdersTable
            colore="#d24a3c"
            ordini={ordini}
            setOrdini={setOrdini}
            stato="da fare"
            ordineTrascinato={ordineTrascinato}
            setOrdineTrascinato={setOrdineTrascinato}
            setOrdineCliccato={setOrdineCliccato}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            ordineCliccato={ordineCliccato}
            setProdotti={setProdotti}
          />
        </div>
        <div style={css.containerList}>
          <p style={css.titolo}>In corso</p>
          <OrdersTable
            colore="#e39320"
            ordini={ordini}
            setOrdini={setOrdini}
            stato="in corso"
            ordineTrascinato={ordineTrascinato}
            setOrdineTrascinato={setOrdineTrascinato}
            setOrdineCliccato={setOrdineCliccato}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            ordineCliccato={ordineCliccato}
            setProdotti={setProdotti}
          />
        </div>
        <div style={css.containerList}>
          <p style={css.titolo}>Ordine</p>
          {ordineCliccato !== null &&
          ordineCliccato.stato_ordine === "da fare" ? (
            <OrdineCliccato
              ordineCliccato={ordineCliccato}
              setOrdineCliccato={setOrdineCliccato}
              prodotti={prodotti}
              colore="#d24a3c"
              ordini={ordini}
              setOrdini={setOrdini}
            ></OrdineCliccato>
          ) : ordineCliccato !== null &&
            ordineCliccato.stato_ordine === "in corso" ? (
            <OrdineCliccato
              ordineCliccato={ordineCliccato}
              setOrdineCliccato={setOrdineCliccato}
              prodotti={prodotti}
              colore="#e39320"
              ordini={ordini}
              setOrdini={setOrdini}
            ></OrdineCliccato>
          ) : null}
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
  titolo: { fontSize: "130%", color: "#503431", fontWeight: "bold" },
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
