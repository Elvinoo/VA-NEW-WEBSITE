// HomePage.js
import React, { useState } from "react";
import style from "./HomePage.module.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ShirvanshahMosque from "../Assets/Images/web-images/shirvanshah-mosque.svg";
import Buttons from "../Components/Buttons";
import MainTour from "../Components/MainTour";
import {tours} from "../Data/tours.json"
//import Partners from "../Components/Partners";
import Project from "../Components/Contacts";

export default function HomePage() {
  const [initialDisplayCount, setInitialDisplayCount] = useState(6);
  const handleShowMoreLess = () => {
    if (initialDisplayCount < tours.length) {
      setInitialDisplayCount((prevCount) =>
        Math.min(prevCount + 3, tours.length)
      );
    } else {
      setInitialDisplayCount(6);
    }
  };

  return (
    <div className={style.container}>
      <Header />
      <div>
        <img
          className={style.img}
          src={ShirvanshahMosque}
          alt="shirvanshah-mosque"
        />
      </div>
      <Buttons />
      <MainTour
        tours={tours}
        initialDisplayCount={initialDisplayCount}
        onShowMore={handleShowMoreLess} // Corrected prop name
      />
      <Project />
      <Footer />
    </div>
  );
}
