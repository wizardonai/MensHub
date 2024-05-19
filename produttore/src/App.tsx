import { redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./cliente/pages/Homepage";
import Menu from "./cliente/pages/Menu";
import ProductPage from "./cliente/pages/ProductPage";
import LoginPage from "./login/pages/LoginPage";
import RegisterPage from "./login/pages/RegisterPage";

import { getProdotti } from "./cliente/scripts/fetch";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePageProductor from "./produttore/pages/HomePageProductor";
import MenuPageProductor from "./produttore/pages/MenuPageProductor";
import Balance from "./produttore/pages/Balance";
import ProfileProductor from "./produttore/pages/ProfileProductor";
import {
  getAllergeni,
  getCategorie,
  getInformazioniMensa,
  getOrdini,
  getProdottiCompletati,
} from "./login/scripts/fetch";
import CompletedOrders from "./produttore/pages/CompletedOrders";

export type ArrayProdotti = {
  prodotti: Array<{
    allergeni: string;
    categoria: string;
    descrizione: string;
    disponibile: number;
    fd: number;
    id: number;
    id_mensa: number;
    indirizzo_img: string;
    nacq: number;
    nome: string;
    prezzo: number;
  }>;
};
interface styleThing {
  [thingName: string]: string;
}
export interface styleMap {
  [thingName: string]: styleThing;
}
export interface filtroMap {
  [thingName: string]: boolean;
}

export const hostname =
  (process.env.REACT_APP_HOSTNAME || "") +
  (process.env.REACT_APP_IMG_PORT || "") +
  "/image/";

export const hostnameProductor =
  (process.env.REACT_APP_HOSTNAME || "") +
  (process.env.REACT_APP_IMG_PORT || "") +
  "/image/";

export var Colori = {
  // primario: "#3897F1",
  // imgPrimario:
  // 	"invert(49%) sepia(82%) saturate(1958%) hue-rotate(187deg) brightness(99%) contrast(91%)",
  scuro: "rgb(3,7,17)",
  chiaro: "#fff",
  imgChiara:
    "invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)",
};
export const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const App = () => {
  const [ordini, setOrdini] = useState<any>([]);

  //loggato o no
  const [utente, setUtente] = useState("no");
  const [categorie, setCategorie] = useState<Array<string>>([]);
  const [allergeni, setAllergeni] = useState<Array<string>>([]);
  const [prodotti, setProdotti] = useState<any>([]);

  const refreshStorage = async () => {
    setUtente(localStorage.getItem("login") || "");
    return localStorage.getItem("login");
  };

  if (categorie.length === 0) {
    const fetchCategories = async () => {
      getCategorie(
        JSON.parse(localStorage.getItem("token") || '{"token": "lucaChing"}')
          .token
      ).then((res: any) => {
        if (res === "Token non valido") {
          localStorage.removeItem("cart");
          localStorage.removeItem("token");
          localStorage.setItem("loggato", "false");
        }
        setCategorie(res);
      });
    };
    fetchCategories();
  }

  if (allergeni.length === 0) {
    const fetchAllergeni = async () => {
      getAllergeni(
        JSON.parse(
          localStorage.getItem("token") || '{"token": "cicciogamer89"}'
        ).token
      ).then((res: any) => {
        if (res === "Token non valido") {
          localStorage.removeItem("cart");
          localStorage.removeItem("token");
          localStorage.setItem("loggato", "false");
        }
        setAllergeni(res);
      });
    };
    fetchAllergeni();
  }

  useEffect(() => {
    refreshStorage();
    window.addEventListener("storage", () => {
      setUtente(localStorage.getItem("login") || "");
    });
  }, []);

  let router;

  if (utente === "produttore" || utente === "cliente") {
    router = createBrowserRouter([
      {
        path: "/",
        loader: () => redirect("/productorHome"),
      },
      {
        path: "/productorHome",
        element: <HomePageProductor ordini={ordini} setOrdini={setOrdini} />,
      },
      {
        path: "/productorMenu",
        element: (
          <MenuPageProductor allergeni={allergeni} categorie={categorie} />
        ),
        loader: async () => {
          return getProdotti(
            JSON.parse(localStorage.getItem("token") || '{"token":"asd"}')
          );
        },
      },
      {
        path: "/completedOrders",
        element: <CompletedOrders />,
        loader: async () => {
          return getProdottiCompletati(
            JSON.parse(
              localStorage.getItem("token") || '{"token":"uasardusss"}'
            ).token
          );
        },
      },
      {
        path: "/productorProfile",
        element: <ProfileProductor />,
        loader: async () => {
          return getInformazioniMensa(
            JSON.parse(localStorage.getItem("token") || '{"token":"asd"}').token
          );
        },
      },
      {
        path: "*",
        loader: () => redirect("/productorHome"),
      },
      {
        path: "/login",
        element: <LoginPage />,
        loader: () => ({
          refreshStorage: refreshStorage,
        }),
      },
    ]);
  } else {
    router = createBrowserRouter([
      {
        path: "/",
        loader: () => redirect("/login"),
      },
      {
        path: "/login",
        element: <LoginPage />,
        loader: () => ({
          refreshStorage: refreshStorage,
        }),
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "*",
        loader: () => redirect("/login"),
      },
    ]);
  }

  return <RouterProvider router={router} />;
};

export default App;
