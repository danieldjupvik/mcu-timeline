import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import LanguageDetector, {
  DetectorOptions
} from 'i18next-browser-languagedetector'
import enTranslations from './locales/en.json'
import nbTranslations from './locales/nb.json'
import GlobalStyle from './GlobalStyles'

const queryClient = new QueryClient()

interface CustomDetectorOptions extends DetectorOptions {
  lookupNavigator?: boolean
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: enTranslations },
      nb: { translation: nbTranslations },
      nn: { translation: nbTranslations },
      no: { translation: nbTranslations }
    },
    fallbackLng: 'en',
    detection: {
      order: ['navigator'],
      lookupNavigator: true
    } as CustomDetectorOptions
  })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <GlobalStyle />
        <App />
      </I18nextProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
