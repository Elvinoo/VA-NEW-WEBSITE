

import React from "react";
import style from "../Pages/HomePage.module.css";
import cancelButton from "../Assets/Images/web-images/cancel_button.svg";
import { useLanguage } from "../LanguageContext"; // Import the language hook

// Import translations
import translations from "../Data/translations.json"; // Adjust the path as needed

// Helper function to get translations
const getTranslations = (language) => {
  return translations[language] || translations["english"];
};

// Helper function to retrieve a single translation key with fallback
const getTranslation = (t, key) => {
  if (!t[key]) {
    console.warn(`Missing translation for key: "${key}" in selected language.`);
    return translations["english"][key];
  }
  return t[key];
};

const ButtonsAfterHover = ({ handleHoverOut }) => {
  // Access the current language from context
  const { selectedLanguage } = useLanguage();

  // Retrieve the appropriate translations based on selectedLanguage
  const t = getTranslations(selectedLanguage);

  return (
    <div className={style.buttons_after_hover}>
      {/* Button showing localized text for "Home" */}
      <button className={`${style.btn} ${style.home}`}>{getTranslation(t, "home")}</button>

      <div className={style.hover_menu}>
        <ul className={style.menu_hover} onMouseLeave={handleHoverOut}>
          <div className={style.li_with_btn}>
            <li className={style.li}>
              <a href="/azerbaijan">{getTranslation(t, "aboutAze")}</a>
            </li>
            <img
              className={style.cancelButton}
              src={cancelButton}
              onClick={handleHoverOut}
              alt="cancel-button"
            />
          </div>
          <li className={style.li}>
            <a href="/about-us">{getTranslation(t, "aboutUs")}</a>
          </li>
          <li className={style.li}>
            <a href="/tours">{getTranslation(t, "tours")}</a>
          </li>
          <li className={style.li}>
            <a href="/contacts">{getTranslation(t, "contactUs")}</a>
          </li>
        </ul>

        <div className={style.mob_hover_menu}>
          <a
            href="https://www.instagram.com/vatravel.az?igsh=MXd5OWdhdmlpczN5dA=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <h6>Instagram</h6>
          </a>
          <a
            href="https://www.linkedin.com/company/vatrvel/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h6>LinkedIn</h6>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100071157246416&mibextid=JRoKGi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h6>Facebook</h6>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ButtonsAfterHover;
