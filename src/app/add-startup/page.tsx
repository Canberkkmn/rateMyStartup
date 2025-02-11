import StartupForm from "@/components/StartupForm";

export default function AddStartupPage() {
  return (
    <div className="p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-3xl font-bold mb-4">🚀 Add a New Startup</h1>
      <StartupForm />
    </div>
  );
}
