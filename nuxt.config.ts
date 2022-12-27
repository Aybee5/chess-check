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
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-5GERBPC6YE",
          async: true,
        },
        {
          hid: "gtm",
          children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','G-5GERBPC6YE');`,
          type: "text/javascript",
        },
      ],
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
  nitro: {
    prerender: {
      routes: ['/404.html']
    }
  }
});
