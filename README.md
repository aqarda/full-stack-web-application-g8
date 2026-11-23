# IMR Movie Portal

This is our group 8 project for the Full-Stack Web Applications assignment at SAIT. The Internet Movies Rental Company (IMR) wanted a simple portal to keep their movie database up to date, so we built one with Next.js and Supabase. Anyone can look at the movie list, but only an admin account can add, edit or delete movies.

Live site: TODO (Patrick, after deploying) add the Vercel link

GitHub repo: https://github.com/aqarda/full-stack-web-application-g8

## Who did what

Patrick Bouley (Member 1): set up the Supabase database and its security rules, sign in and sign out, the loading and error pages, and deployed the site to Vercel.

Fernando Lopez (Member 2): adding and editing movies, the movie form and all of the validation.

John Leandro Loyao (Member 3): the layout, navbar, footer and movie list, deleting movies, this README, the test log and the final submission.

## What the site does

The main page lists every movie with its title, release year and all of its actors. The navbar and footer show on every page, and the footer has the company's contact info and store hours.

There are three kinds of users. Guests (not signed in) and viewer accounts can only browse the list. The admin account also gets an Add a movie button and Edit and Delete buttons on every movie. Adding and editing happen on their own pages, `/movies/new` and `/movies/[id]/edit`, and deleting asks you to confirm first. The admin check happens in three places: the main page only shows those buttons to the admin, the add page, the edit page and the delete action check the role again on the server, and the Row Level Security rules in Supabase stop anyone who isn't an admin from changing the data.

We used Next.js 16 with TypeScript, Tailwind CSS for the styling, Supabase for the database and the accounts, Zod for the form validation, and Vercel for hosting.

## Test accounts

We made one admin account and one viewer account for marking. The logins are in our Brightspace submission comment and not in here, because this repo is public.

## Running it locally

You need Node.js 20.9 or newer.

1. Clone the repo and install the packages:

   ```bash
   git clone https://github.com/aqarda/full-stack-web-application-g8.git
   cd full-stack-web-application-g8
   npm install
   ```

2. In the top folder of the project, make a file called `.env.local` with these two lines, using the values from our Supabase project:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your project URL
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your publishable key
   ```

   Git ignores this file, so it never gets pushed.
3. Run `npm run dev` and go to http://localhost:3000.

`npm run build` makes a production build and `npm run lint` runs ESLint.

## Setting up Supabase

1. Create a new project on supabase.com.
2. Go to Authentication, then Users, and add two users with auto confirm turned on, one for the admin and one for the viewer.
3. Open `database/IMR_Database_Setup.sql` and change the two email addresses near the bottom to the emails of those two users.
4. Run the whole file in the SQL Editor. It makes the `movies` table, adds 5 movies, turns on Row Level Security with rules that let anyone read but only the admin change movies, and gives each user their role. The role is saved as `movie_role` in the user's app metadata, which users can't change themselves.
5. The users have to sign out and back in before a new role works.
6. Copy the Project URL and the publishable key into `.env.local` (see Running it locally).

Don't put the secret key (what used to be called the service_role key) in the app or in the repo.

## Validation

When you add or edit a movie, the title is required and can be up to 150 characters, and any spaces at the start and end get trimmed off. A movie needs at least 1 actor and at most 20, each name can be up to 80 characters, empty actor rows are ignored, and the same actor can't be listed twice. The release year has to be a whole number from 1888 up to two years after the current year. You also can't add the same title and year twice. The form checks all of these with a Zod schema before it saves anything, and shows the message under the box that needs fixing.

## Testing

We tested the live site by hand with 34 test cases covering the display, the three kinds of users, signing in, adding, editing and deleting. Every test and its result is in [docs/TESTING.md](docs/TESTING.md).

TODO (after the test run): replace this line with one sentence on how the tests went

## Where things are

The pages and the delete action are in `src/app` (the add and edit pages are in `src/app/movies`), the components are in `src/components`, and the Supabase client, sign in helpers, validation rules and shared types are in `src/lib`. The SQL that sets up the database is in `database/IMR_Database_Setup.sql`.
