// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          hid: "og_title",
          name: "og:title",
          content:
            "Check Chess | Check whether chessboard in in checkmate or in stalemate",
        },
        {
          hid: "og_description",
          name: "og:description",
          content:
            "Get the status of a chessboard, check whether the chessboard is in checkmate or stalemate",
        },
        {
          hid: "og_description",
          name: "description",
          content:
            "Get the status of a chessboard, check whether the chessboard is in checkmate or stalemate",
        },
        {
          hid: "og_image",
          name: "og:image",
          content:
            "https://ik.imagekit.io/wsosjkbekkj/check_chess_hpwYPZtsh.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671374544358",
        },
        {
          hid: "twitter_card_image_size",
          name: "twitter:card",
          content: "summary_large_image",
        },
      ],
      title:
        "Check Chess | Check whether chessboard in in checkmate or in stalemate",
    },
  },
  modules: [
    "nuxt-icon",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@kevinmarrec/nuxt-pwa",
  ],
  pwa: {
    meta: {
      theme_color: "#769656",
    },
  },
});
