import Link from "next/link";

interface StartupItemProps {
  startup: {
    id: string;
    name: string;
    rating: number;
  };
}

export default function StartupItem({ startup }: StartupItemProps) {
  return (
    <li className="p-4 bg-white shadow rounded-md">
      <Link href={`/startup/${startup.id}`}>
        <span className="text-blue-600 text-lg font-semibold hover:underline">
          {startup.name}
        </span>
      </Link>
      <p className="text-gray-500">⭐ {startup.rating.toFixed(1)} / 5</p>
    </li>
  );
}
