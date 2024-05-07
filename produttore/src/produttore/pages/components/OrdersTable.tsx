import React, { DragEvent, useState } from "react";
import { hostnameProductor, styleMap } from "src/App";
import { DndProvider, useDrop, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../css/shakera.css";
import { updateOrdine } from "src/login/scripts/fetch";

const OrdersTable = ({
  colore,
  ordini,
  setOrdini,
  stato,
  ordineTrascinato,
  setOrdineTrascinato,
  setOrdineCliccato,
  isDragging,
  setIsDragging,
}: {
  colore: string;
  ordini: any;
  setOrdini: Function;
  stato: string;
  ordineTrascinato: any;
  setOrdineTrascinato: Function;
  setOrdineCliccato: Function;
  isDragging: boolean;
  setIsDragging: Function;
}) => {
  const handleDragStart = (event: DragEvent<HTMLDivElement>, ordine: any) => {
    console.log("Inizio del trascinamento");
    event.currentTarget.classList.add("dragging");
    setOrdineTrascinato(ordine);
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEvent<HTMLDivElement>) => {
    console.log("Fine del trascinamento");
    event.currentTarget.classList.remove("dragging");
    setOrdineTrascinato(null);
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    console.log("Ciao");
  };

  return (
    <>
      <img
        src={hostnameProductor + "drop.png"}
        className="absolute h-[15%] inset-y-[35svh] left-1/2 transform -translate-x-1/2"
        style={{
          pointerEvents: "none",
          opacity:
            isDragging && ordineTrascinato.stato_ordine !== stato
              ? "100%"
              : "0%",
        }}
      />
      <div
        id="target"
        style={{
          borderRadius: "25px",
          height: "100%",
          width: "100%",
          alignItems: "center",
          overflow: "auto",
          scrollbarWidth: "none",
          border: "10px solid " + colore,
          opacity:
            isDragging && ordineTrascinato.stato_ordine !== stato
              ? "50%"
              : "100%",
        }}
        key={stato}
        onDrop={handleDrop}
        onDragOver={() => {
          if (ordineTrascinato.stato_ordine !== stato) {
            //cambia stato ordine
            ordineTrascinato.stato_ordine = stato;

            updateOrdine(
              JSON.parse(localStorage.getItem("token") || '{"token": "scuuuu"}')
                .token,
              ordineTrascinato.id_ordine,
              stato
            )
              .then((response) => {
                console.log(response);
              })
              .catch((err: any) => {
                console.log(err);
              });
          }
        }}
      >
        {ordini.map((ordine: any) => {
          if (ordine.stato_ordine === stato) {
            return (
              <div
                style={css.ordine}
                key={ordine.id_ordine}
                onDragStart={(event) => handleDragStart(event, ordine)}
                onDragEnd={handleDragEnd}
                onClick={() => setOrdineCliccato(ordine)}
                draggable
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
                  <p className="pr-1 select-none pointer-events-none">pagato</p>
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
          }
        })}
      </div>
    </>
  );
};

const css: styleMap = {
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

export default OrdersTable;
