import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enJson from './locales/en.json';
import zhJson from './locales/zh.json';
import jaJson from './locales/ja.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enJson,
    },
    zh: {
      translation: zhJson,
    },
    ja: {
      translation: jaJson,
    },
  },
  lng: 'en',
});

export default i18n;
