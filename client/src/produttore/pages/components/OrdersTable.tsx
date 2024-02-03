import React from "react";
import { Checkbox } from "../../../shadcn/CheckBox";
import { styleMap } from "src/App";

const OrdersTable = () => {
  return (
    <table style={css.tabella}>
      <thead>
        <tr>
          <th>
            <Checkbox />
          </th>{" "}
          <th>Codice</th> <th>Ora</th>
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
  );
};

const css: styleMap = {
  tabella: { border: "1px solid grey", borderRadius: "5px" },
};

export default OrdersTable;
