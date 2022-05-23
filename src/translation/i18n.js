import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { fiTranslations } from './fi_language';
import { enTranslations } from './en_language';

const resources = {
    fi: {
        translation: fiTranslations
    },
    en: {
        translation: enTranslations,
    },
};

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: "fi",
        interpolation: {
            escapeValue: false,
        },
    });
export default i18next;