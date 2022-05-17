import { HTMLProps } from "react";

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  className?: string;
  label?: string;
  type?: "button" | "submit" | "reset";
  color?: keyof typeof Color;
}

const Color = {
  blue: "text-blue-600 hover:bg-blue-100",
  red: "text-red-600 hover:bg-red-100",
  green: "text-green-600 hover:bg-green-100",
  purple: "text-purple-600 hover:bg-purple-100",
  sky: "text-sky-600 hover:bg-sky-100",
  fuchsia: "text-fuchsia-600 hover:bg-fuchsia-100",
  orange: "text-orange-600 hover:bg-orange-100",
};
function Button({ color, ...props }: ButtonProps) {
  return (
    <button
      className={`flex w-full justify-between truncate rounded-md p-2 font-medium ${
        color ? Color[color] : Color["blue"]
      }`}
      {...props}
    >
      {props.children}
    </button>
  );
}

export default Button;
