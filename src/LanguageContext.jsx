//LanguageContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the Language Context
export const LanguageContext = createContext();

// LanguageProvider component will be used to wrap the App
export const LanguageProvider = ({ children }) => {
  // Get the initial language from localStorage or default to 'english'
  const initialLanguage = localStorage.getItem('selectedLanguage') || 'english';
  
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);

  useEffect(() => {
    // Whenever the selected language changes, save it to localStorage
    localStorage.setItem('selectedLanguage', selectedLanguage);
  }, [selectedLanguage]);

  // Providing both the selectedLanguage and setSelectedLanguage to the rest of the app
  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the Language context
export const useLanguage = () => useContext(LanguageContext);
