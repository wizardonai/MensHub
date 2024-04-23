import { hostnameProductor, styleMap } from "src/App";

const Product = ({ filtro }: { filtro: any }) => {
  return (
    <>
      <div className="bg-arancioneBordo h-[25px]  rounded-full flex items-center px-3 mr-[1%]">
        <p className="capitalize">{filtro}</p>
      </div>
      <div style={css.prodottiContainer}>
        <div className="bg-verdeBordo h-[150px] w-[225px] border-gialloSfondo rounded-lg mt-[15px] flex items-center justify-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-verdeBordoHover mr-[2%]">
          <img
            src={hostnameProductor + "plus.png"}
            style={{
              filter:
                "brightness(0) saturate(100%) invert(95%) sepia(17%) saturate(206%) hue-rotate(349deg) brightness(92%) contrast(90%)",
              width: "60px",
              height: "60px",
            }}
          />
        </div>
        <div className="bg-arancioneBordo h-[150px] w-[225px] rounded-lg mt-[15px]  transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordoHover mr-[2%]">
          <div className="flex items-center">
            <div className="bg-verdeBordo h-[70px] w-[70px] mt-[10px] ml-[10px] mr-[10px]"></div>
            <div className="mt-[10px]">
              <p>
                Panna cotta <br />
                8.00€
              </p>
            </div>
          </div>
          <div className="ml-[10px] mt-[5px]">
            <p>
              Descrizione: ... <br />
              Allergeni: ...
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const css: styleMap = {
  prodottiContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%",
    marginBottom: "3.5svh",
    paddingLeft: "6px",
  },
};

export default Product;
