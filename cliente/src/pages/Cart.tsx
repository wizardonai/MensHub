import { useEffect, useRef, useState } from "react";
import { Container, Navbar, Topbar } from "../components/Components";
import { Nullable, prodottoCarrello, urlImg } from "../utils";

import deleteImg from "../img/delete.webp";
import { sendOrder } from "../scripts/fetch";
import { toast } from "sonner";
import { Toaster } from "../components/shadcn/Sonner";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Elemento = ({
  item,
  setCarrello,
}: {
  item: prodottoCarrello;
  setCarrello: Function;
}) => {
  const [start, setStart] = useState(null as Nullable<number>);
  const [end, setEnd] = useState(null as Nullable<number>);

  const divtot = useRef(null as Nullable<HTMLDivElement>);
  const bottoneElimina = useRef(null as Nullable<HTMLDivElement>);

  const [quantita, setQuantita] = useState(item.quantita);

  const minSwipeDistance = 50;
  const onTouchEndFn = (e: React.TouchEvent<HTMLDivElement>) => {
    if (start && end) {
      const distance = end - start;

      // const right = distance > minSwipeDistance;
      const left = distance < -minSwipeDistance;

      if (left) {
        let tmp: any = e.currentTarget;

        while (tmp.id !== "divTot") {
          tmp = tmp.parentNode;
        }

        if (!tmp.className.includes("animate-swipeLeftCarrello")) {
          tmp.className = tmp.className.replace(
            " animate-swipeRightCarrello",
            "",
          );
          tmp.className = tmp.className.replace(
            " animate-swipeLeftCarrello",
            "",
          );

          tmp.className += " animate-swipeLeftCarrello";
          tmp.children["altriDati"].className += " hidden";

          let btnElimina = tmp.parentNode.children[1];

          btnElimina.className = btnElimina.className.replace(" hidden", "");
          btnElimina.className = btnElimina.className.replace(
            " animate-swipeRightCarrelloEl",
            "",
          );
          btnElimina.className += " animate-swipeLeftCarrelloEl";
        }
      } else {
        let tmp: any = e.currentTarget;

        while (tmp.id !== "divTot") {
          tmp = tmp.parentNode;
        }

        if (tmp.className.includes("animate-swipeLeftCarrello")) {
          tmp.className = tmp.className.replace(
            " animate-swipeLeftCarrello",
            "",
          );
          tmp.children["altriDati"].className = tmp.children[
            "altriDati"
          ].className.replace(" hidden", "");

          tmp.className += " animate-swipeRightCarrello";

          let btnElimina = tmp.parentNode.children[1];
          btnElimina.className += " animate-swipeRightCarrelloEl";
          btnElimina.className = btnElimina.className.replace(
            " animate-swipeLeftCarrelloEl",
            "",
          );
        }
      }
    }
  };

  return (
    <div className="flex flex-row justify-start items-center">
      <div
        className="w-full h-[80px] flex flex-row justify-start items-center rounded-3xl bg-arancioneScuro mb-3"
        onTouchStart={(e) => {
          setEnd(null);
          setStart(e.targetTouches[0].clientX);
        }}
        onTouchMove={(e) => {
          setEnd(e.targetTouches[0].clientX);
        }}
        onTouchEnd={onTouchEndFn}
        id="divTot"
        ref={divtot}
      >
        <LazyLoadImage
          src={urlImg + item.indirizzo_img}
          alt={item.nome}
          className="w-[70px] h-[70px] ml-2"
          id=""
        />
        <div className="w-1/2 flex flex-col items-center pl-1" id="">
          <p
            id=""
            className=" text-marrone w-full whitespace-nowrap overflow-hidden overflow-ellipsis"
          >
            {item.nome}
          </p>
          <p id="" className=" text-marrone w-full">
            {item.prezzo.toFixed(2)}€
          </p>
        </div>
        <div
          className="flex justify-center items-center flex-col w-1/4"
          id="altriDati"
        >
          <div
            className="flex flex-row justify-center items-center w-full"
            id=""
          >
            <p
              id=""
              className="text-marrone text-2xl"
              onClick={() => {
                if (quantita === 1) return;
                let tmp = JSON.parse(localStorage.getItem("cart") || "{}");

                tmp.forEach((item2: prodottoCarrello) => {
                  if (item2.id === item.id) {
                    item2.quantita--;
                    setQuantita(quantita - 1);
                  }
                });

                localStorage.setItem("cart", JSON.stringify(tmp));
                setCarrello(tmp);
              }}
            >
              -
            </p>
            <p id="" className="text-marrone mx-2">
              {quantita}
            </p>
            <p
              id=""
              className="text-marrone  text-xl"
              onClick={() => {
                let tmp = JSON.parse(localStorage.getItem("cart") || "{}");

                tmp.forEach((item2: prodottoCarrello) => {
                  if (item2.id === item.id) {
                    item2.quantita++;
                    setQuantita(quantita + 1);
                  }
                });

                localStorage.setItem("cart", JSON.stringify(tmp));
                setCarrello(tmp);
              }}
            >
              +
            </p>
          </div>
        </div>
      </div>
      <div
        className="h-[80px] justify-center hidden items-center clip-searchbtn bg-red-800 mb-3"
        onClick={() => {
          let tmp = JSON.parse(localStorage.getItem("cart") || "{}");
          tmp = tmp.filter((item2: prodottoCarrello) => item2.id !== item.id);
          setCarrello(tmp);
          localStorage.setItem("cart", JSON.stringify(tmp));

          //@ts-ignore
          divtot.current.className = divtot.current.className.replace(
            " animate-swipeLeftCarrello",
            "",
          );

          //@ts-ignore
          divtot.current.children["altriDati"].className =
            //@ts-ignore
            divtot.current.children["altriDati"].className.replace(
              " hidden",
              "",
            );
          //@ts-ignore
          bottoneElimina.current.className =
            //@ts-ignore
            bottoneElimina.current.className.replace(
              " animate-swipeLeftCarrelloEl",

              "",
            );
          //@ts-ignore
          bottoneElimina.current.className += " hidden";
        }}
        ref={bottoneElimina}
      >
        <LazyLoadImage
          src={deleteImg}
          alt=""
          className="w-[40px] h-[40px] ml-7 mt-5"
        />
      </div>
    </div>
  );
};
const Lista = ({
  carrello,
  setCarrello,
}: {
  carrello: Array<prodottoCarrello>;
  setCarrello: Function;
}) => {
  return carrello.map((item, index) => (
    <Elemento item={item} key={index} setCarrello={setCarrello} />
  ));
};

