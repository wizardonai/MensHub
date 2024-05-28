import { useEffect, useRef, useState } from "react";
import { hostnameProductor, styleMap } from "../../App";
import NavbarProductor from "../components/NavbarProductor";
import Filtri from "../components/Filtri";
import Popup from "../components/Popup";
import SearchBar from "../components/SearchBar";
import { prodotto } from "../../utils";
import { getProdotti } from "../scripts/fetch";
import { Button } from "../components/shadcn/Button";

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
  const [categoriaCliccata, setCategoriaCliccata] = useState<any>(null);

  const filtri = categorie.map((categoria: any) => ({
    nome: categoria.nome,
    selected: false,
  }));

  if (filtro !== "") {
    const prodottiCategoria = dati.filter(
      (item: prodotto) => item.categoria === filtro
    );

    return (
      <div className="flex flex-wrap w-full">
        <div
          onClick={() => {
            setProdottoCliccato(null);
            setPopup(true);
          }}
          className="bg-verdeBordo h-[175px] w-[200px] border-gialloSfondo rounded-lg mt-[15px] flex items-center justify-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-verdeBordoHover mr-[2%]"
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
              className="bg-arancioneBordo h-[175px] w-[200px] rounded-lg mt-[15px] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordoHover mr-[2%]"
              onClick={() => {
                setProdottoCliccato(item);
                setPopup(true);
              }}
            >
              <div className="flex mt-[5%] h-[35%] justify-center items-center">
                <div className="w-[30%] ml-[10px] mr-[10px] ">
                  <img
                    src={hostnameProductor + item.indirizzo_img}
                    alt={item.nome}
                  />
                </div>
                <div className="mt-[10px] w-[70%]">
                  <p className="font-bold text-marroneScuro">
                    {item.nome} <br />
                    {item.prezzo.toFixed(2)}€
                  </p>
                </div>
              </div>
              <div className="ml-[10px] h-[60%] flex items-center text-marroneScuro">
                <TruncateText text={item.descrizione} maxLength={35} />
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
            categoria={categoriaCliccata}
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
        <div key={index} className="mb-5 w-full">
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
          <div className="flex flex-wrap">
            <div
              onClick={() => {
                setProdottoCliccato(null);
                setCategoriaCliccata(categoria.nome);
                console.log(categoria.nome);
                setPopup(true);
              }}
              className="bg-verdeBordo h-[175px] w-[200px] border-gialloSfondo rounded-lg mt-[15px] flex items-center justify-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-verdeBordoHover mr-[2%]"
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
                  className="bg-arancioneBordo h-[175px] w-[200px] rounded-lg mt-[15px] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordoHover mr-[2%]"
                  onClick={() => {
                    setProdottoCliccato(item);
                    setPopup(true);
                  }}
                >
                  <div className="flex mt-[5%] h-[35%] justify-center items-center">
                    <div className="w-[30%] ml-[10px] mr-[10px] ">
                      <img
                        src={hostnameProductor + item.indirizzo_img}
                        alt={item.nome}
                      />
                    </div>
                    <div className="mt-[10px] w-[70%]">
                      <p className="font-bold text-marroneScuro">
                        {item.nome} <br />
                        {item.prezzo.toFixed(2)}€
                      </p>
                    </div>
                  </div>
                  <div className="ml-[10px] h-[60%] flex items-center text-marroneScuro">
                    <TruncateText text={item.descrizione} maxLength={35} />
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
              categoria={categoriaCliccata}
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
  setLoggato,
}: {
  categorie: any;
  allergeni: any;
  setLoggato: Function;
}) => {
  const [filtro, setFiltro] = useState("");
  const [prodottiFiltrati, setProdottiFiltrati] = useState<any>([]);
  const [prodotti, setProdotti] = useState<any>([]);
  const [strSrc, setStrSrc] = useState("");

  useEffect(() => {
    getProdotti({ token: localStorage.getItem("token") || "scu" }).then(
      (res: any) => {
        if (res === "Token non valido") {
          localStorage.removeItem("cart");
          localStorage.removeItem("token");
          localStorage.setItem("loggato", "false");
        } else {
          setProdotti(res);
        }
      }
    );
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

  useEffect(() => {
    //ordina i dati in base alla categoria segue l'ordine di filtri
    prodotti.sort((a: prodotto, b: prodotto) => {
      const aIndex = categorie.findIndex((x: any[]) => x[0] === a.categoria);
      const bIndex = categorie.findIndex((x: any[]) => x[0] === b.categoria);

      return aIndex - bIndex;
    });
  }, []);

  if (localStorage.getItem("loggato") !== '"produttore"') {
    setLoggato("?");
    return;
  }

  return (
    <>
      <div className="page flex mobileProduttore:hidden" style={css.page}>
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
            <Filtri
              filtro={filtro}
              setFiltro={setFiltro}
              categorie={categorie}
              popup={false}
            />
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
      <div className="h-svh w-svw hidden justify-center items-center mobileProduttore:flex flex-col">
        <p className="text-marrone text-2xl w-full text-center">
          Dispositivo non supportato! <br />
          Per una esperienza migliore, utilizza un dispositivo con larghezza
          maggiore
        </p>
        <Button
          className="mt-2 text-xl p-5"
          variant="avanti"
          onClick={() => {
            localStorage.clear();
            setLoggato(false);
          }}
        >
          Disconnettiti
        </Button>
      </div>
    </>
  );
};

const css: styleMap = {
  page: {
    backgroundColor: "#dfd9c9",
    flexDirection: "row",
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
    marginLeft: "2svw",
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
