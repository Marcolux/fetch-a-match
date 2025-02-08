import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from "./services/context/Context.tsx";
import './index.css'
import App from './App.tsx'

const isEnvGitHub = import.meta.env.MODE === "production";


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter basename={isEnvGitHub ? "/fetch-a-match/" : "/"}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
