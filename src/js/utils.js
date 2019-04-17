import zhTW from '../i18n/zh-TW.js'
import zhCN from '../i18n/zh-CN.js'
import en from '../i18n/en.js'
import ja from '../i18n/ja.js'

export function debounce (func, wait, immediate) {
  var timeout
  return function () {
    var context = this
    var args = arguments
    var later = function () {
      timeout = null
      if (!immediate) { func.apply(context, args) }
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) { func.apply(context, args) }
  }
};

export function i18n (s, lang) {
  const locale = lang || (navigator.language || navigator.userLanguage)
  const locales = {
    'zh-TW': zhTW,
    'zh-CN': zhCN,
    'en': en,
    'ja': ja,
    'fallback': en
  }

  return locales[locale]
    ? locales[locale][s]
    : locales['fallback'][s]
}
