/* // Tours.jsx

import React, { useState } from "react";
import style from "../Pages/HomePage.module.css";
import tourStyle from "../Pages/Tours.module.css";
import MainImage from "../Assets/Images/web-images/toursPage1.svg";

// Images
import tour1 from "../Assets/Images/web-images/tour1.svg";
import tour2 from "../Assets/Images/web-images/tour2.svg";
import tour3 from "../Assets/Images/web-images/tour3.svg";
import tour4 from "../Assets/Images/web-images/tour4.svg";
import tour5 from "../Assets/Images/web-images/tour5.svg";
import tour6 from "../Assets/Images/web-images/tour1.svg";
import tour7 from "../Assets/Images/web-images/tour2.svg";
import tour8 from "../Assets/Images/web-images/tour8.svg";

// Import Language Context hook
import { useLanguage } from "../LanguageContext";

// Define languageContent outside the component
const languageContent = {
  english: {
    all: "All",
    cultural: "Cultural Tours",
    eco: "Eco Tours",
    sport: "Sport & Event", // Changed from "sports" to "sport"
    health: "Health & Wellness",
    days: "days",
    nights: "nights",
  },
  italian: {
    all: "Tutti",
    cultural: "Tour Culturali",
    eco: "Tour Eco",
    sport: "Sport & Evento", // Changed from "sports" to "sport"
    health: "Salute & Benessere",
    days: "giorni",
    nights: "notti",
  },
  spanish: {
    all: "Todos",
    cultural: "Tours Culturales",
    eco: "Tours Ecológicos",
    sport: "Deporte & Evento", // Changed from "sports" to "sport"
    health: "Salud & Bienestar",
    days: "días",
    nights: "noches",
  },
  french: {
    all: "Tous",
    cultural: "Tours Culturels",
    eco: "Tours Éco",
    sport: "Sport & Événement", // Changed from "sports" to "sport"
    health: "Santé & Bien-être",
    days: "jours",
    nights: "nuits",
  },
  german: {
    all: "Alle",
    cultural: "Kulturelle Touren",
    eco: "Öko-Touren",
    sport: "Sport & Veranstaltung", // Changed from "sports" to "sport"
    health: "Gesundheit & Wellness",
    days: "Tage",
    nights: "Nächte",
  },
};

const Tours = ({ tours }) => {
  const [selectedType, setSelectedType] = useState("all");
  const { selectedLanguage } = useLanguage(); // Access currently selected language

  // Define an array of filter types
  const filterTypes = ["all", "cultural", "eco", "sport", "health"];

  // Filter tours based on 'selectedType'
  const filteredTours =
    selectedType === "all"
      ? tours
      : tours.filter((tour) => tour.type.includes(selectedType));

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  // Map tour IDs to corresponding images
  const imageMap = {
    0: tour1,
    1: tour2,
    2: tour3,
    3: tour4,
    4: tour5,
    5: tour6,
    6: tour7,
    7: tour8,
  };

  return (
    <div className={tourStyle.container}>
      <div className={tourStyle.mainImage}>
        <img src={MainImage} alt="Tour Page" />
      </div>
      <div className={style.wrapper}>
        <div className={tourStyle.selection_container}>
          <ul className={tourStyle.tours_selection}>
            {filterTypes.map((type) => (
              <li
                key={type}
                className={`${tourStyle.li} ${
                  selectedType === type ? tourStyle.selected : ""
                }`}
                onClick={() => handleTypeChange(type)}
              >
                <svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="7.5" cy="8" r="7" stroke="black" />
                </svg>
                <span>
                  {languageContent[selectedLanguage][type] || languageContent["english"][type]}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={style.tour_card_cont}>
          {filteredTours.map((tour) => {
            // Access localized name/desc from JSON
            const tourName = tour.name[selectedLanguage] || tour.name["english"];
            const tourDesc = tour.desc[selectedLanguage] || tour.desc["english"];
            const linkName = tour.desc.english; // As per your current setup

            return (
              <div className={style.tour_card} key={tour.id}>
                <img src={imageMap[tour.id]} alt={tourName} />
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
                    href={`/tours/${linkName}`} // or some unique slug
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
      </div>
    </div>
  );
};

export default Tours;
 */

// Tours.jsx

import React, { useState } from "react";
import style from "../Pages/HomePage.module.css";
import tourStyle from "../Pages/Tours.module.css";
import MainImage from "../Assets/Images/web-images/toursPage1.svg";

// Images
import tour1 from "../Assets/Images/web-images/tour1.svg";
import tour2 from "../Assets/Images/web-images/tour2.svg";
import tour3 from "../Assets/Images/web-images/tour3.svg";
import tour4 from "../Assets/Images/web-images/tour4.svg";
import tour5 from "../Assets/Images/web-images/tour5.svg";
import tour6 from "../Assets/Images/web-images/tour1.svg";
import tour7 from "../Assets/Images/web-images/tour2.svg";
import tour8 from "../Assets/Images/web-images/tour8.svg";

// Import Language Context hook
import { useLanguage } from "../LanguageContext";

// Import translations
import translations from "../Data/translations.json"; // Adjust the path as needed

// Helper function to get translations
const getTranslations = (language) => {
  return translations[language] || translations["english"];
};

const Tours = ({ tours }) => {
  const [selectedType, setSelectedType] = useState("all");
  const { selectedLanguage } = useLanguage(); // Access currently selected language

  // Retrieve the appropriate translations based on selectedLanguage
  const t = getTranslations(selectedLanguage);

  // Define an array of filter types
  const filterTypes = ["all", "cultural", "eco", "sport", "health"];

  // Filter tours based on 'selectedType'
  const filteredTours =
    selectedType === "all"
      ? tours
      : tours.filter((tour) => tour.type.includes(selectedType));

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  // Map tour IDs to corresponding images
  const imageMap = {
    0: tour1,
    1: tour2,
    2: tour3,
    3: tour4,
    4: tour5,
    5: tour6,
    6: tour7,
    7: tour8,
  };

  return (
    <div className={tourStyle.container}>
      <div className={tourStyle.mainImage}>
        <img src={MainImage} alt={t.header} />
      </div>
      <div className={style.wrapper}>
        <div className={tourStyle.selection_container}>
          <ul className={tourStyle.tours_selection}>
            {filterTypes.map((type) => (
              <li
                key={type}
                className={`${tourStyle.li} ${
                  selectedType === type ? tourStyle.selected : ""
                }`}
                onClick={() => handleTypeChange(type)}
              >
                <svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="7.5" cy="8" r="7" stroke="black" />
                </svg>
                <span>
                  {t[type] || translations["english"][type]}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={style.tour_card_cont}>
          {filteredTours.map((tour) => {
            // Access localized name/desc from JSON with fallback to English
            const tourName = tour.name[selectedLanguage] || tour.name["english"];
            const tourDesc = tour.desc[selectedLanguage] || tour.desc["english"];
            const linkName = tour.slug || tour.desc.english; // Ensure a unique slug exists

            return (
              <div className={style.tour_card} key={tour.id}>
                <img src={imageMap[tour.id]} alt={tourName} />
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
                    href={`/tours/${linkName}`} // Ensure 'slug' is a unique identifier
                    className={`${style.gray} ${style.tour_duration}`}
                  >
                    {tour.days} {t.days} {tour.nights} {t.nights}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tours;
