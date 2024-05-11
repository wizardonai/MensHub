import React, { useState } from "react";
import OrdersTable from "./components/OrdersTable";
import { hostnameProductor, styleMap } from "src/App";
import NavbarProductor from "./components/NavbarProductor";
import { useLoaderData } from "react-router-dom";
import OrdineCliccato from "./components/OrdineCliccato";

const ProfileProductor = () => {
  const periodo = ["1G", "1S", "1M", "3M", "6M", "1A"];

  return (
    <div className="page" style={css.page}>
      <div style={css.sidebar}>
        <NavbarProductor page="profileProductor" />
      </div>
      <div style={css.centerPage}>
        <div>
          <p className="font-bold text-5xl text-marroneScuro">Nome Mensa</p>
        </div>
        <div className="flex">
          <div className="pt-[15px] w-1/2">
            <p className="font-bold text-xl text-marroneScuro">Email:</p>
            <p className="text-xl text-marroneScuro pl-[10px] mb-[10px]">
              email@example.com
            </p>
            <a className="font-bold text-lg text-verdeBordo cursor-pointer underline">
              Cambia password
            </a>
            <p className="font-bold text-xl text-marroneScuro mt-[10px]">
              Indirizzo:
            </p>
            <p className="text-xl text-marroneScuro pl-[10px]">
              via Franchini, 1
            </p>
          </div>
          <div className="pt-[15px] w-1/2">
            <div
              style={{
                boxShadow: "3px 3px 17px -3px rgba(0, 0, 0, 0.30)",
              }}
              className="w-[50%] h-[11svh] bg-arancioneBordo rounded-3xl flex justify-center items-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordoHover"
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
                <div className="bg-arancioneChiaro rounded-full px-3 mr-2 transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordo">
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2">
            <p className="font-bold text-2xl text-marroneScuro">
              Prodotti più venduti:
            </p>
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
