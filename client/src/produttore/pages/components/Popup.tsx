import { useRef, useState } from "react";
import { hostnameProductor } from "src/App";
import { Input } from "src/shadcn/Input";
import Filtri from "./Filtri";

export default function Popup({
  setPopup,
  categorie,
  allergeni,
}: {
  setPopup: Function;
  categorie: any;
  allergeni: any;
}): JSX.Element {
  const nome = useRef(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Si prega di selezionare solo file immagine.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setImageUrl(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed flex justify-center items-center inset-0 bg-slate-600 bg-opacity-5">
      <div className="bg-gialloSfondo w-[38%] h-[65%] shadow-lg rounded-2xl border-arancioneBordoHover border-[4px] opacity-">
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-xl pl-[15px] pt-[10px]">
              Aggiungi una pietanza
            </p>
          </div>
          <button
            className="w-[30px] h-[30px] mr-[8px] mt-[8px] rounded-full flex items-center justify-center hover:cursor-pointer"
            onClick={() => setPopup(false)}
          >
            <img
              src={hostnameProductor + "X.png"}
              alt="close"
              className="w-[20px] h-[20px] transform transition-transform hover:scale-105"
            />
          </button>
        </div>
        <div className="flex-col">
          <div className="flex pt-[10px]">
            <div>
              <div className="pl-[15px]">
                <p className=" font-bold">Nome</p>
                <Input
                  id="nome"
                  placeholder=""
                  type="text"
                  defaultValue=""
                  ref={nome}
                  className="w-[15svw] mt-[5px] rounded-2xl border-[3px] border-arancioneChiaro  bg-gialloSfondo"
                />
              </div>
              <div className="pl-[15px] pt-[15%]">
                <p className="font-bold">Scegli la categoria</p>
                <div
                  className="flex overflow-auto w-[15svw]"
                  style={{ scrollbarWidth: "none" }}
                >
                  <Filtri
                    filtro={""}
                    setFiltro={() => {}}
                    categorie={categorie}
                  />
                </div>
              </div>
              <div className="pl-[15px] pt-[15%]">
                <p className=" font-bold">Descrizione</p>
                <textarea
                  rows={4}
                  cols={50}
                  className="w-[15svw] h-[15svh] mt-[5px] rounded-2xl border-[3px] border-arancioneChiaro bg-gialloSfondo overflow-auto"
                  style={{ scrollbarWidth: "none", resize: "none" }}
                />
              </div>
            </div>
            <div className="pl-[4svw]">
              <div>
                <p className="font-bold">Immagine</p>
                <div
                  onChange={handleImageChange}
                  className="w-[10svw] h-[10svw] mt-[5px] rounded-2xl flex justify-center items-center cursor-pointer transform transition-transform hover:scale-105 hover:bg-gialloSfondoHover"
                >
                  {imageUrl === null ? (
                    <div className="w-[10svw] h-[10svw] border-[3px] border-arancioneChiaro rounded-2xl flex justify-center items-center cursor-pointer">
                      <img
                        src={hostnameProductor + "plus.png"}
                        style={{
                          filter:
                            "invert(69%) sepia(59%) saturate(478%) hue-rotate(345deg) brightness(97%) contrast(85%)",
                          width: "60px",
                          height: "60px",
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={imageUrl}
                        alt="Immagine caricata"
                        style={{ maxWidth: "100%", maxHeight: "400px" }}
                      />
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-[100%] h-[100%] cursor-pointer fixed opacity-0"
                  />
                </div>
              </div>
              <div className="pt-[5%]">
                <p className="font-bold">Allergeni</p>
                <div
                  className="flex overflow-auto w-[15svw]"
                  style={{ scrollbarWidth: "none" }}
                >
                  <div
                    className="flex flex-wrap overflow-auto w-[15svw] h-[15svh]"
                    style={{ scrollbarWidth: "none" }}
                  >
                    {allergeni.map((allergene: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className="bg-arancioneChiaro h-[25px] rounded-full flex items-center px-3 mx-1 my-1 mr-[1%] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordo"
                        >
                          <p className="capitalize text-[16px]">
                            {allergene.nome}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div
              className="bg-verdeBordo h-[25px] rounded-full flex items-center px-8 py-4 mt-[3svh] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-verdeBordoHover"
              id="divFiltro"
            >
              <p
                className="capitalize text-[16px] text-gialloSfondo"
                id="filtroDaApplicare"
              >
                Aggiungi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
