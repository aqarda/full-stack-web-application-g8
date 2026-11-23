/*
 * File:        src/app/layout.tsx
 * Author:      John Leandro Loyao (Member 3)
 * Group:       Group 8
 * Date:        2026-11-23
 * Assignment:  Full-Stack Web Applications, IMR Movie Portal
 *
 * Description: This is the root layout that wraps every page of the IMR Movie Portal. 
 * Inputs: Next.js passes in the page that is being shown as children.
 * Processing: it loads the global styles, sets the page title and description for the browser tab and search engines, 
 * and places the page between our navbar and footer. 
 * Output: a full HTML page where the navbar is at the top, the page content fills the middle, 
 * and the footer stays at the bottom even when the page is short. 
 * Because the navbar and footer live here, they show up on the movies page and the sign in page without being added twice.
 */

// Imports
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

// Page information for the browser tab 
export const metadata: Metadata = {
  title: "IMR Movie Portal",
  description:
    "Browse and manage the movie catalogue of the Internet Movies Rental Company.",
};

// Root layout
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <Navbar />

        {/* Page content grows to fill the space so the footer stays at the bottom */}
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
