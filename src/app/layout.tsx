import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import QueryProvider from "./QueryProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Clemory",
  authors : {name: "Lighter Links", url: "https://clemory.io"},
  description: "Personal Information storage",
  // manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <StoreProvider>{children}</StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

