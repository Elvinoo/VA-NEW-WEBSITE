

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { LanguageProvider } from "./LanguageContext"; // Import the LanguageProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LanguageProvider> 
      <App />
    </LanguageProvider>
  </React.StrictMode>
);

reportWebVitals();
