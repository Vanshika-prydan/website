
import * as React from 'react';
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/globals.scss";
import CssBaseline from "@mui/material/CssBaseline";
import "../src/i18n";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/components/common/theme";
import DownloadApp from "../src/components/DownloadApp";
import Header from "../src/components/common/Header";
import AppFooter from "../src/components/common/Footer";

import store from "../src/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <Header />
     {/* eslint-disable-next-line react/jsx-props-no-spreading */}
       <Component {...pageProps} />
        <DownloadApp />
        <AppFooter />
      </Provider>
    </ThemeProvider>
  );
}
export default MyApp;
