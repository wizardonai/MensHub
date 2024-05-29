import { useState } from "react";
import { hostnameProductor, styleMap } from "../../App";
import {
  deleteOrdine,
  getOrdine,
  setPagato,
  updateOrdine,
} from "../scripts/fetch";
import { Toaster } from "../components/shadcn/Sonner";
import { toast } from "sonner";

const OrdineCliccato = ({
  colore,
  ordineCliccato,
  setOrdineCliccato,
  prodotti,
  ordini,
  setOrdini,
}: {
  colore: string;
  ordineCliccato: any;
  setOrdineCliccato: Function;
  prodotti: any;
  ordini: any;
  setOrdini: Function;
}) => {
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
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={css.card}>
        <div style={css.ordine}>
          <p className="text-2xl w-1/2 select-none pointer-events-none font-bold text-marroneScuro">
            {ordineCliccato.id_ordine}
          </p>
          <p className="text-2xl relative w-1/2 text-right select-none pointer-events-none font-bold text-marroneScuro">
            x{ordineCliccato.num_prodotti}
          </p>
          <p className="w-1/2 select-none pointer-events-none font-bold text-marroneScuro">
            {ordineCliccato.ora_consegna.split(":").slice(0, 2).join(":")}
          </p>
          <div className="w-1/2 relative flex justify-end">
            <p
              className="pr-1 font-bold text-marroneScuro cursor-pointer"
              onClick={() => {
                setPagato(
                  localStorage.getItem("token") || "scu",
                  ordineCliccato.id_ordine,
                  ordineCliccato.pagato ? 0 : 1
                )
                  .then(() => {
                    ordineCliccato.pagato = ordineCliccato.pagato ? 0 : 1;
                    setOrdini(
                      ordini.map((ordine: any) => {
                        if (ordine.id_ordine === ordineCliccato.id_ordine) {
                          ordine.pagato = ordineCliccato.pagato ? 0 : 1;
                        }
                        return ordine;
                      })
                    );
                  })
                  .catch((err: any) => {
                    console.log(err);
                  });
              }}
            >
              pagato
            </p>
            {ordineCliccato.pagato === 1 ? (
              <img
                src={hostnameProductor + "check.png"}
                style={css.check}
                className="cursor-pointer"
                onClick={() => {
                  setPagato(
                    localStorage.getItem("token") || "scu",
                    ordineCliccato.id_ordine,
                    ordineCliccato.pagato ? 0 : 1
                  )
                    .then(() => {
                      ordineCliccato.pagato = ordineCliccato.pagato ? 0 : 1;
                      setOrdini(
                        ordini.map((ordine: any) => {
                          if (ordine.id_ordine === ordineCliccato.id_ordine) {
                            ordine.pagato = ordineCliccato.pagato ? 0 : 1;
                          }
                          return ordine;
                        })
                      );
                    })
                    .catch((err: any) => {
                      console.log(err);
                    });
                }}
              />
            ) : (
              <img
                src={hostnameProductor + "X.png"}
                style={css.x}
                className="cursor-pointer"
                onClick={() => {
                  setPagato(
                    localStorage.getItem("token") || "scu",
                    ordineCliccato.id_ordine,
                    ordineCliccato.pagato ? 0 : 1
                  )
                    .then(() => {
                      ordineCliccato.pagato = ordineCliccato.pagato ? 0 : 1;
                      setOrdini(
                        ordini.map((ordine: any) => {
                          if (ordine.id_ordine === ordineCliccato.id_ordine) {
                            ordine.pagato = ordineCliccato.pagato ? 0 : 1;
                          }
                          return ordine;
                        })
                      );
                    })
                    .catch((err: any) => {
                      console.log(err);
                    });
                }}
              />
            )}
          </div>
        </div>
        <div
          className="h-[70%] w-[100%] justify-center overflow-auto scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          {prodotti.map((prodotto: any) => {
            return (
              <div
                key={prodotto.id_prodotto}
                className="flex w-full h-1/3 justify-center items-center mt-[-5%]"
              >
                <img
                  src={hostnameProductor + prodotto.indirizzo_img}
                  className="h-[60%] pr-[2.5%]"
                />
                <div className="flex flex-col pl-[2.5%]">
                  <p className="w-[7svw] select-none pointer-events-none font-bold text-marroneScuro">
                    {prodotto.nome}
                  </p>
                  <p className="select-none pointer-events-none font-bold text-marroneScuro">
                    x{prodotto.quantita}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-[2svh]">
          <div
            style={{ backgroundColor: "#d24a3c" }}
            className="w-[35px] h-[35px] flex justify-center rounded-full items-center mr-[3%] transform transition-transform hover:scale-105 hover:cursor-pointer"
            onClick={() => {
              deleteOrdine(
                localStorage.getItem("token") || "scu",
                ordineCliccato.id_ordine
              )
                .then((response) => {
                  toast.success("Ordine eliminato con successo");
                })
                .catch((err: any) => {
                  console.log(err);
                });
              setOrdini(
                ordini.filter(
                  (ordine: any) => ordine.id_ordine !== ordineCliccato.id_ordine
                )
              );
              setOrdineCliccato(null);
            }}
          >
            <img
              src={hostnameProductor + "deleteBin.png"}
              className="w-[20px] h-[20px]"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(107deg) brightness(105%) contrast(102%)",
              }}
            />
          </div>
          <div
            className="bg-verdeBordo font-bold rounded-full flex items-center justify-center ml-[3%] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-verdeBordoHover"
            onClick={() => {
              updateOrdine(
                localStorage.getItem("token") || "scu",
                ordineCliccato.id_ordine,
                "completato"
              )
                .then((response) => {
                  toast.success("Ordine completato con successo");
                })
                .catch((err: any) => {
                  console.log(err);
                });
              setOrdini(
                ordini.map((ordine: any) => {
                  if (ordine.id_ordine === ordineCliccato.id_ordine) {
                    ordine.stato_ordine = "completato";
                  }
                  return ordine;
                })
              );
              setOrdineCliccato(null);
            }}
          >
            <p className="px-[10px] text-white">Completato</p>
          </div>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
};

const css: styleMap = {
  card: {
    backgroundColor: "#fffae7",
    width: "90%",
    height: "95%",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
  },
  ordine: {
    width: "90%",
    height: "10svh",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "5px 15px",
    margin: "auto",
    marginTop: "10px",
    marginBottom: "10px",
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

export default OrdineCliccato;
