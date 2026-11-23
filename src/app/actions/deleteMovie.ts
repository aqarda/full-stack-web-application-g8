/*
 * File:        src/app/actions/deleteMovie.ts
 * Author:      John Leandro Loyao (Member 3)
 * Group:       Group 8
 * Date:        2026-11-23
 * Assignment:  Full-Stack Web Applications, IMR Movie Portal
 *
 * Description: This server action deletes one movie from the Supabase movies table. 
 * Inputs: the id of the movie to delete, sent by the Delete button on a movie card, and the signed in user, which 
 * it gets from Member 1's getCurrentUser. 
 * Processing: it checks the id, stops right away if the user is not an admin, deletes the row, and treats an empty 
 * result as a failure because Supabase returns no error when its security rules block a delete.
 * Output: { ok: true } when the movie was deleted, or { ok: false, message } with a message the movie card can show, and it refreshes the movies page so
 * the deleted movie disappears. It never throws, so a failed delete cannot break the page.
 */

"use server";

// Imports
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { DeleteMovieResult } from "@/lib/types";

// Messages shown on the movie card
const NOT_ADMIN_MESSAGE = "Only admins can change movies.";
const DELETE_FAILED_MESSAGE = "Couldn't delete the movie. Try again.";
const NOT_FOUND_MESSAGE = "Movie not found or you don't have permission.";

// Delete a movie
export async function deleteMovie(movieId: string): Promise<DeleteMovieResult> {
  // Anyone can call a server action directly, not only through our page,
  // so the id and the role are checked here as well.
  if (typeof movieId !== "string" || movieId.trim() === "") {
    return { ok: false, message: NOT_FOUND_MESSAGE };
  }

  try {
    // Step 1: only admins can delete movies
    const { role } = await getCurrentUser();
    if (role !== "admin") {
      return { ok: false, message: NOT_ADMIN_MESSAGE };
    }

    // Step 2: delete the row and ask Supabase to send back what it deleted
    const supabase = await createClient();
    const { data: deletedRows, error } = await supabase
      .from("movies")
      .delete()
      .eq("id", movieId)
      .select("id");

    // Step 3: turn problems into messages the user can read
    if (error) {
      return { ok: false, message: DELETE_FAILED_MESSAGE };
    }
    if (!deletedRows || deletedRows.length === 0) {
      return { ok: false, message: NOT_FOUND_MESSAGE };
    }
  } catch {
    return { ok: false, message: DELETE_FAILED_MESSAGE };
  }

  // Step 4: refresh the movies page so the deleted movie disappears
  revalidatePath("/");
  return { ok: true };
}
