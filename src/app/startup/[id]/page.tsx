"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Startup {
  id: string;
  name: string;
  description: string;
  rating: number;
  votes: number;
}

async function getStartupDetails(id: string): Promise<Startup | null> {
  try {
    const res = await fetch(`http://localhost:3001/api/startups`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch startup details");
    }

    const startups: Startup[] = await res.json();

    return startups.find((s) => s.id === id) || null;
  } catch (error) {
    console.error("Error fetching startup details:", error);

    return null;
  }
}

export default function StartupPage() {
  const params = useParams();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;

    setLoading(true);
    getStartupDetails(params.id as string).then((data) => {
      setStartup(data);
      setLoading(false);
    });
  }, [params.id]);

  async function handleVote(id: string, rating: number) {
    if (!startup) return;

    const res = await fetch(`http://localhost:3001/api/startups`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, rating }),
    });

    if (res.ok) {
      const updatedStartup = await res.json();

      setStartup(updatedStartup);
    }
  }

  if (loading) {
    return (
      <div className="text-center text-gray-600 text-xl mt-10">
        Loading startup details...
      </div>
    );
  }

  if (!loading && !startup) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        Startup not found.
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-3xl font-bold">{startup?.name}</h1>
      <p className="text-gray-600 mt-2">{startup?.description}</p>
      <div className="mt-4">
        <span className="text-yellow-500 font-bold">
          ⭐ {startup?.rating.toFixed(1)} / 5
        </span>
        <p className="text-gray-500">({startup?.votes} votes)</p>
      </div>

      <div className="mt-4 space-x-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => handleVote(startup?.id as string, rating)}
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700"
          >
            {rating} ⭐
          </button>
        ))}
      </div>
    </main>
  );
}
