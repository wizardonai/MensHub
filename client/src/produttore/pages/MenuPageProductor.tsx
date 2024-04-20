import { useRef, useState } from "react";
import { hostnameProductor, styleMap } from "src/App";
import NavbarProductor from "./components/NavbarProductor";
import { useLoaderData } from "react-router-dom";
import { prodotto } from "src/cliente/pages/Homepage";
import { Input } from "src/shadcn/Input";

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
  categorie,
}: {
  filtro: string;
  setFiltro: Function;
  categorie: any;
}) => {
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
          className="bg-arancioneChiaro h-[25px] rounded-full flex items-center px-3 mr-[1%] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordo"
          key={index}
          onClick={filtroCliccato}
          id="divFiltro"
        >
          <p className="capitalize text-[16px]" id="filtroDaApplicare">
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
        <p className="capitalize text-[16px]" id="filtroDaApplicare">
          {filtro}
        </p>
      </div>
    );
  }
};

const Prodotti = ({
  filtro,
  dati,
  categorie,
  allergeni,
}: {
  filtro: string;
  dati: any;
  categorie: any;
  allergeni: any;
}) => {
  const [popup, setPopup] = useState(false);
  const nome = useRef(null);

  const filtri = categorie.map((categoria: any) => ({
    nome: categoria.nome,
    selected: false,
  }));

  if (filtro !== "") {
    const prodottiCategoria = dati.filter(
      (item: prodotto) => item.categoria === filtro
    );

    return (
      <div className="flex">
        <div
          onClick={() => setPopup(true)}
          className="bg-verdeBordo h-[150px] w-[225px] border-gialloSfondo rounded-lg mt-[15px] flex items-center justify-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-verdeBordoHover mr-[2%]"
        >
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
    return filtri.map((categoria: any, index: any) => {
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
            <div
              onClick={() => setPopup(true)}
              className="bg-verdeBordo h-[150px] w-[225px] border-gialloSfondo rounded-lg mt-[15px] flex items-center justify-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-verdeBordoHover mr-[2%]"
            >
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
                  className="bg-arancioneBordo h-[150px] w-[225px] rounded-lg mt-[15px] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordoHover mr-[2%]"
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

            {filtri.map((item: any) => {
              if (item.nome === categoria.nome) {
                item.selected = true;
              }
            })}
          </div>
          {popup ? (
            <div className="fixed flex justify-center items-center inset-0 bg-slate-600 bg-opacity-5">
              <div className="bg-gialloSfondo w-[38%] h-[65%] shadow-lg rounded-2xl border-arancioneBordoHover border-[4px] opacity-">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold text-xl pl-[15px] pt-[10px]">
                      Aggiungi una pietanza
                    </p>
                  </div>
                  <button
                    className="w-[30px] h-[30px] mr-[8px] mt-[8px] rounded-full flex items-center justify-center hover:cursor-pointer"
                    onClick={() => setPopup(false)}
                  >
                    <img
                      src={hostnameProductor + "X.png"}
                      alt="close"
                      className="w-[20px] h-[20px] transform transition-transform hover:scale-105"
                    />
                  </button>
                </div>
                <div className="flex-col">
                  <div className="flex pt-[10px]">
                    <div>
                      <div className="pl-[15px]">
                        <p className=" font-bold">Nome</p>
                        <Input
                          id="nome"
                          placeholder=""
                          type="text"
                          defaultValue=""
                          ref={nome}
                          className="w-[15svw] mt-[5px] rounded-2xl border-[3px] border-arancioneChiaro  bg-gialloSfondo"
                        />
                      </div>
                      <div className="pl-[15px] pt-[15%]">
                        <p className="font-bold">Scegli la categoria</p>
                        <div
                          className="flex overflow-auto w-[15svw]"
                          style={{ scrollbarWidth: "none" }}
                        >
                          <Filtri
                            filtro={""}
                            setFiltro={() => {}}
                            categorie={categorie}
                          />
                        </div>
                      </div>
                      <div className="pl-[15px] pt-[15%]">
                        <p className=" font-bold">Descrizione</p>
                        <textarea
                          rows={4}
                          cols={50}
                          className="w-[15svw] h-[15svh] mt-[5px] rounded-2xl border-[3px] border-arancioneChiaro bg-gialloSfondo overflow-auto"
                          style={{ scrollbarWidth: "none", resize: "none" }}
                        />
                      </div>
                    </div>
                    <div className="pl-[4svw]">
                      <div>
                        <p className="font-bold">Immagine</p>
                        <div className="w-[10svw] h-[10svw] mt-[5px] border-[3px] border-arancioneChiaro rounded-2xl flex justify-center items-center cursor-pointer transform transition-transform hover:scale-105 hover:bg-gialloSfondoHover">
                          <img
                            src={hostnameProductor + "plus.png"}
                            style={{
                              filter:
                                "invert(69%) sepia(59%) saturate(478%) hue-rotate(345deg) brightness(97%) contrast(85%)",
                              width: "60px",
                              height: "60px",
                            }}
                          />
                        </div>
                      </div>
                      <div className="pt-[5%]">
                        <p className="font-bold">Allergeni</p>
                        <div
                          className="flex overflow-auto w-[15svw]"
                          style={{ scrollbarWidth: "none" }}
                        >
                          <div
                            className="flex flex-wrap overflow-auto w-[15svw] h-[15svh]"
                            style={{ scrollbarWidth: "none" }}
                          >
                            {allergeni.map((allergene: any, index: number) => {
                              return (
                                <div
                                  key={index}
                                  className="bg-arancioneChiaro h-[25px] rounded-full flex items-center px-3 mx-1 my-1 mr-[1%] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordo"
                                >
                                  <p className="capitalize text-[16px]">
                                    {allergene.nome}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div
                      className="bg-verdeBordo h-[25px] rounded-full flex items-center px-8 py-4 mt-[3svh] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-verdeBordoHover"
                      id="divFiltro"
                    >
                      <p
                        className="capitalize text-[16px] text-gialloSfondo"
                        id="filtroDaApplicare"
                      >
                        Aggiungi
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      );
    });
  }
};

const MenuPageProductor = ({
  categorie,
  allergeni,
}: {
  categorie: any;
  allergeni: any;
}) => {
  const dati: any = useLoaderData();
  const [filtro, setFiltro] = useState("");

  if (!dati) return <p>CARICAMENTO</p>;

  //ordina i dati in base alla categoria segue l'ordine di filtri
  dati.sort((a: prodotto, b: prodotto) => {
    const aIndex = categorie.findIndex((x: any[]) => x[0] === a.categoria);
    const bIndex = categorie.findIndex((x: any[]) => x[0] === b.categoria);

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
          <Filtri filtro={filtro} setFiltro={setFiltro} categorie={categorie} />
        </div>
        <div style={css.container}>
          <Prodotti
            filtro={filtro}
            dati={dati}
            categorie={categorie}
            allergeni={allergeni}
          />
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
    marginLeft: "8px",
    paddingLeft: "7px",
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
