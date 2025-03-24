import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import homeEn from './locales/en/home.json';

import homeVi from './locales/vi/home.json';

const resources = {
    en: {
        home: homeEn,
    },
    vi: {
        home: homeVi,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en', 
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
});

export default i18n;
