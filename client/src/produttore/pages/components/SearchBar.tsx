//css
import { useEffect } from "react";
import { ArrayProdotti, hostnameProductor, styleMap } from "../../../App";
import { useTheme } from "next-themes";
import { prodotto } from "src/cliente/pages/Homepage";

const SearchBar = ({
  elencoProdotti,
  stringaSearch,
  setStringaSearch,
  setProdottiDaStampare,
}: {
  elencoProdotti: any;
  stringaSearch: string;
  setStringaSearch: Function;
  setProdottiDaStampare: Function;
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

  function controlliSearch(e: any, effect: boolean) {
    if (!effect) {
      let str = e.target.value.toLowerCase();
      setStringaSearch(str);
      const nChar = str.length;
      if (str.length > 0) {
        let indici = [];
        for (let i = 0; i < elencoProdotti.length; i++) {
          let arr = elencoProdotti[i].nome.split(" ");
          let arr2 = [];
          if (arr.length === 1) {
            arr2.push(arr[0]);
          } else {
            let tmp: Array<string> = [];
            arr.forEach((item: string) => {
              let tmp2 = item.split("'");
              tmp2.forEach((item2: string) => {
                tmp.push(item2);
              });
            });
            tmp.forEach((item) => {
              arr2.push(item);
            });
          }
          for (let j = 0; j < arr2.length; j++) {
            if (arr2[j].slice(0, nChar) === str) {
              indici.push(i);
              break;
            }
          }
        }
        let prodotti: Array<prodotto> = [];
        indici.forEach((item) => {
          prodotti.push(elencoProdotti[item]);
        });
        setProdottiDaStampare(prodotti);
      } else {
        setProdottiDaStampare(elencoProdotti);
      }
    } else {
      setProdottiDaStampare(elencoProdotti);
    }
  }
  useEffect(() => {
    controlliSearch(null, true);
    // eslint-disable-next-line
  }, []);
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
    // <div style={css.divSearchBar}>
    //   <img
    //     src={hostnameProductor + "search.png"}
    //     alt=""
    //     style={css.bottoneCerca}
    //   />
    //   <input
    //     type="text"
    //     placeholder="Cerca prodotti..."
    //     // @ts-ignore
    //     onChange={controlliSearch}
    //     value={stringaSearch}
    //     style={css.searchBar}
    //     // @ts-ignore
    //     onClick={controlliSearch}
    //   />
    // </div>

    <div className="flex">
      <input
        type="text"
        placeholder="Cerca prodotti..."
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
