import Link from "next/link";

async function getStartups() {
  const res = await fetch("http://localhost:3001/api/startups", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export default async function Home() {
  const startups = await getStartups();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">🚀 Top Startups</h1>
        <Link href="/add-startup">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
            + Add Startup
          </button>
        </Link>
      </div>
      <ul className="space-y-4">
        {startups.length > 0 ? (
          startups.map((startup: any) => (
            <li key={startup.id} className="p-4 bg-white shadow rounded-md">
              <Link href={`/startup/${startup.id}`}>
                <span className="text-blue-600 text-lg font-semibold hover:underline">
                  {startup.name}
                </span>
              </Link>
              <p className="text-gray-500">⭐ {startup.rating} / 5</p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No startups found.</p>
        )}
      </ul>
    </main>
  );
}
