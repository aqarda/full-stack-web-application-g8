/*
 * Programmer: Patrick Bouley
 * Date: November 23, 2026
 * File: Supabase Browser Client
 *
 * This file creates a Supabase client for browser-side operations.
 * It uses the project URL and publishable key from environment variables.
 * The client allows React components to communicate with Supabase.
 * It is used for operations such as login, logout, and database requests.
 * The function returns a configured Supabase browser client.
 */

import { createBrowserClient } from "@supabase/ssr";

// Creates a Supabase client for browser-side components.
// Used for login, logout, and other client-side requests.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
