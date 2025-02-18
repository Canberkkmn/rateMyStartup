"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import StartupDetails from "@/components/organisms/StartupDetails";
import CommentList from "@/components/organisms/CommentList";
import CommentForm from "@/components/molecules/CommentForm";
import ErrorMessage from "@/components/molecules/ErrorMessage";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";

import styles from "@/styles/pages/_startup-detail.module.scss";

interface Startup {
  id: string;
  name: string;
  description: string;
  rating: number;
  votes: number;
}

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function StartupPage() {
  const params = useParams();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!params.id) {
      return;
    }

    try {
      setLoading(true);

      console.log("fetching startup details...");

      const res = await fetch(
        `http://localhost:3001/api/startups/${params.id}`
      );

      if (!res.ok) throw new Error("Failed to fetch startup");

      const data = await res.json();

      -setStartup(data);
    } catch (error) {
      setStartup(null);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/comments?startupId=${params.id}`
      );
      if (res.ok) {
        setComments(await res.json());
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [params.id]);

  useEffect(() => {
    fetchData();
    fetchComments();
  }, [fetchData, fetchComments]);

  async function handleVote(rating: number) {
    if (!startup) return;

    setStartup({ ...startup, rating });

    try {
      const res = await fetch("http://localhost:3001/api/startups", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: startup.id, rating }),
      });

      if (res.ok) {
        const updatedStartup = await res.json();
        setStartup(updatedStartup);
      } else {
        throw new Error("Vote update failed");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update vote.");
    }
  }

  async function handleAddComment(author: string, content: string) {
    if (!author.trim() || !content.trim()) return;

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
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment. Please try again.");
    }
  }
  if (loading) {
    return <LoadingSpinner text="Loading startup details..." />;
  }

  if (!startup) {
    return <ErrorMessage message="Startup not found." />;
  }

  return (
    <div className={styles.container}>
      <StartupDetails startup={startup} onVote={handleVote} />
      <CommentList comments={comments} />
      <CommentForm onAddComment={handleAddComment} />
    </div>
  );
}
