import { createClient } from "@/lib/supabase/server";
import type { Movie } from "@/lib/types";

// Retrieve all movies from Supabase.
export async function getMovies(): Promise<Movie[]> {
  const supabase = await createClient();

  // Retrieve movies in alphabetical order.
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .order("title", { ascending: true });

  if (error) {
    throw new Error("Failed to retrieve movies: " + error.message);
  }

  return data as Movie[];
}
