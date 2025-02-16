import Link from "next/link";
import ThemeToggle from "@/components/molecules/ThemeToggle";

export default function Header() {
  return (
    <header className="relative py-6 border-b bg-white dark:bg-gray-900 shadow-md rounded-md mb-6 text-center flex items-center justify-center">
      <Link href="/">
        <h1 className="text-3xl font-bold cursor-pointer hover:text-blue-500 transition text-gray-900 dark:text-white">
          🚀 RateMyStartup
        </h1>
      </Link>

      <div className="absolute right-6">
        <ThemeToggle />
      </div>
    </header>
  );
}
