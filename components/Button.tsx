import { HTMLProps } from "react";

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  color?: string;
  label?: string;
  type?: "button" | "submit" | "reset";
}
function Button({ color, ...props }: ButtonProps) {
  return (
    <button
      className={`flex w-full justify-between truncate rounded-md p-2 font-medium text-${color}-600 
      hover:bg-${color}-100 `}
      {...props}
    >
      {props.children}
    </button>
  );
}

export default Button;
