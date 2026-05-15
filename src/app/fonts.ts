import localFont from "next/font/local"


export const SANS_FONT = localFont({
  src: [
    {
      path: "./_fonts/Roboto/Roboto-VariableFont_wdth,wght.ttf",
      style: "normal",
    },
    {
      path: "./_fonts/Roboto/Roboto-Italic-VariableFont_wdth,wght.ttf",
      style: "italic",
    },
  ],
  fallback: [ "sans-serif" ],
  variable: "--sans-font",
  preload: false,
})

export const FIXED_WIDTH_FONT = localFont({
  src: "./_fonts/Taylor_Music_Mono/TaylorMusicMono-Regular.otf",
  weight: "400",
  fallback: [ "monospace" ],
  variable: "--fixed-width-font",
})
