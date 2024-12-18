/* import React, { useState, useEffect } from "react";
import homeStyle from "../Pages/HomePage.module.css";
import style from "../Pages/AboutAze.module.css";
import AzeContentMobile from "./AzeContentMobile";
import AzeContentWeb from "./AzeContentWeb";
import { useLanguage } from "../LanguageContext"; // Import the language context

export default function AzeContentCont() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { selectedLanguage } = useLanguage(); // Use the language from the context

  // Handle window resize for mobile vs web
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  // Listen for window resize changes
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Language content object with German added
  const languageContent = {
    english: {
      heading: "Azerbaijan, officially the Republic of Azerbaijan, is the state located in the Caucasus region. Rich in oil, the country is located in Asia Transcaucasia, south of the mountainous watershed that separates it conventionally from Europe."
    },
    italian: {
      heading: "Azerbaigian, ufficialmente la Repubblica dell'Azerbaigian, è lo stato situato nella regione del Caucaso. Ricca di petrolio, il paese si trova nell'Asia Transcaucasia, a sud della catena montuosa che lo separa convenzionalmente dall'Europa."
    },
    spanish: {
      heading: "Azerbaiyán, oficialmente la República de Azerbaiyán, es el estado ubicado en la región del Cáucaso. Rico en petróleo, el país está ubicado en Asia Transcaucasia, al sur de la cuenca montañosa que lo separa convencionalmente de Europa."
    },
    french: {
      heading: "L'Azerbaïdjan, officiellement la République d'Azerbaïdjan, est l'état situé dans la région du Caucase. Riche en pétrole, le pays est situé en Asie Transcaucasienne, au sud du bassin montagneux qui le sépare conventionnellement de l'Europe."
    },
    german: {
      heading: "Aserbaidschan, offiziell die Republik Aserbaidschan, ist ein Staat in der Kaukasusregion. Reich an Erdöl, liegt das Land in Transkaukasien in Asien, südlich der Bergkette, die es konventionell von Europa trennt."
    },
  };

  return (
    <div className={homeStyle.wrapper}>
      <div className={style.about_aze}>
        <h3 className={homeStyle.medium_20px}>
          {languageContent[selectedLanguage].heading}
        </h3>
        {isMobile ? <AzeContentMobile /> : <AzeContentWeb />}
      </div>
    </div>
  );
}
 */

// AzeContentCont.jsx

import React, { useState, useEffect } from "react";
import homeStyle from "../Pages/HomePage.module.css";
import style from "../Pages/AboutAze.module.css";
import AzeContentMobile from "./AzeContentMobile";
import AzeContentWeb from "./AzeContentWeb";
import { useLanguage } from "../LanguageContext"; // Import the language context

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

export default function AzeContentCont() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { selectedLanguage } = useLanguage(); // Use the language from the context

  // Handle window resize for mobile vs web
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  // Listen for window resize changes
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Retrieve the appropriate translations based on selectedLanguage
  const t = getTranslations(selectedLanguage);

  return (
    <div className={homeStyle.wrapper}>
      <div className={style.about_aze}>
        <h3 className={`${homeStyle.medium_20px}`}>
          {getTranslation(t, "heading")}
        </h3>
        {isMobile ? <AzeContentMobile /> : <AzeContentWeb />}
      </div>
    </div>
  );
}
