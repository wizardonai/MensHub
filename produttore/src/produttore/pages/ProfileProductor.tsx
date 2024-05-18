import React, { useEffect, useRef, useState } from "react";
import { hostnameProductor, styleMap } from "src/App";
import NavbarProductor from "./components/NavbarProductor";
import {
  getStatMensa,
  getTopProdotti,
  registerUser,
} from "src/login/scripts/fetch";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { Label } from "@radix-ui/react-label";
import { Button } from "src/shadcn/Button";
import { Input } from "src/shadcn/Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
} from "src/shadcn/Dialog";

const ProfileProductor = () => {
  const dati: any = useLoaderData();
  const navigate = useNavigate();
  const periodo = ["1G", "1S", "1M", "3M", "6M", "1A"];
  const [periodoCliccato, setPeriodoCliccato] = useState<string>("1A");
  const [ricarica, setRicarica] = useState<boolean>(true);
  const [topProdotti, setTopProdotti] = useState<any>([]);
  const [ordiniCompletati, setOrdiniCompletati] = useState<any>([]);
  const [popupEmail, setPopupEmail] = useState<boolean>(false);
  const nome = useRef<HTMLTextAreaElement>(null);
  const cognome = useRef<HTMLTextAreaElement>(null);
  const email = useRef<HTMLTextAreaElement>(null);
  const password = useRef<HTMLTextAreaElement>(null);
  const confermaPassword = useRef<HTMLTextAreaElement>(null);

  if (!dati) return <p>CARICAMENTO</p>;

  if (ricarica) {
    getTopProdotti(
      JSON.parse(localStorage.getItem("token") || '{"token": "scuuuu scuuu"}')
        .token,
      periodoCliccato
    ).then((res) => {
      setTopProdotti(res);
    });
    getStatMensa(
      JSON.parse(localStorage.getItem("token") || '{"token": "scuuuu scuuu"}')
        .token,
      periodoCliccato
    ).then((res) => {
      setOrdiniCompletati(res);
    });

    setRicarica(false);
  }

  let count = 0;

  const submitButton = () => {
    let nomeValue = "";
    if (nome.current) {
      nomeValue = nome.current.value;
    }

    let cognomeValue = "";
    if (cognome.current) {
      cognomeValue = cognome.current.value;
    }

    let emailValue = "";
    if (email.current) {
      emailValue = email.current.value;
    }

    let passwordValue = "";
    if (password.current) {
      passwordValue = password.current.value;
    }

    let confermaPasswordValue = "";
    if (confermaPassword.current) {
      confermaPasswordValue = confermaPassword.current.value;
    }

    if (
      nomeValue === "" ||
      cognomeValue === "" ||
      emailValue === "" ||
      passwordValue === "" ||
      confermaPasswordValue === ""
    ) {
      alert("Si prega di compilare tutti i campi.");
      return;
    }

    if (passwordValue !== confermaPasswordValue) {
      alert("Le password non corrispondono.");
      return;
    }

    registerUser({
      nome: nomeValue,
      cognome: cognomeValue,
      email: emailValue,
      password: passwordValue,
      confirm_password: confermaPasswordValue,
      cliente: 1,
      id_mensa: dati[0].id,
    }).then((res) => {
      if (res === "Risposta Registrazione avvenuta con successo") {
        alert("Utente registrato con successo");
        setPopupEmail(false);
      } else {
        alert("Errore nella registrazione");
      }
    });
  };

  return (
    <div className="page" style={css.page}>
      <div style={css.sidebar}>
        <NavbarProductor page="profileProductor" />
      </div>
      <div style={css.centerPage}>
        <div>
          <p className="font-bold text-5xl text-marroneScuro">{dati[0].nome}</p>
        </div>
        <div className="flex">
          <div className="pt-[15px] w-1/2">
            <p className="font-bold text-xl text-marroneScuro">Email:</p>
            <p className="text-xl text-marroneScuro pl-[10px] mb-[10px]">
              {dati[0].email}
            </p>
            <a className="font-bold text-lg text-verdeBordo cursor-pointer underline hover:text-verdeBordoHover">
              Cambia password
            </a>
            <p className="font-bold text-xl text-marroneScuro mt-[10px]">
              Indirizzo:
            </p>
            <p className="text-xl text-marroneScuro pl-[10px]">
              {dati[0].indirizzo}
            </p>
          </div>
          <div className="pt-[15px] w-1/2 ">
            <div className="flex">
              <div
                style={{
                  boxShadow: "3px 3px 17px -3px rgba(0, 0, 0, 0.30)",
                }}
                className="w-[32.5%] h-[11svh] bg-arancioneBordo rounded-3xl flex justify-center items-center mr-[5%] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordoHover"
                onClick={() => {
                  navigate("/completedOrders");
                }}
              >
                <p className="font-bold text-xl text-marroneScuro ml-[10%] w-3/5">
                  Ordini completati
                </p>
                <img
                  src={hostnameProductor + "check.png"}
                  className="h-1/2"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(21%) sepia(4%) saturate(4104%) hue-rotate(317deg) brightness(98%) contrast(93%)",
                  }}
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    style={{
                      boxShadow: "3px 3px 17px -3px rgba(0, 0, 0, 0.30)",
                    }}
                    className="w-[32.5%] h-[11svh] bg-arancioneBordo rounded-3xl flex justify-center items-center mr-[5%] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordoHover"
                    onClick={() => {
                      setPopupEmail(true);
                    }}
                  >
                    <p className="font-bold text-xl text-marroneScuro ml-[10%] w-3/5">
                      Collega email
                    </p>
                    <img
                      src={hostnameProductor + "connected.png"}
                      className="h-1/2"
                      style={{
                        filter:
                          "brightness(0) saturate(100%) invert(21%) sepia(4%) saturate(4104%) hue-rotate(317deg) brightness(98%) contrast(93%)",
                      }}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-gialloSfondo">
                  <DialogHeader>
                    <DialogTitle>
                      <div className="flex justify-center">
                        <p className="font-bold text-marroneScuro text-xl">
                          Collega email
                        </p>
                      </div>
                    </DialogTitle>
                    <DialogDescription>
                      <div className="flex justify-center">
                        Collega una email a questa mensa
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="nome" className="text-right">
                        <p className="font-bold text-marroneScuro text-lg">
                          Nome
                        </p>
                      </Label>
                      <Input
                        id="nome"
                        placeholder=""
                        type="text"
                        defaultValue=""
                        ref={
                          nome as unknown as React.RefObject<HTMLInputElement>
                        }
                        className="w-[15svw] mt-[5px] rounded-2xl border-[3px] border-arancioneChiaro  bg-gialloSfondo"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="cognome" className="text-right">
                        <p className="font-bold text-marroneScuro text-lg">
                          Cognome
                        </p>
                      </Label>
                      <Input
                        id="cognome"
                        placeholder=""
                        type="text"
                        defaultValue=""
                        ref={
                          cognome as unknown as React.RefObject<HTMLInputElement>
                        }
                        className="w-[15svw] mt-[5px] rounded-2xl border-[3px] border-arancioneChiaro  bg-gialloSfondo"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        <p className="font-bold text-marroneScuro text-lg">
                          Email
                        </p>
                      </Label>
                      <Input
                        id="email"
                        placeholder=""
                        type="email"
                        defaultValue=""
                        ref={
                          email as unknown as React.RefObject<HTMLInputElement>
                        }
                        className="w-[15svw] mt-[5px] rounded-2xl border-[3px] border-arancioneChiaro  bg-gialloSfondo"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password" className="text-right">
                        <p className="font-bold text-marroneScuro text-lg">
                          Password
                        </p>
                      </Label>
                      <Input
                        id="password"
                        placeholder=""
                        type="password"
                        defaultValue=""
                        ref={
                          password as unknown as React.RefObject<HTMLInputElement>
                        }
                        className="w-[15svw] mt-[5px] rounded-2xl border-[3px] border-arancioneChiaro  bg-gialloSfondo"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="confermaPassword" className="text-right">
                        <p className="font-bold text-marroneScuro text-lg">
                          Conferma password
                        </p>
                      </Label>
                      <Input
                        id="confermaPassword"
                        placeholder=""
                        type="password"
                        defaultValue=""
                        ref={
                          confermaPassword as unknown as React.RefObject<HTMLInputElement>
                        }
                        className="w-[15svw] mt-[5px] rounded-2xl border-[3px] border-arancioneChiaro  bg-gialloSfondo"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <div className="w-[100%] flex justify-center">
                      <Button
                        type="submit"
                        className="rounded-full bg-verdeBordo hover:bg-verdeBordoHover"
                        onClick={submitButton}
                      >
                        Registrati
                      </Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex mt-[10px]">
              <div
                style={{
                  boxShadow: "3px 3px 17px -3px rgba(0, 0, 0, 0.30)",
                }}
                className="w-[32.5%] h-[11svh] bg-arancioneBordo rounded-3xl flex justify-center items-center mr-[5%] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordoHover"
              >
                <p className="font-bold text-xl text-marroneScuro ml-[10%] w-3/5">
                  Elimina account
                </p>
                <img
                  src={hostnameProductor + "deleteBin.png"}
                  className="h-1/2"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(21%) sepia(4%) saturate(4104%) hue-rotate(317deg) brightness(98%) contrast(93%)",
                  }}
                />
              </div>
              <div
                style={{
                  boxShadow: "3px 3px 17px -3px rgba(0, 0, 0, 0.30)",
                }}
                className="w-[32.5%] h-[11svh] bg-arancioneBordo rounded-3xl flex justify-center items-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordoHover"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("login");
                  navigate(`/login`);
                }}
              >
                <p className="font-bold text-xl text-marroneScuro ml-[10%] w-3/5">
                  Logout account
                </p>
                <img
                  src={hostnameProductor + "logout.png"}
                  className="h-1/2"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(21%) sepia(4%) saturate(4104%) hue-rotate(317deg) brightness(98%) contrast(93%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex pt-[20px]">
          <div className="w-1/2">
            <p className="font-bold text-2xl text-marroneScuro">
              Totale vendite:{" "}
              {ordiniCompletati.reduce(
                (total: number, item: any) => total + item.vendite,
                0
              )}
            </p>
            <div className="flex">
              {periodo.map((item) => (
                <div
                  key={item}
                  className="bg-arancioneChiaro rounded-full px-3 mr-2 transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordo"
                  onClick={() => {
                    setPeriodoCliccato(item);
                    setRicarica(true);
                  }}
                >
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="85%" height={250}>
              <BarChart
                className="ml-[-20px] mt-[20px]"
                data={ordiniCompletati}
              >
                <XAxis dataKey="periodo" stroke="#503431" />
                <YAxis stroke="#503431" />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="vendite" fill="#e59421" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/2">
            <p className="font-bold text-2xl text-marroneScuro">
              Prodotti più venduti:
            </p>
            <div>
              {topProdotti.map(
                (item: any) => (
                  count++,
                  (
                    <div
                      key={item.id}
                      className="flex w-[70%] mt-[3px] border-b-2 border-marroneScuro pb-1"
                    >
                      <div className="flex justify-center w-[10%]">
                        {count < 4 ? (
                          <img
                            src={
                              hostnameProductor + "ranking/" + count + ".png"
                            }
                            className="w-[27px] h-[35px] py-[10%]"
                          />
                        ) : (
                          <p className="font-bold text-xl text-marroneScuro">
                            {count}
                          </p>
                        )}
                      </div>
                      <div className="flex w-[60%] ml-[3%]">
                        <p className="font-bold text-xl text-marroneScuro pl-[5px]">
                          {item.nome}
                        </p>
                      </div>
                      <div className="flex justify-center w-8">
                        <p className="font-bold text-xl text-marroneScuro ml-[9svw]">
                          {item.num_acquisti}
                        </p>
                      </div>
                    </div>
                  )
                )
              )}
            </div>
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
    height: "80%",
    flexDirection: "column",
    display: "flex",
    paddingLeft: "2%",
  },
  sidebar: {
    display: "flex",
    width: "10%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "2%",
  },
  titolo: { fontSize: "130%", color: "black" },
  containerList: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "84svh",
    margin: "0% 2%",
    position: "relative",
    top: "-2svh ",
  },
};

export default ProfileProductor;
