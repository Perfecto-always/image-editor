import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
      </Head>
      <body className='overflow-hidden'>
        <Main />
        <NextScript />
        <input
          type='file'
          name='image'
          id='fileInput'
          accept='image/*'
          className='hidden'
        />
      </body>
    </Html>
  );
}
