import { I18n } from "i18n-js"

import { getDeviceLanguageCode } from "./languageCode"
import { pt_br } from "./pt-br"
import { TranslationKeyType } from "./types"


type LanguageCodeNormalization = {
  [key in string]: string
}

const normalizedLanguageCode: LanguageCodeNormalization = {
  en: "en_us",
  en_us: "en_us",
  pt_br: "pt_br",
}


export const i18n = new I18n({
  pt_br: pt_br,
})


const deviceLanguage = getDeviceLanguageCode()
const normalizedDeviceLangauge = normalizedLanguageCode[deviceLanguage]

const allSupportedLanguages = Object.keys(i18n.translations)
const isLanguageSupported = allSupportedLanguages.includes(normalizedDeviceLangauge)
if (isLanguageSupported) {
  i18n.locale = normalizedDeviceLangauge
} else {
  i18n.defaultLocale = "en_us"
}


export const translate = (key: TranslationKeyType): string => i18n.t(key)
