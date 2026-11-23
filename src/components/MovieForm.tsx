"use client";

/*
 * Fernando Lopez (Member 2) - Group 8
 * Nov 23, 2026
 *
 * This component is the form used to add a new movie or edit an existing one.
 * It receives a movie through props when editing, and starts empty when adding.
 * It uses state for the title, the list of actors and the release year, and lets the admin add or remove actor boxes.
 * It checks every input with the Zod schema and makes sure the same title and year are not already in the database before saving.
 * After saving to Supabase it sends the admin back to the movie list, and if something is wrong it shows an error under that input.
 */

import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Movie } from "@/lib/types";
import { movieSchema } from "@/lib/movieValidation";

// props
interface MovieFormProps {
    movie?: Movie;
}

const MovieForm = ({ movie }: MovieFormProps) => {
    const router = useRouter();
    const supabase = createClient();

    // input states
    const [title, setTitle] = useState(movie ? movie.title : "");
    const [actors, setActors] = useState<string[]>(movie ? movie.actors : [""]);
    const [releaseYear, setReleaseYear] = useState(movie ? String(movie.releaseYear) : "");

    // error and saving states
    const [titleError, setTitleError] = useState("");
    const [actorsError, setActorsError] = useState("");
    const [yearError, setYearError] = useState("");
    const [saveError, setSaveError] = useState("");
    const [saving, setSaving] = useState(false);

    // actor box functions
    const handleActorChange = (index: number, value: string) => {
        setActors((currentActors) =>
            currentActors.map((actor, i) => (i === index ? value : actor))
        );
    };

    const handleAddActor = () => {
        if (actors.length < 20) {
            setActors([...actors, ""]);
        }
    };

    const handleRemoveActor = (index: number) => {
        if (actors.length > 1) {
            setActors(actors.filter((actor, i) => i !== index));
        }
    };

    // saving the movie
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaveError("");

        setTitleError("");
        setActorsError("");
        setYearError("");

        const cleanActors = actors
            .map((actor) => actor.trim())
            .filter((actor) => actor !== "");

        // checks the inputs with the zod schema
        const result = movieSchema.safeParse({
            title: title,
            actors: cleanActors,
            releaseYear: releaseYear.trim() === "" ? NaN : Number(releaseYear),
        });

        if (!result.success) {
            const errors = z.flattenError(result.error).fieldErrors;
            setTitleError(errors.title ? errors.title[0] : "");
            setActorsError(errors.actors ? errors.actors[0] : "");
            setYearError(errors.releaseYear ? errors.releaseYear[0] : "");
            return;
        }

        const newMovie = result.data;

        setSaving(true);

        // checks for a movie with the same title and year
        const { data: sameYearMovies, error: checkError } = await supabase
            .from("movies")
            .select("id, title")
            .eq("release_year", newMovie.releaseYear);

        if (checkError) {
            setSaveError("Could not save the movie. Please try again.");
            setSaving(false);
            return;
        }

        const isDuplicate = sameYearMovies.some(
            (otherMovie) =>
                otherMovie.title.toLowerCase() === newMovie.title.toLowerCase() &&
                otherMovie.id !== movie?.id
        );

        if (isDuplicate) {
            setTitleError("A movie with this title and release year already exists.");
            setSaving(false);
            return;
        }

        const movieData = {
            title: newMovie.title,
            actors: newMovie.actors,
            release_year: newMovie.releaseYear,
        };

        // updates if editing, inserts if adding
        const { error } = movie
            ? await supabase.from("movies").update(movieData).eq("id", movie.id)
            : await supabase.from("movies").insert(movieData);

        if (error) {
            setSaveError("Could not save the movie. Please try again.");
            setSaving(false);
            return;
        }

        router.push("/");
        router.refresh();
    };

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="flex max-w-xl flex-col gap-6 rounded-lg border border-gray-200 bg-white p-6"
        >
            {saveError && (
                <p role="alert" className="rounded bg-red-50 p-3 text-sm text-brand-dark">
                    {saveError}
                </p>
            )}

            {/* title input */}
            <div className="flex flex-col gap-1">
                <label htmlFor="title" className="font-medium">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded border border-gray-300 p-2"
                />
                {titleError && <p className="text-sm text-brand">{titleError}</p>}
            </div>

            {/* actor inputs */}
            <div className="flex flex-col gap-2">
                <p className="font-medium">Actors ({actors.length} of 20)</p>

                {actors.map((actor, index) => (
                    <div key={index} className="flex gap-2">
                        <input
                            type="text"
                            value={actor}
                            onChange={(e) => handleActorChange(index, e.target.value)}
                            aria-label={`Actor ${index + 1}`}
                            className="w-full rounded border border-gray-300 p-2"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveActor(index)}
                            disabled={actors.length === 1}
                            className="rounded border border-gray-300 px-3 text-sm hover:bg-gray-100 disabled:opacity-40"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleAddActor}
                    disabled={actors.length >= 20}
                    className="self-start rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100 disabled:opacity-40"
                >
                    Add another actor
                </button>

                {actorsError && <p className="text-sm text-brand">{actorsError}</p>}
            </div>

            {/* release year input */}
            <div className="flex flex-col gap-1">
                <label htmlFor="releaseYear" className="font-medium">
                    Release year
                </label>
                <input
                    id="releaseYear"
                    type="text"
                    value={releaseYear}
                    onChange={(e) => setReleaseYear(e.target.value)}
                    className="w-40 rounded border border-gray-300 p-2"
                />
                {yearError && <p className="text-sm text-brand">{yearError}</p>}
            </div>

            {/* buttons */}
            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={saving}
                    className="rounded bg-brand px-4 py-2 font-medium text-white hover:bg-brand-dark disabled:opacity-50"
                >
                    {saving ? "Saving..." : movie ? "Save changes" : "Add movie"}
                </button>
                <Link href="/" className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100">
                    Cancel
                </Link>
            </div>
        </form>
    );
};

export default MovieForm;