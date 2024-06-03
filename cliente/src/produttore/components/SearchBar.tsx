//css
import { hostnameProductor, styleMap } from "../../App";

const SearchBar = ({
  prodotti,
  setProdottiFiltrati,
  strSrc,
  setStrSrc,
}: {
  prodotti: any;
  setProdottiFiltrati: Function;
  strSrc: string;
  setStrSrc: Function;
}) => {
  const onChangeSearch = (e: any) => {
    setStrSrc(e.target.value.toLowerCase());
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
        "invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)",
    },
  };

  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Cerca prodotti..."
        onChange={onChangeSearch}
        className="focus:outline-none focus:ring-0 focus:border-arancioneBordoHover bg-gialloSfondo border-[3px] border-arancioneBordoHover rounded-3xl w-[17svw] h-[7svh] text-xl pl-[10px] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-gialloSfondoHover"
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