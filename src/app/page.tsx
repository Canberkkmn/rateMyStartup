import StartupList from "@/components/StartupList";
import AddStartupButton from "@/components/AddStartupButton";

export default async function Home() {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Startups</h1>
        <AddStartupButton />
      </div>
      <StartupList />
    </>
  );
}
