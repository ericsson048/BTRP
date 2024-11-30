import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
// import env from "react-dotenv";
import { Toaster } from './components/ui/toaster.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
          <Toaster />
    <GoogleOAuthProvider clientId={"4866768141-452fvckjubonoflo2ia04uj4on59k2ea.apps.googleusercontent.com"}>
          <App />
      </GoogleOAuthProvider>
  </StrictMode>
)
