import Link from "next/link";

export default function Header() {
  return (
    <header className="py-6 border-b bg-white shadow-md rounded-md mb-6 text-center">
      <Link href="/">
        <h1 className="text-3xl font-bold text-center cursor-pointer hover:text-blue-500 transition">
          🚀 RateMyStartup
        </h1>
      </Link>
    </header>
  );
}
