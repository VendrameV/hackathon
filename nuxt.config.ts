// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primeuix/themes/aura";

export default defineNuxtConfig({
    modules: ["@primevue/nuxt-module", "@tailwindcss/postcss"],
    primevue: {
        options: {
            theme: {
                preset: Aura
            }
        }
    },

    compatibilityDate: "2025-07-15",
    devtools: { enabled: false },

    css: ["~/assets/css/styles.css"]
});
