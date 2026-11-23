"use client";

/*
 * Programmer: Patrick Bouley
 * Date: November 23, 2026
 * File: Logout Button
 *
 * This component allows authenticated users to log out of the application.
 * It responds when the user clicks the Logout button.
 * Supabase Authentication is used to end the current user session.
 * If logout succeeds, the page refreshes to display the guest state.
 * If an error occurs, an error message is displayed to the user.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// Signs the current user out of Supabase.
export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    setError("");

    // End the user's Supabase session.
    const { error: logoutError } = await supabase.auth.signOut();

    if (logoutError) {
      setError(logoutError.message);
      setLoading(false);
      return;
    }

    // Refresh the page to display the guest state.
    router.refresh();
  }

  return (
    <div className="mt-4">
      <button
        onClick={handleLogout}
        disabled={loading}
        className="rounded bg-red-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Logging out..." : "Logout"}
      </button>

      {error && (
        <p role="alert" className="mt-2 text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
