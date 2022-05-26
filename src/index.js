import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import client from "./graphql/client";

ReactDOM.render(
 <ApolloProvider client={client}>
  <ThemeProvider theme={theme}>
   {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
   <CssBaseline />
   <App />
  </ThemeProvider>
 </ApolloProvider>,
 document.getElementById('root')
);
