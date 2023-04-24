// eslint-disable-next-line import/no-unresolved
import { Analytics } from '@vercel/analytics/react'
import i18n from 'i18next'
import LanguageDetector, {
  DetectorOptions
} from 'i18next-browser-languagedetector'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App.tsx'
import GlobalStyle from './GlobalStyles'
import enTranslations from './locales/en.json'
import nbTranslations from './locales/nb.json'

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
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <App />
        <Analytics />
      </I18nextProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
