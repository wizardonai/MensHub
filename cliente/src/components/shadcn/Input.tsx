import * as React from "react";

import { cn } from "./utils";
import { VariantProps, cva } from "class-variance-authority";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariants> {
	asChild?: boolean;
}

const inputVariants = cva(
	"flex h-10 w-full rounded-md border border-marrone bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
	{
		variants: {
			variant: {
				inputMenshub:
					"bg-biancoLatte rounded-3xl border-0 shadow-lg text-marrone",
			},
		},
	}
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, variant, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(inputVariants({ variant, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = "Input";

export { Input };
