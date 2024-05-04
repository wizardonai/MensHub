import React, { DragEvent, useState } from "react";
import { hostnameProductor, styleMap } from "src/App";
import { DndProvider, useDrop, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../css/shakera.css";

const OrdersTable = ({
  colore,
  ordini,
  stato,
}: {
  colore: string;
  ordini: any;
  stato: string;
}) => {
  const [posX, setPosX] = useState(null);
  const [posY, setPosY] = useState(null);

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    console.log("Inizio del trascinamento");
    event.currentTarget.classList.add("dragging");
  };

  const handleDragEnd = (event: DragEvent<HTMLDivElement>) => {
    console.log("Fine del trascinamento");
    event.currentTarget.classList.remove("dragging");
  };

  return (
    <div
      style={{
        borderRadius: "25px",
        height: "100%",
        width: "100%",
        alignItems: "center",
        overflow: "auto",
        scrollbarWidth: "none",
        border: "10px solid " + colore,
      }}
      key={stato}
      onDragOver={(event: DragEvent<HTMLDivElement>) => {
        console.log("Drag over");
      }}
    >
      {ordini.map((ordine: any) => {
        if (ordine.stato_ordine === stato) {
          return (
            <div
              style={css.ordine}
              key={ordine.id_ordine}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              draggable
            >
              <p className="text-2xl w-1/2 select-none pointer-events-none">
                {ordine.id_ordine}
              </p>
              <p className="text-2xl relative w-1/2 text-right select-none pointer-events-none">
                x{ordine.num_prodotti}
              </p>
              <p className="w-1/2 select-none pointer-events-none">
                {ordine.ora_consegna}
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
