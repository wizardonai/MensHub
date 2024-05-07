import { useState } from "react";
import { getOrdine } from "src/login/scripts/fetch";

const OrdineCliccato = ({
  colore,
  ordineCliccato,
  setOrdineCliccato,
}: {
  colore: string;
  ordineCliccato: any;
  setOrdineCliccato: Function;
}) => {
  let ordineVar = {
    id_ordine: ordineCliccato.id_ordine,
  };

  //   console.log(
  //     JSON.parse(localStorage.getItem("token") || '{"token": "lucaChing"}')
  //   );
  //   getOrdine(
  //     JSON.parse(localStorage.getItem("token") || '{"token": "lucaChing"}').token,
  //     JSON.parse(JSON.stringify(ordineVar))
  //   )
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((err: any) => {
  //       console.log(err);
  //     });

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
    ></div>
  );
};

export default OrdineCliccato;
