import { useEffect, useState } from "react";
import Button from "../components/Button";
import DetailButton from "../components/Details/DetailButton";
import Details from "../components/Details/Details";
import { useRouter } from "next/router";
import Head from "next/head";

const Processing = [
  {
    label: "Desaturate",
    properties: [
      {
        name: "Min",
        method: async () => {
          const { imageProcessing } = await import("../functions/processing");
          imageProcessing.desaturater("min");
        },
      },
      {
        name: "Max",
        method: async () => {
          const { imageProcessing } = await import("../functions/processing");
          imageProcessing.desaturater("max");
        },
      },
    ],
  },
];

export default function Edit() {
  const router = useRouter();
  useEffect(() => {
    const files = document.getElementById("fileInput") as HTMLInputElement;
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const img = new Image();

    if (files.files?.length === 0) {
      router.push("/");
      return;
    }
    function handler() {
      if (files.files?.length === 0) return;
      // @ts-ignore
      const file: Blob = files.files[0];
      const reader = new FileReader();

      const ctx = canvas.getContext("2d");

      reader.onload = (e) => {
        img.src = e.target?.result as string;

        img.onload = async (e) => {
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

          const { imageProcessing } = await import("../functions/processing");
          imageProcessing.newImgData = ctx!.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
        };
      };

      reader.readAsDataURL(file);
    }
    handler();

    files.addEventListener("change", handler, false);

    return () => files.removeEventListener("change", handler, false);
  });

  return (
    <>
      <Head>
        <title>Editor</title>
      </Head>
      <div className='grid min-h-screen w-full grid-cols-12 grid-rows-1 place-items-center'>
        <div className='relative col-span-2 h-full w-full border border-r-2'>
          <div className='flex h-full w-full flex-col items-center p-4'>
            <Button
              color='green'
              onClick={() => {
                const input = document.getElementById(
                  "fileInput"
                ) as HTMLInputElement;

                input.click();
              }}
            >
              Upload Image
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='currentColor'
              >
                <path d='M13 19v-4h3l-4-5-4 5h3v4z'></path>
                <path d='M7 19h2v-2H7c-1.654 0-3-1.346-3-3 0-1.404 1.199-2.756 2.673-3.015l.581-.102.192-.558C8.149 8.274 9.895 7 12 7c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2h-3v2h3c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888C18.507 7.67 15.56 5 12 5 9.244 5 6.85 6.611 5.757 9.15 3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5z'></path>
              </svg>
            </Button>
            {Processing.map((process, index) => (
              <Details label={process.label} key={index}>
                {process.properties.map((property, index) => (
                  <DetailButton
                    key={index}
                    onClick={property.method}
                    label={property.name}
                  >
                    {property.name}
                  </DetailButton>
                ))}
              </Details>
            ))}
            <Button
              color='red'
              onClick={async () => {
                const { imageProcessing } = await import(
                  "../functions/processing"
                );
                imageProcessing.restore();
              }}
            >
              Restore
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24'
                width='24'
                fill='currentColor'
              >
                <path d='M11 20.95Q7.975 20.575 5.988 18.312Q4 16.05 4 13Q4 11.35 4.65 9.837Q5.3 8.325 6.5 7.2L7.925 8.625Q6.975 9.475 6.488 10.6Q6 11.725 6 13Q6 15.2 7.4 16.887Q8.8 18.575 11 18.95ZM13 20.95V18.95Q15.175 18.55 16.587 16.875Q18 15.2 18 13Q18 10.5 16.25 8.75Q14.5 7 12 7H11.925L13.025 8.1L11.625 9.5L8.125 6L11.625 2.5L13.025 3.9L11.925 5H12Q15.35 5 17.675 7.325Q20 9.65 20 13Q20 16.025 18.013 18.288Q16.025 20.55 13 20.95Z' />
              </svg>
            </Button>
            <Button
              color='purple'
              onClick={async () => {
                const { imageProcessing } = await import(
                  "../functions/processing"
                );
                imageProcessing.download();
              }}
            >
              Download
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='currentColor'
              >
                <path d='M18.948 11.112C18.511 7.67 15.563 5 12.004 5c-2.756 0-5.15 1.611-6.243 4.15-2.148.642-3.757 2.67-3.757 4.85 0 2.757 2.243 5 5 5h1v-2h-1c-1.654 0-3-1.346-3-3 0-1.404 1.199-2.757 2.673-3.016l.581-.102.192-.558C8.153 8.273 9.898 7 12.004 7c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2h-2v2h2c2.206 0 4-1.794 4-4a4.008 4.008 0 0 0-3.056-3.888z'></path>
                <path d='M13.004 14v-4h-2v4h-3l4 5 4-5z'></path>
              </svg>
            </Button>
          </div>
        </div>
        <div className='col-span-10 flex h-full w-full flex-col items-center justify-center'>
          <canvas id='canvas' width={720} height={450} />
        </div>
      </div>
    </>
  );
}
