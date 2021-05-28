import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme  } from "@chakra-ui/react"
import "@fontsource/raleway/400.css"
import "@fontsource/open-sans/700.css"
const theme = extendTheme({
  fonts: {
    heading: "Open Sans",
    body: "Raleway",
  },
  colors: {
    mainColor: {
      bg: '#F6F1EE',
      fontColor: '#646464',
      light: '#F4F2F0',
      orange: '#FF541C',
      lightGreen: '#C8DFCA',
      hardGreen: '#1D5745'
    }
  }
})


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
