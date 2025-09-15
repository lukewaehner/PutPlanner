"use client";

import { ColorModeScript as ChakraColorModeScript } from "@chakra-ui/react";
import theme from "./theme";

export function ColorModeScript() {
  return (
    <ChakraColorModeScript initialColorMode={theme.config.initialColorMode} />
  );
}
