// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@pinia/nuxt"
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
      nasaApiKey: process.env.NASA_API_KEY,
    }
  },
  // Set meta-titles
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'NASA TechPort Projects',
      titleTemplate: '%s | NASA TechPort Projects',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'The NASA TechPort system provides a RESTful web services API to make technology project data available to other systems and services. This API can be used to export TechPort data into JSON format, which can be further processed and analyzed.',
        },
        {
          hid: 'description',
          name: 'og:image',
          content: 'https://techport.nasa/gov/images/NASA-Logo.png',
        },
        {
          hid: 'description',
          name: 'type',
          content: 'website',
        },
      ],
    },
  },
})