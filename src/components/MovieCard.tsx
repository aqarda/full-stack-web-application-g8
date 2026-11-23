/*
 * File:        src/components/MovieCard.tsx
 * Author:      John Leandro Loyao (Member 3)
 * Group:       Group 8
 * Date:        2026-11-23
 * Assignment:  Full-Stack Web Applications, IMR Movie Portal
 *
 * Description: This component shows one movie as a card in the movie list.
 * Inputs: the movie to show and whether the current user is an admin.
 * Processing: it lists every actor of the movie and, only for admins, adds an Edit link that opens Member 2's
 * edit page for this movie and a Delete button that asks for confirmation and then calls the deleteMovie server action.
 * Output: a card with the title, the release year, the actors as a list and the admin buttons, plus a message on
 * the card if the delete fails. While the delete is running the buttons are turned off and the Delete button
 * says Deleting, so it cannot be clicked twice.
 */

"use client";

// Imports
import Link from "next/link";
import { useState, useTransition } from "react";
import { deleteMovie } from "@/app/actions/deleteMovie";
import type { Movie } from "@/lib/types";

// Props
type MovieCardProps = {
  movie: Movie;
  isAdmin: boolean;
};

// Movie card
export default function MovieCard({ movie, isAdmin }: MovieCardProps) {
  // State
  const [isDeleting, startDeleting] = useTransition();
  const [deleteError, setDeleteError] = useState("");

  // Event handlers
  function handleDelete() {
    const isConfirmed = window.confirm(`Delete "${movie.title}"?`);
    if (!isConfirmed) {
      return;
    }

    setDeleteError("");
    startDeleting(async () => {
      try {
        const result = await deleteMovie(movie.id);
        if (!result.ok) {
          setDeleteError(result.message);
        }
      } catch {
        // The request never reached the server, for example with no internet
        setDeleteError("Can't reach the server. Check your connection and try again.");
      }
    });
  }

  // Render
  return (
    <li className="flex flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      {/* Title and release year */}
      <h3 className="text-lg font-semibold">{movie.title}</h3>
      <p className="text-sm text-gray-600">Released in {movie.releaseYear}</p>

      {/* Actors */}
      <p className="mt-4 text-sm font-semibold">Actors</p>
      <ul className="mt-1 list-disc pl-5 text-base">
        {movie.actors.map((actorName, actorIndex) => (
          <li key={`${actorName}-${actorIndex}`}>{actorName}</li>
        ))}
      </ul>

      {/* Buttons that only admins can see */}
      {isAdmin && (
        <div className="mt-auto pt-5">
          <div className="flex gap-3">
            <Link
              href={`/movies/${movie.id}/edit`}
              aria-disabled={isDeleting}
              tabIndex={isDeleting ? -1 : undefined}
              className={`rounded-md border border-brand px-4 py-2 text-sm font-medium text-brand hover:bg-red-50 ${
                isDeleting ? "pointer-events-none opacity-60" : ""
              }`}
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>

          {/* Message when the delete did not work */}
          {deleteError && (
            <p role="alert" className="mt-3 text-sm text-brand">
              {deleteError}
            </p>
          )}
        </div>
      )}
    </li>
  );
}
