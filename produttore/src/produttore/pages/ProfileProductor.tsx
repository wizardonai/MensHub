import React, { useEffect, useState } from "react";
import { hostnameProductor, styleMap } from "src/App";
import NavbarProductor from "./components/NavbarProductor";
import { getStatMensa, getTopProdotti } from "src/login/scripts/fetch";
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

const ProfileProductor = () => {
  const dati: any = useLoaderData();
  const navigate = useNavigate();
  const periodo = ["1G", "1S", "1M", "3M", "6M", "1A"];
  const [periodoCliccato, setPeriodoCliccato] = useState<string>("1A");
  const [ricarica, setRicarica] = useState<boolean>(true);
  const [topProdotti, setTopProdotti] = useState<any>([]);
  const [ordiniCompletati, setOrdiniCompletati] = useState<any>([]);

  if (!dati) return <p>CARICAMENTO</p>;

  console.log(dati);

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
  console.log(ordiniCompletati);

  let count = 0;

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
          <div className="pt-[15px] w-1/2">
            <div
              style={{
                boxShadow: "3px 3px 17px -3px rgba(0, 0, 0, 0.30)",
              }}
              className="w-[50%] h-[11svh] bg-arancioneBordo rounded-3xl flex justify-center items-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordoHover"
              onClick={() => {
                navigate("/completedOrders");
              }}
            >
              <p className="font-bold text-2xl text-marroneScuro">
                Ordini completati
              </p>
            </div>
            <div className="flex mt-[10px]">
              <div
                style={{
                  boxShadow: "3px 3px 17px -3px rgba(0, 0, 0, 0.30)",
                }}
                className="w-[22.5%] h-[11svh] bg-arancioneBordo rounded-3xl flex items-center mr-[5%] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordoHover"
              >
                <p className="font-bold text-lg text-marroneScuro ml-[8px] w-3/5">
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
                className="w-[22.5%] h-[11svh] bg-arancioneBordo rounded-3xl flex justify-center items-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordoHover"
              >
                <p className="font-bold text-lg text-marroneScuro ml-[8px] w-3/5">
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
              Totale vendite:
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
                    <div key={item.id} className="flex mt-[3px]">
                      {count < 4 ? (
                        <img
                          src={hostnameProductor + "ranking/" + count + ".png"}
                          className="h-[25px]"
                        />
                      ) : (
                        <p className="font-bold text-lg text-arancioneChiaro">
                          {count}
                        </p>
                      )}
                      <p className="font-bold text-lg text-marroneScuro pl-[5px]">
                        {item.nome}
                      </p>
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
