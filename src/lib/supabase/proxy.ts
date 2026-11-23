/*
 * Programmer: Patrick Bouley
 * Date: November 23, 2026
 * File: Supabase Session Proxy
 *
 * This file handles refreshing Supabase authentication sessions.
 * It receives the current Next.js request and reads its cookies.
 * A Supabase server client checks and refreshes authentication tokens.
 * Any updated session cookies are added to the response.
 * The function returns the response with the current authentication state.
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Refreshes the user's Supabase authentication session.
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  // Create a Supabase client for the current request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        // Read authentication cookies from the request.
        getAll() {
          return request.cookies.getAll();
        },

        // Update cookies when Supabase refreshes the session.
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });

          // Preserve headers required for safe session handling.
          if (headers) {
            Object.entries(headers).forEach(([key, value]) => {
              response.headers.set(key, value);
            });
          }
        },
      },
    },
  );

  // Verify the authentication token and refresh it if needed.
  await supabase.auth.getClaims();

  // Return the response with any refreshed cookies.
  return response;
}
