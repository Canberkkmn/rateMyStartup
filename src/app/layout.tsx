import type { Metadata } from "next";
import Link from "next/link";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "RateMyStartup",
  description: "Discover and rate the best startups in the industry.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <header className="py-6 border-b bg-white shadow-md rounded-md mb-6 text-center">
            <Link href="/">
              <h1 className="text-3xl font-bold text-center cursor-pointer hover:text-blue-500 transition">
                🚀 RateMyStartup
              </h1>
            </Link>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
