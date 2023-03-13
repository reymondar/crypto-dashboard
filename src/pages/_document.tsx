import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://www.cdnfonts.com" />
        <link
          crossOrigin="anonymous"
          rel="preconnect"
          href="https://fonts.cdnfonts.com"
        />
        <link
          href="https://fonts.cdnfonts.com/css/uni-neue"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
