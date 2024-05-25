import { useState } from "react";
import { hostnameProductor } from "src/App";

export default function Filtri({
  filtro,
  setFiltro,
  categorie,
}: {
  filtro: string;
  setFiltro: Function;
  categorie: any;
}): JSX.Element {
  const findIndex = (x: string) => {
    for (let i = 0; i < categorie.length; i++) {
      if (categorie[i][0] === x) {
        return i;
      }
    }

    return -1;
  };

  const filtroCliccato = (e: any) => {
    let filtroDivCliccato = e.target;

    while (filtroDivCliccato.id !== "divFiltro") {
      filtroDivCliccato = filtroDivCliccato.parentNode;
    }

    if (filtro === "") {
      filtroDivCliccato.className += " cliccatoFiltro";

      setFiltro(filtroDivCliccato.children["filtroDaApplicare"].innerHTML);
    } else {
      filtroDivCliccato.className = filtroDivCliccato.className.replace(
        " cliccatoFiltro",
        ""
      );
      setFiltro("");
    }
  };

  if (filtro === "") {
    return categorie.map((item: any, index: any) => {
      return (
        <div
          className="bg-arancioneChiaro h-[25px] rounded-full flex items-center px-3 mr-[10px] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordo"
          key={index}
          onClick={filtroCliccato}
          id="divFiltro"
        >
          <img
            className="w-[20px] ml-[-3px] mr-[3px] select-none pointer-events-none"
            src={hostnameProductor + "filtri/" + item.nome + ".webp"}
          />
          <p
            className="capitalize text-[16px] select-none pointer-events-none text-marroneScuro"
            id="filtroDaApplicare"
          >
            {item.nome}
          </p>
        </div>
      );
    });
  } else {
    return (
      <div
        className="bg-arancioneChiaro h-[25px] rounded-full flex items-center px-3 mr-[1%] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordo"
        key={findIndex(filtro)}
        onClick={filtroCliccato}
        id="divFiltro"
      >
        <img
          className="w-[20px] ml-[-3px] mr-[3px] select-none pointer-events-none"
          src={hostnameProductor + "filtri/" + filtro + ".webp"}
        />
        <p className="capitalize text-[16px]" id="filtroDaApplicare">
          {filtro}
        </p>
      </div>
    );
  }
}
