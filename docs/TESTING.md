# Test log

We tested the site by hand. Each of us tested the part we built. Result is Pass or Fail. If a test failed, we wrote it under [Problems found](#problems-found) at the bottom, the person who built that part fixed it, and we ran the test again.

- **Site tested:** TODO (Patrick, after deploying) add the Vercel link
- **Logins used:** the admin and viewer test accounts (they are in our Brightspace submission comment)
- **Browser:** a private window, so no old sign in was left over

## Summary

| Section | Tested by | Tests | Passed |
| --- | --- | --- | --- |
| [1. Display](#1-display) | John | 3 | |
| [2. Users and signing in](#2-users-and-signing-in) | Patrick | 7 | |
| [3. Adding a movie](#3-adding-a-movie) | Fernando | 14 | |
| [4. Editing a movie](#4-editing-a-movie) | Fernando | 5 | |
| [5. Deleting a movie](#5-deleting-a-movie) | John | 2 | |
| [6. Error page](#6-error-page) | Patrick | 1 | |
| [7. Final checks](#7-final-checks) | John | 2 | |
| **Total** | | **34** | |

## 1. Display

Tested by John, not signed in.

| Test | What to do | What should happen | Result | Date |
| --- | --- | --- | --- | --- |
| Display 1 | Open the live site | The navbar, the footer, and every movie with its title, its actors as a list and its release year | Passed | November 25, 2026 |
| Display 2 | Make the window phone width (about 375 px) | Everything is readable and nothing scrolls sideways | Passed | November 25, 2026 |
| Display 3 | Run the site locally with the movies table empty | "No movies yet." | Passed | November, 2026 |

## 2. Users and signing in

Tested by Patrick.

| Test | What to do | What should happen | Result | Date |
| --- | --- | --- | --- | --- |
| Users 1 | As a guest, look at the main page, then go to /movies/new | No Add a movie, Edit or Delete buttons, a way to sign in is shown, and /movies/new sends you to the sign in page | | |
| Users 2 | Sign in as the viewer, look at the main page, then go to /movies/new | It shows you are signed in, there are no Add a movie, Edit or Delete buttons, and /movies/new sends you back to the movie list | | |
| Users 3 | Sign in as the admin | It shows you are signed in, the Add a movie button is there, and every movie has Edit and Delete | | |
| Users 4 | While signed in, refresh the page, then sign out | You are still signed in after the refresh, and the admin buttons go away after signing out | | |
| Users 5 | Sign in with a wrong password | An error message shows (for example "Invalid login credentials") and nothing crashes | | |
| Users 6 | Click sign in with both boxes empty | The browser asks you to fill in the empty boxes | | |
| Users 7 | Outside the site (in the Supabase SQL Editor), try to add, change and delete a movie as the viewer | 0 rows change or a permission error shows, and the data stays the same | | |

## 3. Adding a movie

Tested by Fernando, signed in as the admin and on the Add a movie page.

| Test | What to do | What should happen | Result | Date |
| --- | --- | --- | --- | --- |
| Add 1 | Add a valid movie | You go back to the movie list, the new movie is there, and it is still there after a refresh | | |
| Add 2 | Leave the title empty, or type only spaces | "Title is required." and nothing is saved | | |
| Add 3 | Type a title that is 151 characters long | "Title can be at most 150 characters." and nothing is saved | | |
| Add 4 | Leave every actor box empty | "Add at least one actor." | | |
| Add 5 | Type an actor name that is 81 characters long | "Each actor name can be at most 80 characters." | | |
| Add 6 | Add "Tom Hanks" and "tom hanks" as actors | "The same actor is listed more than once." | | |
| Add 7 | Leave the year empty | "Enter a release year, like 1999." | | |
| Add 8 | Type 1999.5 as the year, then type letters | 1999.5 shows "Release year must be a whole number, like 1999." and letters show "Enter a release year, like 1999." | | |
| Add 9 | Try 1887, then the current year + 3, then 1888, then the current year | 1887 shows "Release year must be 1888 or later.", the current year + 3 shows "Release year can be at most" with the current year + 2, and 1888 and the current year both save | | |
| Add 10 | Add a movie with the same title and year as one in the list, in different capitals | "A movie with this title and release year already exists." | | |
| Add 11 | Add the titles "Amélie", "Ocean's Eleven" and `<b>Test</b>` | All three save and show as plain text | | |
| Add 12 | Put spaces before and after the title and the actor names | They save without the extra spaces | | |
| Add 13 | Double-click Add movie quickly | Only one movie gets added | | |
| Add 14 | On your own computer, take the admin check off the add page for a moment, sign in as the viewer and add a movie, then put the check back | "Could not save the movie. Please try again." and nothing is saved | | |

## 4. Editing a movie

Tested by Fernando, signed in as the admin.

| Test | What to do | What should happen | Result | Date |
| --- | --- | --- | --- | --- |
| Edit 1 | Click Edit on a movie | The edit page opens with that movie's title, actors and year filled in | | |
| Edit 2 | Change the year to 1800 and click Save changes | "Release year must be 1888 or later." and the movie does not change | | |
| Edit 3 | Make a valid change and click Save changes | You go back to the movie list, the change shows, and it is still there after a refresh | | |
| Edit 4 | Change something, then click Cancel | You go back to the movie list and the movie did not change | | |
| Edit 5 | Change a movie's title and year to match another movie | "A movie with this title and release year already exists." | | |

## 5. Deleting a movie

Tested by John, signed in as the admin.

| Test | What to do | What should happen | Result | Date |
| --- | --- | --- | --- | --- |
| Delete 1 | Click Delete, then Cancel in the pop-up | Nothing is deleted | | |
| Delete 2 | Click Delete, then OK | The movie disappears, and it is still gone after a refresh | | |

## 6. Error page

Tested by Patrick.

| Test | What to do | What should happen | Result | Date |
| --- | --- | --- | --- | --- |
| Error 1 | Put a wrong Supabase URL in `.env.local` and open the site | The error page shows with a Try Again button and nothing crashes | | |

## 7. Final checks

Tested by John.

| Test | What to do | What should happen | Result | Date |
| --- | --- | --- | --- | --- |
| Final 1 | Open the browser console (F12), then go through every page as a guest, the viewer and the admin | No errors or warnings, such as a missing key or a hydration error | | |
| Final 2 | Run `npm run build` and `npm run lint` on the final code | Both finish with no errors | Passed | November 25, 2026 |

## Problems found

| Test | What went wrong | Fixed by | Passed again on |
| --- | --- | --- | --- |
| | | | |
