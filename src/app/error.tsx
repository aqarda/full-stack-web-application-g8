"use client";

/*
 * Programmer: Patrick Bouley
 * Date: November 23, 2026
 * File: Error Page
 *
 * This component handles unexpected errors during page rendering.
 * It receives the error information and a reset function from Next.js.
 * The error is logged to the console to assist with debugging.
 * Users are shown an error message and given the option to retry.
 * They can also return to the homepage if the problem continues.
 */

import Link from "next/link";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  // Record the error for debugging.
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-2xl font-bold">Something Went Wrong</h1>

        <p className="mb-6">We couldnt load this page. Please try again.</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => reset()}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Try Again
          </button>

          <Link href="/" className="rounded border px-4 py-2">
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
