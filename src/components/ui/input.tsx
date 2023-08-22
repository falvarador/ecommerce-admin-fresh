import { JSX } from "preact";
import { cn } from "@/src/lib/utils.ts";

// deno-lint-ignore no-empty-interface
export interface InputProps extends JSX.HTMLAttributes<HTMLInputElement> {}

const Input = (props: InputProps) => {
  const { className, type } = props;
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};
Input.displayName = "Input";

export { Input };
