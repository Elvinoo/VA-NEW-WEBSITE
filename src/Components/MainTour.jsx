/* 
import React from "react";
import style from "../Pages/HomePage.module.css";
import rightArrow from "../Assets/Images/web-images/Vector5.svg";
import tour1 from "../Assets/Images/web-images/tour1.svg";
import tour2 from "../Assets/Images/web-images/tour2.svg";
import tour3 from "../Assets/Images/web-images/tour3.svg";
import tour4 from "../Assets/Images/web-images/tour6.svg";
import tour5 from "../Assets/Images/web-images/tour5.svg";
import tour6 from "../Assets/Images/web-images/tour7.svg";
import tour7 from "../Assets/Images/web-images/tour9.svg";
import tour8 from "../Assets/Images/web-images/tour8.svg";

// Import the language context hook
import { useLanguage } from "../LanguageContext";

const MainTour = ({ tours, initialDisplayCount, onShowMore }) => {
  // Access the current selectedLanguage from context
  const { selectedLanguage } = useLanguage();

  const displayedTours = tours.slice(0, initialDisplayCount);

  const showMoreButtonLabel =
    tours.length > initialDisplayCount ? "Show more" : "Show less";
  const imageArray = [tour2, tour3, tour1, tour4, tour5, tour6, tour7, tour8];

  return (
    <div className={style.wrapper}>
      <div className={style.flex_justify_btw + " " + style.main_tour_head}>
        <h1 className={style.bold_40px}>Tours</h1>
        <div className={style.show_all}>
          <a href="/tours">
            <span className={style.medium_14px + " " + style.mob_no}>
              Show all{" "}
            </span>
            <img src={rightArrow} alt="show-all" />
          </a>
        </div>
      </div>

      <div className={style.tour_card_cont}>
        {displayedTours.map((tour, index) => {
          // If your JSON is multi-language, use [selectedLanguage] to pick the right text
          const tourName = tour.name[selectedLanguage];   // e.g. "Azerbaijan", "Azerbaigian", etc.
          const tourDesc = tour.desc[selectedLanguage];   // e.g. "With all its colours", etc.
          const linkName = tour.desc.english;

          return (
            <div className={style.tour_card} key={tour.id}>
              <img src={imageArray[index]} alt={tourName} />

              <div className={style.tour_desc_container}>
                <h3 className={style.medium_30px + " " + style.mrgn_btm_12px}>
                  {tourName}
                </h3>
                <p
                  className={
                    style.mrgn_btm_12px +
                    " " +
                    style.medium_14px +
                    " " +
                    style.gray
                  }
                >
                  {tourDesc}
                </p>
                <a
                  href={"/tours/" + linkName} // Or replace with a unique slug
                  className={style.gray + " " + style.tour_duration}
                >
                  {tour.days} days {tour.nights} nights
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className={style.show}>
        {onShowMore && (
          <button className={style.showMoreButton} onClick={onShowMore}>
            {showMoreButtonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default MainTour;
 */

// MainTour.jsx

import React from "react";
import style from "../Pages/HomePage.module.css";
import rightArrow from "../Assets/Images/web-images/Vector5.svg";
import tour1 from "../Assets/Images/web-images/tour1.svg";
import tour2 from "../Assets/Images/web-images/tour2.svg";
import tour3 from "../Assets/Images/web-images/tour3.svg";
import tour4 from "../Assets/Images/web-images/tour6.svg";
import tour5 from "../Assets/Images/web-images/tour5.svg";
import tour6 from "../Assets/Images/web-images/tour7.svg";
import tour7 from "../Assets/Images/web-images/tour9.svg";
import tour8 from "../Assets/Images/web-images/tour8.svg";

// Import the language context hook
import { useLanguage } from "../LanguageContext";

// Import translations
import languageContent from "../Data/translations.json"; // Adjust the path as needed

const MainTour = ({ tours, initialDisplayCount, onShowMore }) => {
  // Access the current selectedLanguage from context
  const { selectedLanguage } = useLanguage();

  const displayedTours = tours.slice(0, initialDisplayCount);

  // Determine if "Show more" or "Show less" should be displayed
  const showMoreButtonLabel =
    tours.length > initialDisplayCount
      ? languageContent[selectedLanguage].showMore
      : languageContent[selectedLanguage].showLess;

  // Array of images mapped to tours (ensure the order matches tours array)
  const imageArray = [tour2, tour3, tour1, tour4, tour5, tour6, tour7, tour8];

  return (
    <div className={style.wrapper}>
      <div className={`${style.flex_justify_btw} ${style.main_tour_head}`}>
        <h1 className={style.bold_40px}>
          {languageContent[selectedLanguage].header}
        </h1>
        <div className={style.show_all}>
          <a href="/tours">
            <span className={`${style.medium_14px} ${style.mob_no}`}>
              {languageContent[selectedLanguage].showAll}{" "}
            </span>
            <img src={rightArrow} alt="show-all" />
          </a>
        </div>
      </div>

      <div className={style.tour_card_cont}>
        {displayedTours.map((tour, index) => {
          // Access localized name/desc from JSON with fallback to English
          const tourName = tour.name[selectedLanguage] || tour.name["english"];
          const tourDesc = tour.desc[selectedLanguage] || tour.desc["english"];
          const linkName = tour.desc.english; // As per your current setup

          return (
            <div className={style.tour_card} key={tour.id}>
              <img src={imageArray[index]} alt={tourName} />

              <div className={style.tour_desc_container}>
                <h3 className={`${style.medium_30px} ${style.mrgn_btm_12px}`}>
                  {tourName}
                </h3>
                <p
                  className={`${style.mrgn_btm_12px} ${style.medium_14px} ${style.gray}`}
                >
                  {tourDesc}
                </p>
                <a
                  href={"/tours/" + linkName} // Or replace with a unique slug
                  className={`${style.gray} ${style.tour_duration}`}
                >
                  {tour.days} {languageContent[selectedLanguage].days}{" "}
                  {tour.nights} {languageContent[selectedLanguage].nights}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className={style.show}>
        {onShowMore && (
          <button className={style.showMoreButton} onClick={onShowMore}>
            {showMoreButtonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default MainTour;
