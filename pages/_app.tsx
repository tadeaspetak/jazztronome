import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";

import { NotificationProvider } from "../components/Notifications";

import "../styles/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NotificationProvider>
        <Component {...pageProps} />
      </NotificationProvider>
    </>
  );
}

export default MyApp;
