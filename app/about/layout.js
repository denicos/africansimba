"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Chakra is only loaded on /about, which keeps the rest of the site light on mobile data.
const theme = extendTheme({
  config: { initialColorMode: "dark", useSystemColorMode: false },
  fonts: {
    heading: "var(--font-heading), Georgia, serif",
    body: "var(--font-body), system-ui, sans-serif",
  },
  styles: {
    global: {
      body: { bg: "#000", color: "#fff" },
    },
  },
});

export default function AboutLayout({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
