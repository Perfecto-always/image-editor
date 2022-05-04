import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Index() {
  const [imgSrc, setImgSrc] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;

    function handler(e: Event) {
      // @ts-ignore
      const file: Blob = e.target.files[0];
      if (file) {
        router.push("/edit");
      }
    }

    fileInput.addEventListener("change", handler, false);

    return () => {
      fileInput.removeEventListener("change", handler, false);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Desaturater</title>
      </Head>
      <div className='flex h-screen w-full items-center justify-center'>
        <div className='h-auto  gap-3 border-4 border-dashed bg-gray-100 text-gray-600'>
          <button
            className='p-10'
            onClick={(e) => {
              document.getElementById("fileInput")?.click();
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='feather feather-upload mr-3 inline-block'
            >
              <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
              <polyline points='17 8 12 3 7 8' />
              <line x1='12' y1='3' x2='12' y2='15' />
            </svg>
            Choose files for editing
          </button>
        </div>
      </div>
    </>
  );
}
