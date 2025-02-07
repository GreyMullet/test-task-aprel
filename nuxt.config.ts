import { defineNuxtConfig } from 'nuxt/config'
import { fileURLToPath, URL } from 'url'

export default defineNuxtConfig({
  srcDir: 'src',

  alias: {
    '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
    '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
    '@entities': fileURLToPath(new URL('./src/entities', import.meta.url)),
    '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
    '@widgets': fileURLToPath(new URL('./src/widgets', import.meta.url)),
    '@processes': fileURLToPath(new URL('./src/processes', import.meta.url))
  },

  modules: [
    '@pinia/nuxt'
  ],

  compatibilityDate: '2025-02-06'
})
