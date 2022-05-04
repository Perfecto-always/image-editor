import { HTMLProps } from "react";

interface DetailsProps extends HTMLProps<HTMLDetailsElement> {
  label: string;
}

function Details({ label, ...props }: DetailsProps) {
  return (
    <details {...props} className='w-full truncate rounded-md text-blue-700'>
      <summary
        className='flex w-full cursor-pointer justify-between p-2 font-medium hover:bg-blue-100'
        title={label}
      >
        {label}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='currentColor'
        >
          <path d='M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z'></path>
        </svg>
      </summary>
      <div className='flex cursor-pointer flex-col rounded-md border border-blue-100 text-left'>
        {props.children}
      </div>
    </details>
  );
}

export default Details;
