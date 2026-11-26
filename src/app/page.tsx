/*
 * File:        src/app/page.tsx
 * Author:      John Leandro Loyao (Member 3)
 * Group:       Group 8
 * Date:        2026-11-23
 * Assignment:  Full-Stack Web Applications, IMR Movie Portal
 *
 * Description: This is the main page of the IMR Movie Portal, the Next.js and Supabase site that the Internet
 * Movies Rental Company uses to keep its movie database up to date.
 * Inputs: the visitor's sign in cookie, which tells us if they are a guest, a viewer or an admin, and the rows
 * in the Supabase movies table.
 * Processing: the page asks Supabase who the user is and loads every movie at the same time, then passes the
 * movies and the admin setting down to the movie list. Signed in users see their email and role with Member 1's
 * logout button, and guests get a link to the sign in page. Only admins get the Add a movie button, which opens
 * Member 2's add page.
 * Output: the page heading, the sign in status, the Add a movie button for admins, and the movie list with
 * every movie's title, actors and release year.
 */

// Imports
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import MovieList from "@/components/MovieList";
import { getCurrentUser } from "@/lib/auth";
import { getMovies } from "@/lib/movies";

// Movies page
export default async function MoviesPage() {
  // Load the signed in user and the movies at the same time. If the movies
  // cannot be loaded, getMovies throws and error.tsx shows its message.
  const [currentUser, movies] = await Promise.all([getCurrentUser(), getMovies()]);
  const isAdmin = currentUser.role === "admin";

  return (
    <div className="flex flex-col gap-8">
      {/* Page heading, with the Add a movie button for admins */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Movie catalogue</h1>
          <p className="mt-2 text-base text-gray-600">
            Every movie we have for rent, with its actors and release year.
          </p>
        </div>

        {isAdmin && (
          <Link
            href="/movies/new"
            className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
          >
            Add a movie
          </Link>
        )}
      </div>

      {/* Sign in status: who is signed in with the logout button, or a sign in link for guests */}
      {currentUser.user ? (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-base">
            Signed in as <span className="font-semibold">{currentUser.user.email}</span> ({currentUser.role} account)
          </p>
        </div>
      ) : (
        <p className="rounded-lg border border-gray-200 bg-white p-4 text-base">
          You are browsing as a guest.{" "}
          <Link href="/login" className="font-medium text-brand hover:underline">
            Sign in
          </Link>{" "}
          if you have an account.
        </p>
      )}

      {/* Every movie as a card */}
      <MovieList movies={movies} isAdmin={isAdmin} />
    </div>
  );
}
