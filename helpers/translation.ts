// import i18next from "i18next";
// import { initReactI18next } from "react-i18next";
// import HttpApi from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";

// export const availableLanguages = ["en", "pt-br"];
// export const defaultLocale = "en";
// const LOCALE_VERSION = "1.5.1";

// i18next
// 	.use(HttpApi)
// 	.use(LanguageDetector)
// 	.use(initReactI18next)
// 	.init({
// 		backend: {
// 			loadPath: `./locales/{{lng}}.json`,
// 			queryStringParams: { v: LOCALE_VERSION },
// 		},
// 		react: {
// 			useSuspense: true,
// 		},
// 		load: "languageOnly",
// 		lowerCaseLng: true,
// 		debug: true,
// 		fallbackLng: "pt-BR",
// 		initImmediate: false,
// 		preload: [defaultLocale],
// 		keySeparator: ".",
// 		interpolation: { escapeValue: false },
// 	});

// export default i18next;
