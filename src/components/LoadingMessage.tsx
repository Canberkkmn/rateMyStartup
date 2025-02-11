export default function LoadingMessage() {
  return (
    <div className="flex justify-center items-center h-20">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      <span className="ml-3 text-gray-900 font-medium">Loading...</span>
    </div>
  );
}
