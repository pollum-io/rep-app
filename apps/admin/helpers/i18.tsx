import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import transEn from "../public/locales/en/translation.json";
import transPt from "../public/locales/pt-br/translation.json";

const resources = {
	en: {
		translation: transEn,
	},
	br: {
		translation: transPt,
	},
};
console.log(resources);
console.log(i18next);

i18next.use(initReactI18next).init({
	resources,
	lng: "en",
});
