import { JSX } from "preact";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils.ts";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700",
        destructive:
          "text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700",
        outline:
          "text-gray-900 border border-gray-800 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600",
        secondary:
          "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600",
        ghost:
          "py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
        link: "text-primary underline-offset-4 hover:underline",
      },
      shape: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "default",
    },
  },
);

export interface ButtonProps
  extends
    JSX.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  shape?: "default" | "sm" | "lg" | "icon";
  type?: "button" | "submit" | "reset";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

const Button = (props: ButtonProps) => {
  const { className, children, type, shape, variant } = props;

  return (
    <button
      {...props}
      type={type ?? "button"}
      class={cn(buttonVariants({ variant, shape, className }))}
    >
      {children}
    </button>
  );
};
Button.displayName = "Button";

export { Button, buttonVariants };
