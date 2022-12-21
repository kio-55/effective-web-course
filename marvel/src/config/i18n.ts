import { use } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

const i18n = use(HttpApi)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    supportedLngs: ['en', 'ru'],
    lng: 'en',
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'cookie'],
      caches: ['cookie']
    },
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json'
    }
  });

export default i18n;
