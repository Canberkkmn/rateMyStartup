interface StartupDetailsProps {
  startup: {
    id: string;
    name: string;
    description: string;
    rating: number;
    votes: number;
  };
  onVote: (rating: number) => void;
}

export default function StartupDetails({
  startup,
  onVote,
}: StartupDetailsProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{startup.name}</h1>
      <p className="text-gray-600 mt-2">{startup.description}</p>
      <div className="mt-4">
        <span className="text-yellow-500 font-bold">
          ⭐ {startup.rating.toFixed(1)} / 5
        </span>
        <p className="text-gray-500">({startup.votes} votes)</p>
      </div>
      <div className="mt-4 space-x-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => onVote(rating)}
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700"
          >
            {rating} ⭐
          </button>
        ))}
      </div>
    </div>
  );
}
