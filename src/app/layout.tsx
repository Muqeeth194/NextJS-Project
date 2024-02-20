import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import StoreProvider from "./StoreProvider";
import NavbarState from "./NavbarState";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Wrap the provider component around the entire structure to make store available for the whole application.
    <StoreProvider>
      <html lang="en" className="dark">
        <header>
          <NavbarState />
        </header>

        <body className={inter.className}>
          <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />

          {children}

          <Toaster position="top-center" reverseOrder={false} />
        </body>
      </html>
    </StoreProvider>
  );
}
