import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers/Providers";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Travel Buddy",
  description:
    "Travel Buddy is a matchmaker site for travelers to find a travel buddy, travel partner or a travel companion. Connect with travelers & locals, plan your trip, meet up and travel together.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <AppRouterCacheProvider>
            <Toaster />
            {children}
          </AppRouterCacheProvider>
        </body>
      </html>
    </Providers>
  );
}
