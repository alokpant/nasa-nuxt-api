// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@pinia/nuxt",
    // "@pinia-plugin-persistedstate/nuxt"
  ],

  css: ['@/assets/css/tailwind.css'],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },

  compatibilityDate: "2024-07-27",
  serverMiddleware: [
    { path: '/api/projects', handler: '~/server/api/projects.ts' },
    { path: '/api/projects', handler: '~/server/api/projects/[pid].ts' }
  ],
  runtimeConfig: {
    public: {
      nasaApiKey: process.env.NASA_API_KEY
    }
  },
})