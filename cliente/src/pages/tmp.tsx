import { useEffect } from "react";
import { sleep } from "../utils";
import { Toaster } from "../components/shadcn/Sonner";
import { toast } from "sonner";

const Tmp = ({ setLoggato }: { setLoggato: Function }) => {
	useEffect(() => {
		toast.info("Reindirizzamento in corso...");
		sleep(2500).then(() => {
			setLoggato(false);
		});
	}, [setLoggato]);

	return (
		<>
			<div>PRODUTTORE</div>
			<Toaster richColors />
		</>
	);
};

export default Tmp;
