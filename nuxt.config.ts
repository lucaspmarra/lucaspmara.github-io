// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    css: ['~/assets/css/main.scss'],
    modules: ["@nuxt/ui", "@nuxt/fonts", "nuxt-graphql-request", "@pinia/nuxt"],
    ui:{
        icons:['simple-icons', 'mdi', 'heroicons']
    },
    build: {
        transpile: ['gsap', 'nuxt-graphql-request'],
    },
    graphql: {
        clients: {
            default: {
                endpoint: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENT_SPACE}`,
                options: {
                    headers: {
                        Authorization: `Bearer ${process.env.CONTENT_TOKEN}`
                    }
                },
            },
        },
        options: {
            method: 'get',
        },
        includeNodeModules: true,
    },
    pinia: {
        storesDirs: ['./stores/**'],
    },
})
