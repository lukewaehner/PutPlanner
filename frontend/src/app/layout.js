import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import useScrollRestoration from "./hooks/UseScrollRestoration";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PutPlanner",
  description: "Elevate your golf game!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
