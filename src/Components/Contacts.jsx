/* import React from "react";
import { useForm } from "react-hook-form";
import diagonalArrow from "../Assets/Images/web-images/Vector28.svg";
import submitArrow from "../Assets/Images/web-images/submit-arrow.svg";
import style from "../Pages/HomePage.module.css";

function Contacts() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formSpreeEndpoint = "https://formspree.io/f/xayrnggg";

    try {
      const response = await fetch(formSpreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Email sent successfully");
        reset();
      } else {
        console.error("Error sending email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className={style.wrapper + " " + style.contact_cont}>
      <div className={style.project}>
        <h2 className={style.medium_30px}>Let's start a project</h2>
        <a href="/">
          <img src={diagonalArrow} alt="diagonal arrow" />
        </a>
      </div>
      <div className={style.contact_details}>
        <h2 className={style.medium_30px}>
          Enter your address and phone number to contact you
        </h2>
        <form className={style.inputs} onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="E-mail"
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <input
            type="tel"
            id="phone"
            placeholder="Phone"
            {...register("phone")}
          />
          <button className={style.submit} type="submit">
            <img src={submitArrow} alt="submit-arrow" />
          </button>
        </form>
      </div>
      <div className={style.address}>
        <h3>Azerbaijan, Baku</h3>
        <p>From Monday to</p>
        <p>Friday 10:00 - 19:00</p>
        <p>Break 13:00 - 14:00</p>
      </div>
    </div>
  );
}
export default Contacts;
 */

// Contacts.jsx

import React from "react";
import { useForm } from "react-hook-form";
import diagonalArrow from "../Assets/Images/web-images/Vector28.svg";
import submitArrow from "../Assets/Images/web-images/submit-arrow.svg";
import style from "../Pages/HomePage.module.css";

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

function Contacts() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { selectedLanguage } = useLanguage(); // Use the language from the context

  const onSubmit = async (data) => {
    const formSpreeEndpoint = "https://formspree.io/f/xayrnggg";

    try {
      const response = await fetch(formSpreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Email sent successfully");
        reset();
      } else {
        console.error("Error sending email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  // Retrieve the appropriate translations based on selectedLanguage
  const t = getTranslations(selectedLanguage);

  return (
    <div className={`${style.wrapper} ${style.contact_cont}`}>
      <div className={style.project}>
        <h2 className={style.medium_30px}>{getTranslation(t, "letsStartProject")}</h2>
        <a href="/">
          <img src={diagonalArrow} alt={getTranslation(t, "diagonalArrowAlt") || "diagonal arrow"} />
        </a>
      </div>
      <div className={style.contact_details}>
        <h2 className={style.medium_30px}>
          {getTranslation(t, "enterYourDetails")}
        </h2>
        <form className={style.inputs} onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder={getTranslation(t, "emailPlaceholder")}
            id="email"
            type="email"
            {...register("email", { required: getTranslation(t, "emailRequired") })}
          />
          {errors.email && <p className={style.error}>{errors.email.message}</p>}
          <input
            type="tel"
            id="phone"
            placeholder={getTranslation(t, "phonePlaceholder")}
            {...register("phone")}
          />
          <button className={style.submit} type="submit">
            <img src={submitArrow} alt={getTranslation(t, "submitArrowAlt") || "submit-arrow"} />
          </button>
        </form>
      </div>
      <div className={style.address}>
        <h3>{getTranslation(t, "addressTitle") || "Azerbaijan, Baku"}</h3>
        <p>{getTranslation(t, "fromMondayTo") || "From Monday to"}</p>
        <p>{getTranslation(t, "fridayHours") || "Friday 10:00 - 19:00"}</p>
        <p>{getTranslation(t, "breakHours") || "Break 13:00 - 14:00"}</p>
      </div>
    </div>
  );
}
export default Contacts;
