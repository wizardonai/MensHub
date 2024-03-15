import React from "react";
import OrdersTable from "./components/OrdersTable";
import { hostnameProductor, styleMap } from "src/App";
import NavbarProductor from "./components/NavbarProductor";

const MenuPageProductor = () => {
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
          <div className="bg-gialloSfondo h-[25px] border-2 border-arancioneBordo rounded-full flex items-center px-3 mr-[1%] transform transition-transform hover:scale-105 hover:cursor-pointer">
            <p>luca ching</p>
          </div>
          <div className="bg-gialloSfondo h-[25px] border-2 border-arancioneBordo rounded-full flex items-center px-3 mr-[1%] transform transition-transform hover:scale-105 hover:cursor-pointer">
            <p>pizza</p>
          </div>
          <div className="bg-gialloSfondo h-[25px] border-2 border-arancioneBordo rounded-full flex items-center px-3 mr-[1%] transform transition-transform hover:scale-105 hover:cursor-pointer">
            <p>dessert</p>
          </div>
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
    marginLeft: "15px",
  },
  prodottiContainer: {
    display: "flex",
    flexDirection: "row",
  },
};

export default MenuPageProductor;
