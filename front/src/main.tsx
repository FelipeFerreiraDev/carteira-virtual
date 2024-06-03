import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import '@radix-ui/themes/styles.css';
import customTheme from './themes/customTheme.ts';
import { Box } from '@chakra-ui/react';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <Box backgroundColor="gray.100" minHeight="100vh">
        <App />
      </Box>
    </ChakraProvider>
  </React.StrictMode>,
)
