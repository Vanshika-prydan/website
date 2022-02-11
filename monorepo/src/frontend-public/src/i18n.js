import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationENG from "./locales/en.json";
import translationSV from "./locales/sv.json";

// the translations
const resources = {
  sv: { translation: translationSV },
  en: { translation: translationENG },
};

i18n
  .use(LanguageDetector)
  .use({
    type: "postProcessor",
    name: "withDoubleDots",
    process: function (value, key, options, translator) {
      return `${value}:`;
    },
  })
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "sv", // use en if detected lng is not available
    lng: "sv",
    // keySeparator: true, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

// i18n.changeLanguage("en");
export default i18n;
