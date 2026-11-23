/*
 * File:        src/components/MovieList.tsx
 * Author:      John Leandro Loyao (Member 3)
 * Group:       Group 8
 * Date:        2026-11-23
 * Assignment:  Full-Stack Web Applications, IMR Movie Portal
 *
 * Description: This component shows all the movies as a grid of cards.
 * Inputs: the list of movies and whether the current user is an admin, both passed in by the main page.
 * Processing: if the list is empty it shows a short message, otherwise it makes one MovieCard
 * for each movie and uses the movie id as the key.
 * Output: a heading with the number of movies and a grid that is one column wide on phones, two on tablets and three on bigger screens.
 * The list itself has no buttons, each card handles its own Edit and Delete.
 */

// Imports
import MovieCard from "@/components/MovieCard";
import type { Movie } from "@/lib/types";

// Props
type MovieListProps = {
  movies: Movie[];
  isAdmin: boolean;
};

// Movie list
export default function MovieList({ movies, isAdmin }: MovieListProps) {
  const movieCountText = movies.length === 1 ? "1 movie" : `${movies.length} movies`;

  return (
    <section aria-labelledby="movie-list-heading">
      {/* List heading with the number of movies */}
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 id="movie-list-heading" className="text-2xl font-semibold">
          All movies
        </h2>
        <p className="text-sm text-gray-600">{movieCountText}</p>
      </div>

      {/* Message when there are no movies yet */}
      {movies.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-base text-gray-600">
          No movies yet.
        </p>
      ) : (
        /* One card for each movie */
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} isAdmin={isAdmin} />
          ))}
        </ul>
      )}
    </section>
  );
}
