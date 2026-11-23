/*
 * File:        src/lib/types.ts
 * Author:      John Leandro Loyao (Member 3)
 * Group:       Group 8
 * Date:        2026-11-23
 * Assignment:  Full-Stack Web Applications, IMR Movie Portal
 *
 * Description: This file holds the TypeScript types that the whole group shares, so a movie or a user role means the same thing in every file.
 * Inputs: there are no inputs because it only describes the shape of data.
 * Processing: nothing runs at run time, TypeScript uses these types while we code and when we build to catch mistakes such as a missing field or a misspelled role. 
 * Output: the Movie, UserRole and DeleteMovieResult types, which other files bring in with import type.
 */

// Movie
// One movie as the app uses it. The database column release_year is renamed to releaseYear when the movies are loaded from Supabase.
export type Movie = {
  id: string;
  title: string;
  actors: string[];
  release_year: number;
};

// User role
// guest means not signed in, viewer is a signed in account that can only look, and admin is the only role that can add, edit or delete movies.
export type UserRole = "guest" | "viewer" | "admin";

// Delete result
// What the deleteMovie server action sends back to the movie card.
export type DeleteMovieResult = { ok: true } | { ok: false; message: string };
