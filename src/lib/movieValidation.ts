/*
 * Fernando Lopez (Member 2) - Group 8
 * Nov 23, 2026
 *
 * This file holds the Zod schema that checks a movie before it is saved.
 * Its input is a movie object with a title, a list of actor names and a release year.
 * It checks that the title is 1 to 150 characters, there are 1 to 20 actors with no repeats and none longer than 80 characters.
 * It also checks that the release year is a whole number from 1888 up to two years after the current year.
 * MovieForm uses it with safeParse, which gives back either the clean movie or an error message for each input that is wrong.
 */


import { z } from "zod";

const maxYear = new Date().getFullYear() + 2;

// movie rules
export const movieSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required.")
        .max(150, "Title can be at most 150 characters."),

    actors: z
        .array(z.string().max(80, "Each actor name can be at most 80 characters."))
        .min(1, "Add at least one actor.")
        .max(20, "A movie can have at most 20 actors.")
        .refine((actors) => {
            const lowerCaseActors = actors.map((actor) => actor.toLowerCase());
            return lowerCaseActors.every((actor, i) => lowerCaseActors.indexOf(actor) === i);
        }, "The same actor is listed more than once."),

    release_year: z
        .number("Enter a release year, like 1999.")
        .int("Release year must be a whole number, like 1999.")
        .min(1888, "Release year must be 1888 or later.")
        .max(maxYear, `Release year can be at most ${maxYear}.`),
});