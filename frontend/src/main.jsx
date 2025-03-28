import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from './contextStore/ContextStore.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import  { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
    <ContextProvider >
    <App />
    <Toaster />
    </ContextProvider>
    </Provider>
  </StrictMode>,
)
