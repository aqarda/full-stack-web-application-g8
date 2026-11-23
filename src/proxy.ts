/*
 * Programmer: Patrick Bouley
 * Date: November 23, 2026
 * File: Next.js Proxy
 *
 * This file configures the application's Next.js Proxy.
 * It receives incoming requests and passes them to the Supabase session helper.
 * The helper checks the authentication session and refreshes it when necessary.
 * The matcher excludes static resources that do not require session handling.
 * This helps maintain authentication sessions while navigating the application.
 */

import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// Refresh authentication sessions for incoming requests.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

// Skip static files and images that do not need authentication.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
