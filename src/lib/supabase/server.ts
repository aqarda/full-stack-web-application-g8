/*
 * Programmer: Patrick Bouley
 * Date: November 23, 2026
 * File: Supabase Server Client
 *
 * This file creates a Supabase client for server-side operations.
 * It uses environment variables to connect to the Supabase project.
 * Next.js cookies are used to access the current authentication session.
 * The client allows server components to retrieve data and user information.
 * The function returns a configured Supabase server client.
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Creates a Supabase client for server-side components.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },

        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Components cannot always modify cookies.
            // Session refresh will be handled by Proxy later.
          }
        },
      },
    },
  );
}
