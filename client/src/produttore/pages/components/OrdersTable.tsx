import React from "react";
import { Checkbox } from "../../../shadcn/CheckBox";
import { styleMap } from "src/App";

const OrdersTable = ({ colore }: { colore: string }) => {
  return (
    <div
      style={{
        backgroundColor: colore,
        borderRadius: "25px",
        height: "100%",
        width: "100%",
        alignItems: "center",
        overflow: "auto",
        scrollbarWidth: "none",
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
    backgroundColor: "#ffede1",
    width: "85%",
    height: "23svh",
    borderRadius: "25px",
    margin: "auto",
    marginTop: "3svh",
    marginBottom: "2svh",
  },
};

export default OrdersTable;
