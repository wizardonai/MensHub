import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { cn } from "./shadcn/utils";
import { prodotto } from "../utils";

import homeImg from "../img/home.webp";
import cartImg from "../img/cart.webp";
import profileImg from "../img/profile.webp";
import goBackImg from "../img/goBack.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Topbar = ({ page, name }: { page: string; name: string }) => {
  if (page === "home") {
    return (
      <div className="w-full h-topbar flex flex-col items-center justify-center">
        <p className="text-4xl text-marrone w-[93%]">
          Ciao, <span className="font-bold">{name}</span>
        </p>
        <p className="w-[91%] text-marroncino">Cosa vuoi mangiare?</p>
      </div>
    );
  }

  return (
    <div className="w-full h-topbar flex flex-col items-center justify-center">
      <p className="text-4xl text-marrone w-[93%] font-bold capitalize">
        {page}
      </p>
    </div>
  );
};

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("w-full h-container overflow-y-scroll", className)}>
    {children}
  </div>
);

export const Navbar = ({
  page,
  product,
}: {
  page: string;
  product?: prodotto;
}) => {
  const navigate = useNavigate();

  const buttons = {
    home: useRef(null),
    cart: useRef(null),
    profile: useRef(null),
  };

  const [height, setHeight] = useState(0);

  useEffect(() => {
    let h = window.screen.height - 20;
    setHeight(h / 10 - 20);
  }, []);

  return (
    <div className="w-full h-navbar flex flex-row justify-evenly items-center">
      <div className="w-[90%] h-full flex flex-row justify-evenly items-center">
        {page.split("-")[0] === "Aggiungi al carrello" ||
        page === "Cronologia" ? (
          <>
            <div
              className={`bg-marrone flex justify-center items-center`}
              style={{
                width: height + "px",
                borderRadius: "28px",
                height: height + "px",
              }}
              ref={buttons.home}
              onClick={() => {
                if (page === "Cronologia") navigate("/profile");
                else navigate("/home");
              }}
            >
              <LazyLoadImage
                src={goBackImg}
                alt=""
                className="w-[40%]"
                style={{
                  filter: "var(--filterImgBianco)",
                }}
              />
            </div>
            <div
              className={`bg-marrone flex justify-center items-center`}
              style={{
                width: height * 4 + "px",
                borderRadius: "28px",
                height: height + "px",
              }}
              ref={buttons.home}
              onClick={() => {
                if (page.split("-")[0] === "Aggiungi al carrello") {
                  const id = page.split("-")[1];
                  let carrello = JSON.parse(
                    localStorage.getItem("cart") || "[]",
                  );
                  let presente = false;
                  for (let i = 0; i < carrello.length; i++) {
                    if (carrello[i].id === parseInt(id)) {
                      presente = true;
                      break;
                    }
                  }
                  if (presente) {
                    const nuovoCarrello = carrello.map((item: any) => {
                      if (item.id === parseInt(id)) {
                        let nuovoItem = item;
                        nuovoItem.quantita += 1;
                        return nuovoItem;
                      } else {
                        return item;
                      }
                    });
                    localStorage.setItem("cart", JSON.stringify(nuovoCarrello));
                  } else {
                    carrello.push({ ...product, quantita: 1 });
                    localStorage.setItem("cart", JSON.stringify(carrello));
                  }

                  navigate("/cart");
                }
              }}
            >
              <p className="text-white text-xl capitalize">
                {page.split("-")[0]}
              </p>
            </div>
          </>
        ) : (
          <>
            <div
              className={`bg-marrone flex justify-center items-center`}
              style={{
                width: page === "home" ? height * 3 + "px" : height + "px",
                borderRadius: page === "home" ? "28px" : "50%",
                height: height + "px",
              }}
              ref={buttons.home}
              onClick={(e) => {
                if (page !== "home") navigate("/home");
              }}
            >
              {page === "home" ? (
                <p className="text-white text-xl">HOME</p>
              ) : (
                <LazyLoadImage
                  src={homeImg}
                  alt="home"
                  width={height}
                  height={height}
                  style={{
                    filter: "var(--filterImgBianco)",
                  }}
                />
              )}
            </div>
            <div
              className={`h-[85%] bg-marrone rounded-[28px] flex justify-center items-center`}
              style={{
                width: page === "cart" ? height * 3 + "px" : height + "px",
                borderRadius: page === "cart" ? "28px" : "50%",
                height: height + "px",
              }}
              ref={buttons.cart}
              onClick={(e) => {
                if (page !== "cart") navigate("/cart");
              }}
            >
              {page === "cart" ? (
                <p className="text-white text-xl">CARRELLO</p>
              ) : (
                <LazyLoadImage
                  src={cartImg}
                  alt="cart"
                  style={{
                    filter: "var(--filterImgBianco)",
                  }}
                />
              )}
            </div>
            <div
              className={`h-[85%] bg-marrone rounded-[28px] flex justify-center items-center`}
              style={{
                width: page === "profile" ? height * 3 + "px" : height + "px",
                borderRadius: page === "profile" ? "28px" : "50%",
                height: height + "px",
              }}
              ref={buttons.profile}
              onClick={(e) => {
                if (page !== "profile") navigate("/profile");
              }}
            >
              {page === "profile" ? (
                <p className="text-white text-xl">PROFILO</p>
              ) : (
                <LazyLoadImage
                  src={profileImg}
                  alt="profile"
                  style={{
                    filter: "var(--filterImgBianco)",
                  }}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
