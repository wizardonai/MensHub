import { hostnameProductor, styleMap } from "../../App";

import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarProductor from "../components/NavbarProductor";
import { getOrdine } from "../scripts/fetch";
import { Button } from "../components/shadcn/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/shadcn/Popover";
import { cn } from "../components/shadcn/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "../components/shadcn/Calendar";

const TabellaOrdini = ({
  ordineCliccato,
  setOrdineCliccato,
  ordini,
  prodotti,
  setProdotti,
  titolo,
}: {
  ordineCliccato: any;
  setOrdineCliccato: Function;
  ordini: any;
  prodotti: any;
  setProdotti: Function;
  titolo: string;
}) => {
  const [date, setDate] = useState<Date>();
  const day = date?.getDate();
  const month = (date?.getMonth() ?? 0) + 1;
  const year = date?.getFullYear();
  const [ordiniCpy, setOrdiniCpy] = useState<any>(ordini);

  useEffect(() => {
    if (titolo === "Passato") {
      if (date !== undefined) {
        setOrdiniCpy(
          ordini.filter(
            (ordine: any) =>
              ordine.data.split("T")[0] == format(date, "yyyy-MM-dd")
          )
        );
      } else {
        setOrdiniCpy(ordini);
      }
    }
  }, [titolo, date, ordini]);
  console.log(date?.toString().split("T")[0]);

  return (
    <div className="w-1/2 h-[100%]">
      <p className="font-bold text-marroneScuro text-2xl pl-[5%] flex">
        <div className="w-1/2">
          {titolo === "Oggi"
            ? titolo
            : date === undefined
            ? "Tutte le date"
            : year + "-" + month + "-" + day}
        </div>
        <div className="w-1/2 flex justify-end mr-[6%]">
          {titolo === "Passato" ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="w-[60px] h-[27px] mt-[3px] transform transition-transform hover:scale-105 hover:cursor-pointer"
                  variant={"ghost"}
                >
                  <img
                    className="select-none pointer-events-none"
                    src={hostnameProductor + "calendar.png"}
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(21%) sepia(4%) saturate(4104%) hue-rotate(317deg) brightness(98%) contrast(93%)",
                    }}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) =>
                    date >= new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          ) : null}
        </div>
      </p>
      {ordiniCpy.map((ordine: any) => {
        if (
          titolo === "Oggi" &&
          ordine.data.split("T")[0] == new Date().toISOString().split("T")[0]
        )
          return (
            <div className="flex flex-col items-center">
              <div
                style={css.ordine}
                className="transform transition-transform hover:scale-105 hover:cursor-pointer"
                key={ordine.id_ordine}
                onClick={() => {
                  if (ordineCliccato === ordine) {
                    setOrdineCliccato(null);
                  } else {
                    getOrdine(
                      { token: localStorage.getItem("token") || "scu" },
                      JSON.parse(JSON.stringify(ordine.id_ordine))
                    )
                      .then((response) => {
                        setProdotti(response);
                        setOrdineCliccato(ordine);
                      })
                      .catch((err: any) => {
                        console.log(err);
                      });
                  }
                }}
              >
                <div className="flex flex-col">
                  <p className="text-2xl select-none pointer-events-none font-bold text-marroneScuro">
                    {ordine.id_ordine}
                  </p>

                  <p className=" select-none pointer-events-none font-bold text-marroneScuro">
                    {ordine.ora_consegna.split(":").slice(0, 2).join(":")}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="flex w-1/2 items-center justify-end">
                    <img
                      className="h-5 mr-[5px] select-none pointer-events-none"
                      style={{
                        filter:
                          "brightness(0) saturate(100%) invert(21%) sepia(4%) saturate(4104%) hue-rotate(317deg) brightness(98%) contrast(93%)",
                      }}
                      src={hostnameProductor + "dish.png"}
                    />
                    <p className="text-2xl relative w-1/2 text-right select-none pointer-events-none font-bold text-marroneScuro mr-[10px]">
                      {ordine.num_prodotti}
                    </p>
                  </div>
                  <img
                    src={hostnameProductor + "/goBack.png"}
                    className={
                      ordineCliccato === ordine
                        ? "w-[20px] rotate-90 select-none pointer-events-none"
                        : "w-[20px] -rotate-90 select-none pointer-events-none"
                    }
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(17%) sepia(13%) saturate(1594%) hue-rotate(318deg) brightness(99%) contrast(84%)",
                    }}
                  />
                </div>
              </div>
              {ordineCliccato === ordine ? (
                <div className="bg-gialloSfondo" style={css.aperto}>
                  {prodotti.map((prodotto: any) => {
                    return (
                      <div className="flex items-center">
                        <div className="w-1/3 justify-center flex">
                          <img
                            src={hostnameProductor + prodotto.indirizzo_img}
                            className="pl-[1svw] w-[7svw] select-none pointer-events-none"
                          />
                        </div>
                        <div className="w-1/3 pl-[3svw] flex">
                          <p className="font-bold text-marroneScuro text-xl select-none pointer-events-none">
                            {prodotto.nome}
                          </p>
                        </div>
                        <div className="w-1/3 pl-[4svw] flex">
                          <p className="font-bold text-marroneScuro text-xl select-none pointer-events-none">
                            x {prodotto.quantita}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        if (
          (ordine.data.split("T")[0] !=
            new Date().toISOString().split("T")[0] &&
            titolo === "Passato") ||
          (date !== undefined &&
            ordine.data.split("T")[0] == format(date, "yyyy-MM-dd"))
        ) {
          return (
            <div className="flex flex-col items-center">
              <div
                style={css.ordine}
                className="transform transition-transform hover:scale-105 hover:cursor-pointer"
                key={ordine.id_ordine}
                onClick={() => {
                  if (ordineCliccato === ordine) {
                    setOrdineCliccato(null);
                  } else {
                    getOrdine(
                      { token: localStorage.getItem("token") || "scu" },
                      JSON.parse(JSON.stringify(ordine.id_ordine))
                    )
                      .then((response) => {
                        setProdotti(response);
                        setOrdineCliccato(ordine);
                      })
                      .catch((err: any) => {
                        console.log(err);
                      });
                  }
                }}
              >
                <div className="flex flex-col">
                  <p className="text-2xl select-none pointer-events-none font-bold text-marroneScuro">
                    {ordine.id_ordine}
                  </p>

                  <p className=" select-none pointer-events-none font-bold text-marroneScuro">
                    {ordine.data.split("T")[0]}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="flex w-1/2 items-center justify-end select-none pointer-events-none">
                    <img
                      className="h-5 mr-[5px]"
                      style={{
                        filter:
                          "brightness(0) saturate(100%) invert(21%) sepia(4%) saturate(4104%) hue-rotate(317deg) brightness(98%) contrast(93%)",
                      }}
                      src={hostnameProductor + "dish.png"}
                    />
                    <p className="text-2xl relative w-1/2 text-right select-none pointer-events-none font-bold text-marroneScuro mr-[10px]">
                      {ordine.num_prodotti}
                    </p>
                  </div>
                  <img
                    src={hostnameProductor + "/goBack.png"}
                    className={
                      ordineCliccato === ordine
                        ? "w-[20px] rotate-90 select-none pointer-events-none"
                        : "w-[20px] -rotate-90 select-none pointer-events-none"
                    }
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(17%) sepia(13%) saturate(1594%) hue-rotate(318deg) brightness(99%) contrast(84%)",
                    }}
                  />
                </div>
              </div>
              {ordineCliccato === ordine ? (
                <div className="bg-gialloSfondo" style={css.aperto}>
                  {prodotti.map((prodotto: any) => {
                    return (
                      <div className="flex items-center">
                        <div className="w-1/3 justify-center flex">
                          <img
                            src={hostnameProductor + prodotto.indirizzo_img}
                            className="pl-[1svw] w-[7svw] select-none pointer-events-none"
                          />
                        </div>
                        <div className="w-1/3 pl-[3svw] flex">
                          <p className="font-bold text-marroneScuro text-xl select-none pointer-events-none">
                            {prodotto.nome}
                          </p>
                        </div>
                        <div className="w-1/3 pl-[4svw] flex">
                          <p className="font-bold text-marroneScuro text-xl select-none pointer-events-none">
                            x {prodotto.quantita}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        }
      })}
    </div>
  );
};

const CompletedOrders = ({ setLoggato }: { setLoggato: Function }) => {
  const dati: any = useLoaderData();
  const [prodotti, setProdotti] = useState<any>([]);
  const [ordineCliccato, setOrdineCliccato] = useState<any>(null);

  if (localStorage.getItem("loggato") !== '"produttore"') {
    setLoggato("?");
    return;
  }

  if (!dati) return <p>CARICAMENTO</p>;

  return (
    <>
      <div className="page flex mobileProduttore:hidden" style={css.page}>
        <div style={css.sidebar}>
          <NavbarProductor page="productorHome" />
        </div>
        <div style={css.centerPage}>
          <div style={css.containerList}>
            <p style={css.titolo}>Completati</p>
            <div
              id="target"
              style={{
                borderRadius: "25px",
                height: "100%",
                width: "100%",
                alignItems: "center",
                overflow: "auto",
                scrollbarWidth: "none",
                border: "10px solid #608b46",
              }}
              className="flex flex-row justify-between"
            >
              <TabellaOrdini
                ordineCliccato={ordineCliccato}
                setOrdineCliccato={setOrdineCliccato}
                ordini={dati}
                prodotti={prodotti}
                setProdotti={setProdotti}
                titolo="Oggi"
              />
              <TabellaOrdini
                ordineCliccato={ordineCliccato}
                setOrdineCliccato={setOrdineCliccato}
                ordini={dati}
                prodotti={prodotti}
                setProdotti={setProdotti}
                titolo="Passato"
              />
            </div>
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
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  sidebar: {
    display: "flex",
    width: "10%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "2%",
  },
  titolo: { fontSize: "130%", color: "#503431", fontWeight: "bold" },
  containerList: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "84svh",
    margin: "0% 2%",
    position: "relative",
    top: "-2svh ",
  },
  ordine: {
    backgroundColor: "#fffae7",
    width: "90%",
    height: "10svh",
    borderRadius: "15px",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "5px 15px",
    margin: "auto",
    marginTop: "10px",
    marginBottom: "10px",
    boxShadow: "3px 3px 17px -3px rgba(0, 0, 0, 0.30)",
    cursor: "pointer",
  },
  aperto: {
    backgroundColor: "#fffae7",
    width: "90%",
    borderRadius: "15px",
    marginTop: "-35px",
    paddingTop: "25px",
  },
  check: {
    width: "20px",
    height: "20px",
    filter:
      "invert(45%) sepia(21%) saturate(931%) hue-rotate(57deg) brightness(103%) contrast(86%)",
  },
  x: {
    width: "17px",
    height: "17px",
    marginTop: "2px",
    marginLeft: "3px",
    filter:
      "invert(39%) sepia(23%) saturate(3763%) hue-rotate(334deg) brightness(87%) contrast(88%)",
  },
};

export default CompletedOrders;
