import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { tours } from "../Data/tours.json"; // multi-language JSON
import MainTour from "../Components/MainTour";
import style from "./Tours.module.css";
import homeStyle from "../Pages/HomePage.module.css";
import plusButton from "../Assets/Images/web-images/plusBlack.svg";
import minusButton from "../Assets/Images/web-images/minusBlack.svg";
import PhotoContainer from "../Components/PhotoContainer";
import Header from "../Components/Header";
import Municipality from "../Assets/Images/web-images/municipality.svg";
import H_Aliyev_center2 from "../Assets/Images/web-images/h-aliyev2.svg";
import flames from "../Assets/Images/web-images/flames_from_distance.svg";
import khansPalace from "../Assets/Images/web-images/KhansPalace.svg";
import yanardagh from "../Assets/Images/web-images/Yanardagh.svg";
import qobustan from "../Assets/Images/web-images/qobustan.svg";
import round_albanian from "../Assets/Images/web-images/Round-Albanian-Temple.svg";
import mudVolcanos from "../Assets/Images/web-images/Mud_Volcanos.svg";
import Buttons from "../Components/Buttons";
//import Partners from "../Components/Partners";
import Footer from "../Components/Footer";

// Import the language context hook
import { useLanguage } from "../LanguageContext";

export default function TourPage() {
  const images = [
    flames,
    H_Aliyev_center2,
    Municipality,
    khansPalace,
    qobustan,
    round_albanian,
    mudVolcanos,
    yanardagh,
  ];

  const { tourName } = useParams();
  const [isOpen, setIsOpen] = useState(tours.map((_, index) => index === 0));

  // Access the selected language from context
  const { selectedLanguage } = useLanguage();

  const selectedTour = tours.find(
    (t) => t.desc.english === tourName // or use a 'slug' field
  );

  if (!selectedTour) {
    return <div>No tour found for {tourName}</div>;
  }

  // Toggle opening/closing day details
  const handleToggle = (index) => {
    setIsOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  // Program arrays for the current language
  const headers = selectedTour.tourProgram.headers[selectedLanguage];
  const bodies = selectedTour.tourProgram.bodies[selectedLanguage];

  const initialDisplayCount = 3;

  return (
    <div className={style.container}>
      <Header />
      <PhotoContainer images={images} />
      <Buttons />
      <div className={homeStyle.wrapper}>
        <h1 className={style.tourName}>
          {/* Multi-language name + desc */}
          {`${selectedTour.name[selectedLanguage]} ${selectedTour.desc[selectedLanguage]}`}
        </h1>

        {headers.map((header, index) => (
          <div
            key={index}
            className={`${style.mob_main_info} ${isOpen[index] ? style.opened : ""}`}
          >
            <div className={style.header_with_plus} onClick={() => handleToggle(index)}>
              <h2 className={isOpen[index] ? style.yellowUnderline : ""}>
                {header}
              </h2>

              {isOpen[index] ? (
                <img src={minusButton} alt="minusButton" />
              ) : (
                <img src={plusButton} alt="plusButton" />
              )}
            </div>
            <hr />
            {isOpen[index] && (
              <p className={style.day_text}>
                {bodies[index]}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Renders "More Tours" section */}
      <MainTour tours={tours} initialDisplayCount={initialDisplayCount} />

      <Footer />
    </div>
  );
}
