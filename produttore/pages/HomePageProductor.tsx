//components
import Topbar from "src/cliente/pages/components/Topbar";
import { useState } from "react";
import { styleMap } from "src/App";

import { ColumnDef } from "@tanstack/react-table"
 

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}
 
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]

const HomePageProductor = () => {
	

	return (
		<div className='page'>

			
		</div>
	);
};

const css: styleMap = {
    
    titoloHome: {
		marginTop: "5px",
		fontSize: "25px",
		marginLeft: "15px",
	},
};

export default HomePageProductor;
