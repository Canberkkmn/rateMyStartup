interface Startup {
  id: string;
  name: string;
  description: string;
  rating: number;
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

export default async function StartupPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const startup = await getStartupDetails(id);

  if (!startup) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        Startup not found.
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-3xl font-bold">{startup.name}</h1>
      <p className="text-gray-600 mt-2">{startup.description}</p>
      <div className="mt-4">
        <span className="text-yellow-500 font-bold">
          ⭐ {startup.rating} / 5
        </span>
      </div>
    </main>
  );
}
