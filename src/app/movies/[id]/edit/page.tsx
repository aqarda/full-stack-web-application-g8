/*
 * Fernando Lopez (Member 2) - Group 8
 * Nov 23, 2026
 *
 * This page is where the admin edits a movie, at /movies/[id]/edit.
 * It gets the movie id from the web address and checks that the user is the admin, sending guests to login and viewers back to the list.
 * It loads that movie from Supabase and shows the 404 page if the movie does not exist.
 * The database calls the year release_year, so it is changed to releaseYear to match our Movie type.
 * It then shows the MovieForm already filled in with the movie's title, actors and year.
 */

import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import MovieForm from "@/components/MovieForm";
import type { Movie } from "@/lib/types";

// props
interface EditMoviePageProps {
    params: Promise<{ id: string }>;
}

const EditMoviePage = async ({ params }: EditMoviePageProps) => {
    const { id } = await params;
    const { role } = await getCurrentUser();

    // only the admin can edit movies
    if (role === "guest") {
        redirect("/login");
    }
    if (role !== "admin") {
        redirect("/");
    }

    // loads the movie
    const supabase = await createClient();
    const { data } = await supabase
        .from("movies")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (!data) {
        notFound();
    }

    const movie: Movie = {
        id: data.id,
        title: data.title,
        actors: data.actors,
        release_year: data.release_year,
    };

    return (
        <section className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold">Edit movie</h1>
            <MovieForm movie={movie} />
        </section>
    );
};

export default EditMoviePage;