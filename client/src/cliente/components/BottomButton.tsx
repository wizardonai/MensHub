import { useTheme } from "next-themes";
import { styleMap } from "../../App";

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "src/shadcn/Drawer";
import { Button } from "src/shadcn/Button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const BottomButton = ({
	text,
	onClickFun,
	display,
}: {
	text: string;
	onClickFun: Function;
	display: string;
}) => {
	const { resolvedTheme } = useTheme();
	const [quantita, setQuantita] = useState(1);

	const css: styleMap = {
		pulsanteFixatoInBassoDiv: {
			height: "100%",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			fontWeight: "bold",
			// backgroundColor: Colori.primario,
			fontSize: "16px",
			textTransform: "uppercase",
			width: "60%",
			maxWidth: "350px",
			borderRadius: "15px",
			color: resolvedTheme === "light" ? "#fff" : "rgb(3,7,17)",
			background: resolvedTheme === "light" ? "rgb(3,7,17)" : "#fff",
		},
	};

	return (
		<div className='bg-transparent h-[40px] flex justify-center items-center flex-row w-full absolute bottom-[10svh]'>
			{text === "Aggiungi al carrello" ? (
				<div className='h-full flex justify-center items-center font-bold text-[16px] uppercase w-[60%] max-w-[350px] rounded-[15px]'>
					<Drawer>
						<DrawerTrigger className='w-full'>
							<Button variant='default' className='text-[18px] w-full'>
								Aggiungi al carrello
							</Button>
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>Quantità</DrawerTitle>
								<DrawerDescription>
									Inserire la quantità da aggiungere
								</DrawerDescription>
							</DrawerHeader>
							<div className='flex flex-row w-[100%] justify-evenly'>
								<Button
									variant='outline'
									size='icon'
									className='h-8 w-8 shrink-0 rounded-full'
									onClick={() => {
										setQuantita(quantita - 1);
									}}
									disabled={quantita === 1}
								>
									<Minus className='h-4 w-4' />
								</Button>
								<p>{quantita}</p>
								<Button
									variant='outline'
									size='icon'
									className='h-8 w-8 shrink-0 rounded-full'
									onClick={() => {
										setQuantita(quantita + 1);
									}}
								>
									<Plus className='h-4 w-4' />
								</Button>
							</div>
							<DrawerFooter className='flex items-center justify-center'>
								<DrawerClose
									onClick={() => {
										onClickFun(quantita);
									}}
									className='border w-[50%] h-[40px] rounded-[10px]'
								>
									Aggiungi al carrello
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</div>
			) : (
				<div className='h-full flex justify-center items-center font-bold text-[16px] uppercase w-[60%] max-w-[350px] rounded-[15px]'>
					<Drawer>
						<DrawerTrigger className='w-full'>
							<Button className='text-[18px] w-full'>{text}</Button>
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>Ordinare?</DrawerTitle>
								<DrawerDescription>Sicuro di voler ordinare?</DrawerDescription>
							</DrawerHeader>
							<DrawerFooter>
								<div className='flex items-center justify-evenly w-[100%]'>
									<DrawerClose className='border w-[30%] h-[40px] rounded-[10px]'>
										Indietro
									</DrawerClose>
									<DrawerClose
										className='border w-[30%] h-[40px] rounded-[10px]'
										onClick={() => {
											onClickFun(quantita);
										}}
									>
										Ordina
									</DrawerClose>
								</div>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</div>
			)}
		</div>
	);
};

export default BottomButton;
