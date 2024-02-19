import React from "react";
import { Checkbox } from "../../../shadcn/CheckBox";
import { styleMap } from "src/App";

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
      <div style={css.ordine}></div>
      <div style={css.ordine}></div>
      <div style={css.ordine}></div>
      <div style={css.ordine}></div>
      <div style={css.ordine}></div>
      {/* <table style={css.tabella}>
        <thead>
          <tr style={css.tr}>
            <th></th>
            <th>Codice</th>
            <th>Ora</th>
            <th>Totale</th>
            <th>Pagato</th>
            <th>:</th>
          </tr>
        </thead>
        <tbody>
          <tr style={css.tr}>
            <td>
              <Checkbox />
            </td>
            <td>6969</td>
            <td>12:12</td>
            <td>69,69€</td>
            <td>X</td>
            <td></td>
          </tr>
          <tr>
            <td>
              <Checkbox />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
};

const css: styleMap = {
  ordine: {
    backgroundColor: "#fceeed",
    width: "90%",
    height: "10svh",
    borderRadius: "25px",
    margin: "auto",
    marginTop: "10px",
    marginBottom: "10px",
    boxShadow: "3px 3px 17px -3px rgba(0, 0, 0, 0.30)",
  },
};

export default OrdersTable;
