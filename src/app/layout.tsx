import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/ui/modules/navbar/Navbar";
import NextAuthContext from "@/lib/nextauth/NextAuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Games Zone",
  description: "Book your game slots",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} py-2 md:py-5 px-2 bg-gray-200 dark:bg-gray-900 flex min-h-screen flex-col items-center justify-start gap-2 md:gap-3`}
      >
        <>

          <NextAuthContext>
            <Navbar />
            {/* container */}
            <div className="z-0 w-full min-h-screen p-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-md">
              {children}
            </div>
          </NextAuthContext>
        </>
      </body>
    </html>
  );
}
