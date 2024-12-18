import React, { useContext } from "react";
import homeStyle from "../Pages/HomePage.module.css";
import oldCity3 from "../Assets/Images/web-images/oldCity3.svg";
import HeydarAlCenter from "../Assets/Images/web-images/heydar-Aliyev-Center.svg";
import shirvanShahPalace from "../Assets/Images/web-images/ShirvanshahPalace.svg";
import shirvanShahPalace2 from "../Assets/Images/web-images/flames_with_shirvanshahlar.svg";
import kishChurch from "../Assets/Images/web-images/kish.svg";
import style from "../Pages/AboutUs.module.css";
import data from "../Data/data.json"; // Ensure the correct path
import { LanguageContext } from "../LanguageContext"; // Ensure the correct path

export default function AboutUsContent() {
  const { selectedLanguage } = useContext(LanguageContext);

  // Select the appropriate language content, fallback to English if not available
  const aboutUsContent = data.aboutUs[selectedLanguage] || data.aboutUs["english"];

  return (
    <div className={homeStyle.wrapper}>
      <div className={style.about_us_container}>
        {/* Header Section */}
        <div className={style.about}>
          <h1>{aboutUsContent.header.title}</h1>
          <h3>{aboutUsContent.header.subtitle}</h3>
        </div>

        {/* First Text Section */}
        <div className={style.left_photo_right_text}>
          <div className={style.half_screen}>
            <img src={oldCity3} alt="Old City" />
          </div>
          <div className={style.text}>
            <p>{aboutUsContent.paragraph1}</p>
          </div>
        </div>

        {/* Additional Image */}
        <img
          className={style.shirvanShahPalace2}
          src={shirvanShahPalace2}
          alt="Shirvanshahs with flames"
        />

        {/* Second Text Section with List */}
        <div className={style.right_photo_left_text}>
          <div className={style.text}>
            <p>{aboutUsContent.paragraph2}</p>
            <ul className={style.aboutUsUl}>
              {aboutUsContent.services.map((service, index) => (
                <li key={index}>- {service}</li>
              ))}
            </ul>
          </div>

          {/* Photo Container */}
          <div className={`${style.about_us_photo_cont} ${style.half_screen}`}>
            <div className={style.up_down_first}>
              <img src={HeydarAlCenter} alt="Heydar Aliyev Center" />
            </div>
            <div className={style.up_down}>
              <img src={kishChurch} alt="Kish Church" />
              <img src={shirvanShahPalace} alt="Shirvanshahs Palace" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
