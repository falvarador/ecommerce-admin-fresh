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
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500",
        className,
      )}
      {...props}
    />
  );
};
Input.displayName = "Input";

export { Input };
