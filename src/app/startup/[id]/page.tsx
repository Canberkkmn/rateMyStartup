"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;

    async function fetchData() {
      setLoading(true);
      const res = await fetch(`http://localhost:3001/api/startups`);
      const startups: Startup[] = await res.json();
      const startup = startups.find((s) => s.id === params.id);
      setStartup(startup || null);
      setLoading(false);
    }

    async function fetchComments() {
      const res = await fetch(
        `http://localhost:3001/api/comments?startupId=${params.id}`
      );
      if (res.ok) {
        setComments(await res.json());
      }
    }

    fetchData();
    fetchComments();
  }, [params.id]);

  async function handleAddComment() {
    if (!newComment.trim() || !author.trim()) return;

    const res = await fetch("http://localhost:3001/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: newComment,
        author,
        startupId: params.id,
      }),
    });

    if (res.ok) {
      const newCommentData = await res.json();
      setComments([newCommentData, ...comments]);
      setNewComment("");
      setAuthor("");
    }
  }

  if (loading)
    return (
      <div className="text-center text-gray-600 text-xl mt-10">Loading...</div>
    );
  if (!startup)
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        Startup not found.
      </div>
    );

  return (
    <main className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-3xl font-bold">{startup.name}</h1>
      <p className="text-gray-600 mt-2">{startup.description}</p>
      <div className="mt-4">
        <span className="text-yellow-500 font-bold">
          ⭐ {startup.rating.toFixed(1)} / 5
        </span>
        <p className="text-gray-500">({startup.votes} votes)</p>
      </div>

      {/* Comments Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>

        {/* New Comment Form */}
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
            onClick={handleAddComment}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Comment
          </button>
        </div>

        {/* Comment List */}
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="p-3 border-b">
              <p className="font-semibold">{comment.author}</p>
              <p className="text-gray-600">{comment.content}</p>
              <p className="text-sm text-gray-400">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </main>
  );
}
