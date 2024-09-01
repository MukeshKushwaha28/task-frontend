import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom";
import { MyContextProvider } from './store/catagory.jsx';
import { AuthProvider } from './store/auth.jsx';

import App from './App.jsx'
// import './App.css'

createRoot(document.getElementById('root')).render(
  
  <AuthProvider>
  <MyContextProvider>
  <ChakraProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </ChakraProvider>
  </MyContextProvider>
  </AuthProvider>
  
)
