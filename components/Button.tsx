import { HTMLProps } from "react";

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  className?: string;
  label?: string;
  type?: "button" | "submit" | "reset";
}
function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={`flex w-full justify-between truncate rounded-md p-2 font-medium ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
}

export default Button;
