import { useEffect, useRef, useState } from "react";
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
  const prezzo = useRef(null);
  const [filtro, setFiltro] = useState("");
  const [allergeniScelti, setAllergeniScelti] = useState<any[]>([]);
  const descrizione = useRef(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const horizontalDivRef = useRef<HTMLDivElement>(null);
  const verticalDivRef = useRef<HTMLDivElement>(null);
  const [isHorizontalMouseDown, setIsHorizontalMouseDown] = useState(false);
  const [horizontalMouseDownX, setHorizontalMouseDownX] = useState(0);
  const [lastHorizontalMouseMoveX, setLastHorizontalMouseMoveX] = useState(0);
  const [isVerticalMouseDown, setIsVerticalMouseDown] = useState(false);
  const [verticalMouseDownY, setVerticalMouseDownY] = useState(0);
  const [lastVerticalMouseMoveY, setLastVerticalMouseMoveY] = useState(0);

  const submitButton = () => {
    const nomeValue = nome.current;
    const categoriaValue = filtro;
    const descrizioneValue = descrizione.current;
    const allergeniValue = allergeniScelti;
    const immagineValue = imageUrl;

    if (
      nomeValue === "" ||
      categoriaValue === "" ||
      descrizioneValue === "" ||
      immagineValue === null
    ) {
      alert("Si prega di compilare tutti i campi.");
      return;
    }

    // Aggiungi la pietanza
  };

  const handleAllergeni = (allergene: string) => {
    return () => {
      const index = allergeniScelti.indexOf(allergene);
      if (index === -1) {
        setAllergeniScelti([...allergeniScelti, allergene]);
      } else {
        setAllergeniScelti([
          ...allergeniScelti.slice(0, index),
          ...allergeniScelti.slice(index + 1),
        ]);
      }
    };
  };

  console.log(allergeniScelti);

  useEffect(() => {
    const handleHorizontalMouseMove = (event: MouseEvent) => {
      if (!isHorizontalMouseDown || !horizontalDivRef.current) return;

      const mouseX = event.clientX;
      const distance = mouseX - lastHorizontalMouseMoveX;
      horizontalDivRef.current.scrollLeft -= distance;

      setLastHorizontalMouseMoveX(mouseX);
    };

    const handleHorizontalMouseUp = () => {
      setIsHorizontalMouseDown(false);
    };

    document.addEventListener("mousemove", handleHorizontalMouseMove);
    document.addEventListener("mouseup", handleHorizontalMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleHorizontalMouseMove);
      document.removeEventListener("mouseup", handleHorizontalMouseUp);
    };
  }, [isHorizontalMouseDown, lastHorizontalMouseMoveX]);

  useEffect(() => {
    const handleVerticalMouseMove = (event: MouseEvent) => {
      if (!isVerticalMouseDown || !verticalDivRef.current) return;

      const mouseY = event.clientY;
      const distance = mouseY - lastVerticalMouseMoveY;
      verticalDivRef.current.scrollTop -= distance;

      setLastVerticalMouseMoveY(mouseY);
    };

    const handleVerticalMouseUp = () => {
      setIsVerticalMouseDown(false);
    };

    document.addEventListener("mousemove", handleVerticalMouseMove);
    document.addEventListener("mouseup", handleVerticalMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleVerticalMouseMove);
      document.removeEventListener("mouseup", handleVerticalMouseUp);
    };
  }, [isVerticalMouseDown, lastVerticalMouseMoveY]);

  const handleHorizontalMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsHorizontalMouseDown(true);
    setHorizontalMouseDownX(event.clientX);
    setLastHorizontalMouseMoveX(event.clientX);
  };

  const handleVerticalMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsVerticalMouseDown(true);
    setVerticalMouseDownY(event.clientY);
    setLastVerticalMouseMoveY(event.clientY);
  };

  const handleHorizontalWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (horizontalDivRef.current) {
      const scrollAmount = 1; // Puoi regolare la velocità di scrolling
      const scrollLeft =
        horizontalDivRef.current.scrollLeft + event.deltaY * scrollAmount;
      horizontalDivRef.current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  };

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
    <div className="fixed flex justify-center items-center inset-0 bg-slate-700 bg-opacity-5">
      <div className="bg-gialloSfondo w-[38%] h-[65%] shadow-lg rounded-2xl border-arancioneBordoHover border-[4px] opacity-">
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-xl pl-[15px] pt-[10px] select-none pointer-events-none">
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
              className="w-[20px] h-[20px] transform transition-transform hover:scale-105 select-none pointer-events-none"
            />
          </button>
        </div>
        <div className="flex-col">
          <div className="flex pt-[10px]">
            <div>
              <div className="pl-[15px]">
                <p className=" font-bold select-none pointer-events-none">
                  Nome
                </p>
                <Input
                  id="nome"
                  placeholder=""
                  type="text"
                  defaultValue=""
                  ref={nome}
                  className="w-[15svw] mt-[5px] rounded-2xl border-[3px] border-arancioneChiaro  bg-gialloSfondo"
                />
              </div>
              <div className="pl-[15px] pt-[3%]">
                <p className=" font-bold select-none pointer-events-none">
                  Prezzo
                </p>
                <Input
                  id="nome"
                  placeholder=""
                  type="numeric"
                  defaultValue=""
                  ref={nome}
                  step="0.01"
                  className="w-[5svw] mt-[5px] rounded-2xl border-[3px] border-arancioneChiaro bg-gialloSfondo"
                />
              </div>
              <div className="pl-[15px] pt-[3%]">
                <p className="font-bold select-none pointer-events-none">
                  Scegli la categoria
                </p>
                <div
                  className="flex overflow-auto w-[15svw]"
                  style={{ scrollbarWidth: "none" }}
                  onMouseDown={handleHorizontalMouseDown}
                  onWheel={handleHorizontalWheel}
                  ref={horizontalDivRef}
                >
                  <Filtri
                    filtro={filtro}
                    setFiltro={setFiltro}
                    categorie={categorie}
                  />
                </div>
              </div>
              <div className="pl-[15px] pt-[3%]">
                <p className=" font-bold select-none pointer-events-none">
                  Descrizione
                </p>
                <textarea
                  rows={4}
                  cols={50}
                  className="w-[15svw] h-[12svh] mt-[5px] rounded-2xl border-[3px] border-arancioneChiaro bg-gialloSfondo overflow-auto"
                  style={{ scrollbarWidth: "none", resize: "none" }}
                />
              </div>
            </div>
            <div className="pl-[4svw]">
              <div>
                <p className="font-bold select-none pointer-events-none">
                  Immagine
                </p>
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
                          userSelect: "none",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={imageUrl}
                        alt="Immagine caricata"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "400px",
                          userSelect: "none",
                          pointerEvents: "none",
                        }}
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
                <p className="font-bold select-none pointer-events-none">
                  Allergeni
                </p>
                <div
                  className="flex overflow-auto w-[15svw]"
                  style={{ scrollbarWidth: "none" }}
                >
                  <div
                    className="flex flex-wrap overflow-auto w-[15svw] h-[15svh]"
                    style={{ scrollbarWidth: "none" }}
                    onMouseDown={handleVerticalMouseDown}
                    ref={verticalDivRef}
                  >
                    {allergeni.map((allergene: any, index: number) => {
                      if (allergeniScelti.includes(allergene.nome)) {
                        return (
                          <div
                            key={index}
                            className="bg-verdeBordo h-[25px] rounded-full flex items-center px-3 mx-1 my-1 mr-[1%] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-verdeBordoHover"
                            onClick={handleAllergeni(allergene.nome)}
                          >
                            <p className="capitalize text-[16px] select-none pointer-events-none">
                              {allergene.nome}
                            </p>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={index}
                            className="bg-arancioneChiaro h-[25px] rounded-full flex items-center px-3 mx-1 my-1 mr-[1%] transform transition-transform hover:scale-105 hover:cursor-pointer hover:bg-arancioneBordo"
                            onClick={handleAllergeni(allergene.nome)}
                          >
                            <p className="capitalize text-[16px] select-none pointer-events-none">
                              {allergene.nome}
                            </p>
                          </div>
                        );
                      }
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
              onClick={submitButton}
            >
              <p
                className="capitalize text-[16px] text-gialloSfondo select-none pointer-events-none"
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
