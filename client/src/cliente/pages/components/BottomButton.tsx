import { useTheme } from "next-themes";
import { Colori } from "../../../App";
import { styleMap } from "../../../App";

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
		pulsanteFixatoInBasso: {
			backgroundColor: "transparent",
			height: "40px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "row",
			width: "100%",
			borderRadius: "15px",
			position: "absolute",
			bottom: "calc(10svh)",
		},
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
			color: resolvedTheme === "light" ? Colori.chiaro : Colori.scuro,
			background: resolvedTheme === "light" ? Colori.scuro : Colori.chiaro,
		},
	};

	return (
		<div
			style={
				display === "none"
					? { ...css.pulsanteFixatoInBasso, display: "none" }
					: css.pulsanteFixatoInBasso
			}
		>
			{text === "Aggiungi al carrello" ? (
				<div
					style={css.pulsanteFixatoInBassoDiv}
					//@ts-ignore
					// onClick={onClickFun}
				>
					<Drawer>
						<DrawerTrigger className='w-[100%] h-[100%]'>{text}</DrawerTrigger>
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
							<DrawerFooter>
								<DrawerClose>
									<Button
										onClick={() => {
											onClickFun(quantita);
										}}
									>
										Aggiungi al carrello
									</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</div>
			) : (
				<div
					style={css.pulsanteFixatoInBassoDiv}
					// onClick={onClickFun}
				>
					<Drawer>
						<DrawerTrigger>{text}</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>Ordinare?</DrawerTitle>
								<DrawerDescription>Sicuro di voler ordinare?</DrawerDescription>
							</DrawerHeader>
							<DrawerFooter>
								<DrawerClose>
									<div className='flex items-center justify-evenly'>
										<Button variant='outline'>Indietro</Button>
										<Button
											onClick={() => {
												onClickFun(quantita);
											}}
										>
											Ordina
										</Button>
									</div>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</div>
			)}
		</div>
	);
};

export default BottomButton;
