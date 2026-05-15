import { type Metadata } from "next"
import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from "@mantine/core"

import Content from "./_layouts/content"
import Footer from "./_layouts/footer"
import Header from "./_layouts/header"

import { SANS_FONT, FIXED_WIDTH_FONT } from "./fonts"
import "@mantine/core/styles.css"
import "./globals.scss"


export const metadata: Metadata = {
  title: "Scales Tool",
  description: "Visualize musical scales!",
}

interface LayoutInput {
  children: React.ReactNode,
}

export default function Layout({
  children,
}: LayoutInput): React.ReactNode {
  const theme = createTheme({
    fontFamily: SANS_FONT.style.fontFamily,
    primaryColor: "yellow",
  })

  return (
    <html
      lang="en"
      className={FIXED_WIDTH_FONT.variable}
      {...mantineHtmlProps}
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Header />
          <Content>
            {children}
          </Content>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  )
}
