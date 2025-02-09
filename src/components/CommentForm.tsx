import { useState } from "react";

interface CommentFormProps {
  onAddComment: (author: string, content: string) => void;
}

export default function CommentForm({ onAddComment }: CommentFormProps) {
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("");

  function handleSubmit() {
    if (!newComment.trim() || !author.trim()) return;
    onAddComment(author, newComment);
    setNewComment("");
    setAuthor("");
  }

  return (
    <div className="mb-4 p-4 border rounded bg-gray-100">
      <input
        type="text"
        placeholder="Your name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        placeholder="Write a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full p-2 border rounded"
      ></textarea>
      <button
        onClick={handleSubmit}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Comment
      </button>
    </div>
  );
}
