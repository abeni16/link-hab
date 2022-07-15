import { extendTheme } from "@chakra-ui/react";
import { Button } from "./buttons";
export const theme = extendTheme({
  colors: {
    brand: {
      100: "red.300",
    },
  },
  fonts: {
    body: " sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "gray.100",
      },
    }),
  },
  components: {
    Button,
  },
});
