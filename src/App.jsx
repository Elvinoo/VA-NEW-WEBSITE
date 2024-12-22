import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import AboutAze from "./Pages/AboutAze";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import ToursPage from "./Pages/ToursPage";
import TourPage from "./Pages/TourPage";
import TourPriceCalculator from "./Components/tourPriceCalculator";
import { LanguageProvider } from "./LanguageContext"; // Import the LanguageProvider

function App() {
  return (
    <LanguageProvider>
      {" "}
      {/* Wrap the entire app in LanguageProvider */}
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/azerbaijan" Component={AboutAze} />
            <Route path="/tours" Component={ToursPage} />
            <Route path="/tours/:tourName" Component={TourPage} />
            <Route path="/about-us" Component={AboutUs} />
            <Route path="/contacts" Component={ContactUs} />
            <Route
              path="/my-secret-path-for-calculator-329847239"
              Component={TourPriceCalculator}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
