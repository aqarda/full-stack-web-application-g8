/*
 * File:        src/components/Footer.tsx
 * Author:      John Leandro Loyao (Member 3)
 * Group:       Group 8
 * Date:        2026-11-23
 * Assignment:  Full-Stack Web Applications, IMR Movie Portal
 *
 * Description: This component is the footer shown at the bottom of every page. 
 * Inputs: it takes no props, and the only value it works out is the current year for the copyright line. 
 * Processing: it shows three columns about the company, its contact details and its opening hours, and the columns stack on top of each other on a phone. 
 * Output: a footer with the company information, the address, phone number and email, the store hours, a copyright line and quick links to the movies and staff sign in pages.
 * The company is made up for this assignment, so the address, phone number and email are not real.
 */

// Imports
import Link from "next/link";

// Footer
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white text-sm text-gray-600">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 md:grid-cols-3">
        
        {/* About the company */}
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">
            Internet Movies Rental Company
          </h2>
          <p>
            We rent movies to families across Calgary. Our staff use this portal to keep our movie catalogue up to date.
          </p>
        </section>

        {/* Contact information */}
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">Contact us</h2>
          <address className="not-italic">
            <p>123 Example Street SW</p>
            <p>Calgary, AB T2P 0A1</p>
            <p className="mt-2">
              Phone:{" "}
              <a href="tel:+14035550123" className="hover:underline">
                (403) 555-0123
              </a>
            </p>
            <p>
              Email:{" "}
              <a href="mailto:info@imr.example" className="hover:underline">
                info@imr.example
              </a>
            </p>
          </address>
        </section>

        {/* Opening hours */}
        <section>
          <h2 className="mb-2 text-base font-semibold text-ink">Store hours</h2>
          <p>Monday to Friday: 9 a.m. to 6 p.m.</p>
          <p>Saturday: 10 a.m. to 4 p.m.</p>
          <p>Sunday: Closed</p>
        </section>
      </div>

      {/* Copyright line and quick links */}
      <div className="border-t border-gray-200">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <p>Copyright {currentYear} Internet Movies Rental Company</p>
          <ul className="flex gap-4">
            <li>
              <Link href="/" className="hover:underline">
                Movies
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:underline">
                Staff sign in
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
