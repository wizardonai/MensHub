import { useState } from "react";
import { hostnameProductor, styleMap } from "src/App";
import NavbarProductor from "./components/NavbarProductor";

const Filtri = ({
  filtro,
  setFiltro,
}: {
  filtro: string;
  setFiltro: Function;
}) => {
  const filtri = [
    ["antipasto"],
    ["primo"],
    ["secondo"],
    ["contorno"],
    ["dolce"],
    ["bibita"],
  ];

  const findIndex = (x: string) => {
    for (let i = 0; i < filtri.length; i++) {
      if (filtri[i][0] === x) {
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
      console.log(filtroDivCliccato.className);

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
    return filtri.map((item, index) => {
      return (
        <div
          className="bg-gialloSfondo h-[25px] border-2 border-arancioneBordo rounded-full flex items-center px-3 mr-[1%] transform transition-transform hover:scale-105 hover:cursor-pointer"
          key={index}
          onClick={filtroCliccato}
          id="divFiltro"
        >
          <p className="capitalize text-[16px]" id="filtroDaApplicare">
            {item[0]}
          </p>
        </div>
      );
    });
  } else {
    return (
      <div
        className="bg-gialloSfondo h-[25px] border-2 border-arancioneBordo rounded-full flex items-center px-3 mr-[1%] transform transition-transform hover:scale-105 hover:cursor-pointer"
        key={findIndex(filtro)}
        onClick={filtroCliccato}
        id="divFiltro"
      >
        <p className="capitalize text-[16px]" id="filtroDaApplicare">
          {filtro}
        </p>
      </div>
    );
  }
};

const MenuPageProductor = () => {
  const [filtro, setFiltro] = useState("");

  return (
    <div className="page" style={css.page}>
      <div style={css.sidebar}>
        <NavbarProductor page="productorMenu" />
      </div>
      <div style={css.centerPage}>
        <div style={css.ricerca}></div>
        <div style={css.divCategorie}>
          <div className="bg-gialloSfondo h-[25px] w-[25px] border-2 border-verdeBordo rounded-full flex items-center justify-center mr-[1%] transform transition-transform hover:scale-105 hover:cursor-pointer">
            <img
              src={hostnameProductor + "plus.png"}
              style={{
                filter:
                  "invert(50%) sepia(29%) saturate(651%) hue-rotate(54deg) brightness(93%) contrast(90%)",
                width: "70%",
              }}
            />
          </div>
          <Filtri filtro={filtro} setFiltro={setFiltro} />
        </div>
        <div style={css.container}>
          <div className="bg-gialloSfondo h-[25px] border-2 border-arancioneBordo rounded-full flex items-center px-3 mr-[1%]">
            <p>luca ching</p>
          </div>
          <div style={css.prodottiContainer}>
            <div className="bg-gialloSfondo h-[150px] w-[225px] border-[3px] border-verdeBordo rounded-lg mt-[15px] flex items-center justify-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-gialloSfondoHover mr-[2%]">
              <img
                src={hostnameProductor + "plus.png"}
                style={{
                  filter:
                    "invert(50%) sepia(29%) saturate(651%) hue-rotate(54deg) brightness(93%) contrast(90%)",
                  width: "60px",
                  height: "60px",
                }}
              />
            </div>
            <div className="bg-gialloSfondo h-[150px] w-[225px] border-[3px] border-arancioneBordo rounded-lg mt-[15px] flex items-center justify-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-gialloSfondoHover mr-[2%]"></div>
          </div>
          <div className="bg-gialloSfondo h-[25px]  border-2 border-arancioneBordo rounded-full flex items-center px-3 mr-[1%]">
            <p>pizza</p>
          </div>
          <div style={css.prodottiContainer}>
            <div className="bg-gialloSfondo h-[150px] w-[225px] border-[3px] border-verdeBordo rounded-lg mt-[15px] flex items-center justify-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-gialloSfondoHover mr-[2%]">
              <img
                src={hostnameProductor + "plus.png"}
                style={{
                  filter:
                    "invert(50%) sepia(29%) saturate(651%) hue-rotate(54deg) brightness(93%) contrast(90%)",
                  width: "60px",
                  height: "60px",
                }}
              />
            </div>
            <div className="bg-gialloSfondo h-[150px] w-[225px] border-[3px] border-arancioneBordo rounded-lg mt-[15px] flex items-center justify-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-gialloSfondoHover mr-[2%]"></div>
            <div className="bg-gialloSfondo h-[150px] w-[225px] border-[3px] border-arancioneBordo rounded-lg mt-[15px] flex items-center justify-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-gialloSfondoHover mr-[2%]"></div>
            <div className="bg-gialloSfondo h-[150px] w-[225px] border-[3px] border-arancioneBordo rounded-lg mt-[15px] flex items-center justify-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-gialloSfondoHover mr-[2%]"></div>
            <div className="bg-gialloSfondo h-[150px] w-[225px] border-[3px] border-arancioneBordo rounded-lg mt-[15px] flex items-center justify-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-gialloSfondoHover mr-[2%]"></div>
            <div className="bg-gialloSfondo h-[150px] w-[225px] border-[3px] border-arancioneBordo rounded-lg mt-[15px] flex items-center justify-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-gialloSfondoHover mr-[2%]"></div>
            <div className="bg-gialloSfondo h-[150px] w-[225px] border-[3px] border-arancioneBordo rounded-lg mt-[15px] flex items-center justify-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-gialloSfondoHover mr-[2%]"></div>
            <div className="bg-gialloSfondo h-[150px] w-[225px] border-[3px] border-arancioneBordo rounded-lg mt-[15px] flex items-center justify-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-gialloSfondoHover mr-[2%]"></div>
          </div>
          <div className="bg-gialloSfondo h-[25px]  border-2 border-arancioneBordo rounded-full flex items-center px-3 mr-[1%]">
            <p>dessert</p>
          </div>
          <div style={css.prodottiContainer}>
            <div className="bg-gialloSfondo h-[150px] w-[225px] border-[3px] border-verdeBordo rounded-lg mt-[15px] flex items-center justify-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-gialloSfondoHover mr-[2%]">
              <img
                src={hostnameProductor + "plus.png"}
                style={{
                  filter:
                    "invert(50%) sepia(29%) saturate(651%) hue-rotate(54deg) brightness(93%) contrast(90%)",
                  width: "60px",
                  height: "60px",
                }}
              />
            </div>
            <div className="bg-gialloSfondo h-[150px] w-[225px] border-[3px] border-arancioneBordo rounded-lg mt-[15px] flex items-center justify-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-gialloSfondoHover mr-[2%]"></div>
          </div>
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
  centerPage: {
    width: "90%",
    height: "100%",
  },
  sidebar: {
    display: "flex",
    width: "10%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "2%",
  },
  ricerca: {
    width: "100%",
    height: "10%",
    marginLeft: "15px",
    marginTop: "10svh",
    marginBottom: "5px",
    backgroundColor: "green",
  },
  divCategorie: {
    width: "100%",
    height: "10%",
    marginRight: "20px",
    marginLeft: "15px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    width: "95%",
    height: "59svh",
    marginRight: "20px",
    marginLeft: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    overflow: "auto",
    scrollbarWidth: "none",
  },
  prodottiContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%",
    marginBottom: "3.5svh",
    paddingLeft: "6px",
  },
};

export default MenuPageProductor;
