import { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

interface CommentFormProps {
  onAddComment: (author: string, content: string) => void;
}

export default function CommentForm({ onAddComment }: CommentFormProps) {
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!newComment.trim() || !author.trim()) {
      setError("Both fields are required.");
      return;
    }

    onAddComment(author, newComment);
    setNewComment("");
    setAuthor("");
    setError("");
  }

  return (
    <div className="mb-4 mt-4 p-4 border rounded bg-gray-100">
      <Input
        label="Your name"
        placeholder="Enter your name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        error={error && !author ? "Name is required" : ""}
      />
      <Input
        label="Comment"
        placeholder="Write a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        error={error && !newComment ? "Comment cannot be empty" : ""}
      />
      <Button onClick={handleSubmit} variant="primary" className="mt-2">
        Add Comment
      </Button>
    </div>
  );
}
