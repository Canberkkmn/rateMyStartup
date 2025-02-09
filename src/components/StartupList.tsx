import StartupItem from "./StartupItem";

interface StartupListProps {
  startups: {
    id: string;
    name: string;
    rating: number;
  }[];
}

export default function StartupList({ startups }: StartupListProps) {
  return (
    <ul className="space-y-4">
      {startups.length > 0 ? (
        startups.map((startup) => (
          <StartupItem key={startup.id} startup={startup} />
        ))
      ) : (
        <p className="text-gray-500">No startups found.</p>
      )}
    </ul>
  );
}