const Cart = () => {
  const [carrello, setCarrello] = useState(
    JSON.parse(localStorage.getItem("cart") || "{}") as Array<prodottoCarrello>,
  );

  const [totale, setTotale] = useState(0);
  useEffect(() => {
    let tmp = 0;
    carrello.forEach((item: prodottoCarrello) => {
      tmp += item.prezzo * item.quantita;
    });

    setTotale(tmp);
  }, [carrello]);

  return (
    <>
      <Topbar page="cart" name={""} />
      <Container>
        <div className="h-[92%] w-full flex items-center flex-col">
          <div className="w-[80%]">
            <Lista carrello={carrello} setCarrello={setCarrello} />
          </div>
        </div>
        <div className="h-[8%] w-full flex flex-row justify-evenly items-center border-t-2 border-dashed">
          <div className="text-xl text-marrone">
            Totale: {totale.toFixed(2)}€
          </div>
          <div
            className="bg-[#5c8c46] p-[6px] px-6 rounded-3xl text-background text-xl"
            onClick={() => {
              if (carrello.length === 0) {
                toast.error("Il carrello è vuoto");
                return;
              }
              sendOrder(
                carrello,
                JSON.parse(localStorage.getItem("token") || '{"token": "scu"}'),
              ).then((res: any) => {
                if (res.toString() === "Ordine aggiunto") {
                  localStorage.setItem("cart", "[]");
                  setCarrello([]);
                }
              });
            }}
          >
            Ordina
          </div>
        </div>
        <Toaster position="top-center" richColors />
      </Container>
      <Navbar page="cart" />
    </>
  );
};

export default Cart;
