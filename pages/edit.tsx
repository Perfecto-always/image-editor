import { useEffect, useState } from "react";
import Button from "../components/Button";
import DetailButton from "../components/Details/DetailButton";
import Details from "../components/Details/Details";
import { useRouter } from "next/router";
import Head from "next/head";
import { formats } from "../utils/fomats";
import { Processing } from "../utils/processingTypes";

export default function Edit() {
  const [format, setFormat] = useState<typeof formats[number]>("png");

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
            <span className='flex w-full justify-between p-2'>
              Format
              <select
                className='rounded-md border-2 bg-gray-100 px-2 outline-none'
                onChange={(e) => {
                  // @ts-ignore
                  const found = formats.includes(e.target.value);
                  if (found) {
                    // @ts-ignore
                    setFormat(e.target.value);
                  } else {
                    setFormat("png");
                  }
                }}
              >
                {formats.map((format, index) => (
                  <option value={format} key={index}>
                    {format}
                  </option>
                ))}
              </select>
            </span>
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
                    label={property.name}
                    key={index}
                    onClick={property.method}
                  >
                    {property.name}
                  </DetailButton>
                ))}
              </Details>
            ))}
            <Button
              color='fuchsia'
              onClick={async () => {
                const { imageProcessing } = await import(
                  "../functions/processing"
                );
                imageProcessing.saturate();
              }}
            >
              Saturate
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24'
                width='24'
                fill='currentColor'
              >
                <path d='M12 22Q9.925 22 8.1 21.212Q6.275 20.425 4.925 19.075Q3.575 17.725 2.788 15.9Q2 14.075 2 12Q2 9.925 2.788 8.1Q3.575 6.275 4.925 4.925Q6.275 3.575 8.1 2.787Q9.925 2 12 2Q14.075 2 15.9 2.787Q17.725 3.575 19.075 4.925Q20.425 6.275 21.212 8.1Q22 9.925 22 12Q22 14.075 21.212 15.9Q20.425 17.725 19.075 19.075Q17.725 20.425 15.9 21.212Q14.075 22 12 22ZM13 19.925Q15.975 19.55 17.988 17.312Q20 15.075 20 12Q20 8.925 17.988 6.687Q15.975 4.45 13 4.075Z' />
              </svg>
            </Button>
            <Button
              color='orange'
              onClick={async () => {
                const { imageProcessing } = await import(
                  "../functions/processing"
                );
                imageProcessing.grain();
              }}
            >
              Grain
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24'
                width='24'
                fill='currentColor'
              >
                <path d='M10 16Q9.175 16 8.588 15.412Q8 14.825 8 14Q8 13.175 8.588 12.587Q9.175 12 10 12Q10.825 12 11.413 12.587Q12 13.175 12 14Q12 14.825 11.413 15.412Q10.825 16 10 16ZM6 12Q5.175 12 4.588 11.412Q4 10.825 4 10Q4 9.175 4.588 8.587Q5.175 8 6 8Q6.825 8 7.412 8.587Q8 9.175 8 10Q8 10.825 7.412 11.412Q6.825 12 6 12ZM6 20Q5.175 20 4.588 19.413Q4 18.825 4 18Q4 17.175 4.588 16.587Q5.175 16 6 16Q6.825 16 7.412 16.587Q8 17.175 8 18Q8 18.825 7.412 19.413Q6.825 20 6 20ZM18 8Q17.175 8 16.587 7.412Q16 6.825 16 6Q16 5.175 16.587 4.588Q17.175 4 18 4Q18.825 4 19.413 4.588Q20 5.175 20 6Q20 6.825 19.413 7.412Q18.825 8 18 8ZM14 20Q13.175 20 12.588 19.413Q12 18.825 12 18Q12 17.175 12.588 16.587Q13.175 16 14 16Q14.825 16 15.413 16.587Q16 17.175 16 18Q16 18.825 15.413 19.413Q14.825 20 14 20ZM18 16Q17.175 16 16.587 15.412Q16 14.825 16 14Q16 13.175 16.587 12.587Q17.175 12 18 12Q18.825 12 19.413 12.587Q20 13.175 20 14Q20 14.825 19.413 15.412Q18.825 16 18 16ZM14 12Q13.175 12 12.588 11.412Q12 10.825 12 10Q12 9.175 12.588 8.587Q13.175 8 14 8Q14.825 8 15.413 8.587Q16 9.175 16 10Q16 10.825 15.413 11.412Q14.825 12 14 12ZM10 8Q9.175 8 8.588 7.412Q8 6.825 8 6Q8 5.175 8.588 4.588Q9.175 4 10 4Q10.825 4 11.413 4.588Q12 5.175 12 6Q12 6.825 11.413 7.412Q10.825 8 10 8Z' />
              </svg>
            </Button>
            <Button
              color='sky'
              onClick={async () => {
                const { imageProcessing } = await import(
                  "../functions/processing"
                );
                imageProcessing.invert();
              }}
            >
              Invert
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24'
                width='24'
                fill='currentColor'
              >
                <path d='M12 21Q8.675 21 6.338 18.688Q4 16.375 4 13.1Q4 11.45 4.625 10.05Q5.25 8.65 6.35 7.55L12 2L17.65 7.55Q18.75 8.65 19.375 10.05Q20 11.45 20 13.1Q20 16.375 17.663 18.688Q15.325 21 12 21ZM12 19V4.8L7.75 9Q6.875 9.825 6.438 10.862Q6 11.9 6 13.1Q6 15.525 7.75 17.262Q9.5 19 12 19Z' />
              </svg>
            </Button>
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
                imageProcessing.download(format);
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
