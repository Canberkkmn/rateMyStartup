import Link from "next/link";

export default function AddStartupButton() {
  return (
    <Link href="/add-startup">
      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
        + Add Startup
      </button>
    </Link>
  );
}
