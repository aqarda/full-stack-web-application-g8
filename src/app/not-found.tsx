/*
 * Programmer: Patrick Bouley
 * Date: November 23, 2026
 * File: Not Found Page
 *
 * This component handles requests for pages that do not exist.
 * It is automatically displayed when Next.js cannot find a route.
 * The page does not require any additional user input.
 * It displays a message explaining that the requested page was not found.
 * A link allows users to return to the homepage.
 */

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">404 - Page Not Found</h1>

        <p className="mb-6">The page youre looking for doesnt exist.</p>

        <Link href="/" className="rounded bg-blue-600 px-4 py-2 text-white">
          Return Home
        </Link>
      </div>
    </main>
  );
}
