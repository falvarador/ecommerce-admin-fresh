import { JSX } from "preact";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils.ts";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = (
  { className, ...props }:
    & JSX.HTMLAttributes<HTMLLabelElement>
    & VariantProps<typeof labelVariants>,
) => (
  <label
    {...props}
    className={cn(labelVariants(), className)}
    onMouseDown={(event) => {
      props.onMouseDown?.(event);
      // prevent text selection when double clicking label
      if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
    }}
  />
);
Label.displayName = "Label";

export { Label };
