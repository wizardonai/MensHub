import { hostnameProductor, styleMap } from "src/App";

import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import NavbarProductor from "./components/NavbarProductor";
import OrdersTable from "./components/OrdersTable";
import OrdineCliccato from "./components/OrdineCliccato";
import { getOrdine } from "src/login/scripts/fetch";

const CompletedOrders = () => {
  const dati: any = useLoaderData();
  const [ordineCliccato, setOrdineCliccato] = useState<any>(null);
  const [prodotti, setProdotti] = useState<any>([]);

  if (!dati) return <p>CARICAMENTO</p>;

  return (
    <div className="page" style={css.page}>
      <div style={css.sidebar}>
        <NavbarProductor page="productorHome" />
      </div>
      <div style={css.centerPage}>
        <div style={css.containerList}>
          <p style={css.titolo}>In corso</p>

          <>
            <div
              id="target"
              style={{
                borderRadius: "25px",
                height: "100%",
                width: "100%",
                alignItems: "center",
                overflow: "auto",
                scrollbarWidth: "none",
                border: "10px solid #608b46",
              }}
            >
              {dati.map((ordine: any) => {
                return (
                  <div
                    style={css.ordine}
                    className="transform transition-transform hover:scale-105 hover:cursor-pointer"
                    key={ordine.id_ordine}
                    onClick={() => {
                      setOrdineCliccato(ordine);
                      getOrdine(
                        JSON.parse(
                          localStorage.getItem("token") ||
                            '{"token": "lucaChing"}'
                        ),
                        JSON.parse(JSON.stringify(ordine.id_ordine))
                      )
                        .then((response) => {
                          setProdotti(response);
                        })
                        .catch((err: any) => {
                          console.log(err);
                        });
                    }}
                  >
                    <p className="text-2xl w-1/2 select-none pointer-events-none">
                      {ordine.id_ordine}
                    </p>
                    <p className="text-2xl relative w-1/2 text-right select-none pointer-events-none">
                      x{ordine.num_prodotti}
                    </p>
                    <p className="w-1/2 select-none pointer-events-none">
                      {ordine.ora_consegna.split(":").slice(0, 2).join(":")}
                    </p>
                    <div className="w-1/2 relative flex justify-end">
                      <p className="pr-1 select-none pointer-events-none">
                        pagato
                      </p>
                      {ordine.pagato === 0 ? (
                        <img
                          src={hostnameProductor + "check.png"}
                          style={css.check}
                          className="select-none pointer-events-none"
                        />
                      ) : (
                        <img
                          src={hostnameProductor + "X.png"}
                          style={css.x}
                          className="select-none pointer-events-none"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        </div>
        <div style={css.containerList}>
          <p style={css.titolo}>Ordine</p>
          {ordineCliccato !== null ? <></> : null}
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
  ordine: {
    backgroundColor: "#fffae7",
    width: "90%",
    height: "10svh",
    borderRadius: "15px",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "5px 15px",
    margin: "auto",
    marginTop: "10px",
    marginBottom: "10px",
    boxShadow: "3px 3px 17px -3px rgba(0, 0, 0, 0.30)",
    cursor: "pointer",
  },
  check: {
    width: "20px",
    height: "20px",
    filter:
      "invert(45%) sepia(21%) saturate(931%) hue-rotate(57deg) brightness(103%) contrast(86%)",
  },
  x: {
    width: "17px",
    height: "17px",
    marginTop: "2px",
    marginLeft: "3px",
    filter:
      "invert(39%) sepia(23%) saturate(3763%) hue-rotate(334deg) brightness(87%) contrast(88%)",
  },
};

export default CompletedOrders;
