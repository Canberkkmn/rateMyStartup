"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import StartupDetails from "@/components/organisms/StartupDetails";
import CommentList from "@/components/organisms/CommentList";
import CommentForm from "@/components/molecules/CommentForm";

import styles from "@/styles/pages/_startup-detail.module.scss";

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function StartupPage() {
  const params = useParams();
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/comments?startupId=${params.id}`
      );
      if (res.ok) {
        setComments(await res.json());
      }
    } catch (error: any) {
      throw new Error("Failed to add comment", error);
    }
  }, [params.id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  async function handleAddComment(author: string, content: string) {
    if (!author.trim() || !content.trim()) {
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startupId: params.id,
          author,
          content,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add comment");
      }

      fetchComments();
    } catch (error: any) {
      throw new Error("Failed to add comment", error);
    }
  }

  return (
    <div className={styles.container}>
      <StartupDetails />
      <CommentList comments={comments} />
      <CommentForm onAddComment={handleAddComment} />
    </div>
  );
}
