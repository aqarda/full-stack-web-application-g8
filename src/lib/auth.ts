/*
 * Programmer: Patrick Bouley
 * Date: November 23, 2026
 * File: Authentication Helper
 *
 * This file provides a reusable function for checking authentication.
 * It uses the server-side Supabase client to retrieve the current user.
 * The user's application metadata is checked to determine their role.
 * Users are identified as guests, viewers, or administrators.
 * The function returns the user information and role to other components.
 */

import { createClient } from "@/lib/supabase/server";

// Returns the current user's account and application role.
export async function getCurrentUser() {
  const supabase = await createClient();

  // Verify the currently signed-in user.
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // No valid session means the visitor is a guest.
  if (error || !user) {
    return {
      user: null,
      role: "guest",
    };
  }

  // Retrieve the role stored in Supabase Auth.
  const role = user.app_metadata?.movie_role === "admin" ? "admin" : "viewer";

  return {
    user,
    role,
  };
}
