import React from "react";
import { Checkbox } from "../../../shadcn/CheckBox";
import { styleMap } from "src/App";

const OrdersTable = () => {
  return (
    <div style={css.container}>
      <table style={css.tabella}>
        <thead>
          <tr>
            <th></th>
            <th>Codice</th>
            <th>Ora</th>
            <th>Totale</th>
            <th>Pagato</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Checkbox />
            </td>
            <td>
              <p>Pagato</p>
            </td>
          </tr>
          <tr>
            <td>
              <Checkbox />
            </td>
            <td>
              <p>Non pagato</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const css: styleMap = {
  container: {
    border: "1px solid rgba(184, 200, 227, .7)",
    borderOpacity: "0.7",
    borderRadius: "7px",
    height: "100%",
    width: "100%",
  },
  tabella: {},
};

export default OrdersTable;
