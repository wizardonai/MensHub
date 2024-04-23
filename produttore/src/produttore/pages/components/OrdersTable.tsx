import React from "react";
import { Checkbox } from "../../../shadcn/CheckBox";
import { hostnameProductor, styleMap } from "src/App";

const OrdersTable = ({ colore }: { colore: string }) => {
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
    >
      <div style={css.ordine}>
        <p className="text-2xl w-1/2">01234</p>
        {/* testo a sistra */}
        <p className="text-2xl relative w-1/2 text-right">x4</p>
        <p className="w-1/2">11:56</p>
        <div className="w-1/2 relative flex justify-end">
          <p className="pr-1">pagato </p>
          <img src={hostnameProductor + "check.png"} style={css.check} />
        </div>
      </div>
      <div style={css.ordine}></div>
      <div style={css.ordine}></div>
      <div style={css.ordine}></div>
      <div style={css.ordine}></div>
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
  },
  check: {
    width: "20px",
    height: "20px",
    filter:
      "invert(45%) sepia(21%) saturate(931%) hue-rotate(57deg) brightness(103%) contrast(86%)",
  },
};

export default OrdersTable;
