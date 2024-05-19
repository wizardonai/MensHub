//css
import { useEffect } from "react";
import { ArrayProdotti, hostnameProductor, styleMap } from "../../../App";
import { useTheme } from "next-themes";
import { prodotto } from "src/cliente/pages/Homepage";

const SearchBar = ({
  prodotti,
  setProdottiFiltrati,
}: {
  prodotti: any;
  setProdottiFiltrati: Function;
}) => {
  const { resolvedTheme } = useTheme();

  //   elencoProdotti.map((item: prodotto, index: number) => {
  //     console.log(item);
  //   });

  //   useEffect(() => {
  //     elencoProdotti.prodotti.sort((a, b) => {
  //       if (a.nome > b.nome) {
  //         return 1;
  //       }
  //       if (a.nome < b.nome) {
  //         return -1;
  //       }
  //       return 0;
  //     });
  //     //eslint-disable-next-line
  //   }, []);

  const onChangeSearch = (e: any) => {
    const strSrc = e.target.value.toLowerCase();

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
  };

  //
  //
  // stili
  //
  const css: styleMap = {
    containerSearch: {
      overflowY: "scroll",
      overflowX: "hidden",
    },
    risultatiRicerca: {
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    divSearchBar: {
      /*
  		border: "1px solid",
  		borderColor: "var(--foreground)",
  		borderRadius: "20px",
  		*/
      display: "flex",
      alignItems: "center",
      padding: "5px 0",
      justifyContent: "space-evenly",
      backgroundColor: "var(--background)",
      width: "98svw",
      margin: "0.5svw 0.5svw",
      outline: "none",
      maxHeight: "30px",
      boxSizing: "content-box",
    },
    searchBar: {
      fontSize: "20px",
      height: "50px",
      border: "0",
      backgroundColor: "transparent",
      outline: "none",
      width: "80%",
    },
    bottoneCerca: {
      height: "6%",
      maxHeight: "30px",
      filter:
        resolvedTheme === "light"
          ? ""
          : "invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)",
    },
  };

  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Cerca prodotti..."
        onChange={onChangeSearch}
        className="bg-gialloSfondo border-[3px] border-arancioneBordoHover rounded-3xl w-[17svw] h-[7svh] text-xl pl-[10px] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-gialloSfondoHover"
        style={{
          clipPath: "polygon(0 0, 90% 0, 80% 100%, 0 100%)",
        }}
      />
      <button
        className="bg-arancioneBordo flex justify-center items-center w-[5svw] h-[7svh] ml-[-2.5svw] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordoHover"
        style={{ clipPath: "polygon(33% 0, 100% 0, 100% 100%, 0 100%)" }}
      >
        <img
          src={hostnameProductor + "search.png"}
          alt="ricerca"
          className="w-[30%] scale-x-[-1] ml-[20%]"
        />
      </button>
    </div>
  );
};

export default SearchBar;
