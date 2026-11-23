/*
 * Programmer: Patrick Bouley
 * Date: November 23, 2026
 * File: Movie Database Functions
 *
 * This file contains reusable functions for retrieving movies.
 * It connects to the Supabase database using the server client.
 * The getMovies function retrieves all movies and sorts them by title.
 * Database records are converted to match the shared Movie type.
 * The function returns the movie list or throws an error if loading fails.
 */

import { createClient } from "@/lib/supabase/server";
import type { Movie } from "@/lib/types";

// Retrieve all movies from Supabase.
export async function getMovies(): Promise<Movie[]> {
  const supabase = await createClient();

  // Retrieve movies in alphabetical order.
  const { data, error } = await supabase
    .from("movies")
    .select("id, title, actors, release_year")
    .order("title", { ascending: true });

  // Handle database errors.
  if (error) {
    throw new Error("Failed to retrieve movies: " + error.message);
  }

  // Convert database records to the shared Movie type.
  return (data ?? []).map((movie) => ({
    id: movie.id,
    title: movie.title,
    actors: movie.actors,
    releaseYear: movie.release_year,
  }));
}
