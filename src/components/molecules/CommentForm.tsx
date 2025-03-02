import { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

import styles from "@/styles/components/molecules/_comment-form.module.scss";

interface CommentFormProps {
  onAddComment: (author: string, content: string) => void;
}

export default function CommentForm({ onAddComment }: CommentFormProps) {
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newComment.trim() || !author.trim()) {
      setError("Both fields are required.");
      return;
    }

    onAddComment(author, newComment);
    setNewComment("");
    setAuthor("");
    setError("");
  };

  return (
    <form
      className={styles["comment-form__wrapper"]}
      onSubmit={handleFormSubmit}
    >
      <Input
        label="Your name"
        name="author"
        id="author"
        placeholder="Enter your name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        error={error && !author ? "Name is required" : ""}
        aria-describedby="error-message"
      />
      <Input
        label="Comment"
        name="comment"
        id="comment"
        placeholder="Write a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        error={error && !newComment ? "Comment cannot be empty" : ""}
        aria-describedby="error-message"
      />
      <Button
        type="submit"
        variant="secondary"
        className={styles["comment-form__button"]}
      >
        Add Comment
      </Button>
    </form>
  );
}
