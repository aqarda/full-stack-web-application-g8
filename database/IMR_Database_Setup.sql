-- =====================================================
-- IMR Movie Rental Application - Group 8
-- Database Setup Script
--
-- Creates the movie database structure, inserts sample
-- data, and configures database security permissions.
-- =====================================================

-- =====================================================
-- SECTION 1: CREATE MOVIES TABLE
-- Stores movie information for the application.
-- Each movie has a unique ID, title, list of actors, and release year.
-- =====================================================

CREATE TABLE public.movies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    actors TEXT[] NOT NULL,
    release_year INTEGER NOT NULL
);

-- =====================================================
-- SECTION 2: INSERT SAMPLE MOVIES
-- Inserts five sample movies to populate the application.
-- These records allow users to view movies immediately.
-- =====================================================

INSERT INTO public.movies
    (title, actors, release_year)
VALUES
    (
        'The Matrix',
        ARRAY[
            'Keanu Reeves',
            'Laurence Fishburne',
            'Carrie-Anne Moss'
        ],
        1999
    ),
    (
        'Inception',
        ARRAY[
            'Leonardo DiCaprio',
            'Joseph Gordon-Levitt',
            'Tom Hardy'
        ],
        2010
    ),
    (
        'Interstellar',
        ARRAY[
            'Matthew McConaughey',
            'Anne Hathaway',
            'Jessica Chastain'
        ],
        2014
    ),
    (
        'The Dark Knight',
        ARRAY[
            'Christian Bale',
            'Heath Ledger',
            'Aaron Eckhart'
        ],
        2008
    ),
    (
        'Jurassic Park',
        ARRAY[
            'Sam Neill',
            'Laura Dern',
            'Jeff Goldblum'
        ],
        1993
    );

-- =====================================================
-- SECTION 3: ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- SECTION 4: CREATE RLS POLICIES
-- =====================================================

-- Allow everyone to view movies.
CREATE POLICY "Public movie viewing"
ON public.movies
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow admins to add movies.
CREATE POLICY "Admin movie insertion"
ON public.movies
FOR INSERT
TO authenticated
WITH CHECK (
    (SELECT auth.jwt() -> 'app_metadata'
        ->> 'movie_role') = 'admin'
);

-- Allow admins to edit movies.
CREATE POLICY "Admin movie updates"
ON public.movies
FOR UPDATE
TO authenticated
USING (
    (SELECT auth.jwt() -> 'app_metadata'
        ->> 'movie_role') = 'admin'
)
WITH CHECK (
    (SELECT auth.jwt() -> 'app_metadata'
        ->> 'movie_role') = 'admin'
);

-- Allow admins to delete movies.
CREATE POLICY "Admin movie deletion"
ON public.movies
FOR DELETE
TO authenticated
USING (
    (SELECT auth.jwt() -> 'app_metadata'
        ->> 'movie_role') = 'admin'
);

-- =====================================================
-- SECTION 5: ASSIGN USER ROLES
-- These accounts must already exist in Supabase Auth.
-- The roles are stored in protected application metadata.
-- Viewer accounts have read-only permissions.
-- Admin accounts can add, edit, and delete movies.
-- =====================================================

-- Assign viewer permissions.
UPDATE auth.users
SET raw_app_meta_data =
    COALESCE(raw_app_meta_data, '{}'::jsonb)
    || '{"movie_role": "viewer"}'::jsonb
WHERE email = 'viewer@gmail.com';

-- Assign administrator permissions.
UPDATE auth.users
SET raw_app_meta_data =
    COALESCE(raw_app_meta_data, '{}'::jsonb)
    || '{"movie_role": "admin"}'::jsonb
WHERE email = 'admin@gmail.com';
