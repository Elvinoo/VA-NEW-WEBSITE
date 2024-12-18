import React from "react";
import { useState } from "react";
import Header from "../Components/Header";
//import Partners from "../Components/Partners";
import Footer from "../Components/Footer";
import Buttons from "../Components/Buttons";
import ContactUsSections from "../Components/ContactUsSections";
import MainTour from "../Components/MainTour";
import { tours } from "../Data/tours.json";
import Contacts from "../Components/Contacts";
export default function ContactUs() {
  const [initialDisplayCount, setInitialDisplayCount] = useState(3);
  const handleShowMoreLess = () => {
    if (initialDisplayCount < tours.length) {
      setInitialDisplayCount((prevCount) =>
        Math.min(prevCount + 3, tours.length)
      );
    } else {
      setInitialDisplayCount(3);
    }
  };
  return (
    <div>
      <Header />
      <Buttons />
      <ContactUsSections />
      <MainTour
        tours={tours}
        initialDisplayCount={initialDisplayCount}
        onShowMore={handleShowMoreLess} // Corrected prop name
      />
      <Contacts/>
      <Footer />
    </div>
  );
}
