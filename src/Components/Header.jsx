//Header.jsx
import React from "react";
import style from "../Pages/HomePage.module.css";
import headLogo from "../Assets/Images/web-images/logo.svg";
import { useLanguage } from "../LanguageContext"; // Import useLanguage to access the language context

export default function Header() {
  const { selectedLanguage, setSelectedLanguage } = useLanguage(); // Use the language context to get and set the selected language

  const handleLanguageChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedLanguage(selectedValue); // Update the language in the context
  };

  return (
    <div className={style.wrapper}>
      <header className={style.flex_justify_btw}>
        <div>
          <a href="/">
            <img src={headLogo} alt="logo" />
          </a>
        </div>
        <div className={style.flex_justify_btw + " " + style.right}>
          <a
            href="tel:+994515855564"
            className={style.norm_16px + " " + style.mob_no}
          >
            +994515855564
          </a>
          <a
            href="mailto:incoming@vatravel.az"
            className={style.norm_16px + " " + style.mob_no}
          >
            incoming@vatravel.az
          </a>
          {/* Language selection dropdown */}
          <select
            className={style.select}
            name="language"
            value={selectedLanguage}
            onChange={handleLanguageChange} // Handle language change
          >
            <option value="english">EN</option>
            <option value="italian">IT</option>
            <option value="spanish">ES</option>
            <option value="french">FR</option>
            <option value="german">DE</option>
          </select>
        </div>
      </header>
    </div>
  );
}
