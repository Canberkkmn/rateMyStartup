interface LoadingButtonProps {
  text: string;
  loadingText: string;
  isLoading: boolean;
}

export default function LoadingButton({
  text,
  loadingText,
  isLoading,
}: LoadingButtonProps) {
  return (
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      disabled={isLoading}
    >
      {isLoading ? loadingText : text}
    </button>
  );
}
