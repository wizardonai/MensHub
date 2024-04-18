import { useState } from "react";
import { hostnameProductor, styleMap } from "src/App";
import NavbarProductor from "./components/NavbarProductor";
import { useLoaderData } from "react-router-dom";
import { prodotto } from "src/cliente/pages/Homepage";

interface TruncateTextProps {
  text: string;
  maxLength: number;
}

const TruncateText: React.FC<TruncateTextProps> = ({ text, maxLength }) => {
  const truncatedText =
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return <div style={{ overflow: "hidden" }}>{truncatedText}</div>;
};

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
          className="bg-arancioneChiaro h-[25px] rounded-full flex items-center px-3 mr-[1%] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordo"
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
        className="bg-arancioneChiaro h-[25px] rounded-full flex items-center px-3 mr-[1%] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordo"
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

const Prodotti = ({ filtro, dati }: { filtro: string; dati: any }) => {
  const filtri = [
    { nome: "antipasto", selected: false },
    { nome: "primo", selected: false },
    { nome: "secondo", selected: false },
    { nome: "contorno", selected: false },
    { nome: "dolce", selected: false },
    { nome: "bibita", selected: false },
  ];

  if (filtro !== "") {
    const prodottiCategoria = dati.filter(
      (item: prodotto) => item.categoria === filtro
    );

    return (
      <div className="flex">
        <div className="bg-verdeBordo h-[150px] w-[225px] border-gialloSfondo rounded-lg mt-[15px] flex items-center justify-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-verdeBordoHover mr-[2%]">
          <img
            src={hostnameProductor + "plus.png"}
            style={{
              filter:
                "brightness(0) saturate(100%) invert(95%) sepia(17%) saturate(206%) hue-rotate(349deg) brightness(92%) contrast(90%)",
              width: "60px",
              height: "60px",
            }}
          />
        </div>

        {prodottiCategoria.map((item: prodotto, index: number) => {
          return (
            <div
              className="bg-arancioneBordo h-[150px] w-[225px] rounded-lg mt-[15px]  transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordoHover mr-[2%]"
              key={index}
            >
              <div className="flex items-center">
                <div className="h-[70px] w-[70px] mt-[10px] ml-[10px] mr-[10px]">
                  <img
                    src={hostnameProductor + item.indirizzo_img}
                    alt={item.nome}
                  />
                </div>
                <div className="mt-[10px]">
                  <p>
                    {item.nome} <br />
                    {item.prezzo.toFixed(2)}€
                  </p>
                </div>
              </div>
              <div className="ml-[10px] mt-[-2px] h-[65px] flex items-center">
                <TruncateText text={item.descrizione} maxLength={60} />
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return filtri.map((categoria, index) => {
      const prodottiCategoria = dati.filter(
        (item: prodotto) => item.categoria === categoria.nome
      );

      return (
        <div key={index} className="mb-5">
          <div className="flex">
            <div
              className="bg-arancioneBordo h-[25px] rounded-full flex items-center px-3 mr-[1%]"
              key={index}
              id="divFiltro"
            >
              <p className="capitalize text-[16px]" id="filtroDaApplicare">
                {categoria.nome}
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="bg-verdeBordo h-[150px] w-[225px] border-gialloSfondo rounded-lg mt-[15px] flex items-center justify-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-verdeBordoHover mr-[2%]">
              <img
                src={hostnameProductor + "plus.png"}
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(95%) sepia(17%) saturate(206%) hue-rotate(349deg) brightness(92%) contrast(90%)",
                  width: "60px",
                  height: "60px",
                }}
              />
            </div>

            {prodottiCategoria.map((item: prodotto, index: number) => {
              return (
                <div
                  key={index}
                  className="bg-arancioneBordo h-[150px] w-[225px] rounded-lg mt-[15px]  transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordoHover mr-[2%]"
                >
                  <div className="flex items-center">
                    <div className="h-[70px] w-[70px] mt-[10px] ml-[10px] mr-[10px]">
                      <img
                        src={hostnameProductor + item.indirizzo_img}
                        alt={item.nome}
                      />
                    </div>
                    <div className="mt-[10px]">
                      <p>
                        {item.nome} <br />
                        {item.prezzo.toFixed(2)}€
                      </p>
                    </div>
                  </div>
                  <div className="ml-[10px] mt-[-2px] h-[65px] flex items-center">
                    <TruncateText text={item.descrizione} maxLength={60} />
                  </div>
                </div>
              );
            })}

            {filtri.map((item) => {
              if (item.nome === categoria.nome) {
                item.selected = true;
              }
            })}
          </div>
        </div>
      );
    });
  }
};

const MenuPageProductor = () => {
  const dati: any = useLoaderData();
  const [filtro, setFiltro] = useState("");

  if (!dati) return <p>CARICAMENTO</p>;

  const filtri = [
    ["antipasto"],
    ["primo"],
    ["secondo"],
    ["contorno"],
    ["dolce"],
    ["bibita"],
  ];

  //ordina i dati in base alla categoria segue l'ordine di filtri
  dati.sort((a: prodotto, b: prodotto) => {
    const aIndex = filtri.findIndex((x) => x[0] === a.categoria);
    const bIndex = filtri.findIndex((x) => x[0] === b.categoria);

    return aIndex - bIndex;
  });

  return (
    <div className="page" style={css.page}>
      <div style={css.sidebar}>
        <NavbarProductor page="productorMenu" />
      </div>
      <div style={css.centerPage}>
        <div style={css.ricerca}></div>
        <div style={css.divCategorie}>
          <Filtri filtro={filtro} setFiltro={setFiltro} />
        </div>
        <div style={css.container}>
          <Prodotti filtro={filtro} dati={dati} />
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
    flexDirection: "row",
    width: "100%",
    marginBottom: "3.5svh",
    paddingLeft: "6px",
  },
};

export default MenuPageProductor;
