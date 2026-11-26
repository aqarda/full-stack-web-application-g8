/*
 * File:        src/components/Navbar.tsx
 * Author:      John Leandro Loyao (Member 3)
 * Group:       Group 8
 * Date:        2026-11-23
 * Assignment:  Full-Stack Web Applications, IMR Movie Portal
 *
 * Description: This component is the custom navbar shown at the top of every page.
 * Inputs: it takes no props and does not read anything from the database, so it is the same for every visitor.
 * Processing: it lays out the company name on the left and the page links on the right, and lets the links drop under the name when the screen is too narrow.
 * Output: a header with a link back to the movies page and a link to the staff sign in page.
 * We built it ourselves with Tailwind instead of using a navbar from a UI library, and it stays in its normal place at the top of the page.
 */

// Imports
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

// Role information is passed from the layout.
interface NavbarProps {
  role: string;
}

// Navbar
export default function Navbar({ role }: NavbarProps) {
  return (
    <header className="bg-brand text-white">
      <nav
        aria-label="Main"
        className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4"
      >
        {/* Company name, also a link back to the movies page */}
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">IMR</span>
          <span className="text-base">Internet Movies Rental</span>
        </Link>

        {/* Page links */}
        <ul className="flex items-center gap-8 text-base font-medium ">
          <li>
            <Link href="/" className="hover:underline">
              Movies
            </Link>
          </li>
          {role === "guest" ? (
            <li>
              <Link href="/login" className="hover:underline">
                Sign in
              </Link>
            </li>
          ) : (
            <li>
              <LogoutButton />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
