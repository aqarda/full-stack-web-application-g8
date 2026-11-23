/*
 * Programmer: Patrick Bouley
 * Date: November 23, 2026
 * File: Movie Interface
 *
 * This file defines the TypeScript structure for movie records.
 * Each movie contains a unique ID, title, list of actors, and release year.
 * The interface matches the columns in the Supabase movies table.
 * Other components can import this interface to work with movie data.
 * This helps maintain consistent data types throughout the application.
 */

export interface Movie {
  id: string;
  title: string;
  actors: string[];
  release_year: number;
}
