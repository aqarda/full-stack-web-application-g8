 /*
 * Fernando Lopez (Member 2) - Group 8
 * Nov 23, 2026
 *
 * This page is where the admin adds a new movie, at /movies/new.
 * It uses the getCurrentUser helper to find out who is signed in.
 * Guests are sent to the login page and viewers are sent back to the movie list.
 * If the user is the admin it shows an empty MovieForm.
 * The form saves the movie and brings the admin back to the movie list.
 */

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import MovieForm from "@/components/MovieForm";

const AddMoviePage = async () => {
    const { role } = await getCurrentUser();

    // only the admin can add movies
    if (role === "guest") {
        redirect("/login");
    }
    if (role !== "admin") {
        redirect("/");
    }

    return (
        <section className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold">Add a movie</h1>
            <MovieForm />
        </section>
    );
};

export default AddMoviePage;