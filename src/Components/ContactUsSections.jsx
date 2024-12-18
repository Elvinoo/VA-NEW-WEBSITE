/* import React from "react";
import { useForm } from "react-hook-form";
import submitArrow from "../Assets/Images/web-images/submit-arrow.svg";
import style from "../Pages/ContactUs.module.css";
import mailIcon from "../Assets/Images/web-images/mail.svg";
import phonIcon from "../Assets/Images/web-images/phone.svg";
import locationIcon from "../Assets/Images/web-images/location.svg";

function ContactUsSections() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formSpreeEndpoint = "https://formspree.io/f/mvoezord";

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
    <div className={style.wrapper}>
      <div className={style.contact_us_container}>
        <div className={style.left}>
          <h1>Contact us</h1>
          <h3>
            Connect with us for any inquiries or assistance. We're here to help!
          </h3>
          <div className={style.contact_info}>
            <span>
              <img src={locationIcon} alt="Location icon" />
            </span>
            <p>Azerbaijan, Baku</p>
          </div>
          <div className={style.contact_info}>
            <span>
              <img src={phonIcon} alt="Phone Icon" />
            </span>
            <p>+994 51 585 55 64</p>
          </div>
          <div className={style.contact_info}>
            <span>
              <img src={mailIcon} alt="Mail Icon" />
            </span>
            <p>incoming@vatravel.az</p>
          </div>
        </div>
        <div className={style.right}>
          <h2>Enter your address and phone number to contact you</h2>
          <form
            className={style.contact_us_form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={style.inputs}>
              <input
                type="text"
                id="name-surname"
                placeholder="Name & Surname"
                {...register("name")}
              />

              <input
                type="text"
                id="country"
                placeholder="Country"
                {...register("country")}
              />
            </div>
            <div className={style.inputs}>
              <input
                placeholder="E-mail"
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
              />
              <input
                placeholder="Phone"
                type="tel"
                id="phone"
                {...register("phone")}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div className={style.inputs}>
              <input
                placeholder="Additional Notes"
                type="text"
                id="note"
                {...register("note")}
              />
              <button className={style.submit} type="submit">
                <img src={submitArrow} alt="submit-arrow" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUsSections;
 */

// ContactUsSections.jsx

import React from "react";
import { useForm } from "react-hook-form";
import submitArrow from "../Assets/Images/web-images/submit-arrow.svg";
import style from "../Pages/ContactUs.module.css";
import mailIcon from "../Assets/Images/web-images/mail.svg";
import phonIcon from "../Assets/Images/web-images/phone.svg";
import locationIcon from "../Assets/Images/web-images/location.svg";

import { useLanguage } from "../LanguageContext"; // Import the language context

// Import translations
import translations from "../Data/translations.json"
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

function ContactUsSections() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { selectedLanguage } = useLanguage(); // Use the language from the context

  const onSubmit = async (data) => {
    const formSpreeEndpoint = "https://formspree.io/f/mvoezord";

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
    <div className={style.wrapper}>
      <div className={style.contact_us_container}>
        <div className={style.left}>
          <h1>{getTranslation(t, "contactUsTitle")}</h1>
          <h3>{getTranslation(t, "connectWithUs")}</h3>
          <div className={style.contact_info}>
            <span>
              <img src={locationIcon} alt={getTranslation(t, "locationIconAlt")} />
            </span>
            <p>Azerbaijan, Baku</p>
          </div>
          <div className={style.contact_info}>
            <span>
              <img src={phonIcon} alt={getTranslation(t, "phoneIconAlt")} />
            </span>
            <p>+994 51 585 55 64</p>
          </div>
          <div className={style.contact_info}>
            <span>
              <img src={mailIcon} alt={getTranslation(t, "mailIconAlt")} />
            </span>
            <p>incoming@vatravel.az</p>
          </div>
        </div>
        <div className={style.right}>
          <h2>{getTranslation(t, "enterYourDetails")}</h2>
          <form
            className={style.contact_us_form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={style.inputs}>
              <input
                type="text"
                id="name-surname"
                placeholder={getTranslation(t, "nameSurnamePlaceholder")}
                {...register("name")}
              />

              <input
                type="text"
                id="country"
                placeholder={getTranslation(t, "countryPlaceholder")}
                {...register("country")}
              />
            </div>
            <div className={style.inputs}>
              <input
                placeholder={getTranslation(t, "emailPlaceholder")}
                type="email"
                id="email"
                {...register("email", { required: getTranslation(t, "emailRequired") })}
              />
              <input
                placeholder={getTranslation(t, "phonePlaceholder")}
                type="tel"
                id="phone"
                {...register("phone")}
              />
              {errors.email && <p className={style.error}>{errors.email.message}</p>}
            </div>

            <div className={style.inputs}>
              <input
                placeholder={getTranslation(t, "additionalNotesPlaceholder")}
                type="text"
                id="note"
                {...register("note")}
              />
              <button className={style.submit} type="submit">
                <img src={submitArrow} alt={getTranslation(t, "submitArrowAlt")} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUsSections;
