import React, { useState, useEffect } from "react";
import style from "../Pages/AboutAze.module.css";
import plusButton from "../Assets/Images/web-images/plus.svg";
import minusButton from "../Assets/Images/web-images/minus.svg";
import data from "../Data/data.json"; // Import the entire data.json
import { useLanguage } from "../LanguageContext"; // Import your custom hook

export default function AzeContentForMobile() {
  const { selectedLanguage } = useLanguage(); // Access selectedLanguage from context

  // Select the appropriate language content, fallback to English if not available
  const aboutAzeContent = data.aboutAze[selectedLanguage] || data.aboutAze["english"];

  // Initialize isOpen state: open the first item by default
  const [isOpen, setIsOpen] = useState(
    aboutAzeContent.map((_, index) => index === 0)
  );

  // Reset isOpen when aboutAzeContent changes (i.e., language changes)
  useEffect(() => {
    setIsOpen(aboutAzeContent.map((_, index) => index === 0));
  }, [aboutAzeContent]);

  const handleToggle = (index) => {
    setIsOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className={style.mob_about_aze_content}>
      {aboutAzeContent.map((item, index) => (
        <div
          key={index}
          className={`${style.mob_main_info} ${
            isOpen[index] ? style.opened : ""
          }`}
        >
          <div
            className={style.mob_header_with_plus}
            onClick={() => handleToggle(index)}
          >
            <h2 className={isOpen[index] ? style.yellowUnderline : ""}>
              {item.key}
            </h2>

            {isOpen[index] ? (
              <img src={minusButton} alt="minusButton" />
            ) : (
              <img src={plusButton} alt="plusButton" />
            )}
          </div>
          {isOpen[index] && <p className={style.data_value}>{item.value}</p>}
        </div>
      ))}
    </div>
  );
}
