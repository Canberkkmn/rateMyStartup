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
    <div className={styles["comment-form__wrapper"]}>
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
      <Button
        onClick={handleSubmit}
        variant="secondary"
        className={styles["comment-form__button"]}
      >
        Add Comment
      </Button>
    </div>
  );
}
