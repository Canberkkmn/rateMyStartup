import StartupList from "@/components/StartupList";
import AddStartupButton from "@/components/AddStartupButton";

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
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">🚀 Top Startups</h1>
        <AddStartupButton />
      </div>
      <StartupList startups={startups} />
    </>
  );
}
