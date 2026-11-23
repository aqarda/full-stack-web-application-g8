/*
 * Programmer: Patrick Bouley
 * Date: November 23, 2026
 * File: Loading Page
 *
 * This component displays a loading screen while a page is being prepared.
 * It does not require any direct user input.
 * Next.js automatically displays it when a route is loading.
 * A rotating spinner and loading message provide visual feedback.
 * Once the requested page is ready, the loading screen disappears.
 */

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />

        <p className="text-lg">Loading...</p>
      </div>
    </main>
  );
}
