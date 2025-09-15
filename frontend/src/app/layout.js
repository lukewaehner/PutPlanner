import { Inter } from "next/font/google";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { NextUIProvider } from "@nextui-org/react";

import { GoogleOAuthProvider } from "@react-oauth/google";
import Head from "next/head";
import { AuthProvider } from "./hooks/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PutPlanner",
  description: "Elevate your golf game!",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <html lang="en">
          <Head>
            <title>{metadata.title}</title>
            <link
              href="https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css"
              rel="stylesheet"
            />
            <meta name="description" content={metadata.description} />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <body className={`${inter.className} bg-white min-h-screen`}>
            <NextUIProvider>{children}</NextUIProvider>
          </body>
        </html>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}
