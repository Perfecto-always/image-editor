import { ButtonProps } from "../Button";
function DetailButton({ label, ...props }: ButtonProps) {
  return (
    <button
      className='truncate py-2 px-4 text-left hover:bg-blue-100'
      title={label}
      {...props}
    >
      {props.children}
    </button>
  );
}

export default DetailButton;
