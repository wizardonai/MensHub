import { useEffect, useRef, useState } from "react";
import { hostnameProductor, styleMap } from "src/App";
import NavbarProductor from "./components/NavbarProductor";
import { useLoaderData } from "react-router-dom";
import { prodotto } from "src/cliente/pages/Homepage";
import { Input } from "src/shadcn/Input";
import Filtri from "./components/Filtri";
import Popup from "./components/Popup";
import SearchBar from "./components/SearchBar";
import { getProdotti } from "src/login/scripts/fetch";

interface TruncateTextProps {
  text: string;
  maxLength: number;
}

const TruncateText: React.FC<TruncateTextProps> = ({ text, maxLength }) => {
  const truncatedText =
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return <div style={{ overflow: "hidden" }}>{truncatedText}</div>;
};

const Prodotti = ({
  filtro,
  dati,
  categorie,
  allergeni,
  prodotti,
  setProdotti,
}: {
  filtro: string;
  dati: any;
  categorie: any;
  allergeni: any;
  prodotti: any;
  setProdotti: Function;
}) => {
  const [popup, setPopup] = useState(false);
  const [prodottoCliccato, setProdottoCliccato] = useState<any>(null);

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
          onClick={() => {
            setProdottoCliccato(null);
            setPopup(true);
          }}
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
              onClick={() => {
                setProdottoCliccato(item);
                setPopup(true);
              }}
            >
              <div className="flex items-center">
                <div className="h-[70px] w-[70px] mt-[10px] ml-[10px] mr-[10px]">
                  <img
                    src={hostnameProductor + item.indirizzo_img}
                    alt={item.nome}
                  />
                </div>
                <div className="mt-[10px]">
                  <p className="font-bold text-marroneScuro">
                    {item.nome} <br />
                    {item.prezzo.toFixed(2)}€
                  </p>
                </div>
              </div>
              <div className="ml-[10px] mt-[-2px] h-[65px] flex items-center text-marroneScuro">
                <TruncateText text={item.descrizione} maxLength={60} />
              </div>
            </div>
          );
        })}
        {popup ? (
          <Popup
            setPopup={setPopup}
            categorie={categorie}
            allergeni={allergeni}
            prodotti={prodotti}
            setProdotti={setProdotti}
            prodotto={prodottoCliccato}
          />
        ) : null}
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
              <img
                className="w-[20px] ml-[-3px] mr-[3px]"
                src={hostnameProductor + "filtri/" + categoria.nome + ".webp"}
              />
              <p
                className="capitalize text-[16px] text-marroneScuro"
                id="filtroDaApplicare"
              >
                {categoria.nome}
              </p>
            </div>
          </div>
          <div className="flex">
            <div
              onClick={() => {
                setProdottoCliccato(null);
                setPopup(true);
              }}
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
                  onClick={() => {
                    setProdottoCliccato(item);
                    setPopup(true);
                  }}
                >
                  <div className="flex items-center">
                    <div className="h-[70px] w-[70px] mt-[10px] ml-[10px] mr-[10px]">
                      <img
                        src={hostnameProductor + item.indirizzo_img}
                        alt={item.nome}
                      />
                    </div>
                    <div className="mt-[10px]">
                      <p className="font-bold text-marroneScuro">
                        {item.nome} <br />
                        {item.prezzo}€
                      </p>
                    </div>
                  </div>
                  <div className="ml-[10px] mt-[-2px] h-[65px] flex items-center text-marroneScuro">
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
            <Popup
              setPopup={setPopup}
              categorie={categorie}
              allergeni={allergeni}
              prodotti={prodotti}
              setProdotti={setProdotti}
              prodotto={prodottoCliccato}
            />
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
  const [filtro, setFiltro] = useState("");
  const [prodottiFiltrati, setProdottiFiltrati] = useState<any>([]);
  const [prodotti, setProdotti] = useState<any>([]);
  const [strSrc, setStrSrc] = useState("");

  useEffect(() => {
    getProdotti(
      JSON.parse(localStorage.getItem("token") || '{"token": "lucaChing"}')
    ).then((res: any) => {
      if (res === "Token non valido") {
        localStorage.removeItem("cart");
        localStorage.removeItem("token");
        localStorage.setItem("loggato", "false");
      } else {
        setProdotti(res);
      }
    });
  }, []);

  useEffect(() => {
    // Questo effetto verrà eseguito ogni volta che `prodotti` cambia
    setStrSrc(strSrc.toLocaleLowerCase());

    if (strSrc.length > 0) {
      let lista: Array<prodotto> = [];

      prodotti.forEach((item: any) => {
        let arr = item.nome.toLowerCase().split(" ");

        let trovato = false;

        for (let i = 0; i < arr.length && !trovato; i++) {
          if (arr[i].slice(0, strSrc.length) === strSrc) {
            trovato = true;
          } else {
            trovato = false;
          }
        }

        if (trovato) {
          lista.push(item);
        }
      });

      setProdottiFiltrati(lista);
    } else {
      setProdottiFiltrati(prodotti);
    }
  }, [strSrc]);

  //ordina i dati in base alla categoria segue l'ordine di filtri
  prodotti.sort((a: prodotto, b: prodotto) => {
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
        <div style={css.ricerca}>
          <SearchBar
            prodotti={prodotti}
            setProdottiFiltrati={setProdottiFiltrati}
            setStrSrc={setStrSrc}
            strSrc={strSrc}
          />
        </div>
        <div style={css.divCategorie}>
          <Filtri filtro={filtro} setFiltro={setFiltro} categorie={categorie} />
        </div>
        <div style={css.container}>
          <Prodotti
            filtro={filtro}
            dati={strSrc === "" ? prodotti : prodottiFiltrati}
            categorie={categorie}
            allergeni={allergeni}
            prodotti={prodotti}
            setProdotti={setProdotti}
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
    height: "7svh",
    marginLeft: "15px",
    marginTop: "11svh",
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
    height: "61.5svh",
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