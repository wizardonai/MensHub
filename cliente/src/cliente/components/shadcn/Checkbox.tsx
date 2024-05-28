import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "./utils";
import { VariantProps, cva } from "class-variance-authority";

const checkboxVariants = cva(
	"peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
	{
		variants: {
			variant: {
				menshub:
					"bg-biancoLatte data-[state=checked]:bg-marrone border-marrone shadow-lg text-marrone",
			},
		},
	}
);

export interface CheckboxPropsUasard
	extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
		VariantProps<typeof checkboxVariants> {
	asChild?: boolean;
}

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	CheckboxPropsUasard
>(({ className, variant, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={checkboxVariants({ className, variant })}
		{...props}
	>
		<CheckboxPrimitive.Indicator
			className={cn("flex items-center justify-center text-current")}
		>
			<Check className='h-4 w-4' />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
